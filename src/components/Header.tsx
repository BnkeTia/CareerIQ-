import React from 'react';
import { 
  Sun, 
  Moon, 
  Globe, 
  Menu,
  Upload,
  User,
  Activity
} from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  activeTab: string;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  user: UserProfile;
  onOpenUpload: () => void;
  onToggleMobileSidebar: () => void;
}

export const COUNTRIES = [
  { code: 'US', label: 'United States ($)', flag: '🇺🇸' },
  { code: 'UK', label: 'United Kingdom (£)', flag: '🇬🇧' },
  { code: 'EU', label: 'European Union (€)', flag: '🇪🇺' },
  { code: 'Ghana', label: 'Ghana (GH₵)', flag: '🇬🇭' },
  { code: 'Nigeria', label: 'Nigeria (₦)', flag: '🇳🇬' },
  { code: 'Canada', label: 'Canada (CA$)', flag: '🇨🇦' },
  { code: 'Australia', label: 'Australia (A$)', flag: '🇦🇺' },
  { code: 'Asia', label: 'Asia-Pacific ($)', flag: '🌏' },
  { code: 'Global', label: 'Global Average ($)', flag: '🌐' }
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  theme,
  setTheme,
  selectedCountry,
  setSelectedCountry,
  user,
  onOpenUpload,
  onToggleMobileSidebar
}) => {
  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard': return 'Dashboard Overview';
      case 'cv-review': return 'AI CV Analysis & Scoring';
      case 'cover-letter': return 'AI Cover Letter Strategist';
      case 'interview-prep': return 'AI Interview Simulator';
      case 'education': return 'Education & Credentials';
      case 'experience': return 'Experience & Competencies';
      case 'careers': return 'Career Matching Engine';
      case 'skills-gap': return 'Skills Gap & Action Plan';
      case 'optimizer': return 'Resume AI Optimizer';
      case 'industries': return 'Industry Explorer';
      case 'learning': return 'Learning & Course Hub';
      case 'history': return 'Saved CV Analyses';
      default: return 'CareerIQ Engine';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between transition-colors">
      {/* Left: Mobile Toggle & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {getTabTitle(activeTab)}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
            Welcome back, <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{user.name}</span>
          </p>
        </div>
      </div>

      {/* Right: Actions & Tools */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* System Status Pill */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-full border border-slate-200 dark:border-slate-700/60 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>System Status: <span className="text-emerald-600 dark:text-emerald-400 font-bold">Online</span></span>
        </div>

        {/* Upload CV Action */}
        <button
          onClick={onOpenUpload}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Upload CV</span>
        </button>

        {/* Country Selector */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800/90 rounded-xl px-2.5 py-1.5 text-xs border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
          <Globe className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-transparent font-semibold focus:outline-none cursor-pointer text-slate-800 dark:text-slate-200"
            title="Select Salary Benchmark Region"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code} className="dark:bg-slate-800 dark:text-slate-200 font-medium">
                {c.flag} {c.code}
              </option>
            ))}
          </select>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200/80 dark:border-slate-800"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>

        {/* Avatar Ring */}
        <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 ring-2 ring-indigo-500/30 flex items-center justify-center text-slate-800 dark:text-slate-100 font-bold text-xs shrink-0 shadow-sm">
          {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
        </div>
      </div>
    </header>
  );
};
