import { useState } from 'react';
import { FILTER_TAGS } from '../../data/coursesContent';

export default function FilterPills() {
  const [active, setActive] = useState(FILTER_TAGS.find((t) => t.active)?.label ?? FILTER_TAGS[0].label);

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
      {FILTER_TAGS.map((tag) => {
        const isActive = tag.label === active;
        return (
          <button
            key={tag.label}
            onClick={() => setActive(tag.label)}
            className={
              isActive
                ? 'px-5 py-2 rounded-full border border-primary-fixed text-primary-fixed bg-primary-fixed/10 font-label-sm text-label-sm shadow-[0_0_10px_rgba(125,244,255,0.2)] whitespace-nowrap'
                : 'px-5 py-2 rounded-full border border-outline/30 text-on-surface-variant hover:text-on-surface hover:border-outline/60 dashboard-glass-panel font-label-sm text-label-sm whitespace-nowrap transition-colors'
            }
          >
            {tag.label}
          </button>
        );
      })}
    </div>
  );
}
