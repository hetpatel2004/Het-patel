// Silent Non-Blocking Client-side Analytics Telemetry
// Completely private, zero cookies, zero consent popups, zero performance overhead

const getApiBase = (): string => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl || !envUrl.trim()) return '/api';
  const trimmed = envUrl.trim().replace(/\/+$/, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};

const API_BASE = getApiBase();

// Unique Persistent Visitor ID
export const getVisitorId = (): string => {
  let id = localStorage.getItem('hp_visitor_id');
  if (!id) {
    id = `vis_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    try {
      localStorage.setItem('hp_visitor_id', id);
    } catch {
      // Ignore private browsing storage quota errors
    }
  }
  return id;
};

// Cached Visitor Name (if they ever submitted a contact inquiry or entered their name)
export const getCachedVisitorName = (): string => {
  return localStorage.getItem('hp_visitor_name') || '';
};

export const saveVisitorIdentity = (name: string) => {
  if (!name || !name.trim()) return;
  const cleanName = name.trim();
  try {
    localStorage.setItem('hp_visitor_name', cleanName);
    localStorage.setItem('hp_has_contacted', 'true');
    // Silently sync the newly acquired name with their visitor record
    trackVisit(true);
  } catch {
    // Ignore private browsing errors
  }
};

// Track Pageview silently
export const getTimeSpentSeconds = (): number => {
  const start = parseInt(sessionStorage.getItem('hp_session_start') || '0', 10);
  if (!start) return 0;
  return Math.max(0, Math.round((Date.now() - start) / 1000));
};

export const initDurationTracking = () => {
  if (!sessionStorage.getItem('hp_session_start')) {
    sessionStorage.setItem('hp_session_start', String(Date.now()));
  }

  const sendDwellPing = (isFinal: boolean = false) => {
    try {
      const visitorId = getVisitorId();
      const timeSpentSeconds = getTimeSpentSeconds();
      if (!visitorId || timeSpentSeconds <= 0) return;

      const payload = JSON.stringify({
        visitorId,
        timeSpentSeconds,
        isHeartbeat: true,
      });

      if (isFinal && navigator.sendBeacon) {
        const blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon(`${API_BASE}/analytics/visit`, blob);
      } else {
        fetch(`${API_BASE}/analytics/visit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Silent fail
    }
  };

  // Heartbeat every 20 seconds while user is actively on page
  const interval = setInterval(() => {
    if (document.visibilityState === 'visible') {
      sendDwellPing(false);
    }
  }, 20000);

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      sendDwellPing(true);
    }
  };

  const handlePageHide = () => {
    sendDwellPing(true);
  };

  window.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('pagehide', handlePageHide);
  window.addEventListener('beforeunload', handlePageHide);

  return () => {
    clearInterval(interval);
    window.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('pagehide', handlePageHide);
    window.removeEventListener('beforeunload', handlePageHide);
  };
};

export const trackVisit = async (force: boolean = false) => {
  try {
    if (!sessionStorage.getItem('hp_session_start')) {
      sessionStorage.setItem('hp_session_start', String(Date.now()));
    }

    // Check session debounce: Don't track more than once every 15 minutes unless forced (e.g. name update)
    const now = Date.now();
    const lastTracked = parseInt(sessionStorage.getItem('hp_last_visit_ping') || '0', 10);
    if (!force && now - lastTracked < 15 * 60 * 1000) {
      return;
    }

    const visitorId = getVisitorId();
    const name = getCachedVisitorName();
    const hasContacted = localStorage.getItem('hp_has_contacted') === 'true';

    // Collect browser hints non-intrusively
    const screenResolution = `${window.screen?.width || 0}x${window.screen?.height || 0}`;
    const referrerUrl = document.referrer || '';
    const currentPath = window.location.pathname || '/';
    let timezone = 'Asia/Kolkata';
    try {
      timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
    } catch {
      // Fallback
    }

    sessionStorage.setItem('hp_last_visit_ping', String(now));

    // Non-blocking fire-and-forget fetch
    fetch(`${API_BASE}/analytics/visit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        visitorId,
        name,
        screenResolution,
        referrerUrl,
        currentPath,
        timezone,
        hasContacted,
        timeSpentSeconds: getTimeSpentSeconds(),
      }),
      keepalive: true,
    }).catch(() => {
      // Silent fail - analytics must never throw errors to public visitors
    });
  } catch {
    // Silent fail
  }
};
