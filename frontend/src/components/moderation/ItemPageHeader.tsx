import { Link, useLocation } from "react-router-dom";
import type { AdNavigationProps } from "./AdNavigation";

interface ItemPageHeaderProps extends AdNavigationProps {
  title: string;
  filters?: Record<string, string>;
}

export const ItemPageHeader = ({
  title,
  filters = {},
}: ItemPageHeaderProps) => {
  const location = useLocation();
  return (
    <div className="mb-6">
      <Link
        to="/list"
        state={{ filters: filters || location.state?.filters || {} }}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        ← Назад к списку
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      </div>
    </div>
  );
};
