import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { CVReviewView } from './components/CVReviewView';
import { CoverLetterView } from './components/CoverLetterView';
import { InterviewPrepView } from './components/InterviewPrepView';
import { EducationView } from './components/EducationView';
import { ExperienceView } from './components/ExperienceView';
import { CareerEngineView } from './components/CareerEngineView';
import { SkillsGapView } from './components/SkillsGapView';
import { ResumeOptimizerView } from './components/ResumeOptimizerView';
import { IndustryExplorerView } from './components/IndustryExplorerView';
import { LearningView } from './components/LearningView';
import { SavedAnalysesView } from './components/SavedAnalysesView';
import { CVUploadModal } from './components/CVUploadModal';
import { ExportModal } from './components/ExportModal';
import { CVAnalysisResult, UserProfile } from './types';
import { PRESET_CVS } from './data/presetCVs';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [selectedCountry, setSelectedCountry] = useState<string>('US');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  
  const [analysis, setAnalysis] = useState<CVAnalysisResult | null>(null);
  const [savedAnalyses, setSavedAnalyses] = useState<CVAnalysisResult[]>([]);
  
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [targetRoleForGap, setTargetRoleForGap] = useState<string>('');
  const [learningFilterSkill, setLearningFilterSkill] = useState<string>('');

  const [user, setUser] = useState<UserProfile>({
    id: 'usr-1',
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    selectedCountry: 'US',
    theme: 'light'
  });

  // Sync dark class on <html> element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Load saved analyses & initial default preset
  useEffect(() => {
    try {
      const stored = localStorage.getItem('careeriq_saved_analyses');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedAnalyses(parsed);
          setAnalysis(parsed[0]);
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }

    // Auto-analyze initial preset on first visit for zero-friction demo experience!
    runInitialPreset();
  }, []);

  const runInitialPreset = async () => {
    setIsLoading(true);
    try {
      const preset = PRESET_CVS[0];
      const res = await fetch('/api/cv/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText: preset.text, jobTarget: preset.role })
      });
      const data: CVAnalysisResult = await res.json();
      setAnalysis(data);
      saveToHistory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToHistory = (newAnalysis: CVAnalysisResult) => {
    setSavedAnalyses((prev) => {
      const filtered = prev.filter(a => a.id !== newAnalysis.id);
      const updated = [newAnalysis, ...filtered];
      try {
        localStorage.setItem('careeriq_saved_analyses', JSON.stringify(updated.slice(0, 10)));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleAnalyzeNew = async (cvText: string, jobTarget: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/cv/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText, jobTarget })
      });
      const data: CVAnalysisResult = await res.json();
      setAnalysis(data);
      saveToHistory(data);
      setIsUploadOpen(false);
      setActiveTab('dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyImprovement = (improvedText: string) => {
    if (!analysis) return;
    const updated: CVAnalysisResult = {
      ...analysis,
      rawCvText: improvedText,
      overallScore: Math.min(100, analysis.overallScore + 4),
      subScores: {
        ...analysis.subScores,
        atsCompatibility: Math.min(100, analysis.subScores.atsCompatibility + 5),
        impactOfAchievements: Math.min(100, analysis.subScores.impactOfAchievements + 6)
      }
    };
    setAnalysis(updated);
    saveToHistory(updated);
  };

  const handleDeleteSaved = (id: string) => {
    setSavedAnalyses(prev => {
      const updated = prev.filter(a => a.id !== id);
      try {
        localStorage.setItem('careeriq_saved_analyses', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleSelectTargetRoleForGap = (roleTitle: string) => {
    setTargetRoleForGap(roleTitle);
    setActiveTab('skills-gap');
  };

  const handleNavigateToLearning = (skill: string) => {
    setLearningFilterSkill(skill);
    setActiveTab('learning');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Sleek Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasAnalysis={!!analysis}
        onOpenUpload={() => setIsUploadOpen(true)}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Bar */}
        <Header
          activeTab={activeTab}
          theme={theme}
          setTheme={setTheme}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          user={user}
          onOpenUpload={() => setIsUploadOpen(true)}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        {/* Scrollable View Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {activeTab === 'dashboard' && (
            <DashboardView
              analysis={analysis}
              onOpenUpload={() => setIsUploadOpen(true)}
              setActiveTab={setActiveTab}
              selectedCountry={selectedCountry}
              savedAnalyses={savedAnalyses}
              onLoadSaved={(saved) => {
                setAnalysis(saved);
                setActiveTab('dashboard');
              }}
            />
          )}

          {activeTab === 'cv-review' && analysis && (
            <CVReviewView
              analysis={analysis}
              onApplyImprovement={handleApplyImprovement}
              onReAnalyze={() => setIsUploadOpen(true)}
            />
          )}

          {activeTab === 'cover-letter' && analysis && (
            <CoverLetterView analysis={analysis} />
          )}

          {activeTab === 'interview-prep' && analysis && (
            <InterviewPrepView analysis={analysis} />
          )}

          {activeTab === 'education' && analysis && (
            <EducationView analysis={analysis} />
          )}

          {activeTab === 'experience' && analysis && (
            <ExperienceView analysis={analysis} />
          )}

          {activeTab === 'careers' && analysis && (
            <CareerEngineView
              analysis={analysis}
              selectedCountry={selectedCountry}
              onSelectTargetRoleForGap={handleSelectTargetRoleForGap}
            />
          )}

          {activeTab === 'skills-gap' && analysis && (
            <SkillsGapView
              analysis={analysis}
              targetRoleOverride={targetRoleForGap}
              onNavigateToLearning={handleNavigateToLearning}
            />
          )}

          {activeTab === 'optimizer' && analysis && (
            <ResumeOptimizerView
              analysis={analysis}
              onOpenExport={() => setIsExportOpen(true)}
            />
          )}

          {activeTab === 'industries' && (
            <IndustryExplorerView
              onSelectRoleForGap={handleSelectTargetRoleForGap}
            />
          )}

          {activeTab === 'learning' && (
            <LearningView filterSkill={learningFilterSkill} />
          )}

          {activeTab === 'history' && (
            <SavedAnalysesView
              savedAnalyses={savedAnalyses}
              onLoadSaved={(saved) => {
                setAnalysis(saved);
                setActiveTab('dashboard');
              }}
              onDeleteSaved={handleDeleteSaved}
              onOpenUpload={() => setIsUploadOpen(true)}
            />
          )}

          {/* Sleek Footer */}
          <footer className="mt-8 border-t border-slate-200/80 dark:border-slate-800/80 pt-6 pb-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
                <span>CareerIQ AI Intelligence Platform</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  v2.5
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                <span>Powered by Google Gemini AI</span>
                <span>•</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">Idealized by BnkeTia</span>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Modals */}
      <CVUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAnalyze={handleAnalyzeNew}
        isLoading={isLoading}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        analysis={analysis}
        selectedCountry={selectedCountry}
      />
    </div>
  );
}

