import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import AIMentorChat from '@/components/academy/AIMentorChat';
import LessonNotes from '@/components/academy/LessonNotes';
import QuickQuizFab from '@/components/academy/QuickQuizFab';
import VideoPlayer from '@/components/academy/VideoPlayer';

export const CoursePlayerPage: React.FC = () => {
  const [activeModule, setActiveModule] = useState(2);

  const modules = [
    { num: 1, title: 'Module 1: Introduction to Smart Contract Scams', duration: '24 mins', completed: true },
    { num: 2, title: 'Module 2: Identifying Rug Pulls & Liquidity Drain', duration: '38 mins', completed: false },
    { num: 3, title: 'Module 3: Bytecode Disassembly & Hidden Mint Logic', duration: '45 mins', completed: false },
    { num: 4, title: 'Module 4: Reentrancy & Cross-Contract Calls', duration: '50 mins', completed: false },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-4 rounded-md">
        <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
          <Badge variant="primary">ZAMARON ACADEMY</Badge>
          <span>Crypto Security 101</span>
        </div>

        <Link to="/academy/assessment/crs-101">
          <Button size="sm" icon="fact_check">
            Take Final Assessment
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Video Canvas & Transcript (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <VideoPlayer />

          <Card variant="glass" className="p-6 space-y-3">
            <h4 className="font-display font-bold text-base text-white">Key Takeaways & Core Concepts</h4>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              In this module, we examine how malicious token creators embed conditional transfer tax overrides, stealth owner mint privileges, and fake liquidity lockup contracts.
            </p>
          </Card>
        </div>

        {/* Curriculum Index Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="font-display font-bold text-base text-white">Course Curriculum</h3>
          <div className="space-y-2">
            {modules.map((m) => (
              <div
                key={m.num}
                onClick={() => setActiveModule(m.num)}
                className={`p-3.5 rounded border transition-all cursor-pointer ${
                  activeModule === m.num
                    ? 'bg-primary/15 border-primary shadow-[0_0_15px_rgba(0,218,243,0.25)]'
                    : 'bg-[#0b1326] border-outline/70 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400">{m.duration}</span>
                  {m.completed ? (
                    <Badge variant="success" size="sm">DONE</Badge>
                  ) : (
                    <Badge variant="outline" size="sm">INCOMPLETE</Badge>
                  )}
                </div>
                <div className="font-display font-semibold text-xs text-white">{m.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <LessonNotes />
        <AIMentorChat />
      </div>

      <QuickQuizFab />
    </div>
  );
};
