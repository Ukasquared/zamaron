import type { AcademyCourse } from '@/types';

export type CourseStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface LessonTimestamp {
  id: string;
  time: string;
  label: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  durationMinutes: number;
  content: string;
  videoUrl?: string;
  instructor?: string;
  takeaways?: string;
  timestamps: LessonTimestamp[];
}

export interface CourseModule {
  id: string;
  title: string;
  subtitle?: string;
  order: number;
  lessons: CourseLesson[];
}

export interface ManagedCourse {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: AcademyCourse['category'];
  difficulty: AcademyCourse['difficulty'];
  instructor: string;
  thumbnail: string;
  xpReward: number;
  status: CourseStatus;
  modules: CourseModule[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface CourseDraftInput {
  title: string;
  slug?: string;
  description: string;
  category: AcademyCourse['category'];
  difficulty: AcademyCourse['difficulty'];
  instructor: string;
  thumbnail?: string;
  xpReward?: number;
}

export interface LearnerProgress {
  userId: string;
  courseId: string;
  completedLessonIds: string[];
  lastLessonId?: string;
  progressPercent: number;
  startedAt: string;
  completedAt?: string;
}

export interface AssessmentOption {
  id: string;
  text: string;
}

export interface AssessmentQuestion {
  id: string;
  courseId: string;
  prompt: string;
  codeSnippet?: string;
  options: AssessmentOption[];
  correctOptionId: string;
  explanation: string;
}

export interface AssessmentAttempt {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  answers: Record<string, string>;
  scorePercent: number;
  passed: boolean;
  completedAt: string;
}

export interface CertificateRecord {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  courseTitle: string;
  scorePercent: number;
  issuedAt: string;
  hash: string;
}
