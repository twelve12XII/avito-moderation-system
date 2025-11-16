import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import type { DecisionsData } from "../../types/stats";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DecisionsChartProps {
  decisions: DecisionsData;
}

export const DecisionsChart = ({ decisions }: DecisionsChartProps) => {
  const total =
    decisions.approved + decisions.rejected + decisions.requestChanges;

  const chartData = {
    labels: ["Одобрено", "Отклонено", "На доработку"],
    datasets: [
      {
        data: [
          decisions.approved,
          decisions.rejected,
          decisions.requestChanges,
        ],
        backgroundColor: ["#10B981", "#EF4444", "#F59E0B"],
        borderColor: ["#10B981", "#EF4444", "#F59E0B"],
        borderWidth: 2,
        hoverBackgroundColor: ["#059669", "#DC2626", "#D97706"],
      },
    ],
  };

  const formatPercentage = (value: number) => {
    return total > 0 ? ((value / total) * 100).toFixed(2) : "0.00";
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.parsed;
            const percentage = formatPercentage(value);
            return `${context.label}: ${value} (${percentage}%)`;
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    cutout: "60%",
  };

  const dataItems = [
    {
      label: "Одобрено",
      value: decisions.approved,
      color: "#10B981",
      textColor: "text-green-700",
    },
    {
      label: "Отклонено",
      value: decisions.rejected,
      color: "#EF4444",
      textColor: "text-red-700",
    },
    {
      label: "На доработку",
      value: decisions.requestChanges,
      color: "#F59E0B",
      textColor: "text-yellow-700",
    },
  ].filter((item) => item.value > 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Распределение решений
      </h3>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
        <div className="flex-shrink-0 w-48 h-48">
          {total === 0 ? (
            <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-500 text-sm text-center">
                Нет данных
              </span>
            </div>
          ) : (
            <Doughnut data={chartData} options={options} />
          )}
        </div>

        <div className="flex-1 space-y-3">
          {dataItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
              </div>
              <div className="text-right">
                <span className={`text-sm font-semibold ${item.textColor}`}>
                  {formatPercentage(item.value)}%
                </span>
                <div className="text-xs text-gray-500">
                  {item.value} объявлений
                </div>
              </div>
            </div>
          ))}

          {total === 0 && (
            <div className="text-center text-gray-500 py-4">
              Нет данных за выбранный период
            </div>
          )}

          {total > 0 && (
            <div className="pt-3 border-t border-gray-200">
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-700">
                  Всего решений: {total}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
