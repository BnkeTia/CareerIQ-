import React from 'react';
import { 
  Sparkles, 
  FileText, 
  Compass, 
  GraduationCap, 
  BarChart2, 
  CheckSquare, 
  Briefcase, 
  Layers, 
  FolderClock,
  Upload,
  X,
  ChevronRight,
  ShieldCheck,
  Target,
  PenTool
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hasAnalysis: boolean;
  onOpenUpload: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  hasAnalysis,
  onOpenUpload,
  isMobileOpen,
  setIsMobileOpen
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
    { id: 'cv-review', label: 'CV Review & Fixes', icon: FileText, disabled: !hasAnalysis },
    { id: 'cover-letter', label: 'AI Cover Letter', icon: PenTool, disabled: !hasAnalysis },
    { id: 'interview-prep', label: 'Interview Simulator', icon: Target, disabled: !hasAnalysis },
    { id: 'education', label: 'Education Analysis', icon: GraduationCap, disabled: !hasAnalysis },
    { id: 'experience', label: 'Work Competencies', icon: Briefcase, disabled: !hasAnalysis },
    { id: 'careers', label: 'Career Recommendations', icon: Compass, disabled: !hasAnalysis },
    { id: 'skills-gap', label: 'Skills Gap Analysis', icon: CheckSquare, disabled: !hasAnalysis },
    { id: 'optimizer', label: 'Resume Optimizer', icon: Sparkles, disabled: !hasAnalysis },
    { id: 'industries', label: 'Industry Explorer', icon: Layers },
    { id: 'learning', label: 'Learning & Upskilling', icon: GraduationCap },
    { id: 'history', label: 'Saved Analyses', icon: FolderClock },
  ];

  const handleNavClick = (id: string, disabled?: boolean) => {
    if (disabled) return;
    setActiveTab(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:static top-0 bottom-0 left-0 z-50
        w-64 bg-slate-900 text-slate-100 flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out border-r border-slate-800/80 shrink-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Brand Section */}
        <div>
          <div className="p-6 flex items-center justify-between border-b border-slate-800/60">
            <div 
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-xl italic text-white shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
                IQ
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white block">
                  CareerIQ
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                  AI Intelligence
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-280px)] no-scrollbar">
            <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
              Navigation Menu
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.disabled)}
                  disabled={item.disabled}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group cursor-pointer
                    ${isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                      : item.disabled
                      ? 'text-slate-600 cursor-not-allowed opacity-50'
                      : 'text-slate-400 hover:bg-slate-800/90 hover:text-slate-100'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.disabled ? 'text-slate-600' : 'text-slate-400 group-hover:text-indigo-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.disabled ? (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-500">Locked</span>
                  ) : isActive ? (
                    <ChevronRight className="w-3.5 h-3.5 text-indigo-200" />
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Banner Card */}
        <div className="p-4 border-t border-slate-800/80">
          <div className="bg-indigo-950/60 border border-indigo-800/50 p-4 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center gap-1.5 text-indigo-300 font-extrabold text-[10px] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Pro AI Engine v2.5
            </div>
            <p className="text-xs text-slate-300 mb-3 leading-relaxed font-medium">
              Real-time ATS parsing & localized salary intelligence active.
            </p>
            <button
              onClick={() => {
                onOpenUpload();
                setIsMobileOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2.5 rounded-xl shadow-md shadow-indigo-950/40 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload & Analyze CV</span>
            </button>
          </div>

          <div className="mt-3 text-[10px] text-slate-500 text-center font-medium italic">
            Idealized by BnkeTia
          </div>
        </div>
      </aside>
    </>
  );
};
