import React, { useState } from 'react';
import { Compass, TrendingUp, CheckCircle2, XCircle, Award, FolderKanban, DollarSign, Globe, ArrowRight, Sparkles } from 'lucide-react';
import { CVAnalysisResult, CareerRecommendation } from '../types';

interface CareerEngineViewProps {
  analysis: CVAnalysisResult;
  selectedCountry: string;
  onSelectTargetRoleForGap: (roleTitle: string) => void;
}

export const CareerEngineView: React.FC<CareerEngineViewProps> = ({
  analysis,
  selectedCountry,
  onSelectTargetRoleForGap
}) => {
  const recommendations = analysis.careerRecommendations;
  const [filter, setFilter] = useState<'all' | 'best_fit' | 'alternative' | 'emerging'>('all');

  const filteredRecs = filter === 'all' 
    ? recommendations 
    : recommendations.filter(r => r.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* View Header */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400">
              <Compass className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">AI Career Recommendation Engine</h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Matching candidate experience against best-fit roles, alternative paths, and emerging high-growth industries.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${filter === 'all' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs' : 'text-slate-500'}`}
          >
            All Roles ({recommendations.length})
          </button>
          <button
            onClick={() => setFilter('best_fit')}
            className={`px-3 py-1.5 rounded-lg transition-all ${filter === 'best_fit' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs' : 'text-slate-500'}`}
          >
            Best Fit
          </button>
          <button
            onClick={() => setFilter('alternative')}
            className={`px-3 py-1.5 rounded-lg transition-all ${filter === 'alternative' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs' : 'text-slate-500'}`}
          >
            Alternative
          </button>
          <button
            onClick={() => setFilter('emerging')}
            className={`px-3 py-1.5 rounded-lg transition-all ${filter === 'emerging' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs' : 'text-slate-500'}`}
          >
            Emerging
          </button>
        </div>
      </div>

      {/* Recommendations Cards List */}
      <div className="space-y-6">
        {filteredRecs.map((rec, idx) => {
          const salaryMap = rec.salaryRangeByCountry || {};
          const salaryObj = salaryMap[selectedCountry] 
            || (selectedCountry === 'Ghana' ? (salaryMap['GH'] || { currency: 'GH₵', min: 120000, max: 280000, median: 190000 }) : null)
            || (selectedCountry === 'Nigeria' ? (salaryMap['NG'] || { currency: '₦', min: 12000000, max: 28000000, median: 18000000 }) : null)
            || salaryMap['US'] 
            || { currency: '$', min: 75000, max: 135000, median: 105000 };

          return (
            <div 
              key={rec.id ? `${rec.id}-${idx}` : `rec-${idx}`}
              className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                      rec.category === 'best_fit' 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                        : rec.category === 'emerging'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                    }`}>
                      {rec.category.replace('_', ' ')}
                    </span>
                    {rec.requiresTraining && (
                      <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                        Requires Additional Training
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
                    {rec.roleTitle}
                  </h2>
                </div>

                {/* Score badge & Action button */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{rec.matchScore}%</div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Match Compatibility</div>
                  </div>

                  <button
                    onClick={() => onSelectTargetRoleForGap(rec.roleTitle)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/30 transition-all"
                  >
                    <span>Run Skills Gap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Reasoning */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {rec.reasoning}
              </p>

              {/* Salary & Outlook Metrics Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="space-y-0.5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" /> Salary Range ({selectedCountry})
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                    {salaryObj.currency}{salaryObj.min.toLocaleString()} – {salaryObj.currency}{salaryObj.max.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-500">Median: {salaryObj.currency}{salaryObj.median.toLocaleString()}/yr</div>
                </div>

                <div className="space-y-0.5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Job Growth Outlook
                  </div>
                  <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {rec.growthOutlook}
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Top Hiring Industries</div>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                    {rec.topIndustries.join(', ')}
                  </div>
                </div>
              </div>

              {/* Suitable vs Missing Skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Suitable */}
                <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-2">
                  <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Suitable Skills Possessed
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {rec.suitableSkills.map((s, idx) => (
                      <span key={idx} className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing */}
                <div className="p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-2">
                  <div className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-500" /> Missing Skills to Develop
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {rec.missingSkills.map((s, idx) => (
                      <span key={idx} className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Certifications & Suggested Projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500" /> Recommended Certifications
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                    {rec.suggestedCertifications.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <FolderKanban className="w-4 h-4 text-indigo-500" /> Portfolio Projects to Build
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                    {rec.suggestedProjects.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
