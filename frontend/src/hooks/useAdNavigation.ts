import { useMemo } from "react";
import { useAds } from "./useAds";
import type { AdFilters } from "../types/filters";

interface UseAdNavigationProps {
  currentAdId: number;
  filters?: AdFilters;
}

export const useAdNavigation = ({
  currentAdId,
  filters = {},
}: UseAdNavigationProps) => {
  const { data: filteredAds } = useAds(filters, 1, 1000);

  const navigation = useMemo(() => {
    if (!filteredAds?.ads) return null;

    const ads = filteredAds.ads;
    const currentIndex = ads.findIndex((ad) => ad.id === currentAdId);

    if (currentIndex === -1) return null;

    return {
      previousAd: currentIndex > 0 ? ads[currentIndex - 1] : null,
      nextAd: currentIndex < ads.length - 1 ? ads[currentIndex + 1] : null,
      currentPosition: currentIndex + 1,
      totalCount: ads.length,
      hasPrevious: currentIndex > 0,
      hasNext: currentIndex < ads.length - 1,
      filters,
    };
  }, [filteredAds, currentAdId, filters]);

  return navigation;
};
