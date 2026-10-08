/**
 * FitGuide API Service
 * Handles REST communication with Express backend with local caching fallback
 */

const API_BASE = '/api';

export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  } catch (err) {
    console.warn('[API] Health check error:', err);
    return { status: 'offline', database: { connected: false } };
  }
}

// Assessments
export async function createAssessment(payload) {
  try {
    const res = await fetch(`${API_BASE}/assessments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to submit assessment');
    }

    if (data.data) {
      localStorage.setItem('fitguide_latest_assessment', JSON.stringify(data.data));
    }
    return data.data;
  } catch (err) {
    console.error('[API] createAssessment error:', err);
    throw err;
  }
}

export async function getLatestAssessment() {
  try {
    const res = await fetch(`${API_BASE}/assessments/latest`);
    if (res.ok) {
      const data = await res.json();
      if (data.data) {
        localStorage.setItem('fitguide_latest_assessment', JSON.stringify(data.data));
        return data.data;
      }
    }
  } catch (err) {
    console.warn('[API] Failed to fetch latest from server, checking local cache:', err);
  }

  // Fallback to local storage
  const cached = localStorage.getItem('fitguide_latest_assessment');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      return null;
    }
  }
  return null;
}

export async function getAssessmentHistory() {
  try {
    const res = await fetch(`${API_BASE}/assessments/history`);
    if (res.ok) {
      const data = await res.json();
      return data.data || [];
    }
  } catch (err) {
    console.warn('[API] Failed to fetch assessment history:', err);
  }
  return [];
}

export async function getAssessmentById(id) {
  try {
    const res = await fetch(`${API_BASE}/assessments/${id}`);
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (err) {
    console.warn('[API] Failed to fetch assessment by id:', err);
  }
  return null;
}

// Progress Logs
export async function getProgressLogs() {
  try {
    const res = await fetch(`${API_BASE}/progress`);
    if (res.ok) {
      const data = await res.json();
      if (data.data && data.data.length > 0) {
        localStorage.setItem('fitguide_progress_logs', JSON.stringify(data.data));
        return data.data;
      }
    }
  } catch (err) {
    console.warn('[API] Failed to fetch progress logs, checking cache:', err);
  }

  const cached = localStorage.getItem('fitguide_progress_logs');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      return [];
    }
  }
  return [];
}

export async function createProgressLog(payload) {
  try {
    const res = await fetch(`${API_BASE}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to record progress entry');
    }
    return data.data;
  } catch (err) {
    console.error('[API] createProgressLog error:', err);
    throw err;
  }
}

// Knowledge Base Articles
export async function getArticles() {
  try {
    const res = await fetch(`${API_BASE}/articles`);
    if (res.ok) {
      const data = await res.json();
      return data.data || [];
    }
  } catch (err) {
    console.warn('[API] Failed to fetch articles:', err);
  }
  return [];
}

export async function getArticleBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE}/articles/${slug}`);
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (err) {
    console.warn('[API] Failed to fetch article:', err);
  }
  return null;
}
