import { useState, useEffect } from "react";
import { DropdownMenu } from "./DropdownMenu";
import { CATEGORIES_ARRAY } from "../../constants/categories";
import type { AdFilters } from "../../types/filters";
import { STATUS } from "../../constants/status";
import { Input } from "./Input";
import { Button } from "./Button";
import { useDebounce } from "../../hooks/useDebounce";

interface FiltersProps {
  filters: AdFilters;
  onFiltersChange: (filters: AdFilters) => void;
}

export const Filters = ({ filters, onFiltersChange }: FiltersProps) => {
  const [localSearch, setLocalSearch] = useState(filters.search || "");
  const debouncedSearch = useDebounce(localSearch, 300);
  useEffect(() => {
    onFiltersChange({
      ...filters,
      search: debouncedSearch,
    });
  }, [debouncedSearch]);

  const handleChangeCategory = (category: string) => {
    onFiltersChange({
      ...filters,
      categoryId: Object.values(CATEGORIES_ARRAY).find(
        (c) => c.name === category
      )?.id,
      category: category,
    });
  };

  const handleStatusChange = (status: string) => {
    const currentStatuses = filters.status || [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter((s) => s !== status)
      : [...currentStatuses, status];

    onFiltersChange({
      ...filters,
      status: newStatuses,
    });
  };

  const handlePriceChange = (type: "min" | "max", value: string) => {
    const numValue = value === "" ? undefined : Number(value);
    onFiltersChange({
      ...filters,
      [type === "min" ? "minPrice" : "maxPrice"]: numValue,
    });
  };

  const handleReset = () => {
    setLocalSearch("");
    onFiltersChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Фильтры</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Поиск по названию
          </label>
          <Input
            type="text"
            placeholder="Введите название..."
            value={localSearch}
            onChange={setLocalSearch}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Категория
          </label>
          <DropdownMenu
            items={CATEGORIES_ARRAY.map((category) => category.name)}
            onChange={handleChangeCategory}
            value={filters.category || "Все"}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Статус
          </label>
          <div className="space-y-2">
            {STATUS.map((status) => (
              <label key={status} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={status}
                  checked={filters.status?.includes(status) || false}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 capitalize">
                  {status === "pending" && "На модерации"}
                  {status === "approved" && "Одобрено"}
                  {status === "rejected" && "Отклонено"}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Цена
          </label>
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="От"
              value={filters.minPrice?.toString() || ""}
              onChange={(value) => handlePriceChange("min", value)}
              className="flex-1"
            />
            <Input
              type="number"
              placeholder="До"
              value={filters.maxPrice?.toString() || ""}
              onChange={(value) => handlePriceChange("max", value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button onClick={handleReset} variant="secondary" size="small">
          Сбросить фильтры
        </Button>
      </div>
    </div>
  );
};
