export type ProgressTrack = {
  id: string;
  label: string;
  percent: number;
  color: "primary" | "secondary" | "neutral";
};

export type CourseCategory = "Security 101" | "Advanced Auditing" | "Risk Analysis";

export type CourseCard = {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  categoryColor: "primary" | "secondary" | "tertiary";
  progress: number;
  imageUrl: string;
  highlighted?: boolean;
};
