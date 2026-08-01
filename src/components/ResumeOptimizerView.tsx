import React, { useState } from 'react';
import { Sparkles, Copy, Check, Download, FileText, Wand2, Eye, Code } from 'lucide-react';
import { CVAnalysisResult } from '../types';

interface ResumeOptimizerViewProps {
  analysis: CVAnalysisResult;
  onOpenExport: () => void;
}

export const ResumeOptimizerView: React.FC<ResumeOptimizerViewProps> = ({
  analysis,
  onOpenExport
}) => {
  const opt = analysis.optimizedResume;
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'bullets' | 'markdown'>('preview');

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(opt.formattedMarkdown || analysis.rawCvText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* View Header */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">AI Resume Optimizer</h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Polished executive summary, power action verbs, quantifiable achievements, and ATS keyword injection.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Markdown!' : 'Copy Formatted Text'}</span>
          </button>

          <button
            onClick={onOpenExport}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/30 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Clean CV (PDF/TXT)</span>
          </button>
        </div>
      </div>

      {/* Improved Summary */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Wand2 className="w-4.5 h-4.5 text-indigo-500" />
          <span>AI-Optimized Executive Professional Summary</span>
        </h2>
        <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-serif italic leading-relaxed">
          "{opt.improvedSummary}"
        </div>
      </div>

      {/* Action Verbs & ATS Keywords Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* ATS Keywords */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Recommended ATS Target Keywords
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {opt.atsKeywords.map((kw, idx) => (
              <span key={idx} className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                + {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Action Verbs */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Power Action Verbs Applied
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {opt.actionVerbsUsed.map((verb, idx) => (
              <span key={idx} className="px-3 py-1 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                ⚡ {verb}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Bullet Points */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Enhanced Bullet Point Statements
        </h2>

        <div className="space-y-4">
          {opt.bulletPoints.map((bp, i) => (
            <div key={i} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
              <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Action Verb: {bp.verb}
              </div>
              <div className="text-xs text-slate-500 strike-through">
                Original: "{bp.original}"
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                Improved: "{bp.improved}"
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Markdown Preview Box */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Formatted Polished Markdown Document</h2>
          <button
            onClick={handleCopyMarkdown}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Full Markdown</span>
          </button>
        </div>

        <pre className="p-5 rounded-2xl bg-slate-900 text-slate-200 text-xs font-mono overflow-x-auto whitespace-pre-wrap max-h-96 leading-relaxed border border-slate-800">
          {opt.formattedMarkdown || analysis.rawCvText}
        </pre>
      </div>
    </div>
  );
};
