import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'het_patel_portfolio_jwt_secret_2026_xyz';
const STATIC_USERNAME = (process.env.ADMIN_USERNAME || 'hetpatel').toLowerCase();
const STATIC_PASSWORD = process.env.ADMIN_PASSWORD || 'hetpatel2026';

// Brute-force protection: max 5 failed attempts per IP per 15 minutes
const failedAttempts = new Map();
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 5;

export const adminLogin = async (req, res) => {
  try {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown-ip';
    const now = Date.now();

    // Check failed attempts for this IP
    const record = failedAttempts.get(clientIp);
    if (record && record.count >= MAX_FAILED_ATTEMPTS) {
      const remainingTimeMs = LOCKOUT_WINDOW_MS - (now - record.lastAttempt);
      if (remainingTimeMs > 0) {
        const remainingMinutes = Math.ceil(remainingTimeMs / (60 * 1000));
        return res.status(429).json({
          success: false,
          message: `Too many failed login attempts. Security lockout active for ${remainingMinutes} more minute(s).`,
        });
      } else {
        // Window expired, reset
        failedAttempts.delete(clientIp);
      }
    }

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required',
      });
    }

    const cleanUsername = String(username).trim().toLowerCase();
    const cleanPassword = String(password).trim();

    // Check credentials (accepts 'hetpatel' or 'admin' with the static password)
    const isValidUser = cleanUsername === STATIC_USERNAME || cleanUsername === 'admin';
    const isValidPass = cleanPassword === STATIC_PASSWORD;

    if (!isValidUser || !isValidPass) {
      // Record failed attempt
      const currentRecord = failedAttempts.get(clientIp) || { count: 0, lastAttempt: now };
      currentRecord.count += 1;
      currentRecord.lastAttempt = now;
      failedAttempts.set(clientIp, currentRecord);

      const remaining = MAX_FAILED_ATTEMPTS - currentRecord.count;
      return res.status(401).json({
        success: false,
        message: remaining > 0
          ? `Invalid static ID or password. (${remaining} attempts remaining before temporary lockout).`
          : 'Too many failed login attempts. Access locked for 15 minutes.',
      });
    }

    // Success: clear failed attempts
    failedAttempts.delete(clientIp);

    // Generate JWT token valid for 7 days
    const token = jwt.sign(
      {
        username: cleanUsername,
        role: 'superadmin',
        name: 'Het Patel',
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Authentication successful. Welcome, Het Patel.',
      token,
      user: {
        username: cleanUsername,
        name: 'Het Patel',
        role: 'Administrator',
      },
    });
  } catch (error) {
    console.error('[Auth] Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server authentication error',
    });
  }
};

export const verifySession = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Verification error' });
  }
};
