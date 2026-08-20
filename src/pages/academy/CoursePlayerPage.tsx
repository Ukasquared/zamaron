import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { useAuth } from '@/context/AuthContext';
import { renderMarkdown } from '@/lib/markdown';
import { flattenLessons, getManagedCourse, listPublishedCourses } from '@/services/courseService';
import { getProgress, markLessonComplete } from '@/services/academyService';
import type { CourseLesson, ManagedCourse } from '@/types/lms';

export const CoursePlayerPage: React.FC = () => {
  const { courseId = 'crypto-security-101' } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const [course, setCourse] = useState<ManagedCourse | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [catalog, setCatalog] = useState<ManagedCourse[]>([]);

  useEffect(() => {
    try {
      const found = getManagedCourse(courseId, user);
      setCourse(found);
      setCatalog(listPublishedCourses(user));
      if (found && user) {
        const row = getProgress(user.id, found.id, user);
        setCompleted(row?.completedLessonIds ?? []);
        setProgress(row?.progressPercent ?? 0);
        const lessons = flattenLessons(found);
        setActiveLessonId(row?.lastLessonId || lessons[0]?.id || '');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load course.');
    }
  }, [courseId, user]);

  const lessons = useMemo(() => (course ? flattenLessons(course) : []), [course]);
  const active: CourseLesson | undefined = lessons.find((lesson) => lesson.id === activeLessonId) || lessons[0];

  const completeLesson = () => {
    if (!course || !user || !active) return;
    try {
      const next = markLessonComplete(user.id, course.id, active.id, user);
      setCompleted(next.completedLessonIds);
      setProgress(next.progressPercent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save progress.');
    }
  };

  if (error) {
    return (
      <Card variant="glass" className="p-10 text-center">
        <p className="text-sm text-error font-mono">{error}</p>
      </Card>
    );
  }

  if (!course || !active) {
    return (
      <div className="space-y-4">
        <Card variant="glass" className="p-10 text-center space-y-3">
          <h2 className="font-display font-bold text-xl text-white">Course unavailable</h2>
          <p className="text-sm text-slate-400">This course is not published or does not exist.</p>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {catalog.map((item) => (
            <Link key={item.id} to={`/academy/learn/${item.slug}`}>
              <Card variant="glass" hoverEffect className="p-4">
                <div className="font-display font-bold text-white">{item.title}</div>
                <div className="text-[11px] font-mono text-slate-400">{item.difficulty}</div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-4 rounded-md">
        <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
          <Badge variant="primary">ZAMARON ACADEMY</Badge>
          <span>{course.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-slate-400">{progress}% complete</span>
          <Link to={`/academy/assessment/${course.id}`}>
            <Button size="sm" icon="fact_check">
              Take Final Assessment
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-4">
          <Card variant="fresnel" className="p-0 overflow-hidden bg-black aspect-video flex items-center justify-center relative">
            <div className="text-center space-y-3 p-6">
              <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(0,218,243,0.4)]">
                <Icon name="play_arrow" size={36} />
              </div>
              <h3 className="font-display font-bold text-lg text-white">{active.title}</h3>
              <p className="text-xs font-mono text-slate-400">
                {active.durationMinutes} mins • {active.instructor || course.instructor}
              </p>
              {active.videoUrl && <p className="text-[10px] font-mono text-slate-500 break-all">{active.videoUrl}</p>}
            </div>
          </Card>

          {active.timestamps.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {active.timestamps.map((stamp) => (
                <Badge key={stamp.id} variant="outline" size="sm">
                  {stamp.time} {stamp.label}
                </Badge>
              ))}
            </div>
          )}

          <Card variant="glass" className="p-6 space-y-3">
            <h4 className="font-display font-bold text-base text-white">Lesson Notes</h4>
            <div dangerouslySetInnerHTML={{ __html: renderMarkdown(active.content) }} />
            {active.takeaways && <p className="text-xs text-slate-300 font-sans leading-relaxed pt-2 border-t border-outline/40">{active.takeaways}</p>}
            <div className="flex justify-end pt-2">
              <Button size="sm" icon="check_circle" onClick={completeLesson}>
                {completed.includes(active.id) ? 'Completed' : 'Mark Lesson Complete'}
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-3">
          <h3 className="font-display font-bold text-base text-white">Course Curriculum</h3>
          {course.modules.map((mod) => (
            <div key={mod.id} className="space-y-2">
              <div className="text-[10px] font-mono text-slate-500 uppercase">{mod.title}</div>
              {mod.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => setActiveLessonId(lesson.id)}
                  className={`p-3.5 rounded border transition-all cursor-pointer ${
                    active.id === lesson.id
                      ? 'bg-primary/15 border-primary shadow-[0_0_15px_rgba(0,218,243,0.25)]'
                      : 'bg-[#0b1326] border-outline/70 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-slate-400">{lesson.durationMinutes} mins</span>
                    {completed.includes(lesson.id) ? (
                      <Badge variant="success" size="sm">
                        DONE
                      </Badge>
                    ) : (
                      <Badge variant="outline" size="sm">
                        INCOMPLETE
                      </Badge>
                    )}
                  </div>
                  <div className="font-display font-semibold text-xs text-white">{lesson.title}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
