import React, { useState } from 'react';
import { Download, X, FileText, Check, Copy, Printer } from 'lucide-react';
import { CVAnalysisResult } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: CVAnalysisResult | null;
  selectedCountry: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  analysis,
  selectedCountry
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen || !analysis) return null;

  const downloadFile = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportCVText = () => {
    const text = analysis.optimizedResume.formattedMarkdown || analysis.rawCvText;
    downloadFile(text, `CareerIQ_Improved_CV_${analysis.id}.md`, 'text/markdown');
  };

  const exportCareerReport = () => {
    const report = {
      title: analysis.title,
      timestamp: analysis.timestamp,
      overallScore: analysis.overallScore,
      subScores: analysis.subScores,
      careerRecommendations: analysis.careerRecommendations,
      education: analysis.educationAnalysis,
      experience: analysis.experienceAnalysis
    };
    downloadFile(JSON.stringify(report, null, 2), `CareerIQ_Report_${analysis.id}.json`, 'application/json');
  };

  const exportSkillsGapReport = () => {
    const rec = analysis.careerRecommendations[0];
    const text = `CAREERIQ SKILLS GAP REPORT
Target Role: ${rec?.roleTitle || 'Target Career'}
Overall Readiness Score: ${analysis.overallScore}/100

SUITABLE SKILLS POSSESSED:
${rec?.suitableSkills?.map(s => `- ${s}`).join('\n')}

CRITICAL MISSING SKILLS TO LEARN:
${rec?.missingSkills?.map(s => `- ${s}`).join('\n')}

RECOMMENDED CERTIFICATIONS:
${rec?.suggestedCertifications?.map(c => `- ${c}`).join('\n')}
`;
    downloadFile(text, `CareerIQ_Skills_Gap_${analysis.id}.txt`, 'text/plain');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Export Career & CV Reports</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <div className="p-6 space-y-4">
          <button
            onClick={exportCVText}
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-indigo-500 text-left transition-all flex items-center justify-between group"
          >
            <div>
              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">1. Export Improved CV (.md / .txt)</div>
              <div className="text-xs text-slate-500">Includes AI executive summary, active verbs, and formatted layout</div>
            </div>
            <Download className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={exportCareerReport}
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-indigo-500 text-left transition-all flex items-center justify-between group"
          >
            <div>
              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">2. Export Full Career Analysis Report (.json)</div>
              <div className="text-xs text-slate-500">Complete JSON report with scores, salary ranges, and competencies</div>
            </div>
            <Download className="w-4 h-4 text-violet-500 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={exportSkillsGapReport}
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-indigo-500 text-left transition-all flex items-center justify-between group"
          >
            <div>
              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">3. Export Skills Gap Summary (.txt)</div>
              <div className="text-xs text-slate-500">Missing skills, course recommendations, and readiness timeline</div>
            </div>
            <Download className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={handlePrint}
            className="w-full p-4 rounded-2xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/40 hover:bg-indigo-100 text-left transition-all flex items-center justify-between group"
          >
            <div>
              <div className="font-bold text-indigo-900 dark:text-indigo-200 text-sm">4. Print / Save as PDF Page</div>
              <div className="text-xs text-indigo-600 dark:text-indigo-400">Open browser print dialog for formatted PDF saving</div>
            </div>
            <Printer className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
