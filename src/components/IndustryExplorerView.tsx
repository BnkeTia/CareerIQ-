import React, { useState } from 'react';
import { Layers, Search, TrendingUp, CheckCircle2, DollarSign, BookOpen, X, ChevronRight, Sparkles } from 'lucide-react';
import { INDUSTRIES_DATA } from '../data/industries';
import { IndustryDetail } from '../types';

interface IndustryExplorerViewProps {
  onSelectRoleForGap?: (role: string) => void;
}

export const IndustryExplorerView: React.FC<IndustryExplorerViewProps> = ({ onSelectRoleForGap }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryDetail | null>(null);

  const filteredIndustries = INDUSTRIES_DATA.filter((ind) => {
    const q = searchQuery.toLowerCase();
    return ind.name.toLowerCase().includes(q) ||
      ind.description.toLowerCase().includes(q) ||
      ind.typicalRoles.some(r => r.toLowerCase().includes(q)) ||
      ind.requiredSkills.some(s => s.toLowerCase().includes(q));
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400">
              <Layers className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Industry Explorer</h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Explore 16 major economic sectors, typical roles, required technical skills, salary benchmarks, and entry requirements.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search roles, skills, industries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Grid of 16 Industries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIndustries.map((ind) => (
          <div 
            key={ind.id}
            onClick={() => setSelectedIndustry(ind)}
            className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all shadow-xs cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300 uppercase tracking-wider">
                  {ind.chanceOfSuccess} Chance
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {ind.name}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {ind.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Mid Salary:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{ind.salaryRanges.mid}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Outlook:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 truncate max-w-[150px]">{ind.growthOutlook}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Industry Detail Modal */}
      {selectedIndustry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  Industry Overview
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{selectedIndustry.name}</h2>
              </div>
              <button
                onClick={() => setSelectedIndustry(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedIndustry.description}
              </p>

              {/* Salary Tiers */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 text-xs">
                  <DollarSign className="w-4 h-4 text-emerald-500" /> Salary Ranges (USD Benchmark)
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Junior / Entry</div>
                    <div className="font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{selectedIndustry.salaryRanges.junior}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Mid-Level</div>
                    <div className="font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{selectedIndustry.salaryRanges.mid}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Senior / Lead</div>
                    <div className="font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{selectedIndustry.salaryRanges.senior}</div>
                  </div>
                </div>
              </div>

              {/* Typical Roles */}
              <div className="space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200">Typical Job Roles</div>
                <div className="flex flex-wrap gap-2">
                  {selectedIndustry.typicalRoles.map((role, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 font-bold rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Required Skills */}
              <div className="space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200">Required Skills & Tools</div>
                <div className="flex flex-wrap gap-2">
                  {selectedIndustry.requiredSkills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 font-semibold rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Growth Outlook & Entry Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="font-bold text-slate-800 dark:text-slate-200">Growth Outlook</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-medium">{selectedIndustry.growthOutlook}</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="font-bold text-slate-800 dark:text-slate-200">Entry Requirements</div>
                  <div className="text-slate-600 dark:text-slate-400">{selectedIndustry.entryRequirements}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
