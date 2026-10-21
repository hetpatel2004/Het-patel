import Visitor from '../models/Visitor.js';
import { getDbStatus } from '../config/db.js';
import { recordVisitor, getAllVisitors, deleteVisitor, clearAllVisitors } from '../data/dbStore.js';

// Helper: Parse User-Agent string to detect Device, OS, and Browser
export const parseUserAgent = (uaString = '') => {
  const ua = uaString.toLowerCase();

  // 1. Device Type & Model
  let deviceType = 'Desktop';
  let deviceModel = 'PC / Desktop';

  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) {
    deviceType = 'Tablet';
    deviceModel = /ipad/i.test(ua) ? 'Apple iPad' : 'Android Tablet';
  } else if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) {
    deviceType = 'Mobile';
    if (/iphone/i.test(ua)) {
      deviceModel = 'Apple iPhone';
    } else if (/samsung/i.test(ua)) {
      deviceModel = 'Samsung Galaxy';
    } else if (/pixel/i.test(ua)) {
      deviceModel = 'Google Pixel';
    } else if (/android/i.test(ua)) {
      deviceModel = 'Android Smartphone';
    } else {
      deviceModel = 'Mobile Device';
    }
  } else if (/macintosh|mac os x/i.test(ua)) {
    deviceModel = 'Apple Mac';
  } else if (/windows/i.test(ua)) {
    deviceModel = 'Windows PC';
  } else if (/linux/i.test(ua)) {
    deviceModel = 'Linux Machine';
  }

  // 2. Operating System
  let os = 'Unknown OS';
  if (/iphone os ([\d_]+)/i.test(ua) || /iphone|ipad|ipod/i.test(ua)) {
    const match = ua.match(/(?:iphone os|cpu os|os) ([\d_]+)/i);
    os = match ? `iOS ${match[1].replace(/_/g, '.')}` : 'iOS';
  } else if (/android ([\d.]+)/i.test(ua) || /android/i.test(ua)) {
    const match = ua.match(/android ([\d.]+)/i);
    os = match ? `Android ${match[1]}` : 'Android';
  } else if (/windows nt 10.0/i.test(ua)) {
    os = 'Windows 10/11';
  } else if (/windows nt 6.3/i.test(ua)) {
    os = 'Windows 8.1';
  } else if (/windows nt 6.1/i.test(ua)) {
    os = 'Windows 7';
  } else if (/mac os x/i.test(ua) || /macintosh/i.test(ua)) {
    const match = ua.match(/mac os x ([\d_]+)/i);
    os = match ? `macOS ${match[1].replace(/_/g, '.')}` : 'macOS';
  } else if (/cros/i.test(ua)) {
    os = 'ChromeOS';
  } else if (/linux/i.test(ua)) {
    os = 'Linux';
  }

  // 3. Browser
  let browser = 'Unknown Browser';
  if (/edg\//i.test(ua)) browser = 'Microsoft Edge';
  else if (/opr\/|opera/i.test(ua)) browser = 'Opera';
  else if (/chrome|crios/i.test(ua) && !/edg/i.test(ua)) browser = 'Google Chrome';
  else if (/safari/i.test(ua) && !/chrome|crios|android/i.test(ua)) browser = 'Apple Safari';
  else if (/firefox|fxios/i.test(ua)) browser = 'Mozilla Firefox';
  else if (/brave/i.test(ua)) browser = 'Brave';

  return { deviceType, deviceModel, os, browser };
};

// Helper: Normalize referrer source
const categorizeReferrer = (ref = '') => {
  if (!ref || ref.trim() === '') return 'Direct Visit';
  const r = ref.toLowerCase();
  if (r.includes('linkedin.com')) return 'LinkedIn';
  if (r.includes('github.com')) return 'GitHub';
  if (r.includes('google.')) return 'Google Search';
  if (r.includes('instagram.com')) return 'Instagram';
  if (r.includes('twitter.com') || r.includes('x.com')) return 'X / Twitter';
  if (r.includes('facebook.com')) return 'Facebook';
  if (r.includes('wa.me') || r.includes('whatsapp')) return 'WhatsApp';
  if (r.includes('youtube.com')) return 'YouTube';
  try {
    const url = new URL(ref);
    return url.hostname.replace('www.', '');
  } catch {
    return 'Web Referral';
  }
};

