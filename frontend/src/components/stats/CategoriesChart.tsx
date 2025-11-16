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
import type { CategoryStats } from "../../types/stats";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CategoriesChartProps {
  categories: CategoryStats[];
}

export const CategoriesChart = ({ categories }: CategoriesChartProps) => {
  const sortedCategories = [...categories].sort((a, b) => b.count - a.count);

  const chartData = {
    labels: sortedCategories.map((category) => category.name),
    datasets: [
      {
        label: "Количество объявлений",
        data: sortedCategories.map((category) => category.count),
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#06B6D4",
          "#84CC16",
          "#F97316",
          "#EC4899",
          "#6B7280",
        ],
        borderColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#06B6D4",
          "#84CC16",
          "#F97316",
          "#EC4899",
          "#6B7280",
        ],
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Количество: ${context.parsed.x}`;
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuart",
    },
  };

  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Объявления по категориям
        </h3>
        <div className="h-64 flex items-center justify-center">
          <span className="text-gray-500">Нет данных за выбранный период</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Объявления по категориям
      </h3>

      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Всего категорий: {categories.length}</span>
          <span>
            Всего объявлений:{" "}
            {categories.reduce((sum, category) => sum + category.count, 0)}
          </span>
        </div>
      </div>
    </div>
  );
};
