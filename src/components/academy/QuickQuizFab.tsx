export default function QuickQuizFab() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button className="flex items-center gap-3 bg-gradient-to-r from-secondary-container to-secondary-fixed text-on-secondary-container px-6 py-4 rounded-full font-headline-lg text-body-md font-bold shadow-[0_10px_30px_rgba(207,92,255,0.3)] hover:scale-105 active:scale-95 transition-all scanning-sweep">
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          bolt
        </span>
        Take Quick Quiz
      </button>
    </div>
  );
}