// POST /api/analytics/visit (Public Silent Telemetry)
export const recordVisit = async (req, res) => {
  try {
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || '';

    const {
      visitorId,
      name,
      screenResolution,
      referrerUrl,
      currentPath,
      timezone,
      hasContacted,
    } = req.body || {};

    const vid = visitorId || `vis_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const parsedUa = parseUserAgent(userAgent);
    const referrerCategory = categorizeReferrer(referrerUrl);

    // Format visitor name or smart alias
    let cleanName = (name || '').trim();
    if (!cleanName) {
      const shortId = vid.replace(/^vis_\d+_?/, '').substring(0, 4).toUpperCase();
      cleanName = `Guest #${shortId}`;
    }

    const payload = {
      visitorId: vid,
      name: cleanName,
      ip: clientIp,
      deviceType: parsedUa.deviceType,
      deviceModel: parsedUa.deviceModel,
      os: parsedUa.os,
      browser: parsedUa.browser,
      screenResolution: screenResolution || 'Unknown',
      referrer: referrerCategory,
      referrerUrl: referrerUrl || '',
      currentPath: currentPath || '/',
      timezone: timezone || 'Asia/Kolkata',
      country: 'India',
      city: 'Ahmedabad',
      hasContacted: Boolean(hasContacted),
      lastVisitedAt: new Date(),
    };

    // Always update local fallback store
    const localResult = recordVisitor(payload);

    // Persist to MongoDB Atlas if connected
    const { connected } = getDbStatus();
    let dbRecord = null;
    if (connected) {
      try {
        const existing = await Visitor.findOne({ visitorId: vid });
        if (existing) {
          existing.visitCount = (existing.visitCount || 1) + 1;
          existing.lastVisitedAt = new Date();
          if (cleanName && (!existing.name || existing.name.startsWith('Guest #'))) {
            existing.name = cleanName;
          }
          if (hasContacted) existing.hasContacted = true;
          if (currentPath) existing.currentPath = currentPath;
          if (screenResolution) existing.screenResolution = screenResolution;
          dbRecord = await existing.save();
        } else {
          dbRecord = await Visitor.create(payload);
        }
      } catch (dbErr) {
        console.warn('[Analytics MongoDB Save Warning]:', dbErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      visitorId: vid,
      visitCount: dbRecord?.visitCount || localResult?.visitCount || 1,
      recordedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Analytics Error]:', error);
    return res.status(500).json({ success: false, message: 'Failed to record visit' });
  }
};

// GET /api/analytics/stats (Protected Admin Studio Route)
export const getAnalyticsStats = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    let visitors = [];

    if (connected) {
      try {
        visitors = await Visitor.find().sort({ lastVisitedAt: -1 }).limit(200).lean();
      } catch (dbErr) {
        console.warn('[Analytics MongoDB Fetch Warning]:', dbErr.message);
      }
    }

    // Fallback to local store if MongoDB returns empty or disconnected
    if (!visitors || visitors.length === 0) {
      visitors = getAllVisitors();
    }

    const totalUniqueVisitors = visitors.length;
    const totalPageviews = visitors.reduce((sum, v) => sum + (v.visitCount || 1), 0);

    // Today's visits
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const todayVisitors = visitors.filter(v => new Date(v.lastVisitedAt || v.createdAt) >= startOfToday);
    const todayPageviews = todayVisitors.reduce((sum, v) => sum + (v.visitCount || 1), 0);

    // Device breakdown
    const devices = { Desktop: 0, Mobile: 0, Tablet: 0 };
    visitors.forEach(v => {
      const type = v.deviceType || 'Desktop';
      if (devices[type] !== undefined) devices[type] += 1;
      else devices.Desktop += 1;
    });

    const mobilePercent = totalUniqueVisitors > 0
      ? Math.round(((devices.Mobile + devices.Tablet) / totalUniqueVisitors) * 100)
      : 0;
    const desktopPercent = totalUniqueVisitors > 0 ? 100 - mobilePercent : 100;

    // Contacted visitors count
    const contactedCount = visitors.filter(v => v.hasContacted || (!v.name.startsWith('Guest #') && v.name.length > 2)).length;

    return res.status(200).json({
      success: true,
      summary: {
        totalUniqueVisitors,
        totalPageviews,
        todayPageviews,
        todayUnique: todayVisitors.length,
        devices,
        mobilePercent,
        desktopPercent,
        contactedCount,
      },
      recentVisitors: visitors.map(v => ({
        id: v._id?.toString() || v.id,
        visitorId: v.visitorId,
        name: v.name || 'Anonymous Visitor',
        hasContacted: Boolean(v.hasContacted),
        deviceType: v.deviceType || 'Desktop',
        deviceModel: v.deviceModel || 'Unknown Device',
        os: v.os || 'Unknown OS',
        browser: v.browser || 'Unknown Browser',
        screenResolution: v.screenResolution || 'Unknown',
        referrer: v.referrer || 'Direct Visit',
        referrerUrl: v.referrerUrl || '',
        currentPath: v.currentPath || '/',
        timezone: v.timezone || 'Asia/Kolkata',
        country: v.country || 'India',
        city: v.city || 'Ahmedabad',
        visitCount: v.visitCount || 1,
        lastVisitedAt: v.lastVisitedAt || v.createdAt,
      })),
    });
  } catch (error) {
    console.error('[Analytics Fetch Error]:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve analytics stats' });
  }
};

// DELETE /api/analytics/:id (Protected Admin Route)
export const deleteVisitorRecord = async (req, res) => {
  try {
    const { id } = req.params;
    deleteVisitor(id);

    const { connected } = getDbStatus();
    if (connected) {
      try {
        await Visitor.findOneAndDelete({ $or: [{ _id: id }, { visitorId: id }] });
      } catch {
        // ID may belong to local store
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Visitor log deleted successfully',
    });
  } catch (error) {
    console.error('[Analytics Delete Error]:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete visitor log' });
  }
};

// DELETE /api/analytics (Clear all logs)
export const clearAnalyticsLogs = async (req, res) => {
  try {
    clearAllVisitors();

    const { connected } = getDbStatus();
    if (connected) {
      try {
        await Visitor.deleteMany({});
      } catch (dbErr) {
        console.warn('[Analytics MongoDB Clear Warning]:', dbErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'All visitor logs cleared successfully',
    });
  } catch (error) {
    console.error('[Analytics Clear Error]:', error);
    return res.status(500).json({ success: false, message: 'Failed to clear visitor logs' });
  }
};
