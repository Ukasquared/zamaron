import React from 'react';
import { Badge } from '@/components/ui/Badge';
import CourseGrid from '@/components/courses/CourseGrid';
import FeaturedCourseHero from '@/components/courses/FeaturedCourseHero';
import FilterPills from '@/components/courses/FilterPills';
import SearchBar from '@/components/courses/SearchBar';

export const CoursesLibraryPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-16">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="primary">ZAMARON ACADEMY</Badge>
            <span className="text-xs font-mono text-slate-400">Course library</span>
          </div>
          <h1 className="font-display font-black text-3xl text-white">Continue Learning</h1>
          <p className="text-sm text-slate-400 mt-2">Build practical security mastery across the digital frontier.</p>
        </div>
        <div className="w-full lg:w-80"><SearchBar /></div>
      </header>

      <FilterPills />
      <FeaturedCourseHero />
      <CourseGrid />
    </div>
  );
};
