import React from 'react';
import { GraduationCap, Award, BookOpen, Lightbulb, CheckCircle2, Compass } from 'lucide-react';
import { CVAnalysisResult } from '../types';

interface EducationViewProps {
  analysis: CVAnalysisResult;
}

export const EducationView: React.FC<EducationViewProps> = ({ analysis }) => {
  const edu = analysis.educationAnalysis;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Education & Academic Analysis</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Mapping academic degrees, majors, certifications, and underlying knowledge areas to technical career tracks.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Academic Credentials Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <GraduationCap className="w-4.5 h-4.5 text-indigo-500" />
            <span>Degrees & Primary Majors</span>
          </h2>

          <div className="space-y-3">
            {edu.degrees.map((deg, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{deg}</div>
                {edu.majors[i] && (
                  <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">
                    Major: {edu.majors[i]}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Certifications & Licenses */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" /> Certifications & Licenses
            </h3>
            <div className="flex flex-wrap gap-2">
              {edu.certifications.concat(edu.licenses).length > 0 ? (
                edu.certifications.concat(edu.licenses).map((cert, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 text-xs font-medium rounded-lg bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                  >
                    {cert}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400 italic">No formal certifications detected. Consider adding vendor credentials.</span>
              )}
            </div>
          </div>
        </div>

        {/* Knowledge Areas Covered */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BookOpen className="w-4.5 h-4.5 text-emerald-500" />
            <span>Core Theoretical & Technical Knowledge</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {edu.knowledgeAreas.map((area, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 flex items-center gap-2 text-xs font-semibold text-emerald-900 dark:text-emerald-300"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{area}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transferable Skills & Naturally Supported Career Paths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Transferable Technical Skills */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Lightbulb className="w-4.5 h-4.5 text-amber-500" />
            <span>Transferable Technical Skills</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {edu.transferableSkills.map((skill, idx) => (
              <span 
                key={idx}
                className="px-3 py-1.5 text-xs font-bold rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Supported Career Tracks */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Compass className="w-4.5 h-4.5 text-cyan-500" />
            <span>Career Pathways Supported by Education</span>
          </h2>

          <div className="space-y-2">
            {edu.supportedCareerPaths.map((path, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                <span>{path}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Natural Match
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
