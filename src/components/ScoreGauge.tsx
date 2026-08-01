import React from 'react';

interface ScoreGaugeProps {
  score: number;
  label: string;
  sublabel?: string;
  size?: 'sm' | 'md' | 'lg';
  showGrade?: boolean;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  label,
  sublabel,
  size = 'md',
  showGrade = true
}) => {
  const getScoreColor = (val: number) => {
    if (val >= 85) return { stroke: '#10B981', text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/40', border: 'border-emerald-200 dark:border-emerald-800', grade: 'A+' };
    if (val >= 75) return { stroke: '#6366F1', text: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/40', border: 'border-indigo-200 dark:border-indigo-800', grade: 'B+' };
    if (val >= 60) return { stroke: '#F59E0B', text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/40', border: 'border-amber-200 dark:border-amber-800', grade: 'C' };
    return { stroke: '#EF4444', text: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-950/40', border: 'border-rose-200 dark:border-rose-800', grade: 'Needs Work' };
  };

  const style = getScoreColor(score);
  const radius = size === 'lg' ? 48 : size === 'md' ? 36 : 24;
  const strokeWidth = size === 'lg' ? 8 : size === 'md' ? 6 : 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const boxSize = (radius + strokeWidth) * 2;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative flex items-center justify-center">
        <svg width={boxSize} height={boxSize} className="-rotate-90 transform">
          {/* Background circle */}
          <circle
            cx={boxSize / 2}
            cy={boxSize / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-100 dark:text-slate-800"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={boxSize / 2}
            cy={boxSize / 2}
            r={radius}
            stroke={style.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            fill="transparent"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className={`font-black ${size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-lg' : 'text-sm'} ${style.text}`}>
            {score}
          </span>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">/ 100</span>
        </div>
      </div>
      <div className="mt-2 text-center">
        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{label}</div>
        {sublabel && <div className="text-[11px] text-slate-500 dark:text-slate-400">{sublabel}</div>}
        {showGrade && (
          <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-full ${style.bg} ${style.text} border ${style.border}`}>
            {style.grade}
          </span>
        )}
      </div>
    </div>
  );
};
