import type { UserProfile } from '@/types';
import type { AssessmentAttempt, AssessmentQuestion, CertificateRecord, LearnerProgress } from '@/types/lms';
import { SEED_QUESTIONS } from '@/data/lmsSeed';
import { cloneValue, createId, fingerprint, loadStore, nowIso, saveStore } from '@/lib/persistentStore';
import { AuthorizationError, requirePermission } from '@/services/authorization';
import { flattenLessons, getManagedCourse } from '@/services/courseService';

const PROGRESS_KEY = 'zamaron_academy_progress_v1';
const ATTEMPTS_KEY = 'zamaron_academy_attempts_v1';
const CERTS_KEY = 'zamaron_academy_certs_v1';
const QUESTIONS_KEY = 'zamaron_academy_questions_v1';

const PASS_THRESHOLD = 80;

let progressRows: LearnerProgress[] = loadStore(PROGRESS_KEY, []);
let attempts: AssessmentAttempt[] = loadStore(ATTEMPTS_KEY, []);
let certificates: CertificateRecord[] = loadStore(CERTS_KEY, []);
let questions: AssessmentQuestion[] = loadStore(QUESTIONS_KEY, SEED_QUESTIONS);

function persistProgress(): void {
  saveStore(PROGRESS_KEY, progressRows);
}
function persistAttempts(): void {
  saveStore(ATTEMPTS_KEY, attempts);
}
function persistCerts(): void {
  saveStore(CERTS_KEY, certificates);
}

export function listQuestions(courseId: string, principal?: UserProfile | null): AssessmentQuestion[] {
  requirePermission('academy:read', principal);
  return cloneValue(questions.filter((q) => q.courseId === courseId));
}

export function getProgress(userId: string, courseId: string, principal?: UserProfile | null): LearnerProgress | null {
  const user = requirePermission('academy:read', principal);
  if (user.role !== 'ADMIN' && user.id !== userId) {
    throw new AuthorizationError('FORBIDDEN', 'Cannot read another operator\'s academy progress.');
  }
  const found = progressRows.find((row) => row.userId === userId && row.courseId === courseId);
  return found ? cloneValue(found) : null;
}

export function markLessonComplete(
  userId: string,
  courseId: string,
  lessonId: string,
  principal?: UserProfile | null
): LearnerProgress {
  const user = requirePermission('academy:read', principal);
  if (user.role !== 'ADMIN' && user.id !== userId) {
    throw new AuthorizationError('FORBIDDEN', 'Cannot mutate another operator\'s academy progress.');
  }
  const course = getManagedCourse(courseId, user);
  if (!course) {
    throw new AuthorizationError('FORBIDDEN', 'Course not found.');
  }
  const total = flattenLessons(course).length || 1;
  const existing = progressRows.find((row) => row.userId === userId && row.courseId === courseId);
  const completed = new Set(existing?.completedLessonIds ?? []);
  completed.add(lessonId);
  const completedLessonIds = Array.from(completed);
  const progressPercent = Math.min(100, Math.round((completedLessonIds.length / total) * 100));
  const next: LearnerProgress = {
    userId,
    courseId,
    completedLessonIds,
    lastLessonId: lessonId,
    progressPercent,
    startedAt: existing?.startedAt ?? nowIso(),
    completedAt: progressPercent >= 100 ? existing?.completedAt ?? nowIso() : existing?.completedAt,
  };
  progressRows = progressRows.filter((row) => !(row.userId === userId && row.courseId === courseId)).concat(next);
  persistProgress();
  return cloneValue(next);
}

export function submitAssessment(
  input: { userId: string; userName: string; courseId: string; answers: Record<string, string> },
  principal?: UserProfile | null
): { attempt: AssessmentAttempt; certificate: CertificateRecord | null } {
  const user = requirePermission('academy:read', principal);
  if (user.role !== 'ADMIN' && user.id !== input.userId) {
    throw new AuthorizationError('FORBIDDEN', 'Cannot submit an assessment for another operator.');
  }
  const bank = questions.filter((q) => q.courseId === input.courseId);
  if (bank.length === 0) {
    throw new AuthorizationError('FORBIDDEN', 'No assessment is configured for this course.');
  }
  const correct = bank.filter((q) => input.answers[q.id] === q.correctOptionId).length;
  const scorePercent = Math.round((correct / bank.length) * 100);
  const passed = scorePercent >= PASS_THRESHOLD;
  const attempt: AssessmentAttempt = {
    id: createId('atm'),
    userId: input.userId,
    userName: input.userName,
    courseId: input.courseId,
    answers: input.answers,
    scorePercent,
    passed,
    completedAt: nowIso(),
  };
  attempts = [attempt, ...attempts];
  persistAttempts();

  if (!passed) {
    return { attempt: cloneValue(attempt), certificate: null };
  }

  const course = getManagedCourse(input.courseId, user);
  const certificate: CertificateRecord = {
    id: createId('CERT'),
    userId: input.userId,
    userName: input.userName,
    courseId: input.courseId,
    courseTitle: course?.title ?? input.courseId,
    scorePercent,
    issuedAt: nowIso(),
    hash: fingerprint(`${input.userId}:${input.courseId}:${attempt.id}`),
  };
  certificates = [certificate, ...certificates];
  persistCerts();
  return { attempt: cloneValue(attempt), certificate: cloneValue(certificate) };
}

export function getCertificate(id: string, principal?: UserProfile | null): CertificateRecord | null {
  const user = requirePermission('academy:read', principal);
  const found = certificates.find((cert) => cert.id === id);
  if (!found) return null;
  if (user.role !== 'ADMIN' && found.userId !== user.id) {
    throw new AuthorizationError('FORBIDDEN', 'Certificate belongs to another operator.');
  }
  return cloneValue(found);
}

export function listCertificates(userId: string, principal?: UserProfile | null): CertificateRecord[] {
  const user = requirePermission('academy:read', principal);
  if (user.role !== 'ADMIN' && user.id !== userId) {
    throw new AuthorizationError('FORBIDDEN', 'Cannot list another operator\'s certificates.');
  }
  return cloneValue(certificates.filter((cert) => cert.userId === userId));
}

export function latestAttempt(userId: string, courseId: string, principal?: UserProfile | null): AssessmentAttempt | null {
  requirePermission('academy:read', principal);
  const found = attempts.find((row) => row.userId === userId && row.courseId === courseId);
  return found ? cloneValue(found) : null;
}

export function passThreshold(): number {
  return PASS_THRESHOLD;
}
