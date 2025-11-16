export interface StatsSummary {
  totalReviewed: number;
  totalReviewedToday: number;
  totalReviewedThisWeek: number;
  totalReviewedThisMonth: number;
  approvedPercentage: number;
  rejectedPercentage: number;
  requestChangesPercentage: number;
  averageReviewTime: number;
}

export interface ActivityData {
  date: string;
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface DecisionsData {
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface CategoryStats {
  name: string;
  count: number;
}

export interface Stats {
  summary: StatsSummary;
  activity: ActivityData[];
  decisions: DecisionsData;
  categories: CategoryStats[];
}

export type StatsPeriod = "today" | "week" | "month" | "custom";
