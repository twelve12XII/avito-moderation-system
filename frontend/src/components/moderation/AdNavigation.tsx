import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { useHotkeys } from "../../hooks/useHotkeys";
import type { Ad } from "../../types/ad";

export interface AdNavigationProps {
  previousAd?: Ad | null;
  nextAd?: Ad | null;
  currentPosition?: number;
  totalCount?: number;
  className?: string;
  filters?: Record<string, string>;
  onNext?: () => void;
  onPrev?: () => void;
}

export const AdNavigation = ({
  previousAd,
  nextAd,
  currentPosition,
  totalCount,
  className = "",
  filters = {},
  onNext,
  onPrev,
}: AdNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (adId: string) => {
    navigate(`/item/${adId}`, {
      state: { filters: filters || location.state?.filters || {} },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    if (nextAd) {
      handleNavigate(nextAd.id.toString());
    }
    onNext?.();
  };

  const handlePrev = () => {
    if (previousAd) {
      handleNavigate(previousAd.id.toString());
    }
    onPrev?.();
  };

  useHotkeys({
    onNext: handleNext,
    onPrev: handlePrev,
    enabled: true,
  });

  return (
    <div
      className={`flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 ${className}`}
    >
      <div className="flex items-center space-x-3">
        <Button
          onClick={handlePrev}
          disabled={!previousAd}
          variant="secondary"
          size="small"
          className="flex items-center space-x-2 relative group"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Предыдущее</span>

          <div className="absolute -top-8 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            ← Стрелка влево
          </div>
        </Button>

        {previousAd && (
          <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-400 max-w-xs">
            <div className="font-medium truncate">{previousAd.title}</div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              {previousAd.price.toLocaleString("ru-RU")} ₽
            </div>
          </div>
        )}
      </div>

      {currentPosition && totalCount && (
        <div className="flex flex-col items-center space-y-1">
          <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
            <span className="font-medium">{currentPosition}</span>
            <span> из </span>
            <span className="font-medium">{totalCount}</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500">
            Используйте ← → для навигации
          </div>
        </div>
      )}

      <div className="flex items-center space-x-3">
        {nextAd && (
          <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-400 max-w-xs text-right">
            <div className="font-medium truncate">{nextAd.title}</div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              {nextAd.price.toLocaleString("ru-RU")} ₽
            </div>
          </div>
        )}

        <Button
          onClick={handleNext}
          disabled={!nextAd}
          variant="secondary"
          size="small"
          className="flex items-center space-x-2 relative group"
        >
          <span>Следующее</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>

          <div className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            → Стрелка вправо
          </div>
        </Button>
      </div>
    </div>
  );
};
