import React from 'react';
import { FolderClock, FileText, Trash2, ArrowRight, Upload, Calendar } from 'lucide-react';
import { CVAnalysisResult } from '../types';

interface SavedAnalysesViewProps {
  savedAnalyses: CVAnalysisResult[];
  onLoadSaved: (saved: CVAnalysisResult) => void;
  onDeleteSaved: (id: string) => void;
  onOpenUpload: () => void;
}

export const SavedAnalysesView: React.FC<SavedAnalysesViewProps> = ({
  savedAnalyses,
  onLoadSaved,
  onDeleteSaved,
  onOpenUpload
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* View Header */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <FolderClock className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Saved Resumes & Past Analyses</h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Access your analysis history, reload past evaluations, or start a new CV upload.
          </p>
        </div>

        <button
          onClick={onOpenUpload}
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/30 transition-all cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>Analyze New CV</span>
        </button>
      </div>

      {savedAnalyses.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
          <FileText className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Saved Analyses Yet</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Upload your CV or choose one of the preset sample resumes to run your first AI evaluation.
          </p>
          <button
            onClick={onOpenUpload}
            className="px-5 py-2.5 text-xs font-bold rounded-xl bg-indigo-600 text-white"
          >
            Start First Analysis
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedAnalyses.map((saved) => (
            <div 
              key={saved.id}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(saved.timestamp).toLocaleDateString()}
                  </span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                    {saved.overallScore}/100 Overall
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                  {saved.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  Top Recommended Role: {saved.careerRecommendations[0]?.roleTitle || 'Tech Professional'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => onDeleteSaved(saved.id)}
                  className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors text-xs flex items-center gap-1"
                  title="Delete analysis record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onLoadSaved(saved)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all cursor-pointer"
                >
                  <span>Load Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
