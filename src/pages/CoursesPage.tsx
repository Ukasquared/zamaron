import DashboardSidebar from '../components/courses/DashboardSidebar';
import MobileTopNav from '../components/courses/MobileTopNav';
import MobileBottomNav from '../components/courses/MobileBottomNav';
import SearchBar from '../components/courses/SearchBar';
import FilterPills from '../components/courses/FilterPills';
import FeaturedCourseHero from '../components/courses/FeaturedCourseHero';
import CourseGrid from '../components/courses/CourseGrid';
import Icon from '../components/Icon';

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen font-body-md text-body-md overflow-hidden bg-background dashboard-grid-bg antialiased selection:bg-primary-container selection:text-on-primary-container">
      <MobileTopNav />
      <DashboardSidebar />

      <main className="flex-1 md:ml-64 h-screen overflow-y-auto pt-24 md:pt-8 px-4 md:px-8 pb-24 md:pb-8">
        <header className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-display-xl text-display-xl text-on-surface mb-2">
              Continue Learning, <span className="text-primary-fixed dashboard-holographic-glow">Alex</span>
            </h1>
            <p className="text-on-surface-variant">Your journey to mastering the digital frontier continues.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
            <SearchBar />
            <button className="dashboard-glass-panel rounded-full p-2 text-on-surface hover:text-primary-fixed transition-colors">
              <Icon name="tune" />
            </button>
          </div>
        </header>

        <div className="max-w-6xl mx-auto space-y-12">
          <FilterPills />
          <FeaturedCourseHero />
          <CourseGrid />
        </div>
      </main>

      <MobileBottomNav />
    </div>
  );
}
