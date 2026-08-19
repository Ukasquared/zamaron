export type KpiCard = {
  id: string;
  label: string;
  value: string;
  delta: string;
  icon: string;
  borderColor: "primary" | "secondary";
  iconColor: string;
  deltaColor: string;
};

export type AssessmentRow = {
  id: string;
  moduleId: string;
  name: string;
  timestamp: string;
  score: string;
  proficiency: "MASTER" | "ELITE" | "EXPERT";
};
