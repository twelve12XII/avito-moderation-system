import { useState } from "react";
import { useStats } from "../hooks/useStats";
import type { StatsPeriod } from "../types/stats";
import { MetricCards } from "../components/stats/MetricCards";
import { ActivityChart } from "../components/stats/ActivityChart";
import { DecisionsChart } from "../components/stats/DecisionsChart";
import { CategoriesChart } from "../components/stats/CategoriesChart";
import { PeriodSelector } from "../components/stats/PeriodSelector";
import { LoadingState } from "../components/ui/LoadingState";
import { ErrorState } from "../components/ui/ErrorState";

export const StatsPage = () => {
  const [period, setPeriod] = useState<StatsPeriod>("week");
  const { data: stats, isLoading, error } = useStats(period);
  if (isLoading) {
    return <LoadingState message="Загрузка статистики..." />;
  }

  if (error) {
    return (
      <ErrorState
        error={error}
        title="Ошибка загрузки статистики"
        actionLink="/list"
        actionText="Вернуться к списку"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Статистика модератора
            </h1>
            <p className="text-gray-600">
              Аналитика вашей работы по модерации объявлений
            </p>
          </div>

          <PeriodSelector period={period} onPeriodChange={setPeriod} />
        </div>

        {stats && (
          <>
            <MetricCards stats={stats.summary} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ActivityChart activity={stats.activity} />
              <DecisionsChart decisions={stats.decisions} />
            </div>

            <CategoriesChart categories={stats.categories} />
          </>
        )}
      </div>
    </div>
  );
};
