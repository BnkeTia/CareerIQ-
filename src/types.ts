export interface SubScores {
  atsCompatibility: number;
  formatting: number;
  professionalism: number;
  grammar: number;
  impactOfAchievements: number;
  skillsPresentation: number;
  keywordOptimization: number;
  readability: number;
}

export interface Weakness {
  area: string;
  explanation: string;
  impact: 'High' | 'Medium' | 'Low';
}

export interface Improvement {
  id: string;
  category: 'ATS' | 'Impact' | 'Verbs' | 'Formatting' | 'Structure';
  original: string;
  suggested: string;
  reason: string;
  applied?: boolean;
}

export interface EducationAnalysis {
  degrees: string[];
  majors: string[];
  courses: string[];
  certifications: string[];
  licenses: string[];
  knowledgeAreas: string[];
  transferableSkills: string[];
  supportedCareerPaths: string[];
}

export interface ExperienceAnalysis {
  totalYears: number;
  roles: string[];
  competencyProfile: {
    technicalSkills: string[];
    leadership: string[];
    industryKnowledge: string[];
    softSkills: string[];
    quantifiableAchievements: string[];
  };
}

export interface CareerRecommendation {
  id: string;
  roleTitle: string;
  category: 'best_fit' | 'alternative' | 'emerging';
  matchScore: number;
  reasoning: string;
  suitableSkills: string[];
  missingSkills: string[];
  suggestedCertifications: string[];
  suggestedProjects: string[];
  salaryRangeByCountry: Record<string, { currency: string; min: number; max: number; median: number }>;
  growthOutlook: string;
  topIndustries: string[];
  requiresTraining: boolean;
}

export interface LearningPriorityItem {
  skill: string;
  priority: 'High' | 'Medium' | 'Low';
  estimatedTime: string;
  courseRecommendation: string;
  isFreeOrAffordable: boolean;
}

export interface SkillsGapAnalysis {
  targetRole: string;
  existingSkills: string[];
  missingSkills: string[];
  criticalGaps: string[];
  learningPriority: LearningPriorityItem[];
  timeToCompetitive: string;
}

export interface BulletPointImprovement {
  original: string;
  improved: string;
  verb: string;
}

export interface OptimizedResume {
  improvedSummary: string;
  bulletPoints: BulletPointImprovement[];
  achievementStatements: string[];
  actionVerbsUsed: string[];
  atsKeywords: string[];
  suggestedSkillsSection: string[];
  formattedMarkdown: string;
}

export interface CVAnalysisResult {
  id: string;
  title: string;
  timestamp: string;
  overallScore: number;
  subScores: SubScores;
  weaknesses: Weakness[];
  improvements: Improvement[];
  educationAnalysis: EducationAnalysis;
  experienceAnalysis: ExperienceAnalysis;
  careerRecommendations: CareerRecommendation[];
  optimizedResume: OptimizedResume;
  rawCvText: string;
}

export interface IndustryDetail {
  id: string;
  name: string;
  iconName: string;
  description: string;
  typicalRoles: string[];
  requiredSkills: string[];
  salaryRanges: { junior: string; mid: string; senior: string };
  growthOutlook: string;
  entryRequirements: string;
  keyTrends: string[];
  chanceOfSuccess: 'Highest' | 'High' | 'Requires Training';
}

export interface LearningRecommendation {
  id: string;
  title: string;
  provider: string;
  type: 'Course' | 'Certification' | 'Degree' | 'Bootcamp' | 'Professional Organization';
  cost: 'Free' | 'Affordable (< $100)' | 'Paid';
  url: string;
  targetSkill: string;
  duration: string;
  description: string;
}

export interface SampleCV {
  id: string;
  title: string;
  role: string;
  experience: string;
  text: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  selectedCountry: string;
  theme: 'dark' | 'light';
}

export interface CoverLetterRequest {
  targetRole: string;
  companyName?: string;
  jobDescription?: string;
  tone?: string;
  focusAreas?: string[];
}

export interface CoverLetterResult {
  id: string;
  targetRole: string;
  companyName: string;
  content: string;
  highlightedSkills: string[];
  tone: string;
  atsMatchScore: number;
  keyHooks: string[];
}

export interface InterviewQuestion {
  id: string;
  category: 'Behavioral' | 'Technical' | 'Situational' | 'Leadership' | 'Resume Deep-Dive';
  question: string;
  contextWhyAsked: string;
  starTips: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  sampleKeyPoints: string[];
}

export interface InterviewAnswerEvaluation {
  score: number;
  clarityScore: number;
  confidenceScore: number;
  relevanceScore: number;
  strengths: string[];
  improvements: string[];
  suggestedStarRevision: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  improvedAnswerText: string;
}

export interface InterviewPracticeAttempt {
  id: string;
  questionId: string;
  questionText: string;
  category: string;
  userAnswer: string;
  evaluation: InterviewAnswerEvaluation;
  timestamp: string;
}

