export interface NavLink {
  label: string;
  href: string;
}

export interface TrustBadgeData {
  icon: string;
  label: string;
  iconColorClass: string;
}

export interface FeatureData {
  icon: string;
  eyebrow: string;
  eyebrowColorClass: string;
  title: string;
  titleColorClass: string;
  description: string;
  iconBgClass: string;
  iconBorderClass: string;
  glowClass: string;
  /** True for the middle "featured" card that floats up and gets a glow blob */
  offset?: boolean;
}

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'sm' | 'lg';

// --- Risk Report page ---

export interface SidebarNavItemData {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
}

export interface StatusMetricData {
  icon: string;
  statusIcon: string;
  label: string;
  value: string;
  description: string;
}

export type ThreatSeverity = 'critical' | 'warning';

export interface ThreatItemData {
  severity: ThreatSeverity;
  title: string;
  description: string;
  /** Lines of a code snippet, rendered monospace, one per line */
  code?: string[];
}

export interface TextRun {
  text: string;
  bold?: boolean;
}

export interface ChatMessageData {
  sender: 'ai' | 'user';
  senderLabel: string;
  /** Each entry is a paragraph, made up of one or more text runs */
  paragraphs: TextRun[][];
}

// --- Courses dashboard page ---

export interface DashboardNavItemData {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
}

export interface FilterTagData {
  label: string;
  active?: boolean;
}

export type CourseAccent = 'neutral' | 'primary' | 'secondary';

export interface CourseData {
  title: string;
  description: string;
  hours: string;
  level: string;
  accent: CourseAccent;
  imageUrl: string;
  imageAlt: string;
}
