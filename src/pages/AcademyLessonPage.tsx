import TopNavBar from "../components/academy/TopNavBar";
import CourseSideNav from "../components/academy/CourseSideNav";
import VideoPlayer from "../components/academy/VideoPlayer";
import LessonNotes from "../components/academy/LessonNotes";
import AIMentorChat from "../components/academy/AIMentorChat";
import QuickQuizFab from "../components/academy/QuickQuizFab";

export default function AcademyLessonPage() {
  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      <TopNavBar />

      <div className="flex flex-1 pt-16">
        <CourseSideNav />

        <main className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <div className="max-w-[1200px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-headline-lg text-headline-lg text-white mb-2">
                  Module 2: Identifying Rug Pulls
                </h1>
                <p className="text-on-surface-variant font-body-md">
                  Learn the forensic patterns of liquidity drain and developer
                  exit scams.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 glass-panel rounded-full flex items-center gap-2 border-primary-fixed-dim/30">
                  <span className="h-2 w-2 rounded-full bg-primary-fixed-dim neon-glow-primary animate-pulse" />
                  <span className="font-label-sm text-label-sm text-primary-fixed-dim">
                    LIVE LESSON
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Video + Notes */}
              <div className="lg:col-span-8 space-y-8">
                <VideoPlayer />
                <LessonNotes />
              </div>

              {/* AI Mentor Sidebar */}
              <div className="lg:col-span-4">
                <AIMentorChat />
              </div>
            </div>
          </div>
        </main>
      </div>

      <QuickQuizFab />
    </div>
  );
}
