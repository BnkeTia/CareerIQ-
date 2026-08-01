import { LearningRecommendation } from '../types';

export const LEARNING_RESOURCES: LearningRecommendation[] = [
  {
    id: 'free-code-camp-fullstack',
    title: 'Full Stack Web Development & Data Science Certificate',
    provider: 'freeCodeCamp',
    type: 'Course',
    cost: 'Free',
    url: 'https://www.freecodecamp.org/',
    targetSkill: 'TypeScript, React, Python, SQL',
    duration: '300 hours (Self-paced)',
    description: 'Comprehensive 100% free interactive curriculum covering algorithms, data structures, front-end libraries, and relational database APIs.'
  },
  {
    id: 'google-data-analytics',
    title: 'Google Data Analytics Professional Certificate',
    provider: 'Coursera / Google',
    type: 'Certification',
    cost: 'Affordable (< $100)',
    url: 'https://www.coursera.org/google-certificates/data-analytics-certificate',
    targetSkill: 'SQL, Tableau, R Programming, Data Cleaning',
    duration: '3 - 6 months (5 hrs/week)',
    description: 'Industry-recognized professional certificate for entry-level data analytics roles with hands-on case studies.'
  },
  {
    id: 'aws-cloud-practitioner',
    title: 'AWS Certified Cloud Practitioner & Solutions Architect',
    provider: 'Amazon Web Services (AWS)',
    type: 'Certification',
    cost: 'Affordable (< $100)',
    url: 'https://aws.amazon.com/certification/',
    targetSkill: 'AWS Cloud Services, Security, Infrastructure as Code',
    duration: '1 - 2 months',
    description: 'Gold standard cloud architecture credential validating knowledge of AWS security, storage, serverless compute, and networking.'
  },
  {
    id: 'mit-edx-computer-science',
    title: 'MITx: Introduction to Computer Science and Programming Using Python',
    provider: 'edX / MIT',
    type: 'Course',
    cost: 'Free',
    url: 'https://www.edx.org/course/introduction-to-computer-science-and-programming-7',
    targetSkill: 'Python, Computational Thinking, Data Structures',
    duration: '9 weeks (14 hrs/week)',
    description: 'Renowned MIT foundation course covering algorithmic complexity, data abstraction, and statistical modeling in Python.'
  },
  {
    id: 'six-sigma-green-belt',
    title: 'Lean Six Sigma Green Belt Certification',
    provider: 'Council for Six Sigma Certification (CSSC)',
    type: 'Certification',
    cost: 'Affordable (< $100)',
    url: 'https://www.sixsigmacouncil.org/',
    targetSkill: 'DMAIC Methodology, Root Cause Analysis, Statistical Quality Control',
    duration: '4 - 8 weeks',
    description: 'Essential certification for manufacturing, chemical, process, and operational continuous improvement roles.'
  },
  {
    id: 'pmi-capm',
    title: 'Certified Associate in Project Management (CAPM) / PMP Prep',
    provider: 'Project Management Institute (PMI)',
    type: 'Certification',
    cost: 'Paid',
    url: 'https://www.pmi.org/certifications/certified-associate-capm',
    targetSkill: 'Agile & Waterfall Project Planning, Risk Management, Stakeholder Communication',
    duration: '2 months',
    description: 'Global standard project management credential for leading cross-functional teams and budget delivery.'
  },
  {
    id: 'harvard-cs50',
    title: 'CS50x: Introduction to Computer Science',
    provider: 'Harvard University / edX',
    type: 'Course',
    cost: 'Free',
    url: 'https://cs50.harvard.edu/x/',
    targetSkill: 'C, Python, SQL, Web Development, Memory Management',
    duration: '12 weeks (Self-paced)',
    description: 'Legendary Harvard foundational course covering memory, algorithms, software engineering principles, and database management.'
  },
  {
    id: 'deeplearning-ai-prompt',
    title: 'Generative AI & LLM Application Engineering',
    provider: 'DeepLearning.AI / Andrew Ng',
    type: 'Course',
    cost: 'Free',
    url: 'https://www.deeplearning.ai/short-courses/',
    targetSkill: 'Prompt Engineering, RAG Architectures, LangChain, Gemini API',
    duration: '2 - 3 weeks',
    description: 'Hands-on short courses by AI pioneer Andrew Ng teaching how to build enterprise applications powered by LLMs.'
  },
  {
    id: 'aiche-membership',
    title: 'American Institute of Chemical Engineers (AIChE) Young Professional Member',
    provider: 'AIChE',
    type: 'Professional Organization',
    cost: 'Affordable (< $100)',
    url: 'https://www.aiche.org/',
    targetSkill: 'Chemical Process Safety, Technical Networking, HAZOP Training',
    duration: 'Ongoing Annual Membership',
    description: 'Access to technical webinars, chemical engineering conferences, process safety certifications, and peer networking.'
  },
  {
    id: 'ieee-computer-society',
    title: 'IEEE Computer Society & Association for Computing Machinery (ACM)',
    provider: 'IEEE / ACM',
    type: 'Professional Organization',
    cost: 'Affordable (< $100)',
    url: 'https://www.computer.org/',
    targetSkill: 'Software Standards, Technical Publications, Career Mentorship',
    duration: 'Ongoing Annual Membership',
    description: 'World’s premier engineering society providing access to digital research libraries, standards, and global tech conferences.'
  }
];
