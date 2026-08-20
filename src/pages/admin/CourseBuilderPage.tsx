import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Icon } from '@/components/ui/Icon';
import { useAuth } from '@/context/AuthContext';
import { renderMarkdown } from '@/lib/markdown';
import type { CourseLesson, CourseModule, ManagedCourse } from '@/types/lms';
import type { AcademyCourse } from '@/types';
import {
  addLesson,
  addModule,
  createCourse,
  deleteCourse,
  getManagedCourse,
  listManagedCourses,
  setCourseStatus,
  updateCourse,
} from '@/services/courseService';

const TEXTAREA =
  'w-full bg-[#060e20] border border-outline/70 rounded p-3 text-xs font-mono text-slate-200 focus:border-primary focus:outline-none';

const CATEGORIES: AcademyCourse['category'][] = ['SMART_CONTRACT', 'DEFI_SECURITY', 'FORENSICS', 'OPCODES'];
const DIFFICULTIES: AcademyCourse['difficulty'][] = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'ELITE'];

interface Props {
  enhanced?: boolean;
}

export const CourseBuilderPage: React.FC<Props> = ({ enhanced = false }) => {
  const { user } = useAuth();
  const [params, setParams] = useSearchParams();
  const [catalog, setCatalog] = useState<ManagedCourse[]>([]);
  const [course, setCourse] = useState<ManagedCourse | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string>('');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const requestedId = params.get('id');

  const reloadCatalog = () => {
    try {
      setCatalog(listManagedCourses(user));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load courses.');
    }
  };

  useEffect(() => {
    reloadCatalog();
  }, [user]);

  useEffect(() => {
    if (!requestedId) {
      setCourse(null);
      return;
    }
    try {
      const found = getManagedCourse(requestedId, user);
      setCourse(found);
      if (found) {
        const firstModule = found.modules[0];
        const firstLesson = firstModule?.lessons[0];
        setSelectedModuleId(firstModule?.id ?? '');
        setSelectedLessonId(firstLesson?.id ?? '');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to open course.');
    }
  }, [requestedId, user]);

  const selectedModule = course?.modules.find((mod) => mod.id === selectedModuleId) ?? null;
  const selectedLesson =
    selectedModule?.lessons.find((lesson) => lesson.id === selectedLessonId) ??
    selectedModule?.lessons[0] ??
    null;

  const openCourse = (id: string) => {
    setParams({ id });
    setMessage(null);
    setError(null);
  };

  const handleCreate = () => {
    setError(null);
    try {
      const created = createCourse(
        {
          title: 'New Academy Course',
          description: 'Describe the learning outcome and the threat model this course covers.',
          category: 'SMART_CONTRACT',
          difficulty: 'BEGINNER',
          instructor: user?.name || 'Zamaron Academy',
        },
        user
      );
      reloadCatalog();
      openCourse(created.id);
      setMessage('Draft course created. Configure metadata and curriculum, then publish.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Create failed.');
    }
  };

  const persist = (next: ManagedCourse, note: string) => {
    setSaving(true);
    setError(null);
    try {
      const saved = updateCourse(
        next.id,
        {
          title: next.title,
          slug: next.slug,
          description: next.description,
          category: next.category,
          difficulty: next.difficulty,
          instructor: next.instructor,
          thumbnail: next.thumbnail,
          xpReward: next.xpReward,
          modules: next.modules,
        },
        user
      );
      setCourse(saved);
      reloadCatalog();
      setMessage(note);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed.');
    } finally {
      setSaving(false);
    }
  };

  const patchCourse = (patch: Partial<ManagedCourse>) => {
    if (!course) return;
    setCourse({ ...course, ...patch });
  };

  const patchModules = (modules: CourseModule[]) => {
    if (!course) return;
    setCourse({ ...course, modules });
  };

  const patchLesson = (lessonPatch: Partial<CourseLesson>) => {
    if (!course || !selectedModule || !selectedLesson) return;
    const modules = course.modules.map((mod) =>
      mod.id !== selectedModule.id
        ? mod
        : {
            ...mod,
            lessons: mod.lessons.map((lesson) =>
              lesson.id === selectedLesson.id ? { ...lesson, ...lessonPatch } : lesson
            ),
          }
    );
    patchModules(modules);
  };

  const handleSave = () => {
    if (!course) return;
    persist(course, 'Course draft saved to the academy catalog.');
  };

  const handlePublish = () => {
    if (!course) return;
    try {
      persist(course, 'Metadata saved.');
      const published = setCourseStatus(course.id, 'PUBLISHED', user);
      setCourse(published);
      reloadCatalog();
      setMessage('Published to Academy. Learners can now open this course.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Publish failed.');
    }
  };

  const handleArchive = () => {
    if (!course) return;
    try {
      const archived = setCourseStatus(course.id, 'ARCHIVED', user);
      setCourse(archived);
      reloadCatalog();
      setMessage('Course archived. It is hidden from the learner catalog.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Archive failed.');
    }
  };

  const handleDelete = () => {
    if (!course) return;
    if (!window.confirm(`Delete “${course.title}”? This cannot be undone.`)) return;
    try {
      deleteCourse(course.id, user);
      setCourse(null);
      setParams({});
      reloadCatalog();
      setMessage('Course deleted.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed.');
    }
  };

  const handleAddModule = () => {
    if (!course) return;
    try {
      const next = addModule(course.id, user);
      setCourse(next);
      const last = next.modules[next.modules.length - 1];
      setSelectedModuleId(last.id);
      setSelectedLessonId(last.lessons[0]?.id ?? '');
      reloadCatalog();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not add module.');
    }
  };

  const handleAddLesson = () => {
    if (!course || !selectedModule) return;
    try {
      const next = addLesson(course.id, selectedModule.id, user);
      setCourse(next);
      const mod = next.modules.find((item) => item.id === selectedModule.id);
      const last = mod?.lessons[mod.lessons.length - 1];
      if (last) setSelectedLessonId(last.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not add lesson.');
    }
  };

  const moveModule = (moduleId: string, direction: -1 | 1) => {
    if (!course) return;
    const index = course.modules.findIndex((mod) => mod.id === moduleId);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= course.modules.length) return;
    const modules = [...course.modules];
    const [item] = modules.splice(index, 1);
    modules.splice(target, 0, item);
    patchModules(modules);
  };

  const removeModule = (moduleId: string) => {
    if (!course) return;
    const modules = course.modules.filter((mod) => mod.id !== moduleId);
    patchModules(modules);
    if (selectedModuleId === moduleId) {
      setSelectedModuleId(modules[0]?.id ?? '');
      setSelectedLessonId(modules[0]?.lessons[0]?.id ?? '');
    }
  };

  const removeLesson = (lessonId: string) => {
    if (!course || !selectedModule) return;
    const modules = course.modules.map((mod) =>
      mod.id === selectedModule.id ? { ...mod, lessons: mod.lessons.filter((lesson) => lesson.id !== lessonId) } : mod
    );
    patchModules(modules);
    if (selectedLessonId === lessonId) {
      const next = modules.find((mod) => mod.id === selectedModule.id);
      setSelectedLessonId(next?.lessons[0]?.id ?? '');
    }
  };

  const addTimestamp = () => {
    if (!selectedLesson) return;
    patchLesson({
      timestamps: [
        ...selectedLesson.timestamps,
        { id: `ts-${Date.now().toString(36)}`, time: '00:00', label: 'New marker' },
      ],
    });
  };

  const lessonCount = useMemo(
    () => course?.modules.reduce((sum, mod) => sum + mod.lessons.length, 0) ?? 0,
    [course]
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="primary">{enhanced ? 'VIDEO LESSON TERMINAL' : 'COURSE CREATION TERMINAL'}</Badge>
            <span className="text-xs font-mono text-slate-400">
              {enhanced ? 'Timestamped media + live markdown preview' : 'Metadata, curriculum, publish'}
            </span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            {enhanced ? 'Course Builder (Video Enhanced)' : 'Course Creation Terminal'}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/admin/content">
            <Button variant="outline" size="sm" icon="view_list">
              Content Catalog
            </Button>
          </Link>
          {course && (
            <Link to={`/academy/learn/${course.slug}`}>
              <Button variant="terminal" size="sm" icon="visibility">
                Preview as Learner
              </Button>
            </Link>
          )}
          <Button size="sm" icon="add" onClick={handleCreate}>
            New Course
          </Button>
        </div>
      </div>

      {(message || error) && (
        <div
          className={`text-xs font-mono rounded px-3 py-2 border ${
            error ? 'text-error bg-error/10 border-error/40' : 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30'
          }`}
        >
          {error || message}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-3 space-y-3">
          <Card variant="glass" className="p-4 space-y-3">
            <CardHeader className="mb-1">
              <CardTitle className="text-base">Catalog</CardTitle>
              <span className="text-[10px] font-mono text-slate-500">{catalog.length}</span>
            </CardHeader>
            <div className="space-y-2 max-h-[520px] overflow-y-auto cyber-scrollbar">
              {catalog.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openCourse(item.id)}
                  className={`w-full text-left p-3 rounded border transition-all cursor-pointer ${
                    course?.id === item.id
                      ? 'bg-primary/15 border-primary'
                      : 'bg-[#060e20] border-outline/70 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-display font-semibold text-xs text-white line-clamp-2">{item.title}</span>
                    <Badge
                      variant={item.status === 'PUBLISHED' ? 'success' : item.status === 'ARCHIVED' ? 'outline' : 'warning'}
                      size="sm"
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">
                    {item.modules.length} modules • {item.difficulty}
                  </div>
                </button>
              ))}
              {catalog.length === 0 && (
                <p className="text-xs text-slate-500 font-mono p-3">No courses yet. Create one to begin.</p>
              )}
            </div>
          </Card>
        </div>

        <div className="xl:col-span-9 space-y-6">
          {!course ? (
            <Card variant="fresnel" className="p-10 text-center space-y-3">
              <Icon name="edit_note" size={36} className="text-primary mx-auto" />
              <h2 className="font-display font-bold text-xl text-white">Select or create a course</h2>
              <p className="text-sm text-slate-400 max-w-lg mx-auto">
                Authorized admins can author curriculum, attach lesson media, save drafts, and publish into the Academy
                player used by learners.
              </p>
              <Button onClick={handleCreate} icon="add">
                Create Draft Course
              </Button>
            </Card>
          ) : (
            <>
              <Card variant="glass" className="p-6 space-y-4">
                <CardHeader className="mb-1">
                  <CardTitle>Course Metadata</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={course.status === 'PUBLISHED' ? 'success' : 'warning'} size="sm">
                      {course.status}
                    </Badge>
                    <span className="text-[10px] font-mono text-slate-500">
                      {lessonCount} lessons
                    </span>
                  </div>
                </CardHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Title" value={course.title} onChange={(e) => patchCourse({ title: e.target.value })} />
                  <Input label="Slug" value={course.slug} onChange={(e) => patchCourse({ slug: e.target.value })} />
                  <Input
                    label="Instructor"
                    value={course.instructor}
                    onChange={(e) => patchCourse({ instructor: e.target.value })}
                  />
                  <Input
                    label="XP Reward"
                    type="number"
                    value={course.xpReward}
                    onChange={(e) => patchCourse({ xpReward: Number(e.target.value) || 0 })}
                  />
                  <Select
                    label="Category"
                    value={course.category}
                    onChange={(e) => patchCourse({ category: e.target.value as AcademyCourse['category'] })}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </Select>
                  <Select
                    label="Difficulty"
                    value={course.difficulty}
                    onChange={(e) => patchCourse({ difficulty: e.target.value as AcademyCourse['difficulty'] })}
                  >
                    {DIFFICULTIES.map((diff) => (
                      <option key={diff} value={diff}>
                        {diff}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    className={TEXTAREA}
                    value={course.description}
                    onChange={(e) => patchCourse({ description: e.target.value })}
                  />
                </div>
                <div className="flex flex-wrap justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={handleDelete} icon="delete">
                    Delete
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleArchive} icon="inventory_2">
                    Archive
                  </Button>
                  <Button variant="outline" size="sm" loading={saving} onClick={handleSave} icon="save">
                    Save Draft
                  </Button>
                  <Button size="sm" onClick={handlePublish} icon="publish">
                    Publish to Academy
                  </Button>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <Card variant="glass" className="lg:col-span-4 p-5 space-y-4">
                  <CardHeader className="mb-1">
                    <CardTitle>Curriculum</CardTitle>
                    <Button variant="ghost" size="sm" icon="add" onClick={handleAddModule}>
                      Module
                    </Button>
                  </CardHeader>
                  <div className="space-y-3">
                    {course.modules.map((mod, index) => (
                      <div key={mod.id} className="border border-outline/60 rounded p-3 bg-[#060e20] space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedModuleId(mod.id);
                              setSelectedLessonId(mod.lessons[0]?.id ?? '');
                            }}
                            className="text-left flex-1 cursor-pointer"
                          >
                            <div className="text-[10px] font-mono text-slate-500">MODULE {index + 1}</div>
                            <input
                              className="w-full bg-transparent text-sm font-display font-bold text-white outline-none"
                              value={mod.title}
                              onChange={(e) =>
                                patchModules(
                                  course.modules.map((item) =>
                                    item.id === mod.id ? { ...item, title: e.target.value } : item
                                  )
                                )
                              }
                            />
                          </button>
                          <div className="flex items-center gap-1">
                            <button type="button" className="text-slate-500 hover:text-white" onClick={() => moveModule(mod.id, -1)}>
                              <Icon name="expand_less" size={16} />
                            </button>
                            <button type="button" className="text-slate-500 hover:text-white" onClick={() => moveModule(mod.id, 1)}>
                              <Icon name="expand_more" size={16} />
                            </button>
                            <button type="button" className="text-slate-500 hover:text-error" onClick={() => removeModule(mod.id)}>
                              <Icon name="close" size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          {mod.lessons.map((lesson) => (
                            <button
                              key={lesson.id}
                              type="button"
                              onClick={() => {
                                setSelectedModuleId(mod.id);
                                setSelectedLessonId(lesson.id);
                              }}
                              className={`w-full text-left px-2 py-1.5 rounded text-[11px] font-mono cursor-pointer ${
                                selectedLessonId === lesson.id
                                  ? 'bg-primary/20 text-primary'
                                  : 'text-slate-400 hover:bg-white/5'
                              }`}
                            >
                              {lesson.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card variant={enhanced ? 'fresnel' : 'glass'} className="lg:col-span-8 p-5 space-y-4">
                  <CardHeader className="mb-1">
                    <CardTitle>{enhanced ? 'Lesson Studio' : 'Lesson Editor'}</CardTitle>
                    <Button variant="ghost" size="sm" icon="add" onClick={handleAddLesson} disabled={!selectedModule}>
                      Lesson
                    </Button>
                  </CardHeader>

                  {!selectedLesson ? (
                    <p className="text-xs font-mono text-slate-500">Select a lesson to edit.</p>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input
                          label="Lesson Title"
                          value={selectedLesson.title}
                          onChange={(e) => patchLesson({ title: e.target.value })}
                        />
                        <Input
                          label="Duration (minutes)"
                          type="number"
                          value={selectedLesson.durationMinutes}
                          onChange={(e) => patchLesson({ durationMinutes: Number(e.target.value) || 0 })}
                        />
                        <Input
                          label="Instructor"
                          value={selectedLesson.instructor || ''}
                          onChange={(e) => patchLesson({ instructor: e.target.value })}
                        />
                        <Input
                          label="Video URL"
                          value={selectedLesson.videoUrl || ''}
                          onChange={(e) => patchLesson({ videoUrl: e.target.value })}
                        />
                      </div>
                      <Input
                        label="Key takeaways"
                        value={selectedLesson.takeaways || ''}
                        onChange={(e) => patchLesson({ takeaways: e.target.value })}
                      />

                      {enhanced && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono text-slate-300 uppercase">Video timestamps</span>
                            <Button variant="ghost" size="sm" icon="flag" onClick={addTimestamp}>
                              Add marker
                            </Button>
                          </div>
                          {selectedLesson.timestamps.map((stamp, stampIndex) => (
                            <div key={stamp.id} className="grid grid-cols-5 gap-2">
                              <Input
                                value={stamp.time}
                                onChange={(e) => {
                                  const timestamps = selectedLesson.timestamps.map((item, i) =>
                                    i === stampIndex ? { ...item, time: e.target.value } : item
                                  );
                                  patchLesson({ timestamps });
                                }}
                              />
                              <div className="col-span-3">
                                <Input
                                  value={stamp.label}
                                  onChange={(e) => {
                                    const timestamps = selectedLesson.timestamps.map((item, i) =>
                                      i === stampIndex ? { ...item, label: e.target.value } : item
                                    );
                                    patchLesson({ timestamps });
                                  }}
                                />
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                icon="close"
                                onClick={() =>
                                  patchLesson({
                                    timestamps: selectedLesson.timestamps.filter((item) => item.id !== stamp.id),
                                  })
                                }
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className={enhanced ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : ''}>
                        <div>
                          <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                            Lesson markdown
                          </label>
                          <textarea
                            rows={enhanced ? 16 : 10}
                            className={TEXTAREA}
                            value={selectedLesson.content}
                            onChange={(e) => patchLesson({ content: e.target.value })}
                          />
                        </div>
                        {enhanced && (
                          <div>
                            <span className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                              Live preview
                            </span>
                            <div
                              className="min-h-[280px] bg-[#060e20] border border-primary/20 rounded p-4 space-y-2 overflow-y-auto max-h-[420px]"
                              dangerouslySetInnerHTML={{ __html: renderMarkdown(selectedLesson.content) }}
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between">
                        <Button variant="danger" size="sm" icon="delete" onClick={() => removeLesson(selectedLesson.id)}>
                          Remove Lesson
                        </Button>
                        <Button size="sm" icon="save" loading={saving} onClick={handleSave}>
                          Save Lesson & Course
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseBuilderPage;
