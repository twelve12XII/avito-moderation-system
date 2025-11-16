import { api } from "./api";
import type { Ad } from "../types/ad";
import type { AdFilters } from "../types/filters";
import type { ListResponse } from "../types/api";

export const adsService = {
  getAds: async (
    page: number = 1,
    limit: number = 10,
    filters: AdFilters = {}
  ): Promise<ListResponse<Ad>> => {
    const params = new URLSearchParams();

    if (filters.categoryId) {
      params.set("categoryId", filters.categoryId);
    }
    if (
      filters.status &&
      Array.isArray(filters.status) &&
      filters.status.length > 0
    ) {
      filters.status.forEach((status) => {
        params.append("status", status);
      });
    }
    if (filters.minPrice) {
      params.set("minPrice", String(filters.minPrice));
    }
    if (filters.maxPrice) {
      params.set("maxPrice", String(filters.maxPrice));
    }
    if (filters.search) {
      params.set("search", filters.search);
    }
    if (filters.sortBy) {
      params.set("sortBy", filters.sortBy);
    }
    if (filters.sortOrder) {
      params.set("sortOrder", filters.sortOrder);
    }

    params.append("page", String(page));
    params.append("limit", String(limit));
    const response = await api.get(`/ads?${params}`);
    return response.data;
  },
  getAdById: async (id: string): Promise<Ad> => {
    const response = await api.get(`/ads/${id}`);
    return response.data;
  },

  approveAd: async (adId: string, comment?: string): Promise<Ad> => {
    const response = await api.post(`/ads/${adId}/approve`, { comment });
    return response.data;
  },
  rejectAd: async (
    adId: string,
    reason: string,
    comment?: string
  ): Promise<Ad> => {
    const response = await api.post(`/ads/${adId}/reject`, { reason, comment });
    return response.data;
  },
  requestChanges: async (
    adId: string,
    reason: string,
    comment?: string | undefined
  ): Promise<Ad> => {
    const response = await api.post(`/ads/${adId}/request-changes`, {
      reason,
      comment,
    });
    return response.data;
  },
};
