import { SORT_OPTIONS } from "../../constants/sort";
import type { SortBy, SortOrder } from "../../types/filters";
import { DropdownMenu } from "./DropdownMenu";

interface SortProps {
  sortBy: SortBy;
  sortOrder: SortOrder;
  onSortChange: (sortBy: SortBy, sortOrder: SortOrder) => void;
}

export const Sort = ({ sortBy, sortOrder, onSortChange }: SortProps) => {
  const handleSortFieldChange = (label: string) => {
    const value = Object.values(SORT_OPTIONS).find(
      (option) => option.label === label
    )?.value;
    if (value) onSortChange(value, sortOrder);
  };

  const handleSortOrderToggle = () => {
    const newOrder: SortOrder = sortOrder === "asc" ? "desc" : "asc";
    onSortChange(sortBy, newOrder);
  };

  return (
    <div className="flex items-end gap-2">
      <div className="flex-1">
        <DropdownMenu
          items={Object.values(SORT_OPTIONS).map((option) => option.label)}
          onChange={handleSortFieldChange}
          value={SORT_OPTIONS[sortBy].label}
          label="Сортировка"
        />
      </div>

      <button
        onClick={handleSortOrderToggle}
        className="flex-shrink-0 h-10 px-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center group"
        title={sortOrder === "asc" ? "По возрастанию" : "По убыванию"}
      >
        <div className="relative w-4 h-4">
          <svg
            className={`absolute w-3 h-3 transition-all duration-200 ${
              sortOrder === "asc"
                ? "text-blue-600 -top-1"
                : "text-gray-400 -top-0.5 group-hover:text-gray-600"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
          <svg
            className={`absolute w-3 h-3 transition-all duration-200 ${
              sortOrder === "desc"
                ? "text-blue-600 -bottom-1"
                : "text-gray-400 -bottom-0.5 group-hover:text-gray-600"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};
