import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Send, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Mic, 
  MicOff, 
  Play, 
  HelpCircle, 
  ChevronRight, 
  RotateCcw, 
  BarChart2, 
  BookOpen, 
  Zap,
  Target,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
  Clock
} from 'lucide-react';
import { 
  CVAnalysisResult, 
  InterviewQuestion, 
  InterviewAnswerEvaluation, 
  InterviewPracticeAttempt 
} from '../types';

interface InterviewPrepViewProps {
  analysis: CVAnalysisResult;
}

const CATEGORIES = ['All', 'Behavioral', 'Technical', 'Situational', 'Leadership', 'Resume Deep-Dive'];

export const InterviewPrepView: React.FC<InterviewPrepViewProps> = ({ analysis }) => {
  const defaultRole = analysis.careerRecommendations[0]?.roleTitle || 'Senior Technical Specialist';
  const [targetRole, setTargetRole] = useState(defaultRole);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState<InterviewAnswerEvaluation | null>(null);

  const [attempts, setAttempts] = useState<InterviewPracticeAttempt[]>([]);
  const [activeTab, setActiveTab] = useState<'practice' | 'history'>('practice');

  // Mic dictation state (if browser supports Web Speech API)
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any | null>(null);

  // Load initial questions
  useEffect(() => {
    fetchQuestions();
  }, [targetRole, selectedCategory]);

  // Setup Web Speech API dictation if available
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setUserAnswer((prev) => prev + (prev ? ' ' : '') + transcript);
      };

      rec.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      setRecognition(rec);
    }
  }, []);

  const toggleRecording = () => {
    if (!recognition) return;
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      try {
        recognition.start();
        setIsRecording(true);
      } catch (e) {
        console.error('Speech recognition start failed:', e);
      }
    }
  };

  const fetchQuestions = async () => {
    setIsLoadingQuestions(true);
    setCurrentEvaluation(null);
    setUserAnswer('');
    try {
      const res = await fetch('/api/interview/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cvText: analysis.rawCvText,
          targetRole: targetRole || defaultRole,
          category: selectedCategory === 'All' ? undefined : selectedCategory
        })
      });
      const data = await res.json();
      if (data.questions && Array.isArray(data.questions)) {
        setQuestions(data.questions);
        setActiveQuestionIndex(0);
      }
    } catch (err) {
      console.error('Failed to fetch interview questions:', err);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const handleEvaluateAnswer = async () => {
    if (!userAnswer.trim() || !currentQuestion) return;
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/interview/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: currentQuestion.question,
          userAnswer,
          cvText: analysis.rawCvText,
          targetRole
        })
      });
      const evalData: InterviewAnswerEvaluation = await res.json();
      setCurrentEvaluation(evalData);

      // Save attempt to history
      const newAttempt: InterviewPracticeAttempt = {
        id: 'att-' + Date.now(),
        questionId: currentQuestion.id,
        questionText: currentQuestion.question,
        category: currentQuestion.category,
        userAnswer,
        evaluation: evalData,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setAttempts([newAttempt, ...attempts]);
    } catch (err) {
      console.error('Failed to evaluate answer:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const currentQuestion = questions[activeQuestionIndex];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-violet-800/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-400/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-violet-400" />
                AI Interview Prep & Simulator
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
              Practice Interview Simulator
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Sharpen your responses for <span className="text-violet-300 font-bold">{targetRole}</span> with AI-generated questions tailored to your CV. Get real-time constructive feedback on clarity, confidence, and STAR relevance.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-700">
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'practice'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Practice Mode
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'history'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Attempts ({attempts.length})</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'practice' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Target Controls & Question Navigator */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Session Controls
              </h3>

              {/* Target Role Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Target Interview Role
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Full-Stack Developer"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Question Category
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 hover:border-indigo-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={fetchQuestions}
                disabled={isLoadingQuestions}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs transition-all cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingQuestions ? 'animate-spin' : ''}`} />
                <span>Generate Fresh Questions</span>
              </button>
            </div>

            {/* Questions List Carousel Nav */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Questions ({questions.length})
                </h3>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                  Q{activeQuestionIndex + 1} of {questions.length}
                </span>
              </div>

              {isLoadingQuestions ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-indigo-500" />
                  Generating interview scenario suite...
                </div>
              ) : (
                <div className="space-y-2">
                  {questions.map((q, idx) => (
                    <button
                      key={q.id || idx}
                      onClick={() => {
                        setActiveQuestionIndex(idx);
                        setCurrentEvaluation(null);
                        setUserAnswer('');
                      }}
                      className={`w-full text-left p-3 rounded-2xl border text-xs transition-all cursor-pointer ${
                        activeQuestionIndex === idx
                          ? 'bg-indigo-50 border-indigo-300 dark:bg-indigo-950/70 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 font-bold shadow-xs'
                          : 'bg-slate-50 border-slate-200 dark:bg-slate-800/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                          {q.category}
                        </span>
                        {activeQuestionIndex === idx && (
                          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                        )}
                      </div>
                      <p className="line-clamp-2 leading-relaxed font-medium">
                        {q.question}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Question & Interactive Practice Workspace */}
          <div className="lg:col-span-8 space-y-6">
            {currentQuestion ? (
              <div className="space-y-6">
                {/* Active Question Display Card */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
                      {currentQuestion.category} Question
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Question #{activeQuestionIndex + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 leading-snug">
                      "{currentQuestion.question}"
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                      <strong className="text-indigo-600 dark:text-indigo-400 not-italic">Why Hiring Managers Ask This: </strong>
                      {currentQuestion.contextWhyAsked}
                    </p>
                  </div>

                  {/* STAR Method Hint Accordion */}
                  <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                      <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                        <Sparkles className="w-4 h-4" />
                        STAR Answer Guidelines
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">Framework Tips</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                        <strong className="text-indigo-600 dark:text-indigo-400 block text-[11px]">S - Situation:</strong>
                        <span className="text-slate-600 dark:text-slate-300 text-[11px]">{currentQuestion.starTips.situation}</span>
                      </div>
                      <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                        <strong className="text-indigo-600 dark:text-indigo-400 block text-[11px]">T - Task:</strong>
                        <span className="text-slate-600 dark:text-slate-300 text-[11px]">{currentQuestion.starTips.task}</span>
                      </div>
                      <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                        <strong className="text-indigo-600 dark:text-indigo-400 block text-[11px]">A - Action:</strong>
                        <span className="text-slate-600 dark:text-slate-300 text-[11px]">{currentQuestion.starTips.action}</span>
                      </div>
                      <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                        <strong className="text-indigo-600 dark:text-indigo-400 block text-[11px]">R - Result:</strong>
                        <span className="text-slate-600 dark:text-slate-300 text-[11px]">{currentQuestion.starTips.result}</span>
                      </div>
                    </div>
                  </div>

                  {/* Practice Input Box */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        Your Response
                      </label>
                      
                      {/* Optional Voice Dictation button */}
                      {recognition && (
                        <button
                          onClick={toggleRecording}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                            isRecording
                              ? 'bg-rose-600 text-white animate-pulse'
                              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-indigo-500" />}
                          <span>{isRecording ? 'Listening... Stop' : 'Dictate Answer'}</span>
                        </button>
                      )}
                    </div>

                    <textarea
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Type your response here using the STAR format (Situation, Task, Action, Result)..."
                      rows={6}
                      className="w-full p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                    />

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[11px] text-slate-400">
                        {userAnswer.trim().split(/\s+/).filter(Boolean).length} words
                      </span>

                      <button
                        onClick={handleEvaluateAnswer}
                        disabled={isEvaluating || !userAnswer.trim()}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-xs shadow-md shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isEvaluating ? 'Evaluating Answer...' : 'Submit Answer for AI Review'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* AI Feedback Output Report Card */}
                {isEvaluating ? (
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 border border-slate-200 dark:border-slate-800 text-center space-y-4">
                    <Sparkles className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
                    <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      Analyzing Response Clarity & Relevance...
                    </h4>
                  </div>
                ) : currentEvaluation ? (
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                          AI Evaluation Scorecard
                        </span>
                        <h4 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                          Overall Assessment: {currentEvaluation.score}/100
                        </h4>
                      </div>

                      {/* 3 Metrics Gauge Pills */}
                      <div className="flex items-center gap-3 w-full sm:w-auto justify-around">
                        <div className="text-center bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 min-w-[90px]">
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">Clarity</span>
                          <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">{currentEvaluation.clarityScore}%</span>
                        </div>
                        <div className="text-center bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 min-w-[90px]">
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">Confidence</span>
                          <span className="text-lg font-black text-violet-600 dark:text-violet-400">{currentEvaluation.confidenceScore}%</span>
                        </div>
                        <div className="text-center bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 min-w-[90px]">
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">Relevance</span>
                          <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{currentEvaluation.relevanceScore}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Strengths & Improvements Columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="bg-emerald-50/60 dark:bg-emerald-950/40 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-3">
                        <h5 className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Key Response Strengths
                        </h5>
                        <ul className="space-y-2 text-xs text-emerald-950 dark:text-emerald-200">
                          {currentEvaluation.strengths.map((s, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-emerald-500 font-bold">•</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-amber-50/60 dark:bg-amber-950/40 p-5 rounded-2xl border border-amber-200 dark:border-amber-800 space-y-3">
                        <h5 className="text-xs font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          Constructive Feedback
                        </h5>
                        <ul className="space-y-2 text-xs text-amber-950 dark:text-amber-200">
                          {currentEvaluation.improvements.map((imp, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-amber-500 font-bold">•</span>
                              <span>{imp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Suggested STAR Model Refinement */}
                    <div className="bg-slate-50 dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                      <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        Polished Model Answer & STAR Refinement
                      </h5>

                      <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 italic leading-relaxed">
                        "{currentEvaluation.improvedAnswerText}"
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        /* History Attempts Tab */
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            Interview Practice Log
          </h3>

          {attempts.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs space-y-2">
              <MessageSquare className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
              <p>No practice attempts recorded yet in this session.</p>
              <button
                onClick={() => setActiveTab('practice')}
                className="text-indigo-600 dark:text-indigo-400 font-bold underline"
              >
                Start practicing now
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {attempts.map((att) => (
                <div key={att.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      {att.category} • {att.timestamp}
                    </span>
                    <span className="font-black px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-full">
                      Score: {att.evaluation.score}/100
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    Q: "{att.questionText}"
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    Your Response: "{att.userAnswer}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
