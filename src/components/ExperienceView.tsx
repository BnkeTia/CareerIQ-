import React from 'react';
import { Briefcase, Award, Users, Code, Wrench, ShieldCheck, TrendingUp, Layers } from 'lucide-react';
import { CVAnalysisResult } from '../types';

interface ExperienceViewProps {
  analysis: CVAnalysisResult;
}

export const ExperienceView: React.FC<ExperienceViewProps> = ({ analysis }) => {
  const exp = analysis.experienceAnalysis;
  const comp = exp.competencyProfile;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Work Experience & Competency Profile</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Deep-dive skill breakdown extracted across past roles, leadership track record, and quantifiable achievements.
            </p>
          </div>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-right">
          <div className="text-lg font-black text-indigo-600 dark:text-indigo-400">{exp.totalYears} Years</div>
          <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">Track Record</div>
        </div>
      </div>

      {/* Competency Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Technical Skills & Stack */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Code className="w-4.5 h-4.5 text-indigo-500" />
            <span>Technical Skills & Frameworks</span>
          </h2>

          <div className="flex flex-wrap gap-2">
            {comp.technicalSkills.map((tech, i) => (
              <span key={i} className="px-3 py-1 text-xs font-bold rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Leadership & Management */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Users className="w-4.5 h-4.5 text-violet-500" />
            <span>Leadership & Mentorship Competencies</span>
          </h2>

          <div className="flex flex-wrap gap-2">
            {comp.leadership.map((item, i) => (
              <span key={i} className="px-3 py-1 text-xs font-bold rounded-xl bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Industry Domain Knowledge */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Layers className="w-4.5 h-4.5 text-cyan-500" />
            <span>Industry Domain Knowledge</span>
          </h2>

          <div className="flex flex-wrap gap-2">
            {comp.industryKnowledge.map((ind, i) => (
              <span key={i} className="px-3 py-1 text-xs font-bold rounded-xl bg-cyan-50 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                {ind}
              </span>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
            <span>Soft Skills & Professional Qualities</span>
          </h2>

          <div className="flex flex-wrap gap-2">
            {comp.softSkills.map((soft, i) => (
              <span key={i} className="px-3 py-1 text-xs font-bold rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {soft}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Quantifiable Achievements Section */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
          <span>Extracted Quantifiable Achievements & Business Impact</span>
        </h2>

        <div className="space-y-3">
          {comp.quantifiableAchievements.map((ach, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center gap-3"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-extrabold shrink-0">
                #{idx + 1}
              </div>
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                {ach}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
