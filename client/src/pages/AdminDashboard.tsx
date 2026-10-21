import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  FolderGit2,
  Code2,
  LogOut,
  ExternalLink,
  Plus,
  Pencil,
  Trash2,
  Check,
  Save,
  Globe,
  Mail,
  Phone,
  GraduationCap,
  X,
  AlertCircle,
  Clock,
  ShieldCheck,
  MessageSquare,
  MessageCircle,
  CheckCircle2,
  Archive,
  Calendar,
  DollarSign,
  Tag,
  Image as ImageIcon,
  Upload,
  Eye,
  Monitor,
  Smartphone,
  Tablet,
  TrendingUp,
  RefreshCw,
  Activity,
  Search,
  List,
  LayoutGrid,
  Timer,
} from 'lucide-react';
import {
  clearAuthToken,
  apiVerifyToken,
  apiGetProfile,
  apiUpdateProfile,
  apiGetProjects,
  apiCreateProject,
  apiUpdateProject,
  apiDeleteProject,
  apiGetSkills,
  apiAddSkill,
  apiUpdateSkill,
  apiDeleteSkill,
  apiCreateCategory,
  apiGetInquiries,
  apiUpdateInquiryStatus,
  apiDeleteInquiry,
  apiGetAnalyticsStats,
  apiDeleteVisitorRecord,
  apiClearAnalyticsLogs,
  type ProfileData,
  type ProjectData,
  type SkillCategoryGroup,
  type InquiryData,
  type VisitorRecord,
  type AnalyticsSummary,
} from '../services/api';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Active Menu Tab: 'details' | 'projects' | 'skills' | 'inquiries' | 'analytics'
  const [activeTab, setActiveTab] = useState<'details' | 'projects' | 'skills' | 'inquiries' | 'analytics'>('details');

  // Loading & notification states
  const [isInitializing, setIsInitializing] = useState(true);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Data states
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [skills, setSkills] = useState<SkillCategoryGroup[]>([]);
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'new' | 'replied' | 'archived'>('all');
  const [isInquiriesLoading, setIsInquiriesLoading] = useState(false);

  // Visitor Analytics states
  const [analyticsSummary, setAnalyticsSummary] = useState<AnalyticsSummary | null>(null);
  const [visitorLogs, setVisitorLogs] = useState<VisitorRecord[]>([]);
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(false);
  const [visitorFilter, setVisitorFilter] = useState<'all' | 'contacted' | 'desktop' | 'mobile'>('all');
  const [visitorSearch, setVisitorSearch] = useState('');
  const [analyticsViewMode, setAnalyticsViewMode] = useState<'table' | 'cards'>('table');

  // Project Modal State (for Add / Edit)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    number: '',
    title: '',
    subtitle: '',
    domain: '',
    category: '',
    description: '',
    tags: '',
    landingImg: '/ambika-landing.png',
    fullImg: '/ambika-full.png',
    liveUrl: '',
    githubUrl: '',
    accentColor: '#B600A8',
    order: 1,
  });

  // Skill Add / Edit state
  const [newSkillInput, setNewSkillInput] = useState<{ [categoryId: string]: string }>({});
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryShortLabel, setNewCategoryShortLabel] = useState('');

  // Editing skill inline modal
  const [editingSkillInfo, setEditingSkillInfo] = useState<{
    categoryId: string;
    oldSkillName: string;
    newSkillName: string;
  } | null>(null);

  // New Education item state
  const [newEduDegree, setNewEduDegree] = useState('');
  const [newEduInstitution, setNewEduInstitution] = useState('');
  const [newEduPeriod, setNewEduPeriod] = useState('');
  const [newEduBadge, setNewEduBadge] = useState('Completed');
  const [isAddingEdu, setIsAddingEdu] = useState(false);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Auth & data check on mount
  useEffect(() => {
    const init = async () => {
      const isValid = await apiVerifyToken();
      if (!isValid) {
        clearAuthToken();
        navigate('/login', { replace: true });
        return;
      }

      try {
        const [profData, projData, skillData, inqData, analyticsData] = await Promise.all([
          apiGetProfile(),
          apiGetProjects(),
          apiGetSkills(),
          apiGetInquiries().catch(() => []),
          apiGetAnalyticsStats().catch(() => null),
        ]);
        setProfile(profData);
        setProjects(projData);
        setSkills(skillData);
        setInquiries(inqData);
        if (analyticsData) {
          setAnalyticsSummary(analyticsData.summary);
          setVisitorLogs(analyticsData.recentVisitors || []);
        }
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        showToast('Connected in offline mode with cached data.', 'success');
      } finally {
        setIsInitializing(false);
      }
    };

    init();
  }, [navigate]);

  const handleSignOut = () => {
    clearAuthToken();
    navigate('/login', { replace: true });
  };

  // -------------------------------------------------------------
  // TAB 5: VISITOR ANALYTICS HANDLERS
  // -------------------------------------------------------------
  const loadAnalytics = async () => {
    setIsAnalyticsLoading(true);
    try {
      const data = await apiGetAnalyticsStats();
      setAnalyticsSummary(data.summary);
      setVisitorLogs(data.recentVisitors || []);
      showToast('Analytics & traffic records updated.');
    } catch (err: any) {
      showToast(err.message || 'Failed to refresh analytics', 'error');
    } finally {
      setIsAnalyticsLoading(false);
    }
  };

  const handleDeleteVisitor = async (id: string, name: string) => {
    if (!window.confirm(`Delete visitor record for "${name}"?`)) return;
    try {
      await apiDeleteVisitorRecord(id);
      setVisitorLogs(visitorLogs.filter((v) => v.id !== id && v.visitorId !== id));
      if (analyticsSummary) {
        setAnalyticsSummary({
          ...analyticsSummary,
          totalUniqueVisitors: Math.max(0, analyticsSummary.totalUniqueVisitors - 1),
        });
      }
      showToast(`Visitor record for "${name}" deleted.`);
    } catch (err: any) {
      showToast(err.message || 'Failed to delete record', 'error');
    }
  };

  const handleClearAnalytics = async () => {
    if (!window.confirm('Are you sure you want to clear all visitor tracking records? This cannot be undone.')) return;
    try {
      await apiClearAnalyticsLogs();
      setVisitorLogs([]);
      if (analyticsSummary) {
        setAnalyticsSummary({
          ...analyticsSummary,
          totalUniqueVisitors: 0,
          totalPageviews: 0,
          todayPageviews: 0,
          todayUnique: 0,
          mobilePercent: 0,
          desktopPercent: 100,
          contactedCount: 0,
        });
      }
      showToast('All visitor tracking records cleared.');
    } catch (err: any) {
      showToast(err.message || 'Failed to clear records', 'error');
    }
  };

  // -------------------------------------------------------------
  // TAB 1: PROFILE / DETAILS HANDLERS
  // -------------------------------------------------------------
  const handleProfileFieldChange = (field: keyof ProfileData, value: any) => {
    if (!profile) return;
    setProfile({
      ...profile,
      [field]: value,
    });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    try {
      const updated = await apiUpdateProfile(profile);
      setProfile(updated);
      showToast('All profile details successfully saved & updated!');
    } catch (err: any) {
      showToast(err.message || 'Failed to save profile details', 'error');
    }
  };

  const handleAddEducation = () => {
    if (!newEduDegree.trim() || !newEduInstitution.trim() || !profile) return;
    const newEdu = {
      id: `edu-${Date.now()}`,
      degree: newEduDegree.trim(),
      institution: newEduInstitution.trim(),
      period: newEduPeriod.trim() || '2026',
      badge: newEduBadge.trim() || 'Pursuing',
    };
    const updatedEdu = [...(profile.education || []), newEdu];
    setProfile({
      ...profile,
      education: updatedEdu,
    });
    setNewEduDegree('');
    setNewEduInstitution('');
    setNewEduPeriod('');
    setIsAddingEdu(false);
  };

  const handleDeleteEducation = (id: string) => {
    if (!profile) return;
    const updatedEdu = (profile.education || []).filter((e) => e.id !== id);
    setProfile({
      ...profile,
      education: updatedEdu,
    });
  };

  // -------------------------------------------------------------
  // TAB 2: PROJECTS HANDLERS
  // -------------------------------------------------------------
  const handleOpenAddProjectModal = () => {
    setEditingProjectId(null);
    setProjectForm({
      number: String(projects.length + 1).padStart(2, '0'),
      title: '',
      subtitle: '',
      domain: '',
      category: 'Live Production Deployment • Ahmedabad, Gujarat',
      description: '',
      tags: 'React.js, Node.js, Express.js, MongoDB, Tailwind CSS',
      landingImg: '/ambika-landing.png',
      fullImg: '/ambika-full.png',
      liveUrl: 'https://',
      githubUrl: 'https://github.com/hetpatel2004',
      accentColor: '#B600A8',
      order: projects.length + 1,
    });
    setIsProjectModalOpen(true);
  };

  const handleOpenEditProjectModal = (proj: ProjectData) => {
    setEditingProjectId(proj.id || proj._id || null);
    setProjectForm({
      number: proj.number || '',
      title: proj.title || '',
      subtitle: proj.subtitle || '',
      domain: proj.domain || '',
      category: proj.category || '',
      description: proj.description || '',
      tags: Array.isArray(proj.tags) ? proj.tags.join(', ') : '',
      landingImg: proj.landingImg || '/ambika-landing.png',
      fullImg: proj.fullImg || '/ambika-full.png',
      liveUrl: proj.liveUrl || '',
      githubUrl: proj.githubUrl || '',
      accentColor: proj.accentColor || '#B600A8',
      order: proj.order || 1,
    });
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...projectForm,
        tags: projectForm.tags.split(',').map((t) => t.trim()).filter(Boolean),
      };

      if (editingProjectId) {
        const updated = await apiUpdateProject(editingProjectId, payload);
        setProjects(projects.map((p) => ((p.id === editingProjectId || p._id === editingProjectId) ? updated : p)));
        showToast('Project updated successfully!');
      } else {
        const created = await apiCreateProject(payload);
        setProjects([...projects, created]);
        showToast('New project created and added to portfolio!');
      }
      setIsProjectModalOpen(false);
    } catch (err: any) {
      showToast(err.message || 'Failed to save project', 'error');
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await apiDeleteProject(id);
      setProjects(projects.filter((p) => p.id !== id && p._id !== id));
      showToast(`Project "${title}" deleted.`);
    } catch (err: any) {
      showToast(err.message || 'Failed to delete project', 'error');
    }
  };

  // -------------------------------------------------------------
  // TAB 3: SKILLS HANDLERS
  // -------------------------------------------------------------
  const handleAddSkillToCategory = async (categoryId: string) => {
    const skillName = newSkillInput[categoryId]?.trim();
    if (!skillName) return;

    try {
      const updatedGroup = await apiAddSkill(categoryId, skillName);
      setSkills(skills.map((g) => (g.id === categoryId ? updatedGroup : g)));
      setNewSkillInput({ ...newSkillInput, [categoryId]: '' });
      showToast(`Added "${skillName}" to ${updatedGroup.category}!`);
    } catch (err: any) {
      showToast(err.message || 'Failed to add skill', 'error');
    }
  };

  const handleDeleteSkill = async (categoryId: string, skillName: string) => {
    try {
      const updatedGroup = await apiDeleteSkill(categoryId, skillName);
      setSkills(skills.map((g) => (g.id === categoryId ? updatedGroup : g)));
      showToast(`Removed "${skillName}".`);
    } catch (err: any) {
      showToast(err.message || 'Failed to delete skill', 'error');
    }
  };

  const handleSaveEditedSkill = async () => {
    if (!editingSkillInfo || !editingSkillInfo.newSkillName.trim()) return;
    try {
      const updatedGroup = await apiUpdateSkill(
        editingSkillInfo.categoryId,
        editingSkillInfo.oldSkillName,
        editingSkillInfo.newSkillName.trim()
      );
      setSkills(skills.map((g) => (g.id === editingSkillInfo.categoryId ? updatedGroup : g)));
      setEditingSkillInfo(null);
      showToast('Skill updated successfully!');
    } catch (err: any) {
      showToast(err.message || 'Failed to update skill', 'error');
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    try {
      const created = await apiCreateCategory(newCategoryName.trim(), newCategoryShortLabel.trim());
      setSkills([...skills, created]);
      setNewCategoryName('');
      setNewCategoryShortLabel('');
      setIsNewCategoryModalOpen(false);
      showToast(`Category "${created.category}" created!`);
    } catch (err: any) {
      showToast(err.message || 'Failed to create category', 'error');
    }
  };

  // -------------------------------------------------------------
  // TAB 4: CLIENT INQUIRIES HANDLERS
  // -------------------------------------------------------------
  const handleUpdateInquiryStatus = async (id: string, newStatus: string) => {
    try {
      const updated = await apiUpdateInquiryStatus(id, newStatus);
      setInquiries(inquiries.map((inq) => ((inq.id === id || inq._id === id) ? updated : inq)));
      showToast(`Inquiry marked as ${newStatus}!`);
    } catch (err: any) {
      showToast(err.message || 'Failed to update inquiry status', 'error');
    }
  };

  const handleDeleteInquiry = async (id: string, clientName: string) => {
    if (!window.confirm(`Delete inquiry from "${clientName}"?`)) return;
    try {
      await apiDeleteInquiry(id);
      setInquiries(inquiries.filter((inq) => inq.id !== id && inq._id !== id));
      showToast(`Inquiry from ${clientName} deleted.`);
    } catch (err: any) {
      showToast(err.message || 'Failed to delete inquiry', 'error');
    }
  };

  const loadInquiries = async () => {
    setIsInquiriesLoading(true);
    try {
      const data = await apiGetInquiries();
      setInquiries(data);
      showToast('Client inquiries synced from database.');
    } catch (err: any) {
      showToast(err.message || 'Failed to refresh inquiries', 'error');
    } finally {
      setIsInquiriesLoading(false);
    }
  };

  // Dynamic Background Polling for Inquiries (auto-sync every 15s when Tab 4 is open)
  useEffect(() => {
    if (activeTab !== 'inquiries') return;
    const interval = setInterval(async () => {
      try {
        const fresh = await apiGetInquiries();
        setInquiries(fresh);
      } catch {
        // Silent background polling
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [activeTab]);

  // Format helpers for Tab 5 Visitor Telemetry Table
  const formatVisitorDateTime = (dateString?: string) => {
    if (!dateString) return 'Just now';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return 'Recently';

    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = d.toDateString() === yesterday.toDateString();

    const timeStr = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

    if (isToday) return `Today, ${timeStr}`;
    if (isYesterday) return `Yesterday, ${timeStr}`;
    return `${d.toLocaleDateString([], { month: 'short', day: 'numeric' })}, ${timeStr}`;
  };

  const formatDeviceAndOs = (v: VisitorRecord) => {
    const isMobile = v.deviceType === 'Mobile';
    const isTablet = v.deviceType === 'Tablet';
    const icon = isMobile || isTablet ? '📱' : '💻';
    const model = v.deviceModel || (isMobile ? 'Mobile Device' : 'Windows PC');
    const os = v.os || '';
    if (model.toLowerCase().includes(os.toLowerCase())) {
      return `${icon} ${model}`;
    }
    return os ? `${icon} ${model} (${os})` : `${icon} ${model}`;
  };

  const formatLocation = (v: VisitorRecord) => {
    const countryCode = v.country === 'India' ? 'IN' : v.country === 'United States' ? 'US' : v.country || 'IN';
    if (v.city) return `${v.city}, ${countryCode}`;
    if (v.country) return v.country;
    if (v.timezone) {
      const parts = v.timezone.split('/');
      const city = parts[parts.length - 1].replace(/_/g, ' ');
      return `${city}, IN`;
    }
    return 'India, IN';
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds || seconds <= 0) return '< 10s';
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins < 60) {
      return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
    }
    const hours = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hours}h ${remMins}m`;
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen w-full bg-[#07070A] text-white flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-[#B600A8] rounded-full animate-spin mb-4" />
        <span className="font-mono text-xs text-white/60 uppercase tracking-widest">
          CONNECTING TO ADMIN STUDIO...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#07070A] text-white flex flex-col select-none">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3.5 rounded-2xl border text-xs font-mono flex items-center gap-2.5 shadow-2xl animate-fadeIn ${
            toastMessage.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-300'
              : 'bg-red-950/90 border-red-500/40 text-red-300'
          }`}
        >
          {toastMessage.type === 'success' ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-30 w-full bg-[#0D0D12]/95 backdrop-blur-md border-b border-white/10 px-6 sm:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-[#B600A8]/30 rounded-full blur-md scale-125" />
            <img src="/hp-logo.png" alt="HP" className="h-8 w-auto object-contain relative" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans font-black uppercase text-sm sm:text-base tracking-tight text-white">
                ADMIN STUDIO
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>ONLINE</span>
              </span>
            </div>
            <p className="text-[11px] font-mono text-white/50 hidden sm:block">
              Het Patel &bull; MERN Architecture CMS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/70 hover:text-white transition-all cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-[#B600A8]" />
            <span className="hidden sm:inline">VIEW LIVE PORTFOLIO</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-mono text-red-300 hover:text-red-200 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">LOGOUT</span>
          </button>
        </div>
      </header>

      {/* Main Body with Sidebar + Workspace */}
      <div className="flex-1 flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 gap-8">
        {/* Left Sidebar Menu */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-2">
          <div className="p-3 mb-2 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block px-3 py-1 font-bold">
              MANAGEMENT MENUS
            </span>

            {/* Menu 1: Details */}
            <button
              onClick={() => setActiveTab('details')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer mb-1 ${
                activeTab === 'details'
                  ? 'bg-[#B600A8] text-white font-bold shadow-[0_4px_20px_rgba(182,0,168,0.35)]'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4" />
                <span>1. My Details</span>
              </div>
              <span className="text-[10px] opacity-70">Profile</span>
            </button>

            {/* Menu 2: Projects */}
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer mb-1 ${
                activeTab === 'projects'
                  ? 'bg-[#B600A8] text-white font-bold shadow-[0_4px_20px_rgba(182,0,168,0.35)]'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FolderGit2 className="w-4 h-4" />
                <span>2. All Projects</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 font-bold">
                {projects.length}
              </span>
            </button>

            {/* Menu 3: Skills */}
            <button
              onClick={() => setActiveTab('skills')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer mb-1 ${
                activeTab === 'skills'
                  ? 'bg-[#B600A8] text-white font-bold shadow-[0_4px_20px_rgba(182,0,168,0.35)]'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Code2 className="w-4 h-4" />
                <span>3. Skills Stack</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 font-bold">
                {skills.reduce((acc, g) => acc + g.skills.length, 0)}
              </span>
            </button>

            {/* Menu 4: Client Inquiries */}
            <button
              onClick={() => {
                setActiveTab('inquiries');
                loadInquiries();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer mb-1 ${
                activeTab === 'inquiries'
                  ? 'bg-[#B600A8] text-white font-bold shadow-[0_4px_20px_rgba(182,0,168,0.35)]'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4" />
                <span>4. Inquiries &amp; Interests</span>
              </div>
              <div className="flex items-center gap-1.5">
                {inquiries.filter((i) => i.status === 'new').length > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40 animate-pulse">
                    {inquiries.filter((i) => i.status === 'new').length} NEW
                  </span>
                )}
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 font-bold">
                  {inquiries.length}
                </span>
              </div>
            </button>

            {/* Menu 5: Silent Visitor Analytics */}
            <button
              onClick={() => {
                setActiveTab('analytics');
                if (!analyticsSummary) loadAnalytics();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-[#B600A8] text-white font-bold shadow-[0_4px_20px_rgba(182,0,168,0.35)]'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Eye className="w-4 h-4" />
                <span>5. Visitor Traffic</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 font-bold">
                  {analyticsSummary?.totalUniqueVisitors ?? visitorLogs.length}
                </span>
              </div>
            </button>
          </div>

          {/* Quick Summary Pill Card */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 text-xs font-mono text-white/60">
            <div className="text-[11px] font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B600A8]" />
              <span>Studio Quick Stats</span>
            </div>
            <div className="flex justify-between">
              <span>Admin:</span>
              <span className="text-white">Het Patel</span>
            </div>
            <div className="flex justify-between">
              <span>Live Projects:</span>
              <span className="text-emerald-400 font-bold">{projects.length} Deployed</span>
            </div>
            <div className="flex justify-between">
              <span>Disciplines:</span>
              <span className="text-amber-400 font-bold">{skills.length} Categories</span>
            </div>
            <div className="flex justify-between">
              <span>Client Leads:</span>
              <span className="text-emerald-300 font-bold">
                {inquiries.length} Total ({inquiries.filter((i) => i.status === 'new').length} New)
              </span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-1.5 mt-1.5">
              <span>Silent Visitors:</span>
              <span className="text-purple-300 font-bold">
                {analyticsSummary?.totalUniqueVisitors ?? visitorLogs.length} Unique Devices
              </span>
            </div>
          </div>
        </aside>

        {/* Right Content Workspace */}
        <main className="flex-1 min-w-0">
          {/* ============================================================== */}
          {/* 1. MY DETAILS TAB */}
          {/* ============================================================== */}
          {activeTab === 'details' && profile && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <h2 className="font-sans font-black uppercase text-2xl sm:text-3xl text-white tracking-tight">
                    1. My Profile &amp; Details
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-white/60 mt-1">
                    Edit your personal information, headline, contact handles, and academic background.
                  </p>
                </div>

                <button
                  onClick={handleSaveProfile}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#B600A8] hover:bg-[#99008c] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_8px_25px_rgba(182,0,168,0.4)] cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>SAVE CHANGES</span>
                </button>
              </div>

              {/* General Personal Details Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#111116] border border-white/10 space-y-6">
                <h3 className="font-sans font-bold text-lg text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-[#B600A8]" />
                  <span>Core Identity &amp; Bio</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.name || ''}
                      onChange={(e) => handleProfileFieldChange('name', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#B600A8] text-white text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                      Professional Headline / Role
                    </label>
                    <input
                      type="text"
                      value={profile.title || ''}
                      onChange={(e) => handleProfileFieldChange('title', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#B600A8] text-white text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                    Subtitle / Value Proposition
                  </label>
                  <input
                    type="text"
                    value={profile.subtitle || ''}
                    onChange={(e) => handleProfileFieldChange('subtitle', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#B600A8] text-white text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                    About / Bio Summary
                  </label>
                  <textarea
                    rows={4}
                    value={profile.bio || ''}
                    onChange={(e) => handleProfileFieldChange('bio', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#B600A8] text-white text-sm outline-none resize-y"
                  />
                </div>
              </div>

              {/* Contact & Location Info Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#111116] border border-white/10 space-y-6">
                <h3 className="font-sans font-bold text-lg text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>Contact &amp; Location Channels</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email || ''}
                      onChange={(e) => handleProfileFieldChange('email', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#B600A8] text-white text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={profile.phone || ''}
                      onChange={(e) => handleProfileFieldChange('phone', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#B600A8] text-white text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                      Location / Region
                    </label>
                    <input
                      type="text"
                      value={profile.location || ''}
                      onChange={(e) => handleProfileFieldChange('location', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#B600A8] text-white text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                      GitHub Profile URL
                    </label>
                    <input
                      type="text"
                      value={profile.github || ''}
                      onChange={(e) => handleProfileFieldChange('github', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#B600A8] text-white text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                      LinkedIn URL
                    </label>
                    <input
                      type="text"
                      value={profile.linkedin || ''}
                      onChange={(e) => handleProfileFieldChange('linkedin', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#B600A8] text-white text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                      Availability Tagline
                    </label>
                    <input
                      type="text"
                      value={profile.availability || ''}
                      onChange={(e) => handleProfileFieldChange('availability', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#B600A8] text-white text-sm outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Education Background Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#111116] border border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans font-bold text-lg text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-amber-400" />
                    <span>Education Background</span>
                  </h3>

                  <button
                    type="button"
                    onClick={() => setIsAddingEdu(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/80 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#B600A8]" />
                    <span>ADD EDUCATION</span>
                  </button>
                </div>

                {/* Add Education Form */}
                {isAddingEdu && (
                  <div className="p-4 rounded-2xl bg-white/5 border border-[#B600A8]/30 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Degree / Course (e.g. M.Sc. in IT)"
                        value={newEduDegree}
                        onChange={(e) => setNewEduDegree(e.target.value)}
                        className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Institution (e.g. Silver Oak University)"
                        value={newEduInstitution}
                        onChange={(e) => setNewEduInstitution(e.target.value)}
                        className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Period (e.g. 2025 – Pursuing)"
                        value={newEduPeriod}
                        onChange={(e) => setNewEduPeriod(e.target.value)}
                        className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Badge (e.g. Current Degree, Completed)"
                        value={newEduBadge}
                        onChange={(e) => setNewEduBadge(e.target.value)}
                        className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white outline-none"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingEdu(false)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 text-xs font-mono text-white/60 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleAddEducation}
                        className="px-4 py-1.5 rounded-lg bg-[#B600A8] text-xs font-mono text-white font-bold"
                      >
                        Add to List
                      </button>
                    </div>
                  </div>
                )}

                {/* List of Education records */}
                <div className="space-y-3">
                  {profile.education?.map((edu) => (
                    <div
                      key={edu.id}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-sans font-bold text-sm text-white">
                            {edu.degree}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-white/70">
                            {edu.badge}
                          </span>
                        </div>
                        <p className="text-xs text-white/60 font-sans">
                          {edu.institution} &bull; <span className="font-mono text-white/40">{edu.period}</span>
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteEducation(edu.id)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* 2. ALL PROJECTS TAB */}
          {/* ============================================================== */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <h2 className="font-sans font-black uppercase text-2xl sm:text-3xl text-white tracking-tight">
                    2. All Projects Management
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-white/60 mt-1">
                    Manage your portfolio showcase. Add new projects, edit titles, links, descriptions, and tags.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddProjectModal}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#B600A8] hover:bg-[#99008c] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_8px_25px_rgba(182,0,168,0.4)] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD NEW PROJECT</span>
                </button>
              </div>

              {/* Projects List Grid */}
              <div className="grid grid-cols-1 gap-5">
                {projects.map((proj) => (
                  <div
                    key={proj.id || proj._id}
                    className="p-6 sm:p-7 rounded-3xl bg-[#111116] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-5 max-w-3xl flex-1">
                      {/* Project BG Image Thumbnail */}
                      <div className="w-full sm:w-36 h-28 sm:h-24 rounded-2xl overflow-hidden border border-white/10 bg-black/60 shrink-0 relative group">
                        <img
                          src={proj.landingImg || '/ambika-landing.png'}
                          alt={proj.title}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute bottom-1.5 left-2 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-white/80">
                          BG IMAGE
                        </span>
                      </div>

                      <div className="space-y-2.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-white/10 font-mono text-xs font-bold text-white">
                            #{proj.number}
                          </span>
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold"
                          style={{
                            backgroundColor: `${proj.accentColor || '#B600A8'}20`,
                            color: proj.accentColor || '#B600A8',
                          }}
                        >
                          {proj.category || 'Production'}
                        </span>
                        {proj.domain && (
                          <span className="text-xs font-mono text-white/40">
                            &bull; {proj.domain}
                          </span>
                        )}
                      </div>

                      <h3 className="font-sans font-black text-xl sm:text-2xl text-white tracking-tight">
                        {proj.title}
                      </h3>

                      {proj.subtitle && (
                        <p className="font-caveat font-semibold text-base text-white/70">
                          {proj.subtitle}
                        </p>
                      )}

                      <p className="font-sans text-xs sm:text-sm text-white/70 line-clamp-2 leading-relaxed">
                        {proj.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {(Array.isArray(proj.tags) ? proj.tags : []).map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-white/70"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                    {/* Actions and Links */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                      <div className="flex items-center gap-2">
                        {proj.liveUrl && proj.liveUrl !== '#' && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                            title="Open live URL"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}

                        <button
                          onClick={() => handleOpenEditProjectModal(proj)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-[#B600A8] text-white text-xs font-mono font-bold uppercase transition-all duration-200 cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span>EDIT</span>
                        </button>

                        <button
                          onClick={() => handleDeleteProject(proj.id || proj._id || '', proj.title)}
                          className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 transition-colors cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* 3. SKILLS & STACK TAB */}
          {/* ============================================================== */}
          {activeTab === 'skills' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <h2 className="font-sans font-black uppercase text-2xl sm:text-3xl text-white tracking-tight">
                    3. Technical Skills Management
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-white/60 mt-1">
                    Manage your skill categories and tools. Add new tools, edit existing ones, or create new categories.
                  </p>
                </div>

                <button
                  onClick={() => setIsNewCategoryModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#B600A8]" />
                  <span>ADD NEW CATEGORY</span>
                </button>
              </div>

              {/* Skills Category Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((group) => (
                  <div
                    key={group.id}
                    className="p-6 rounded-3xl bg-[#111116] border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs font-bold text-[#B600A8]">
                            #{group.id}
                          </span>
                          <h3 className="font-sans font-bold text-base text-white">
                            {group.category}
                          </h3>
                        </div>
                        <span className="text-[11px] font-mono text-white/40">
                          {group.skills.length} skills
                        </span>
                      </div>

                      {/* Skill Tags Chips with Edit & Delete */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {group.skills.map((skill, sIdx) => (
                          <div
                            key={sIdx}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/85 group hover:border-[#B600A8]/50 transition-all"
                          >
                            <span>{skill}</span>
                            <button
                              type="button"
                              onClick={() =>
                                setEditingSkillInfo({
                                  categoryId: group.id,
                                  oldSkillName: skill,
                                  newSkillName: skill,
                                })
                              }
                              className="text-white/30 hover:text-white transition-colors cursor-pointer"
                              title="Rename Skill"
                            >
                              <Pencil className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteSkill(group.id, skill)}
                              className="text-white/30 hover:text-red-400 transition-colors cursor-pointer"
                              title="Delete Skill"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Inline Add Skill Input */}
                    <div className="pt-3 border-t border-white/5 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Add skill (e.g. Next.js, Redux)..."
                        value={newSkillInput[group.id] || ''}
                        onChange={(e) =>
                          setNewSkillInput({ ...newSkillInput, [group.id]: e.target.value })
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkillToCategory(group.id);
                          }
                        }}
                        className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white outline-none focus:border-[#B600A8]"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddSkillToCategory(group.id)}
                        className="p-2 rounded-xl bg-[#B600A8] hover:bg-[#99008c] text-white transition-colors cursor-pointer"
                        title="Add Skill"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* 4. CLIENT INQUIRIES TAB */}
          {/* ============================================================== */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-sans font-black uppercase text-2xl sm:text-3xl text-white tracking-tight">
                      4. Inquiries &amp; Client Interests
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono text-[11px] font-bold border border-emerald-500/30 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Dynamic
                    </span>
                    {inquiries.filter((i) => i.status === 'new').length > 0 && (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                        {inquiries.filter((i) => i.status === 'new').length} Unread
                      </span>
                    )}
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-white/60 mt-1">
                    All inquiries, project details, and messages submitted by prospective clients through your "Contact Me" modal. Connect instantly on WhatsApp or Email.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => loadInquiries()}
                    disabled={isInquiriesLoading}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white transition-all cursor-pointer disabled:opacity-50"
                    title="Sync inquiries from database"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-[#B600A8] ${isInquiriesLoading ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>

                  {/* Filter Tabs */}
                  <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs">
                    {(['all', 'new', 'replied', 'archived'] as const).map((filterKey) => {
                      const count =
                        filterKey === 'all'
                          ? inquiries.length
                          : inquiries.filter((i) => i.status === filterKey).length;
                      return (
                        <button
                          key={filterKey}
                          onClick={() => setInquiryFilter(filterKey)}
                          className={`px-3 py-1.5 rounded-xl uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                            inquiryFilter === filterKey
                              ? 'bg-[#B600A8] text-white font-bold shadow-md'
                              : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span>{filterKey}</span>
                          <span className="text-[10px] opacity-75">({count})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Inquiries List */}
              {(() => {
                const filtered = inquiries.filter((inq) => {
                  if (inquiryFilter === 'all') return true;
                  return inq.status === inquiryFilter;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="p-12 text-center rounded-3xl bg-[#111116] border border-white/10 space-y-3">
                      <MessageSquare className="w-10 h-10 text-white/20 mx-auto" />
                      <h4 className="font-sans font-bold text-white text-lg">No Inquiries Found</h4>
                      <p className="font-mono text-xs text-white/40 max-w-sm mx-auto">
                        {inquiryFilter === 'all'
                          ? 'No client inquiries have been received yet. They will appear here when prospective clients submit your contact form.'
                          : `There are currently no inquiries marked as "${inquiryFilter}".`}
                      </p>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 gap-5">
                    {filtered.map((inq) => {
                      const inqId = inq.id || inq._id || '';
                      const cleanPhone = inq.phone ? inq.phone.replace(/[^0-9+]/g, '') : '';
                      const waNumber = cleanPhone.replace(/\+/g, '');
                      const waGreeting = `Hi ${inq.name}, thank you for reaching out via my portfolio regarding your "${inq.service}" project! I would love to discuss your requirements.`;
                      const waLink = waNumber
                        ? `https://wa.me/${waNumber}?text=${encodeURIComponent(waGreeting)}`
                        : `https://wa.me/?text=${encodeURIComponent(waGreeting)}`;

                      const mailSubject = `Re: Project Inquiry (${inq.service}) - Het Patel Portfolio`;
                      const mailBody = `Hi ${inq.name},\n\nThank you for reaching out regarding your "${inq.service}" project requirement.\n\nI reviewed your brief: "${inq.message}" and would love to schedule a quick call to discuss the milestones and timeline.\n\nBest regards,\nHet Patel\nFull Stack Web Architect`;
                      const mailLink = `mailto:${inq.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

                      return (
                        <div
                          key={inqId}
                          className={`p-6 rounded-3xl bg-[#111116] border transition-all duration-300 flex flex-col justify-between gap-5 ${
                            inq.status === 'new'
                              ? 'border-emerald-500/40 shadow-[0_4px_25px_rgba(16,185,129,0.08)]'
                              : inq.status === 'replied'
                              ? 'border-sky-500/30'
                              : 'border-white/10 opacity-70'
                          }`}
                        >
                          {/* Card Top: Client info & Status */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-2xl bg-[#B600A8]/20 border border-[#B600A8]/30 flex items-center justify-center font-mono font-bold text-sm text-[#FF79C6]">
                                {inq.name.slice(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-sans font-bold text-base text-white">
                                    {inq.name}
                                  </h3>
                                  <span
                                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider ${
                                      inq.status === 'new'
                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                        : inq.status === 'replied'
                                        ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                                        : 'bg-white/10 text-white/50 border border-white/10'
                                    }`}
                                  >
                                    {inq.status}
                                  </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-white/50 mt-0.5">
                                  <a
                                    href={`mailto:${inq.email}`}
                                    className="hover:text-white transition-colors flex items-center gap-1"
                                  >
                                    <Mail className="w-3 h-3 text-[#B600A8]" />
                                    <span>{inq.email}</span>
                                  </a>
                                  {inq.phone && (
                                    <a
                                      href={`tel:${inq.phone}`}
                                      className="hover:text-white transition-colors flex items-center gap-1"
                                    >
                                      <Phone className="w-3 h-3 text-emerald-400" />
                                      <span>{inq.phone}</span>
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 font-mono text-[11px] text-white/40">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{new Date(inq.createdAt).toLocaleString()}</span>
                            </div>
                          </div>

                          {/* Project Details Badges */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col">
                              <span className="text-[10px] font-mono uppercase text-white/40 flex items-center gap-1">
                                <Tag className="w-3 h-3 text-[#B600A8]" />
                                Service Requested
                              </span>
                              <span className="text-xs font-semibold text-white mt-1">
                                {inq.service || 'General Development'}
                              </span>
                            </div>

                            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col">
                              <span className="text-[10px] font-mono uppercase text-white/40 flex items-center gap-1">
                                <DollarSign className="w-3 h-3 text-emerald-400" />
                                Target Budget
                              </span>
                              <span className="text-xs font-semibold text-emerald-300 mt-1">
                                {inq.budget || 'Flexible / To discuss'}
                              </span>
                            </div>

                            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col">
                              <span className="text-[10px] font-mono uppercase text-white/40 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-amber-400" />
                                Target Timeline
                              </span>
                              <span className="text-xs font-semibold text-amber-300 mt-1">
                                {inq.timeline || 'Flexible'}
                              </span>
                            </div>
                          </div>

                          {/* Message Body */}
                          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                            <span className="text-[10px] font-mono uppercase text-white/40 block mb-1.5 font-bold">
                              Client Message / Scope
                            </span>
                            <p className="text-xs text-white/85 leading-relaxed whitespace-pre-wrap">
                              {inq.message}
                            </p>
                          </div>

                          {/* Actions Bar */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
                            {/* Fast Direct Response Buttons */}
                            <div className="flex flex-wrap items-center gap-2">
                              {inq.phone ? (
                                <a
                                  href={waLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all shadow-md cursor-pointer"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                  <span>WhatsApp Client</span>
                                </a>
                              ) : (
                                <a
                                  href={waLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white font-mono text-xs transition-all cursor-pointer"
                                >
                                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>WhatsApp</span>
                                </a>
                              )}

                              <a
                                href={mailLink}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-mono text-xs font-bold transition-all cursor-pointer"
                              >
                                <Mail className="w-3.5 h-3.5 text-[#B600A8]" />
                                <span>Send Direct Email</span>
                              </a>
                            </div>

                            {/* Status and Delete Controls */}
                            <div className="flex items-center gap-2">
                              {inq.status !== 'replied' ? (
                                <button
                                  onClick={() => handleUpdateInquiryStatus(inqId, 'replied')}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 text-sky-300 font-mono text-xs transition-all cursor-pointer"
                                >
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Mark Replied</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleUpdateInquiryStatus(inqId, 'new')}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-300 font-mono text-xs transition-all cursor-pointer"
                                >
                                  <Clock className="w-3 h-3" />
                                  <span>Mark as New</span>
                                </button>
                              )}

                              {inq.status !== 'archived' && (
                                <button
                                  onClick={() => handleUpdateInquiryStatus(inqId, 'archived')}
                                  className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all cursor-pointer"
                                  title="Archive Inquiry"
                                >
                                  <Archive className="w-3.5 h-3.5" />
                                </button>
                              )}

                              <button
                                onClick={() => handleDeleteInquiry(inqId, inq.name)}
                                className="p-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all cursor-pointer"
                                title="Delete Inquiry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 5: VISITOR ANALYTICS & TELEMETRY */}
          {/* ============================================================== */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header with Title and Global Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-sans font-black uppercase text-xl sm:text-2xl tracking-wide text-white">
                      Visitor Traffic & Telemetry
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#B600A8]/20 text-[#B600A8] font-mono text-[11px] font-bold border border-[#B600A8]/30 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Telemetry
                    </span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-white/60 mt-1 max-w-2xl">
                    Silent analytics captured in the background with zero cookie banners or popups. Shows device models, operating systems, screen resolution, referrers, and links names when visitors submit an inquiry.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => loadAnalytics()}
                    disabled={isAnalyticsLoading}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white transition-all cursor-pointer disabled:opacity-50"
                    title="Refresh analytics data"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-[#B600A8] ${isAnalyticsLoading ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>

                  <button
                    onClick={handleClearAnalytics}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-mono text-red-300 hover:text-red-200 transition-all cursor-pointer"
                    title="Clear all visitor records"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Clear Logs</span>
                  </button>
                </div>
              </div>

              {/* KPI Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
                {/* Total Unique Visitors */}
                <div className="p-4 rounded-3xl bg-[#111116] border border-white/10 relative overflow-hidden group hover:border-[#B600A8]/40 transition-all">
                  <div className="flex items-center justify-between text-white/40 mb-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider">Unique Visitors</span>
                    <Eye className="w-4 h-4 text-[#B600A8]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-sans font-black text-white">
                    {analyticsSummary?.totalUniqueVisitors ?? 0}
                  </div>
                  <div className="font-mono text-[10px] text-white/50 mt-1 flex items-center gap-1">
                    <Activity className="w-3 h-3 text-emerald-400" />
                    <span>{analyticsSummary?.contactedCount ?? 0} identified inquiries</span>
                  </div>
                </div>

                {/* Total Pageviews / Visits */}
                <div className="p-4 rounded-3xl bg-[#111116] border border-white/10 relative overflow-hidden group hover:border-[#B600A8]/40 transition-all">
                  <div className="flex items-center justify-between text-white/40 mb-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider">Total Visits</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-sans font-black text-white">
                    {analyticsSummary?.totalPageviews ?? 0}
                  </div>
                  <div className="font-mono text-[10px] text-white/50 mt-1">
                    Cumulative pageviews recorded
                  </div>
                </div>

                {/* Avg Time Spent */}
                <div className="p-4 rounded-3xl bg-[#111116] border border-white/10 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center justify-between text-white/40 mb-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider">Avg. Time Spent</span>
                    <Timer className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-sans font-black text-emerald-300">
                    {formatDuration(analyticsSummary?.avgTimeSpentSeconds)}
                  </div>
                  <div className="font-mono text-[10px] text-white/50 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-white/30" />
                    <span>Total dwell: {formatDuration(analyticsSummary?.totalTimeSpentSeconds)}</span>
                  </div>
                </div>

                {/* Today's Traffic */}
                <div className="p-4 rounded-3xl bg-[#111116] border border-white/10 relative overflow-hidden group hover:border-[#B600A8]/40 transition-all">
                  <div className="flex items-center justify-between text-white/40 mb-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider">Today's Active</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-sans font-black text-amber-300">
                    {analyticsSummary?.todayUnique ?? 0}
                  </div>
                  <div className="font-mono text-[10px] text-white/50 mt-1">
                    {analyticsSummary?.todayPageviews ?? 0} visits in last 24 hrs
                  </div>
                </div>

                {/* Device Distribution */}
                <div className="p-4 rounded-3xl bg-[#111116] border border-white/10 relative overflow-hidden group hover:border-[#B600A8]/40 transition-all col-span-2 sm:col-span-1">
                  <div className="flex items-center justify-between text-white/40 mb-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider">Device Split</span>
                    <Monitor className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <div className="flex items-center gap-1 text-sm font-sans font-bold">
                      <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{analyticsSummary?.desktopPercent ?? 100}%</span>
                    </div>
                    <span className="text-white/20">/</span>
                    <div className="flex items-center gap-1 text-sm font-sans font-bold">
                      <Smartphone className="w-3.5 h-3.5 text-pink-400" />
                      <span>{analyticsSummary?.mobilePercent ?? 0}%</span>
                    </div>
                  </div>
                  <div className="font-mono text-[10px] text-white/50 mt-1">
                    Desktop vs Mobile & Tablet
                  </div>
                </div>
              </div>

              {/* Filter Tabs, Search Bar, and View Switcher */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-2 rounded-2xl bg-white/[0.02] border border-white/5">
                {/* Filter Tabs */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 font-mono text-xs overflow-x-auto">
                  {[
                    { key: 'all', label: 'All Visitors', count: visitorLogs.length },
                    { key: 'contacted', label: 'Identified Leads', count: visitorLogs.filter((v) => v.hasContacted).length },
                    { key: 'desktop', label: 'Desktop', count: visitorLogs.filter((v) => v.deviceType === 'Desktop').length },
                    { key: 'mobile', label: 'Mobile', count: visitorLogs.filter((v) => v.deviceType === 'Mobile' || v.deviceType === 'Tablet').length },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setVisitorFilter(tab.key as any)}
                      className={`px-3 py-1.5 rounded-lg uppercase transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5 text-[11px] ${
                        visitorFilter === tab.key
                          ? 'bg-[#B600A8] text-white font-bold shadow-md'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className="text-[10px] opacity-75">({tab.count})</span>
                    </button>
                  ))}
                </div>

                {/* Search & View Switcher */}
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={visitorSearch}
                      onChange={(e) => setVisitorSearch(e.target.value)}
                      placeholder="Search name, device, OS..."
                      className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-[#B600A8]"
                    />
                    {visitorSearch && (
                      <button
                        onClick={() => setVisitorSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs cursor-pointer"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10 font-mono text-xs shrink-0">
                    <button
                      onClick={() => setAnalyticsViewMode('table')}
                      className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 text-xs transition-all cursor-pointer ${
                        analyticsViewMode === 'table'
                          ? 'bg-[#B600A8] text-white font-bold shadow-md'
                          : 'text-white/60 hover:text-white'
                      }`}
                      title="Table View (Columns list)"
                    >
                      <List className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Table</span>
                    </button>
                    <button
                      onClick={() => setAnalyticsViewMode('cards')}
                      className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 text-xs transition-all cursor-pointer ${
                        analyticsViewMode === 'cards'
                          ? 'bg-[#B600A8] text-white font-bold shadow-md'
                          : 'text-white/60 hover:text-white'
                      }`}
                      title="Cards View (Detailed spec cards)"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Cards</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Visitor Telemetry Content: Table View (Default) or Cards View */}
              {(() => {
                const searchLower = visitorSearch.toLowerCase().trim();
                const filtered = visitorLogs.filter((v) => {
                  // Filter by category
                  if (visitorFilter === 'contacted' && !v.hasContacted) return false;
                  if (visitorFilter === 'desktop' && v.deviceType !== 'Desktop') return false;
                  if (visitorFilter === 'mobile' && v.deviceType !== 'Mobile' && v.deviceType !== 'Tablet') return false;

                  // Filter by search query
                  if (searchLower) {
                    const matchName = v.name?.toLowerCase().includes(searchLower);
                    const matchDevice = v.deviceModel?.toLowerCase().includes(searchLower);
                    const matchOs = v.os?.toLowerCase().includes(searchLower);
                    const matchBrowser = v.browser?.toLowerCase().includes(searchLower);
                    const matchId = v.visitorId?.toLowerCase().includes(searchLower);
                    const matchCity = v.city?.toLowerCase().includes(searchLower);
                    const matchCountry = v.country?.toLowerCase().includes(searchLower);
                    const matchSource = v.referrer?.toLowerCase().includes(searchLower);
                    if (!matchName && !matchDevice && !matchOs && !matchBrowser && !matchId && !matchCity && !matchCountry && !matchSource) {
                      return false;
                    }
                  }
                  return true;
                });

                if (isAnalyticsLoading && visitorLogs.length === 0) {
                  return (
                    <div className="p-12 text-center rounded-3xl bg-[#111116] border border-white/10 space-y-3">
                      <div className="w-8 h-8 border-2 border-white/20 border-t-[#B600A8] rounded-full animate-spin mx-auto" />
                      <p className="font-mono text-xs text-white/50">Fetching visitor telemetry...</p>
                    </div>
                  );
                }

                if (filtered.length === 0) {
                  return (
                    <div className="p-12 text-center rounded-3xl bg-[#111116] border border-white/10 space-y-3">
                      <Eye className="w-10 h-10 text-white/20 mx-auto" />
                      <h4 className="font-sans font-bold text-white text-lg">No Visitor Records Found</h4>
                      <p className="font-mono text-xs text-white/40 max-w-sm mx-auto">
                        {visitorSearch
                          ? `No visitors matched your search query "${visitorSearch}".`
                          : visitorFilter !== 'all'
                          ? `No visitors found for filter "${visitorFilter}".`
                          : 'No visitors have browsed your portfolio yet. Live telemetry will populate here as people visit.'}
                      </p>
                    </div>
                  );
                }

                // TABLE VIEW (Requested columns format)
                if (analyticsViewMode === 'table') {
                  return (
                    <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#111116] shadow-2xl">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-white/[0.04] text-[11px] text-white/50 uppercase tracking-wider border-b border-white/10">
                          <tr>
                            <th className="py-4 px-5 font-bold">Visitor Name / Tag</th>
                            <th className="py-4 px-5 font-bold">Device &amp; OS</th>
                            <th className="py-4 px-5 font-bold">Browser</th>
                            <th className="py-4 px-5 font-bold">Location</th>
                            <th className="py-4 px-5 font-bold">Source</th>
                            <th className="py-4 px-5 font-bold">Visit Time</th>
                            <th className="py-4 px-5 font-bold">Time Spent</th>
                            <th className="py-4 px-5 font-bold text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filtered.map((visitor) => {
                            const visitorKey = visitor.id || visitor.visitorId;
                            const isIdentified = visitor.hasContacted || (!visitor.name.startsWith('Guest #') && visitor.name !== 'Anonymous' && visitor.name.length > 2);
                            const displayName = isIdentified
                              ? visitor.name
                              : (visitor.name.startsWith('Guest #') ? visitor.name : `Guest #${visitor.visitorId.slice(-4).toUpperCase()}`);

                            return (
                              <tr key={visitorKey} className="hover:bg-white/[0.02] transition-colors group">
                                {/* 1. Visitor Name / Tag */}
                                <td className="py-4 px-5 whitespace-nowrap">
                                  <div className="flex items-center gap-2">
                                    <span className="font-sans font-bold text-sm text-white">{displayName}</span>
                                    {isIdentified ? (
                                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold inline-flex items-center gap-1">
                                        <CheckCircle2 className="w-2.5 h-2.5" />
                                        (Contacted)
                                      </span>
                                    ) : (
                                      <span className="px-1.5 py-0.2 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px]">
                                        Visitor
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[10px] text-white/40 mt-0.5">
                                    {visitor.visitCount} {visitor.visitCount === 1 ? 'visit' : 'visits'} • ID: {visitor.visitorId}
                                  </div>
                                </td>

                                {/* 2. Device & OS */}
                                <td className="py-4 px-5 whitespace-nowrap">
                                  <div className="font-medium text-white flex items-center gap-1.5">
                                    <span>{formatDeviceAndOs(visitor)}</span>
                                  </div>
                                  <div className="text-[10px] text-white/40 mt-0.5">
                                    Res: {visitor.screenResolution || 'Standard Display'}
                                  </div>
                                </td>

                                {/* 3. Browser */}
                                <td className="py-4 px-5 whitespace-nowrap">
                                  <span className="text-amber-300 font-medium">
                                    {visitor.browser || 'Modern Browser'}
                                  </span>
                                </td>

                                {/* 4. Location */}
                                <td className="py-4 px-5 whitespace-nowrap">
                                  <div className="flex items-center gap-1.5 text-white/80">
                                    <Globe className="w-3.5 h-3.5 text-[#B600A8]" />
                                    <span>{formatLocation(visitor)}</span>
                                  </div>
                                </td>

                                {/* 5. Source */}
                                <td className="py-4 px-5 whitespace-nowrap">
                                  <span
                                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border ${
                                      visitor.referrer === 'LinkedIn'
                                        ? 'bg-blue-500/10 text-blue-300 border-blue-500/20'
                                        : visitor.referrer === 'GitHub'
                                        ? 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                                        : visitor.referrer === 'Google Search'
                                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                                        : 'bg-white/5 text-white/70 border-white/10'
                                    }`}
                                  >
                                    {visitor.referrer || 'Direct'}
                                  </span>
                                </td>

                                {/* 6. Visit Time */}
                                <td className="py-4 px-5 whitespace-nowrap">
                                  <div className="flex items-center gap-1.5 text-white/80">
                                    <Clock className="w-3.5 h-3.5 text-white/40" />
                                    <span className="font-medium text-white/90">
                                      {formatVisitorDateTime(visitor.lastVisitedAt)}
                                    </span>
                                  </div>
                                </td>

                                {/* 7. Time Spent */}
                                <td className="py-4 px-5 whitespace-nowrap">
                                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-medium">
                                    <Timer className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>{formatDuration(visitor.timeSpentSeconds)}</span>
                                  </div>
                                </td>

                                {/* 8. Action */}
                                <td className="py-4 px-5 text-right whitespace-nowrap">
                                  <button
                                    onClick={() => handleDeleteVisitor(visitorKey, displayName)}
                                    className="p-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all cursor-pointer opacity-80 group-hover:opacity-100"
                                    title="Delete visitor record"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                // CARDS VIEW (Detailed specs)
                return (
                  <div className="grid grid-cols-1 gap-4">
                    {filtered.map((visitor) => {
                      const visitorKey = visitor.id || visitor.visitorId;
                      const isIdentified = visitor.hasContacted || (!visitor.name.startsWith('Guest #') && visitor.name !== 'Anonymous' && visitor.name.length > 2);
                      const displayName = isIdentified
                        ? visitor.name
                        : (visitor.name.startsWith('Guest #') ? visitor.name : `Guest #${visitor.visitorId.slice(-4).toUpperCase()}`);

                      return (
                        <div
                          key={visitorKey}
                          className="p-5 sm:p-6 rounded-3xl bg-[#111116] border border-white/10 hover:border-white/20 transition-all space-y-4"
                        >
                          {/* Top Row: Visitor Identity, Badges, and Timestamp */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm ${
                                  isIdentified
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                    : 'bg-[#B600A8]/20 text-[#B600A8] border border-[#B600A8]/40'
                                }`}
                              >
                                {visitor.deviceType === 'Mobile' ? (
                                  <Smartphone className="w-5 h-5" />
                                ) : visitor.deviceType === 'Tablet' ? (
                                  <Tablet className="w-5 h-5" />
                                ) : (
                                  <Monitor className="w-5 h-5" />
                                )}
                              </div>

                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-sans font-bold text-sm sm:text-base text-white">
                                    {displayName}
                                  </span>

                                  {isIdentified ? (
                                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold flex items-center gap-1">
                                      <CheckCircle2 className="w-2.5 h-2.5" />
                                      Identified Lead
                                    </span>
                                  ) : (
                                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50 font-mono text-[10px]">
                                      Anonymous Visitor
                                    </span>
                                  )}

                                  <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-[10px]">
                                    {visitor.visitCount} {visitor.visitCount === 1 ? 'visit' : 'visits'}
                                  </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-white/40 mt-0.5">
                                  <span>ID: {visitor.visitorId}</span>
                                  {visitor.currentPath && (
                                    <>
                                      <span>•</span>
                                      <span className="text-white/60">Page: {visitor.currentPath}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="flex items-center gap-1.5 font-mono text-[11px] text-white/40">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{visitor.lastVisitedAt ? new Date(visitor.lastVisitedAt).toLocaleString() : 'Just now'}</span>
                              </div>

                              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-[11px] font-medium">
                                <Timer className="w-3 h-3 text-emerald-400" />
                                <span>{formatDuration(visitor.timeSpentSeconds)} spent</span>
                              </div>

                              <button
                                onClick={() => handleDeleteVisitor(visitorKey, visitor.name)}
                                className="p-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all cursor-pointer"
                                title="Delete visitor record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Device & System Specifications Grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {/* Device & Model */}
                            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col">
                              <span className="text-[10px] font-mono uppercase text-white/40 flex items-center gap-1">
                                <Smartphone className="w-3 h-3 text-[#B600A8]" />
                                Device Model
                              </span>
                              <span className="text-xs font-semibold text-white mt-1 truncate" title={visitor.deviceModel || visitor.deviceType}>
                                {visitor.deviceModel || visitor.deviceType || 'Desktop PC'}
                              </span>
                            </div>

                            {/* OS */}
                            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col">
                              <span className="text-[10px] font-mono uppercase text-white/40 flex items-center gap-1">
                                <Monitor className="w-3 h-3 text-cyan-400" />
                                Operating System
                              </span>
                              <span className="text-xs font-semibold text-cyan-300 mt-1 truncate" title={visitor.os}>
                                {visitor.os || 'Unknown OS'}
                              </span>
                            </div>

                            {/* Browser */}
                            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col">
                              <span className="text-[10px] font-mono uppercase text-white/40 flex items-center gap-1">
                                <Globe className="w-3 h-3 text-amber-400" />
                                Browser
                              </span>
                              <span className="text-xs font-semibold text-amber-300 mt-1 truncate" title={visitor.browser}>
                                {visitor.browser || 'Modern Browser'}
                              </span>
                            </div>

                            {/* Screen Resolution */}
                            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col">
                              <span className="text-[10px] font-mono uppercase text-white/40 flex items-center gap-1">
                                <Activity className="w-3 h-3 text-emerald-400" />
                                Resolution
                              </span>
                              <span className="text-xs font-semibold text-emerald-300 mt-1">
                                {visitor.screenResolution || 'Desktop Display'}
                              </span>
                            </div>

                            {/* Time Spent */}
                            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col col-span-2 sm:col-span-1">
                              <span className="text-[10px] font-mono uppercase text-white/40 flex items-center gap-1">
                                <Timer className="w-3 h-3 text-emerald-400" />
                                Time Spent
                              </span>
                              <span className="text-xs font-semibold text-emerald-300 mt-1">
                                {formatDuration(visitor.timeSpentSeconds)}
                              </span>
                            </div>
                          </div>

                          {/* Location, Timezone, and Traffic Origin */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-mono text-white/50 border-t border-white/5">
                            <div className="flex flex-wrap items-center gap-3">
                              {visitor.timezone && (
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-white/40" />
                                  <span>Timezone: {visitor.timezone}</span>
                                </span>
                              )}
                              {(visitor.city || visitor.country) && (
                                <span className="flex items-center gap-1">
                                  <Globe className="w-3 h-3 text-[#B600A8]" />
                                  <span>
                                    Location: {[visitor.city, visitor.country].filter(Boolean).join(', ')}
                                  </span>
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5 text-white/60">
                              <span className="text-white/40">Referrer:</span>
                              <span className="font-semibold text-white/80 truncate max-w-[200px]" title={visitor.referrerUrl || visitor.referrer}>
                                {visitor.referrer || 'Direct / Bookmark'}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          )}
        </main>
      </div>

      {/* ============================================================== */}
      {/* MODAL: ADD / EDIT PROJECT */}
      {/* ============================================================== */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#111116] border border-white/20 rounded-3xl p-6 sm:p-8 my-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="font-sans font-black uppercase text-xl text-white">
                {editingProjectId ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Number
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.number}
                    onChange={(e) => setProjectForm({ ...projectForm, number: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={projectForm.subtitle}
                  onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Domain / URL Display
                  </label>
                  <input
                    type="text"
                    value={projectForm.domain}
                    onChange={(e) => setProjectForm({ ...projectForm, domain: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white outline-none resize-y"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                  Tech Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="React.js, Node.js, Express, MongoDB, Tailwind"
                  value={projectForm.tags}
                  onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Live URL
                  </label>
                  <input
                    type="text"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white outline-none"
                  />
                </div>
              </div>

              {/* Project Background Image (Cover / Screenshot) */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase text-white/80 flex items-center gap-1.5 font-bold">
                    <ImageIcon className="w-3.5 h-3.5 text-[#B600A8]" />
                    <span>Project Background Image (Cover)</span>
                  </label>
                  <span className="text-[10px] font-mono text-white/40">
                    File Upload, URL, or Presets
                  </span>
                </div>

                {/* Input + Upload File Button */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="text"
                    placeholder="Image URL or Path (e.g. /my-project.png or https://...)"
                    value={projectForm.landingImg}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        landingImg: e.target.value,
                        fullImg: e.target.value,
                      })
                    }
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white outline-none focus:border-[#B600A8]"
                  />

                  {/* Upload Image From PC Button */}
                  <label className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white font-bold cursor-pointer transition-colors shrink-0">
                    <Upload className="w-3.5 h-3.5 text-[#B600A8]" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const result = reader.result as string;
                            setProjectForm((prev) => ({
                              ...prev,
                              landingImg: result,
                              fullImg: result,
                            }));
                            showToast('Background image uploaded successfully!');
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>

                {/* Presets */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span className="text-[10px] font-mono text-white/40 mr-1">Presets:</span>
                  {[
                    { label: 'Ambika Electric', path: '/ambika-landing.png' },
                    { label: 'Online Examination', path: '/online-exam-landing.png' },
                    { label: 'Agricold Connect', path: '/store-harvest-landing.png' },
                  ].map((preset) => (
                    <button
                      key={preset.path}
                      type="button"
                      onClick={() =>
                        setProjectForm((prev) => ({
                          ...prev,
                          landingImg: preset.path,
                          fullImg: preset.path,
                        }))
                      }
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                        projectForm.landingImg === preset.path
                          ? 'bg-[#B600A8] text-white font-bold'
                          : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Real-time Image Preview */}
                {projectForm.landingImg && (
                  <div className="relative mt-2 rounded-xl overflow-hidden border border-white/10 aspect-[16/7] bg-black/60 group">
                    <img
                      src={projectForm.landingImg}
                      alt="Project Background Preview"
                      className="w-full h-full object-cover object-top opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 border border-white/10 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>LIVE BG PREVIEW</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setProjectForm((prev) => ({
                          ...prev,
                          landingImg: '',
                          fullImg: '',
                        }))
                      }
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/40 text-xs font-mono transition-colors cursor-pointer"
                      title="Remove Background Image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Accent Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={projectForm.accentColor}
                      onChange={(e) => setProjectForm({ ...projectForm, accentColor: e.target.value })}
                      className="w-9 h-9 rounded-lg bg-transparent border-none cursor-pointer"
                    />
                    <input
                      type="text"
                      value={projectForm.accentColor}
                      onChange={(e) => setProjectForm({ ...projectForm, accentColor: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={projectForm.order}
                    onChange={(e) => setProjectForm({ ...projectForm, order: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-white/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#B600A8] hover:bg-[#99008c] text-xs font-mono font-bold text-white uppercase shadow-lg"
                >
                  {editingProjectId ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: EDIT SKILL INLINE */}
      {/* ============================================================== */}
      {editingSkillInfo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#111116] border border-white/20 rounded-2xl p-6 shadow-2xl space-y-4">
            <h4 className="font-sans font-bold text-base text-white">
              Rename Skill: {editingSkillInfo.oldSkillName}
            </h4>
            <input
              type="text"
              value={editingSkillInfo.newSkillName}
              onChange={(e) =>
                setEditingSkillInfo({ ...editingSkillInfo, newSkillName: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white outline-none focus:border-[#B600A8]"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingSkillInfo(null)}
                className="px-4 py-2 rounded-xl bg-white/5 text-xs font-mono text-white/60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEditedSkill}
                className="px-4 py-2 rounded-xl bg-[#B600A8] text-xs font-mono font-bold text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: ADD NEW SKILL CATEGORY */}
      {/* ============================================================== */}
      {isNewCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#111116] border border-white/20 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h4 className="font-sans font-bold text-base text-white">
                Add New Skill Category
              </h4>
              <button
                onClick={() => setIsNewCategoryModalOpen(false)}
                className="p-1 text-white/50 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                  Full Category Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mobile App Development"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                  Short Label (for Filter Buttons)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mobile"
                  value={newCategoryShortLabel}
                  onChange={(e) => setNewCategoryShortLabel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewCategoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-xs font-mono text-white/60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#B600A8] text-xs font-mono font-bold text-white"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
