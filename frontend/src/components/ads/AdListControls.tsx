import { Filters } from "../ui/Filters";
import { Sort } from "../ui/Sort";
import type { AdFilters, SortBy, SortOrder } from "../../types/filters";

interface AdListControlsProps {
  filters: AdFilters;
  currentPage?: number;
  totalPages?: number;
  onFiltersChange: (filters: AdFilters) => void;
  onSortChange: (sortBy: SortBy, sortOrder: SortOrder) => void;
}

export const AdListControls = ({
  filters,
  currentPage,
  totalPages,
  onFiltersChange,
  onSortChange,
}: AdListControlsProps) => (
  <>
    <Filters filters={filters} onFiltersChange={onFiltersChange} />

    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <Sort
        sortBy={filters.sortBy || "createdAt"}
        sortOrder={filters.sortOrder || "desc"}
        onSortChange={onSortChange}
      />

      {currentPage && totalPages && (
        <div className="text-sm text-gray-600">
          Страница {currentPage} из {totalPages}
        </div>
      )}
    </div>
  </>
);
