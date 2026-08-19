import { Icon } from '@/components/ui/Icon';
import CourseCard from './CourseCard';
import { COURSES } from '../../data/coursesContent';

export default function CourseGrid() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-data-lg text-data-lg text-on-surface flex items-center gap-2">
          <Icon name="library_books" className="text-primary-fixed" />
          Course Library
        </h3>
        <button className="text-primary-fixed font-label-sm text-label-sm hover:underline hover:text-primary-fixed-dim transition-colors">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSES.map((course) => (
          <CourseCard key={course.title} {...course} />
        ))}
      </div>
    </section>
  );
}
