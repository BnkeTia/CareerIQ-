import React from 'react';
import { 
  Sparkles, 
  Compass, 
  CheckSquare, 
  FileText, 
  ArrowRight, 
  Briefcase, 
  GraduationCap, 
  Layers, 
  TrendingUp,
  Download,
  Upload,
  Clock,
  ChevronRight,
  Target,
  PenTool
} from 'lucide-react';
import { CVAnalysisResult, UserProfile } from '../types';
import { ScoreGauge } from './ScoreGauge';

interface DashboardViewProps {
  analysis: CVAnalysisResult | null;
  onOpenUpload: () => void;
  setActiveTab: (tab: string) => void;
  selectedCountry: string;
  savedAnalyses: CVAnalysisResult[];
  onLoadSaved: (saved: CVAnalysisResult) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  analysis,
  onOpenUpload,
  setActiveTab,
  selectedCountry,
  savedAnalyses,
  onLoadSaved
}) => {
  if (!analysis) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Hero Card */}
        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-slate-800">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> AI Career & Resume Intelligence Platform
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Unlock Your True Career Potential with AI Analysis
            </h1>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Upload your CV in PDF, DOCX, or text format. CareerIQ scores ATS compatibility, identifies structural weaknesses, maps your education & experience competencies, and recommends high-growth target careers with country-specific salary ranges.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                id="hero-upload-cv-btn"
                onClick={onOpenUpload}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <Upload className="w-5 h-5" />
                <span>Upload & Analyze CV Now</span>
              </button>

              <button
                onClick={() => setActiveTab('industries')}
                className="flex items-center gap-2 px-5 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm rounded-xl transition-all"
              >
                <Layers className="w-4.5 h-4.5 text-cyan-400" />
                <span>Explore 16+ Industries</span>
              </button>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">1. 100-Point AI CV Review</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Rigorous scoring across ATS compatibility, formatting, impact metrics, action verbs, and keyword optimization with 1-click AI enhancements.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">2. Career Recommendation</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Discover best-fit roles, emerging careers, and high-probability industry shifts paired with localized salary data for 7 regions.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <CheckSquare className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">3. Skills Gap & Learning Hub</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Map existing vs missing critical skills against target roles with prioritized free and affordable learning recommendations.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate readiness score
  const atsScore = analysis.subScores.atsCompatibility;
  const careerReadiness = Math.round((analysis.overallScore * 0.5) + (atsScore * 0.5));
  const topRecommendation = analysis.careerRecommendations[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Top Banner / Hero Summary */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Active CV Analysis Profile
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {analysis.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Analyzed {new Date(analysis.timestamp).toLocaleDateString()} • {analysis.experienceAnalysis.totalYears} Years Experience
          </p>
        </div>

        <div className="flex items-center gap-6 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80">
          <ScoreGauge score={analysis.overallScore} label="Overall CV Score" size="lg" />
          <div className="h-12 w-px bg-slate-200 dark:bg-slate-700" />
          <ScoreGauge score={atsScore} label="ATS Score" size="lg" />
          <div className="h-12 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />
          <div className="hidden sm:block">
            <ScoreGauge score={careerReadiness} label="Career Readiness" size="lg" />
          </div>
        </div>
      </div>

      {/* Primary 6 Card Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={() => setActiveTab('cv-review')}
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-left hover:border-indigo-500 dark:hover:border-indigo-500 transition-all shadow-xs group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sub-Scores & Diffs</div>
          <div className="text-base font-extrabold text-slate-900 dark:text-slate-100 mt-1">CV Review & Fixes</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {analysis.improvements.length} AI suggestions available
          </div>
        </button>

        <button
          onClick={() => setActiveTab('cover-letter')}
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-left hover:border-indigo-500 dark:hover:border-indigo-500 transition-all shadow-xs group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <PenTool className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tailored Document</div>
          <div className="text-base font-extrabold text-slate-900 dark:text-slate-100 mt-1">AI Cover Letter</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Customized tone & target role hooks
          </div>
        </button>

        <button
          onClick={() => setActiveTab('interview-prep')}
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-left hover:border-indigo-500 dark:hover:border-indigo-500 transition-all shadow-xs group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Practice & Feedback</div>
          <div className="text-base font-extrabold text-slate-900 dark:text-slate-100 mt-1">Interview Simulator</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            STAR evaluation & role prep
          </div>
        </button>

        <button
          onClick={() => setActiveTab('careers')}
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-left hover:border-indigo-500 dark:hover:border-indigo-500 transition-all shadow-xs group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Role Matching</div>
          <div className="text-base font-extrabold text-slate-900 dark:text-slate-100 mt-1">Career Pathways</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Top match: {topRecommendation?.roleTitle || 'Data Engineer'}
          </div>
        </button>

        <button
          onClick={() => setActiveTab('skills-gap')}
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-left hover:border-indigo-500 dark:hover:border-indigo-500 transition-all shadow-xs group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckSquare className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gap Analysis</div>
          <div className="text-base font-extrabold text-slate-900 dark:text-slate-100 mt-1">Skills & Training</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {analysis.careerRecommendations[0]?.missingSkills?.length || 2} skills to master
          </div>
        </button>

        <button
          onClick={() => setActiveTab('optimizer')}
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-left hover:border-indigo-500 dark:hover:border-indigo-500 transition-all shadow-xs group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Export Polished CV</div>
          <div className="text-base font-extrabold text-slate-900 dark:text-slate-100 mt-1">Resume Optimizer</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Action verbs & ATS summary
          </div>
        </button>
      </div>

      {/* Sub-Scores Breakdown Grid */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">
          8 Core Sub-Metric Evaluation Breakdown
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <ScoreGauge score={analysis.subScores.atsCompatibility} label="ATS Parsing" size="sm" />
          <ScoreGauge score={analysis.subScores.formatting} label="Formatting" size="sm" />
          <ScoreGauge score={analysis.subScores.professionalism} label="Professionalism" size="sm" />
          <ScoreGauge score={analysis.subScores.grammar} label="Grammar & Tone" size="sm" />
          <ScoreGauge score={analysis.subScores.impactOfAchievements} label="Impact of KPIs" size="sm" />
          <ScoreGauge score={analysis.subScores.skillsPresentation} label="Skills Layout" size="sm" />
          <ScoreGauge score={analysis.subScores.keywordOptimization} label="ATS Keywords" size="sm" />
          <ScoreGauge score={analysis.subScores.readability} label="Readability" size="sm" />
        </div>
      </div>

      {/* Top Recommendations Preview */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Top Recommended Careers</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Based on your competencies and market demand ({selectedCountry})</p>
          </div>
          <button
            onClick={() => setActiveTab('careers')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>View All Recommendations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analysis.careerRecommendations.map((rec, idx) => {
            const salaryMap = rec.salaryRangeByCountry || {};
            const salaryObj = salaryMap[selectedCountry] 
              || (selectedCountry === 'Ghana' ? (salaryMap['GH'] || { currency: 'GH₵', min: 120000, max: 280000, median: 190000 }) : null)
              || (selectedCountry === 'Nigeria' ? (salaryMap['NG'] || { currency: '₦', min: 12000000, max: 28000000, median: 18000000 }) : null)
              || salaryMap['US'] 
              || { currency: '$', min: 75000, max: 135000, median: 105000 };
            return (
              <div 
                key={rec.id ? `${rec.id}-${idx}` : `rec-${idx}`}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {rec.category.replace('_', ' ')}
                  </span>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">{rec.matchScore}%</span>
                    <span className="text-[10px] text-slate-400 block">Match</span>
                  </div>
                </div>

                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">{rec.roleTitle}</h3>
                
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {rec.reasoning}
                </p>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Salary ({selectedCountry}):</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {salaryObj.currency}{salaryObj.median.toLocaleString()}/yr
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Saved Analyses & History */}
      {savedAnalyses.length > 0 && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-500" />
            <span>Previous Analyses & Saved Profiles</span>
          </h2>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {savedAnalyses.map((saved, idx) => (
              <div key={saved.id ? `${saved.id}-${idx}` : `saved-${idx}`} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{saved.title}</div>
                  <div className="text-xs text-slate-400">
                    Score: {saved.overallScore}/100 • {new Date(saved.timestamp).toLocaleDateString()}
                  </div>
                </div>
                <button
                  onClick={() => onLoadSaved(saved)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors"
                >
                  Load Analysis
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
