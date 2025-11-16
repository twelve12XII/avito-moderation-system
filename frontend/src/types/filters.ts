export type SortBy = "createdAt" | "price" | "priority";
export type SortOrder = "asc" | "desc";

export interface AdFilters {
  category?: string;
  categoryId?: string;
  status?: string[];
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}
