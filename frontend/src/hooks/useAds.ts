import { useQuery } from "@tanstack/react-query";
import type { AdFilters } from "../types/filters";
import { adsService } from "../services/adsService";

export const useAds = (
  filters: AdFilters = {},
  page: number = 1,
  limit: number = 10
) => {
  return useQuery({
    queryKey: ["ads", filters, page, limit],
    queryFn: () => adsService.getAds(page, limit, filters),
  });
};

export const useAd = (adId: string) => {
  return useQuery({
    queryKey: ["ad", adId],
    queryFn: () => adsService.getAdById(adId),
    enabled: !!adId,
  });
};
