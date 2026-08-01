import React, { useState, useEffect } from 'react';
import { CheckSquare, AlertCircle, Clock, BookOpen, CheckCircle2, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { CVAnalysisResult, SkillsGapAnalysis } from '../types';

interface SkillsGapViewProps {
  analysis: CVAnalysisResult;
  targetRoleOverride?: string;
  onNavigateToLearning: (skill: string) => void;
}

export const SkillsGapView: React.FC<SkillsGapViewProps> = ({
  analysis,
  targetRoleOverride,
  onNavigateToLearning
}) => {
  const availableRoles = [
    analysis.careerRecommendations[0]?.roleTitle || 'Senior Software Engineer',
    'Data Engineer',
    'Process Optimization Engineer',
    'AI Operations Specialist',
    'QA & Regulatory Specialist',
    'Full-Stack Developer'
  ];

  const [selectedRole, setSelectedRole] = useState(targetRoleOverride || availableRoles[0]);
  const [gapData, setGapData] = useState<SkillsGapAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSkillsGap(selectedRole);
  }, [selectedRole]);

  const fetchSkillsGap = async (role: string) => {
    setIsLoading(true);
    try {
      const existing = analysis.experienceAnalysis.competencyProfile.technicalSkills
        .concat(analysis.experienceAnalysis.competencyProfile.softSkills)
        .concat(analysis.educationAnalysis.transferableSkills);

      const res = await fetch('/api/career/skills-gap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          existingSkills: existing,
          targetRole: role
        })
      });
      const data = await res.json();
      setGapData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* View Header */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <CheckSquare className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Skills Gap Analysis</h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Comparing your CV competency profile against specific target job requirements.
          </p>
        </div>

        {/* Role Selector */}
        <div className="w-full md:w-auto flex items-center gap-2 bg-slate-50 dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700">
          <Filter className="w-4 h-4 text-slate-400 ml-1" />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full md:w-64 bg-transparent text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
          >
            {availableRoles.map((r, i) => (
              <option key={i} value={r} className="dark:bg-slate-800 dark:text-slate-200">
                Target: {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="p-12 text-center space-y-3">
          <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500">Calculating skill delta and learning timeframes...</p>
        </div>
      ) : gapData ? (
        <>
          {/* Estimated Time to Become Competitive Banner */}
          <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-lg border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                Target Role Benchmark: {gapData.targetRole}
              </span>
              <h2 className="text-2xl font-black mt-1">Estimated Time to Become Competitive</h2>
              <p className="text-xs text-slate-300 mt-1">Based on critical skill acquisition velocity and course duration</p>
            </div>

            <div className="px-5 py-3 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 text-center">
              <div className="text-2xl font-black text-emerald-400 flex items-center justify-center gap-1.5">
                <Clock className="w-5 h-5 text-emerald-400" />
                <span>{gapData.timeToCompetitive}</span>
              </div>
              <div className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider mt-0.5">Target Up-Skilling Window</div>
            </div>
          </div>

          {/* Existing vs Missing Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Existing Skills */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Existing Verified Competencies ({gapData.existingSkills.length})</span>
              </h2>

              <div className="flex flex-wrap gap-2">
                {gapData.existingSkills.map((skill, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1.5 text-xs font-bold rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1"
                  >
                    <span>✓</span> {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Critical Gaps & Missing */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-500" />
                <span>Missing Skill Gaps ({gapData.missingSkills.length})</span>
              </h2>

              <div className="flex flex-wrap gap-2">
                {gapData.missingSkills.map((skill, idx) => {
                  const isCritical = gapData.criticalGaps.includes(skill);
                  return (
                    <span 
                      key={idx}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl border flex items-center gap-1 ${
                        isCritical
                          ? 'bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                          : 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                      }`}
                    >
                      {isCritical ? '⚠️' : '⚡'} {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Learning Priorities Matrix */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              <span>Prioritized Skill Acquisition & Course Recommendations</span>
            </h2>

            <div className="space-y-4">
              {gapData.learningPriority.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                        item.priority === 'High' 
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' 
                          : item.priority === 'Medium'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                      }`}>
                        {item.priority} Priority
                      </span>
                      <span className="text-xs text-slate-400">Est. Time: {item.estimatedTime}</span>
                    </div>

                    <div className="text-base font-black text-slate-900 dark:text-slate-100">
                      Skill: {item.skill}
                    </div>

                    <div className="text-xs text-slate-600 dark:text-slate-400">
                      Recommended Action: {item.courseRecommendation}
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateToLearning(item.skill)}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all cursor-pointer shrink-0"
                  >
                    <span>Find Free/Affordable Courses</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
