import type { AcademyCourse, UserProfile } from '@/types';
import type { CourseDraftInput, CourseLesson, CourseModule, CourseStatus, ManagedCourse } from '@/types/lms';
import { SEED_COURSES } from '@/data/lmsSeed';
import { cloneValue, createId, loadStore, nowIso, saveStore } from '@/lib/persistentStore';
import { AuthorizationError, requireAuthenticated, requirePermission } from '@/services/authorization';

const STORE_KEY = 'zamaron_courses_v1';

let courses: ManagedCourse[] = loadStore(STORE_KEY, SEED_COURSES);

function persist(): void {
  saveStore(STORE_KEY, courses);
}

function slugify(value: string): string {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
  return slug || `course-${Date.now().toString(36)}`;
}

function uniqueSlug(base: string, ignoreId?: string): string {
  let slug = slugify(base);
  let n = 2;
  while (courses.some((course) => course.slug === slug && course.id !== ignoreId)) {
    slug = `${slugify(base)}-${n}`;
    n += 1;
  }
  return slug;
}

function emptyLesson(): CourseLesson {
  return {
    id: createId('les'),
    title: 'Untitled Lesson',
    durationMinutes: 15,
    content: '# New Lesson\n\nDescribe the learning objective and walk through the exploit or control.',
    timestamps: [],
  };
}

function emptyModule(order: number): CourseModule {
  return {
    id: createId('mod'),
    title: `Module ${order}`,
    subtitle: 'New curriculum block',
    order,
    lessons: [emptyLesson()],
  };
}

export function durationMinutesOf(course: ManagedCourse): number {
  return course.modules.reduce(
    (sum, mod) => sum + mod.lessons.reduce((inner, lesson) => inner + (lesson.durationMinutes || 0), 0),
    0
  );
}

export function modulesCountOf(course: ManagedCourse): number {
  return course.modules.length;
}

export function toAcademyCourse(course: ManagedCourse, progressPercent = 0): AcademyCourse {
  return {
    id: course.id,
    title: course.title,
    slug: course.slug,
    description: course.description,
    category: course.category,
    difficulty: course.difficulty,
    durationMinutes: durationMinutesOf(course),
    modulesCount: modulesCountOf(course),
    xpReward: course.xpReward,
    progressPercent,
    thumbnail: course.thumbnail,
    instructor: course.instructor,
  };
}

export function listManagedCourses(principal?: UserProfile | null): ManagedCourse[] {
  requirePermission('admin:read', principal);
  return cloneValue(courses).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function listPublishedCourses(principal?: UserProfile | null): ManagedCourse[] {
  requirePermission('academy:read', principal);
  return cloneValue(courses.filter((course) => course.status === 'PUBLISHED'));
}

export function getManagedCourse(idOrSlug: string, principal?: UserProfile | null): ManagedCourse | null {
  const user = requireAuthenticated(principal);
  const found = courses.find((course) => course.id === idOrSlug || course.slug === idOrSlug);
  if (!found) return null;
  if (found.status !== 'PUBLISHED') {
    requirePermission('admin:read', user);
  } else {
    requirePermission('academy:read', user);
  }
  return cloneValue(found);
}

export function createCourse(input: CourseDraftInput, principal?: UserProfile | null): ManagedCourse {
  requirePermission('admin:write', principal);
  const now = nowIso();
  const course: ManagedCourse = {
    id: createId('crs'),
    slug: uniqueSlug(input.slug || input.title),
    title: input.title.trim() || 'Untitled Course',
    description: input.description.trim(),
    category: input.category,
    difficulty: input.difficulty,
    instructor: input.instructor.trim() || 'Zamaron Academy',
    thumbnail: input.thumbnail || 'security',
    xpReward: input.xpReward ?? 250,
    status: 'DRAFT',
    modules: [emptyModule(1)],
    createdAt: now,
    updatedAt: now,
  };
  courses = [course, ...courses];
  persist();
  return cloneValue(course);
}

export function updateCourse(
  id: string,
  patch: Partial<Pick<ManagedCourse, 'title' | 'slug' | 'description' | 'category' | 'difficulty' | 'instructor' | 'thumbnail' | 'xpReward' | 'modules'>>,
  principal?: UserProfile | null
): ManagedCourse {
  requirePermission('admin:write', principal);
  const index = courses.findIndex((course) => course.id === id);
  if (index < 0) {
    throw new AuthorizationError('FORBIDDEN', `Course ${id} was not found.`);
  }
  const current = courses[index];
  const next: ManagedCourse = {
    ...current,
    ...patch,
    id: current.id,
    slug: patch.slug ? uniqueSlug(patch.slug, current.id) : current.slug,
    modules: patch.modules ? normalizeModules(patch.modules) : current.modules,
    updatedAt: nowIso(),
  };
  courses[index] = next;
  persist();
  return cloneValue(next);
}

function normalizeModules(modules: CourseModule[]): CourseModule[] {
  return modules
    .map((mod, index) => ({
      ...mod,
      id: mod.id || createId('mod'),
      order: index + 1,
      lessons: (mod.lessons || []).map((lesson) => ({
        ...lesson,
        id: lesson.id || createId('les'),
        timestamps: lesson.timestamps || [],
      })),
    }))
    .sort((a, b) => a.order - b.order);
}

export function setCourseStatus(id: string, status: CourseStatus, principal?: UserProfile | null): ManagedCourse {
  requirePermission('admin:write', principal);
  const index = courses.findIndex((course) => course.id === id);
  if (index < 0) {
    throw new AuthorizationError('FORBIDDEN', `Course ${id} was not found.`);
  }
  const current = courses[index];
  courses[index] = {
    ...current,
    status,
    publishedAt: status === 'PUBLISHED' ? current.publishedAt || nowIso() : current.publishedAt,
    updatedAt: nowIso(),
  };
  persist();
  return cloneValue(courses[index]);
}

export function deleteCourse(id: string, principal?: UserProfile | null): void {
  requirePermission('admin:write', principal);
  courses = courses.filter((course) => course.id !== id);
  persist();
}

export function addModule(courseId: string, principal?: UserProfile | null): ManagedCourse {
  const course = getManagedCourse(courseId, principal);
  if (!course) throw new AuthorizationError('FORBIDDEN', 'Course not found.');
  const modules = [...course.modules, emptyModule(course.modules.length + 1)];
  return updateCourse(courseId, { modules }, principal);
}

export function addLesson(courseId: string, moduleId: string, principal?: UserProfile | null): ManagedCourse {
  const course = getManagedCourse(courseId, principal);
  if (!course) throw new AuthorizationError('FORBIDDEN', 'Course not found.');
  const modules = course.modules.map((mod) =>
    mod.id === moduleId ? { ...mod, lessons: [...mod.lessons, emptyLesson()] } : mod
  );
  return updateCourse(courseId, { modules }, principal);
}

export function findLesson(course: ManagedCourse, lessonId: string): { module: CourseModule; lesson: CourseLesson } | null {
  for (const mod of course.modules) {
    const lesson = mod.lessons.find((item) => item.id === lessonId);
    if (lesson) return { module: mod, lesson };
  }
  return null;
}

export function flattenLessons(course: ManagedCourse): CourseLesson[] {
  return course.modules.flatMap((mod) => mod.lessons);
}
