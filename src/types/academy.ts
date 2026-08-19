export type NavItem = {
  id: string;
  label: string;
  icon: string;
  href: string;
  active?: boolean;
};

export type LessonNote = {
  id: string;
  title: string;
  description: string;
  icon: string;
  variant: "primary" | "secondary";
};

export type ChatMessage = {
  id: string;
  role: "system" | "assistant" | "user";
  content: string;
  timestamp?: string;
  highlight?: string;
};

export type CourseModule = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
};

export type VideoMeta = {
  title: string;
  duration: string;
  currentTime: string;
  progress: number; // 0-100
  quality: string;
  thumbnailUrl: string;
};
