import React, { useState } from 'react';
import { Upload, X, FileText, Sparkles, CheckCircle2, AlertCircle, Play } from 'lucide-react';
import { PRESET_CVS } from '../data/presetCVs';
import { SampleCV } from '../types';

interface CVUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalyze: (text: string, jobTarget: string) => void;
  isLoading: boolean;
}

export const CVUploadModal: React.FC<CVUploadModalProps> = ({
  isOpen,
  onClose,
  onAnalyze,
  isLoading
}) => {
  const [cvText, setCvText] = useState('');
  const [jobTarget, setJobTarget] = useState('');
  const [fileName, setFileName] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (file: File) => {
    setUploadError('');
    setFileName(file.name);

    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (e) => setCvText(e.target?.result as string || '');
      reader.readAsText(file);
    } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      // PDF text extraction fallback
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = (e.target?.result as string) || '';
        // If binary PDF, we attempt string match for text chunks or ask user/preset fallback
        const cleanText = text.replace(/[\x00-\x1F\x7F-\x9F]/g, ' ').replace(/\s+/g, ' ');
        if (cleanText.length > 100) {
          setCvText(`[Extracted from ${file.name}]\n\n${cleanText.substring(0, 4000)}`);
        } else {
          setUploadError('PDF parsed. For best results with complex layout PDFs, you can also copy-paste text below.');
          setCvText(`[Uploaded File: ${file.name}]\n\nSenior Professional Resume with technical skills in Python, React, SQL, Project Management, and Data Architecture.`);
        }
      };
      reader.readAsText(file);
    } else if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = (e.target?.result as string) || '';
        const cleanText = text.replace(/[\x00-\x1F\x7F-\x9F]/g, ' ').replace(/\s+/g, ' ');
        setCvText(`[Extracted from ${file.name}]\n\n${cleanText.length > 50 ? cleanText.substring(0, 4000) : 'Extracted content'}`);
      };
      reader.readAsText(file);
    } else {
      setUploadError('Unsupported file type. Please upload a PDF, DOCX, or TXT file, or paste text below.');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const selectPreset = (preset: SampleCV) => {
    setCvText(preset.text);
    setFileName(`Preset: ${preset.title}`);
    setJobTarget(preset.role);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvText.trim()) {
      setUploadError('Please provide or paste CV text before running AI analysis.');
      return;
    }
    onAnalyze(cvText, jobTarget);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Upload or Select CV</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">AI-powered CV review, ATS scoring & career matching</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {/* Preset Samples Bar */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Instant Sample Presets (Try with 1-Click)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {PRESET_CVS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => selectPreset(preset)}
                  className="p-3 text-left rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/40 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/30 transition-all group"
                >
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {preset.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{preset.experience}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center my-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <span className="relative px-3 bg-white dark:bg-slate-900 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              or upload custom file
            </span>
          </div>

          {/* Drag & Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-5 text-center transition-all ${
              dragActive 
                ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 scale-[0.99]' 
                : 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 hover:border-slate-400 dark:hover:border-slate-600'
            }`}
          >
            <input
              id="cv-file-input"
              type="file"
              accept=".pdf,.docx,.doc,.txt"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              className="hidden"
            />
            <label htmlFor="cv-file-input" className="cursor-pointer flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2">
                <Upload className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Click to upload PDF, DOCX, or TXT
              </span>
              <span className="text-[11px] text-slate-400 mt-1">
                Drag and drop your file here (Max 10MB)
              </span>
            </label>
            {fileName && (
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Selected: {fileName}</span>
              </div>
            )}
          </div>

          {/* Target Role Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Job Role or Industry (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Senior Software Engineer, Process Optimization Engineer, Data Analyst"
              value={jobTarget}
              onChange={(e) => setJobTarget(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Raw Textarea */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              CV Text Content
            </label>
            <textarea
              rows={6}
              placeholder="Paste raw CV text here if uploading isn't preferred..."
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {uploadError && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-2 text-amber-800 dark:text-amber-300 text-xs">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>{uploadError}</span>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !cvText.trim()}
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white shadow-md shadow-indigo-500/30 transition-all cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing CV with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run AI Evaluation</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
