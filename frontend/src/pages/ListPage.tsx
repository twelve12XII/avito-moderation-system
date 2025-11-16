import { useState } from "react";
import { useAds } from "../hooks/useAds";
import type { AdFilters, SortBy, SortOrder } from "../types/filters";
import { Pagination } from "../components/ui/Pagination";
import { AdListHeader } from "../components/ads/AdListHeader";
import { AdListControls } from "../components/ads/AdListControls";
import { AdGrid } from "../components/ads/AdGrid";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "../components/ads/AdListStates";
import { useLocation, useNavigate } from "react-router-dom";
import type { Ad } from "../types/ad";

export const ListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState<AdFilters>({});
  const [page, setPage] = useState(1);
  const limit = 10;

  const handleAdClick = (ad: Ad) => {
    navigate(`/item/${ad.id}`, {
      state: {
        filters: location.state?.filters || {},
      },
    });
  };

  const { data, isLoading, error } = useAds(filters, page, limit);

  const handleFiltersChange = (newFilters: AdFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleSortChange = (sortBy: SortBy, sortOrder: SortOrder) => {
    setFilters({ ...filters, sortBy, sortOrder });
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <AdListHeader />

        <AdListControls
          filters={filters}
          currentPage={data?.pagination.currentPage}
          totalPages={data?.pagination.totalPages}
          onFiltersChange={handleFiltersChange}
          onSortChange={handleSortChange}
        />

        {isLoading && <LoadingState />}

        {error && <ErrorState error={error} />}

        {!isLoading && !error && data && (
          <>
            {data.ads.length > 0 ? (
              <>
                <AdGrid ads={data.ads} onAdClick={handleAdClick} />

                {data.pagination.totalPages > 1 && (
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <Pagination
                      currentPage={data.pagination.currentPage}
                      totalPages={data.pagination.totalPages}
                      totalItems={data.pagination.totalItems}
                      itemsPerPage={data.pagination.itemsPerPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              <EmptyState />
            )}
          </>
        )}
      </div>
    </div>
  );
};
