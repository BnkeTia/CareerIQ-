import React, { useState } from 'react';
import { 
  FileText, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Copy, 
  Check, 
  Wand2,
  RefreshCw
} from 'lucide-react';
import { CVAnalysisResult, Improvement } from '../types';
import { ScoreGauge } from './ScoreGauge';

interface CVReviewViewProps {
  analysis: CVAnalysisResult;
  onApplyImprovement: (improvedText: string) => void;
  onReAnalyze: () => void;
}

export const CVReviewView: React.FC<CVReviewViewProps> = ({
  analysis,
  onApplyImprovement,
  onReAnalyze
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [appliedImprovements, setAppliedImprovements] = useState<Record<string, boolean>>({});
  const [isApplying, setIsApplying] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleApplySingle = async (imp: Improvement) => {
    setIsApplying(true);
    try {
      // Send request to server API or apply direct replacement
      const res = await fetch('/api/cv/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cvText: analysis.rawCvText,
          targetDirective: imp.category
        })
      });
      const data = await res.json();
      if (data.improvedCvText) {
        onApplyImprovement(data.improvedCvText);
        setAppliedImprovements(prev => ({ ...prev, [imp.id]: true }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsApplying(false);
    }
  };

  const handleApplyAll = async () => {
    setIsApplying(true);
    try {
      let current = analysis.rawCvText;
      analysis.improvements.forEach(imp => {
        current = current.replace(imp.original, imp.suggested);
      });
      onApplyImprovement(current);
      const all: Record<string, boolean> = {};
      analysis.improvements.forEach(i => all[i.id] = true);
      setAppliedImprovements(all);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <FileText className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">AI CV Evaluation & Review</h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Detailed 8-metric breakdown, vulnerability audit, and line-by-line AI enhancement suggestions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onReAnalyze}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Re-Analyze</span>
          </button>

          <button
            onClick={handleApplyAll}
            disabled={isApplying}
            className="flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/30 transition-all cursor-pointer"
          >
            <Wand2 className="w-4 h-4" />
            <span>{isApplying ? 'Applying...' : 'Apply All AI Improvements'}</span>
          </button>
        </div>
      </div>

      {/* Sub-Scores Matrix */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-6">
          Score Card Breakdown (Out of 100)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <ScoreGauge score={analysis.subScores.atsCompatibility} label="ATS Compatibility" sublabel="Parsability & font structures" size="sm" />
          <ScoreGauge score={analysis.subScores.formatting} label="Formatting" sublabel="Visual hierarchy & layout" size="sm" />
          <ScoreGauge score={analysis.subScores.professionalism} label="Professionalism" sublabel="Tone & layout consistency" size="sm" />
          <ScoreGauge score={analysis.subScores.grammar} label="Grammar & Spelling" sublabel="Punctuation & active voice" size="sm" />
          <ScoreGauge score={analysis.subScores.impactOfAchievements} label="Impact of KPIs" sublabel="Quantifiable metrics & numbers" size="sm" />
          <ScoreGauge score={analysis.subScores.skillsPresentation} label="Skills Layout" sublabel="Grouping & technical keywords" size="sm" />
          <ScoreGauge score={analysis.subScores.keywordOptimization} label="Keyword Density" sublabel="Target industry acronyms" size="sm" />
          <ScoreGauge score={analysis.subScores.readability} label="Readability" sublabel="Bullet length & scannability" size="sm" />
        </div>
      </div>

      {/* Weaknesses & Critical Vulnerability Audit */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Identified CV Weaknesses & Bottlenecks</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Why these areas lower your interview callback rate</p>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          {analysis.weaknesses.map((weakness, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  {idx + 1}. {weakness.area}
                </span>
                <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                  weakness.impact === 'High' 
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' 
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                }`}>
                  {weakness.impact} Impact Vulnerability
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {weakness.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Concrete Improvements */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Concrete Line-by-Line AI Revisions</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Review suggested revisions and apply them directly to your CV</p>
          </div>
        </div>

        <div className="space-y-6">
          {analysis.improvements.map((imp) => {
            const isApplied = appliedImprovements[imp.id];
            return (
              <div 
                key={imp.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isApplied 
                    ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20' 
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 uppercase tracking-wider">
                    {imp.category} Optimization
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(imp.suggested, imp.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs flex items-center gap-1"
                      title="Copy suggested text"
                    >
                      {copiedId === imp.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => handleApplySingle(imp)}
                      disabled={isApplied || isApplying}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                        isApplied 
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 cursor-default' 
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs cursor-pointer'
                      }`}
                    >
                      {isApplied ? 'Applied ✓' : 'Apply Fix'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Original */}
                  <div className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60">
                    <div className="text-[10px] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider mb-1">
                      Original Text
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 font-mono">
                      "{imp.original}"
                    </div>
                  </div>

                  {/* Suggested */}
                  <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60">
                    <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-500" /> AI Enhanced Text
                    </div>
                    <div className="text-slate-900 dark:text-slate-100 font-mono font-medium">
                      "{imp.suggested}"
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span><strong>Reasoning:</strong> {imp.reason}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
