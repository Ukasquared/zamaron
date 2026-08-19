export type RiskPattern = {
  id: string;
  code: string;
  name: string;
  riskLabel: string;
  riskVariant: "high" | "normalized" | "observed";
  description: string;
  progressPercent: number;
  barColor: "secondary" | "cyan" | "tertiary";
  titleColor: string;
};

export type ReportTemplate = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconVariant: "primary" | "secondary" | "tertiary";
};
