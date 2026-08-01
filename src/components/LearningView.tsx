import React, { useState } from 'react';
import { GraduationCap, ExternalLink, Search, CheckCircle2, DollarSign, BookOpen, Award } from 'lucide-react';
import { LEARNING_RESOURCES } from '../data/learningResources';
import { LearningRecommendation } from '../types';

interface LearningViewProps {
  filterSkill?: string;
}

export const LearningView: React.FC<LearningViewProps> = ({ filterSkill }) => {
  const [searchQuery, setSearchQuery] = useState(filterSkill || '');
  const [costFilter, setCostFilter] = useState<'All' | 'Free' | 'Affordable (< $100)' | 'Paid'>('All');

  const filtered = LEARNING_RESOURCES.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(q) ||
      item.targetSkill.toLowerCase().includes(q) ||
      item.provider.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q);

    const matchesCost = costFilter === 'All' || item.cost === costFilter;

    return matchesSearch && matchesCost;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* View Header */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <GraduationCap className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Learning & Upskilling Hub</h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Curated courses, certifications, and professional organizations with priority on free and affordable options.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search skill (e.g. Python, SQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            {(['All', 'Free', 'Affordable (< $100)'] as const).map((cost) => (
              <button
                key={cost}
                onClick={() => setCostFilter(cost)}
                className={`px-3 py-1.5 rounded-lg transition-all ${costFilter === cost ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs' : 'text-slate-500'}`}
              >
                {cost}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Learning Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((res) => (
          <div 
            key={res.id}
            className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                  res.cost === 'Free' 
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                    : res.cost === 'Affordable (< $100)'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                }`}>
                  {res.cost} • {res.type}
                </span>

                <span className="text-xs text-slate-400 font-medium">{res.provider}</span>
              </div>

              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                {res.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {res.description}
              </p>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1 text-xs">
                <div className="font-semibold text-slate-700 dark:text-slate-300">
                  Target Competencies: <span className="font-mono text-indigo-600 dark:text-indigo-400">{res.targetSkill}</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Duration: {res.duration}
                </div>
              </div>
            </div>

            <a
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-700 dark:text-slate-200 transition-all group"
            >
              <span>Access Learning Resource</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
