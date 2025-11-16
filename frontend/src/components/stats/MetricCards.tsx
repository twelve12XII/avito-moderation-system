import type { StatsSummary } from "../../types/stats";

interface MetricCardsProps {
  stats: StatsSummary;
}

export const MetricCards = ({ stats }: MetricCardsProps) => {
  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} мин`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}ч ${mins}мин` : `${hours}ч`;
  };

  const formatPercentage = (percentage: number) => {
    return percentage.toFixed(2);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Всего проверено</p>
            <div className="mt-2 space-y-1">
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalReviewedToday}
              </p>
              <p className="text-xs text-gray-500">Сегодня</p>
            </div>
            <div className="flex space-x-4 mt-3">
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {stats.totalReviewedThisWeek}
                </p>
                <p className="text-xs text-gray-500">За неделю</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {stats.totalReviewedThisMonth}
                </p>
                <p className="text-xs text-gray-500">За месяц</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Процент одобренных
            </p>
            <p className="text-2xl font-bold text-green-600 mt-2">
              {formatPercentage(stats.approvedPercentage)}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Процент отклоненных
            </p>
            <p className="text-2xl font-bold text-red-600 mt-2">
              {formatPercentage(stats.rejectedPercentage)}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Среднее время проверки
            </p>
            <p className="text-xs text-gray-500 mb-1">одного объявления</p>
            <p className="text-2xl font-bold text-purple-600">
              {formatTime(stats.averageReviewTime)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
