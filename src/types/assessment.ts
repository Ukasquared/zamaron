export type QuizOption = {
  id: string;
  label: string; // A, B, C, D
  text: string;
};

export type QuizQuestion = {
  id: string;
  number: number;
  total: number;
  prompt: string;
  codeSnippet?: {
    language: string;
    lines: { text: string; type?: "keyword" | "function" | "string" | "comment" | "error" | "number" | "plain" }[];
  };
  options: QuizOption[];
};

export type AssessmentMeta = {
  courseTitle: string;
  phaseLabel: string;
  timeRemaining: string;
  progressPercent: number;
};

export type TipCard = {
  id: string;
  type: "tip" | "streak";
  icon: string;
  title: string;
  message: string;
};
