import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import type { ActivityData } from "../../types/stats";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ActivityChartProps {
  activity: ActivityData[];
}

export const ActivityChart = ({ activity }: ActivityChartProps) => {
  const labels = activity.map((item) =>
    new Date(item.date).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
    })
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Одобрено",
        data: activity.map((item) => item.approved),
        backgroundColor: "#10B981",
        borderColor: "#10B981",
        borderWidth: 1,
      },
      {
        label: "Отклонено",
        data: activity.map((item) => item.rejected),
        backgroundColor: "#EF4444",
        borderColor: "#EF4444",
        borderWidth: 1,
      },
      {
        label: "На доработку",
        data: activity.map((item) => item.requestChanges),
        backgroundColor: "#F59E0B",
        borderColor: "#F59E0B",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 15,
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y}`;
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  };

  if (activity.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Активность по дням
        </h3>
        <div className="h-48 flex items-center justify-center">
          <span className="text-gray-500">Нет данных за выбранный период</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Активность по дням
      </h3>

      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>

      <div className="flex justify-between text-xs text-gray-500 mt-4">
        <span>
          {activity.length > 0
            ? new Date(activity[0].date).toLocaleDateString("ru-RU")
            : "Начало периода"}
        </span>
        <span>
          {activity.length > 0
            ? new Date(activity[activity.length - 1].date).toLocaleDateString(
                "ru-RU"
              )
            : "Конец периода"}
        </span>
      </div>
    </div>
  );
};
