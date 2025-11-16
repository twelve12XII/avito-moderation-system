import type { StatsPeriod } from "../../types/stats";

interface PeriodSelectorProps {
  period: StatsPeriod;
  onPeriodChange: (period: StatsPeriod) => void;
}

export const PeriodSelector = ({
  period,
  onPeriodChange,
}: PeriodSelectorProps) => {
  const periods: { value: StatsPeriod; label: string }[] = [
    { value: "today", label: "Сегодня" },
    { value: "week", label: "Неделя" },
    { value: "month", label: "Месяц" },
  ];

  return (
    <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
      {periods.map((p) => (
        <button
          key={p.value}
          onClick={() => onPeriodChange(p.value)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            period === p.value
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
};
