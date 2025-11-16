export type Status = "pending" | "approved" | "rejected" | "draft";
export interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: number;
  status: Status;
  priority: "normal" | "urgent";
  createdAt: string;
  updatedAt: string;
  images: string[];
  characteristics: Record<string, string>;
  moderationHistory: ModerationHistory[];
  seller: Seller;
}

export interface Seller {
  id: number;
  name: string;
  rating: string;
  totalAds: number;
  registeredAt: string;
}

export interface ModerationHistory {
  id: number;
  moderatorId: number;
  moderatorName: string;
  action: "approved" | "rejected" | "requestChanges";
  reason: string | null;
  comment: string;
  timestamp: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}
