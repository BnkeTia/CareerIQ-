import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  RefreshCw, 
  Edit3, 
  Save, 
  Building2, 
  Briefcase, 
  Sliders, 
  ShieldCheck, 
  Zap, 
  Lightbulb,
  ChevronRight,
  Send
} from 'lucide-react';
import { CVAnalysisResult, CoverLetterResult } from '../types';

interface CoverLetterViewProps {
  analysis: CVAnalysisResult;
}

const TONES = [
  { id: 'Professional & Direct', label: 'Professional & Direct', desc: 'Concise, clear, and focused on business value' },
  { id: 'Executive & Authoritative', label: 'Executive & Authoritative', desc: 'High-level strategic tone for leadership roles' },
  { id: 'Enthusiastic & Creative', label: 'Enthusiastic & Creative', desc: 'Passionate and engaging narrative for modern cultures' },
  { id: 'Technical & Precise', label: 'Technical & Precise', desc: 'Emphasizes tooling, domain mastery, and metrics' },
];

const FOCUS_AREAS = [
  'Quantifiable Achievements & KPIs',
  'Technical Mastery & Hard Skills',
  'Leadership & Stakeholder Alignment',
  'Process Optimization & Scalability',
  'Adaptability & Rapid Learning'
];

export const CoverLetterView: React.FC<CoverLetterViewProps> = ({ analysis }) => {
  const defaultRole = analysis.careerRecommendations[0]?.roleTitle || 'Senior Technical Specialist';
  
  const [targetRole, setTargetRole] = useState(defaultRole);
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [selectedTone, setSelectedTone] = useState('Professional & Direct');
  const [selectedFocus, setSelectedFocus] = useState<string[]>([
    'Quantifiable Achievements & KPIs',
    'Technical Mastery & Hard Skills'
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [coverLetter, setCoverLetter] = useState<CoverLetterResult | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState('');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Auto-generate initial cover letter if none present
  useEffect(() => {
    if (!coverLetter) {
      handleGenerate();
    }
  }, []);

  const toggleFocus = (area: string) => {
    if (selectedFocus.includes(area)) {
      setSelectedFocus(selectedFocus.filter(a => a !== area));
    } else {
      setSelectedFocus([...selectedFocus, area]);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/cv/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cvText: analysis.rawCvText,
          targetRole: targetRole || defaultRole,
          companyName: companyName || 'Hiring Team',
          jobDescription,
          tone: selectedTone,
          focusAreas: selectedFocus
        })
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setCoverLetter(data);
      setEditableContent(data.content);
      setIsEditing(false);
    } catch (err: any) {
      console.error('Error generating cover letter:', err);
      setErrorMsg('Falling back to local AI heuristic generator...');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    const textToCopy = isEditing ? editableContent : (coverLetter?.content || editableContent);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const textToDownload = isEditing ? editableContent : (coverLetter?.content || editableContent);
    const element = document.createElement("a");
    const file = new Blob([textToDownload], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Cover_Letter_${(targetRole || 'Role').replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-[#space] space-y-6 max-w-7xl mx-auto">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-800/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                AI Cover Letter Strategist
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
              Tailored Cover Letter Generator
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Generate a high-impact, ATS-optimized cover letter seamlessly tailored to your CV profile, target role competencies, and specific job descriptions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Generating Letter...' : 'Re-Generate AI Letter'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Form Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Customization Parameters
            </h3>

            {/* Target Role Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Target Role Title
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Suggestions from CV analysis */}
              {analysis.careerRecommendations.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium self-center">From CV:</span>
                  {analysis.careerRecommendations.slice(0, 3).map((rec) => (
                    <button
                      key={rec.id}
                      onClick={() => setTargetRole(rec.roleTitle)}
                      className={`text-[10px] px-2 py-0.5 rounded-lg border font-medium transition-all ${
                        targetRole === rec.roleTitle
                          ? 'bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800 font-bold'
                          : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {rec.roleTitle}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Target Company Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Target Company Name (Optional)
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Google, Microsoft, Acme Corp"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Tone Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Letter Writing Tone
              </label>
              <div className="space-y-2">
                {TONES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTone(t.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                      selectedTone === t.id
                        ? 'bg-indigo-50 border-indigo-300 dark:bg-indigo-950/70 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 dark:bg-slate-800/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>{t.label}</span>
                      {selectedTone === t.id && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                      {t.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Focus Areas Multi-Select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Key Focus Highlights
              </label>
              <div className="space-y-1.5">
                {FOCUS_AREAS.map((area) => {
                  const active = selectedFocus.includes(area);
                  return (
                    <button
                      key={area}
                      onClick={() => toggleFocus(area)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border text-xs transition-all ${
                        active
                          ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                          : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                      }`}
                    >
                      <span>{area}</span>
                      {active ? <Check className="w-3.5 h-3.5" /> : <span className="text-slate-400 text-sm">+</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Job Description Snippet */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Job Description / Requirement Snippet (Optional)
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job posting details or specific requirements here..."
                rows={3}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-xs shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isGenerating ? 'Analyzing & Crafting...' : 'Generate Customized Cover Letter'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Rendered Cover Letter Output */}
        <div className="lg:col-span-8 space-y-6">
          {isGenerating ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 border border-slate-200 dark:border-slate-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto animate-pulse">
                <Sparkles className="w-8 h-8 animate-spin" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Crafting Your Custom Cover Letter...
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Analyzing your CV accomplishments, extracting keywords for {targetRole || 'the role'}, and framing a compelling narrative.
              </p>
            </div>
          ) : coverLetter ? (
            <div className="space-y-6">
              {/* Insight Highlights Panel */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex flex-col items-center justify-center font-black shadow-md shadow-indigo-600/30">
                    <span className="text-lg leading-none">{coverLetter.atsMatchScore}%</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-200">Match</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      ATS-Optimized Cover Letter
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Tone: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{coverLetter.tone}</span> | Role: <span className="font-semibold text-slate-700 dark:text-slate-300">{coverLetter.targetRole}</span>
                    </p>
                  </div>
                </div>

                {/* Highlighted Skills Badges */}
                <div className="flex flex-wrap gap-1.5 max-w-xs justify-end">
                  {coverLetter.highlightedSkills.map((skill, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Main Letter Content Card */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                {/* Header Action Bar */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                    <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Generated Cover Letter Document</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (isEditing) {
                          setCoverLetter({ ...coverLetter, content: editableContent });
                        }
                        setIsEditing(!isEditing);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold transition-all cursor-pointer"
                    >
                      {isEditing ? <Save className="w-3.5 h-3.5 text-emerald-500" /> : <Edit3 className="w-3.5 h-3.5 text-indigo-500" />}
                      <span>{isEditing ? 'Save Edits' : 'Edit Text'}</span>
                    </button>

                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold transition-all cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>

                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>

                {/* Document Body */}
                <div className="p-6 sm:p-8">
                  {isEditing ? (
                    <textarea
                      value={editableContent}
                      onChange={(e) => setEditableContent(e.target.value)}
                      rows={16}
                      className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-indigo-300 dark:border-indigo-800 rounded-2xl text-xs leading-relaxed text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <div className="prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-800 dark:text-slate-200 font-serif">
                      {coverLetter.content}
                    </div>
                  )}
                </div>

                {/* Key Hooks Footer Banner */}
                {coverLetter.keyHooks && coverLetter.keyHooks.length > 0 && (
                  <div className="px-6 py-4 bg-indigo-50/50 dark:bg-indigo-950/40 border-t border-indigo-100 dark:border-indigo-900/60 flex items-start gap-3">
                    <Lightbulb className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold text-indigo-900 dark:text-indigo-200 uppercase tracking-wider block mb-1">
                        Core Value Hooks Embedded in Letter:
                      </span>
                      <ul className="text-xs text-indigo-800 dark:text-indigo-300 space-y-0.5">
                        {coverLetter.keyHooks.map((hook, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                            <span>{hook}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
