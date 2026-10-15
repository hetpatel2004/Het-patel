// API client service with local fallback for offline/standalone resilience

const resolveApiBase = (): string => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl || !envUrl.trim()) return '/api';
  const trimmed = envUrl.trim().replace(/\/+$/, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};

const API_BASE = resolveApiBase();

export interface ProfileData {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  github: string;
  linkedin: string;
  whatsapp: string;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    period: string;
    badge: string;
  }>;
  stats?: {
    experience: string;
    projectsCompleted: string;
    directTurnaround: string;
    clientSatisfaction: string;
  };
}

export interface ProjectData {
  id: string;
  _id?: string;
  number: string;
  title: string;
  subtitle: string;
  domain: string;
  category: string;
  description: string;
  tags: string[];
  landingImg: string;
  fullImg: string;
  liveUrl: string;
  githubUrl: string;
  accentColor: string;
  order: number;
}

export interface SkillCategoryGroup {
  id: string;
  category: string;
  shortLabel: string;
  skills: string[];
}

export const getAuthToken = (): string | null => {
  return localStorage.getItem('het_admin_token');
};

export const setAuthToken = (token: string) => {
  localStorage.setItem('het_admin_token', token);
};

export const clearAuthToken = () => {
  localStorage.removeItem('het_admin_token');
};

const getHeaders = () => {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// AUTH
export const apiLogin = async (username: string, password: string) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Authentication failed');
  }
  setAuthToken(data.token);
  return data;
};

export const apiVerifyToken = async (): Promise<boolean> => {
  const token = getAuthToken();
  if (!token) return false;
  try {
    const res = await fetch(`${API_BASE}/auth/verify`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await res.json();
    return !!data.success;
  } catch {
    return false;
  }
};

// PROFILE
export const apiGetProfile = async (): Promise<ProfileData> => {
  try {
    const res = await fetch(`${API_BASE}/profile`);
    const data = await res.json();
    if (data.success && data.data) {
      localStorage.setItem('het_cached_profile', JSON.stringify(data.data));
      return data.data;
    }
  } catch (err) {
    console.warn('API getProfile failed, checking local cache:', err);
  }
  const cached = localStorage.getItem('het_cached_profile');
  if (cached) return JSON.parse(cached);
  throw new Error('Failed to load profile');
};

export const apiUpdateProfile = async (profile: Partial<ProfileData>): Promise<ProfileData> => {
  const res = await fetch(`${API_BASE}/profile`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(profile),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to update profile');
  }
  localStorage.setItem('het_cached_profile', JSON.stringify(data.data));
  return data.data;
};

// PROJECTS
export const apiGetProjects = async (): Promise<ProjectData[]> => {
  try {
    const res = await fetch(`${API_BASE}/projects`);
    const data = await res.json();
    if (data.success && data.data) {
      localStorage.setItem('het_cached_projects', JSON.stringify(data.data));
      return data.data;
    }
  } catch (err) {
    console.warn('API getProjects failed, checking local cache:', err);
  }
  const cached = localStorage.getItem('het_cached_projects');
  if (cached) return JSON.parse(cached);
  return [];
};

export const apiCreateProject = async (project: Partial<ProjectData>): Promise<ProjectData> => {
  const res = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(project),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to create project');
  }
  return data.data;
};

export const apiUpdateProject = async (id: string, project: Partial<ProjectData>): Promise<ProjectData> => {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(project),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to update project');
  }
  return data.data;
};

export const apiDeleteProject = async (id: string): Promise<boolean> => {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to delete project');
  }
  return true;
};

// SKILLS
export const apiGetSkills = async (): Promise<SkillCategoryGroup[]> => {
  try {
    const res = await fetch(`${API_BASE}/skills`);
    const data = await res.json();
    if (data.success && data.data) {
      localStorage.setItem('het_cached_skills', JSON.stringify(data.data));
      return data.data;
    }
  } catch (err) {
    console.warn('API getSkills failed, checking cache:', err);
  }
  const cached = localStorage.getItem('het_cached_skills');
  if (cached) return JSON.parse(cached);
  return [];
};

export const apiAddSkill = async (categoryId: string, skillName: string): Promise<SkillCategoryGroup> => {
  const res = await fetch(`${API_BASE}/skills`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ categoryId, skillName }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to add skill');
  }
  return data.data;
};

export const apiUpdateSkill = async (categoryId: string, oldSkillName: string, newSkillName: string): Promise<SkillCategoryGroup> => {
  const res = await fetch(`${API_BASE}/skills`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ categoryId, oldSkillName, newSkillName }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to update skill');
  }
  return data.data;
};

export const apiDeleteSkill = async (categoryId: string, skillName: string): Promise<SkillCategoryGroup> => {
  const res = await fetch(`${API_BASE}/skills`, {
    method: 'DELETE',
    headers: getHeaders(),
    body: JSON.stringify({ categoryId, skillName }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to delete skill');
  }
  return data.data;
};

export const apiCreateCategory = async (categoryName: string, shortLabel?: string): Promise<SkillCategoryGroup> => {
  const res = await fetch(`${API_BASE}/skills/category`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ categoryName, shortLabel }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to create category');
  }
  return data.data;
};

// INQUIRIES / CONTACT LEADS
export interface InquiryData {
  id: string;
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  status: 'new' | 'replied' | 'archived';
  createdAt: string;
}

export const apiGetInquiries = async (): Promise<InquiryData[]> => {
  const res = await fetch(`${API_BASE}/contact`, {
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to fetch inquiries');
  }
  return data.data || [];
};

export const apiUpdateInquiryStatus = async (id: string, status: string): Promise<InquiryData> => {
  const res = await fetch(`${API_BASE}/contact/${id}/status`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to update inquiry status');
  }
  return data.data;
};

export const apiDeleteInquiry = async (id: string): Promise<boolean> => {
  const res = await fetch(`${API_BASE}/contact/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to delete inquiry');
  }
  return true;
};

