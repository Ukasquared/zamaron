import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { StatCard } from '@/components/shared/StatCard';
import { useAuth } from '@/context/AuthContext';
import { durationMinutesOf, listManagedCourses, setCourseStatus, deleteCourse } from '@/services/courseService';
import type { CourseStatus, ManagedCourse } from '@/types/lms';

export const ContentAdministrationPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'ALL' | CourseStatus>('ALL');
  const [tick, setTick] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const courses = useMemo(() => {
    try {
      return listManagedCourses(user);
    } catch {
      return [] as ManagedCourse[];
    }
  }, [user, tick]);

  const filtered = courses.filter((course) => {
    const matchesStatus = status === 'ALL' || course.status === status;
    const hay = `${course.title} ${course.slug} ${course.instructor} ${course.category}`.toLowerCase();
    return matchesStatus && hay.includes(query.toLowerCase());
  });

  const published = courses.filter((course) => course.status === 'PUBLISHED').length;

  const act = (fn: () => void) => {
    setError(null);
    try {
      fn();
      setTick((n) => n + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action failed.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">ACADEMY CONTENT</Badge>
            <span className="text-xs font-mono text-slate-400">Course, module, and documentation catalog</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Content Administration
          </h1>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/course-builder">
            <Button variant="outline" size="sm" icon="edit_note">
              Open Builder
            </Button>
          </Link>
          <Button size="sm" icon="add" onClick={() => navigate('/admin/course-builder')}>
            Create Course
          </Button>
        </div>
      </div>

      {error && <div className="text-xs font-mono text-error bg-error/10 border border-error/40 rounded px-3 py-2">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Courses" value={courses.length} icon="library_books" variant="fresnel" />
        <StatCard label="Published" value={published} delta="Visible to learners" icon="publish" variant="glass" />
        <StatCard
          label="Draft / Archived"
          value={courses.length - published}
          icon="inventory_2"
          variant="glass"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 bg-[#081024] p-4 rounded border border-outline/70">
        <div className="flex-1">
          <Input placeholder="Search title, slug, instructor..." value={query} onChange={(e) => setQuery(e.target.value)} icon="search" />
        </div>
        <div className="flex gap-1">
          {(['ALL', 'PUBLISHED', 'DRAFT', 'ARCHIVED'] as const).map((item) => (
            <button
              key={item}
              onClick={() => setStatus(item)}
              className={`px-3 py-1.5 rounded text-xs font-mono cursor-pointer ${
                status === item ? 'bg-primary text-[#00363d] font-bold' : 'bg-surface-variant text-slate-400'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <Card variant="glass" className="p-6">
        <div className="overflow-x-auto cyber-scrollbar">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-outline/70 text-slate-400 uppercase text-[10px]">
                <th className="pb-3 pr-3">Course</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3">Modules</th>
                <th className="pb-3 px-3">Duration</th>
                <th className="pb-3 pl-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/40">
              {filtered.map((course) => (
                <tr key={course.id} className="hover:bg-white/5">
                  <td className="py-3 pr-3">
                    <div className="font-display font-bold text-sm text-white">{course.title}</div>
                    <div className="text-[10px] text-slate-500">
                      {course.slug} • {course.difficulty} • {course.instructor}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant={course.status === 'PUBLISHED' ? 'success' : course.status === 'DRAFT' ? 'warning' : 'outline'} size="sm">
                      {course.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-slate-300">{course.modules.length}</td>
                  <td className="py-3 px-3 text-slate-300">{durationMinutesOf(course)} min</td>
                  <td className="py-3 pl-3">
                    <div className="flex justify-end gap-1.5">
                      <Link to={`/admin/course-builder?id=${course.id}`}>
                        <Button variant="outline" size="sm" icon="edit">
                          Edit
                        </Button>
                      </Link>
                      {course.status !== 'PUBLISHED' ? (
                        <Button size="sm" icon="publish" onClick={() => act(() => setCourseStatus(course.id, 'PUBLISHED', user))}>
                          Publish
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          icon="inventory_2"
                          onClick={() => act(() => setCourseStatus(course.id, 'ARCHIVED', user))}
                        >
                          Archive
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" icon="delete" onClick={() => act(() => deleteCourse(course.id, user))}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="text-center text-slate-500 py-8">No courses match this filter.</p>}
        </div>
      </Card>
    </div>
  );
};

export default ContentAdministrationPage;
