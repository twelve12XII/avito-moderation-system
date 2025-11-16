import type { Ad } from "../../types/ad";

interface AdCardProps {
  ad: Ad;
  onClick?: (ad: Ad) => void;
}

export const Card = ({ ad, onClick }: AdCardProps) => {
  const getStatusColor = (status: Ad["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: Ad["status"]) => {
    switch (status) {
      case "pending":
        return "На модерации";
      case "approved":
        return "Одобрено";
      case "rejected":
        return "Отклонено";
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: Ad["priority"]) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500 text-white";
      case "normal":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getPriorityText = (priority: Ad["priority"]) => {
    switch (priority) {
      case "urgent":
        return "Срочный";
      case "normal":
        return "Обычный";
      default:
        return priority;
    }
  };

  const handleClick = () => {
    onClick?.(ad);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer border"
      onClick={handleClick}
    >
      <div className="aspect-square bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
        {ad.images[0] ? (
          <img
            src={ad.images[0]}
            alt={ad.title}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-gray-500 text-sm">Нет изображения</span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
        {ad.title}
      </h3>

      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
        {ad.description}
      </p>

      <div className="flex justify-between items-center mb-3">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            ad.status
          )}`}
        >
          {getStatusText(ad.status)}
        </span>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
            ad.priority
          )}`}
        >
          {getPriorityText(ad.priority)}
        </span>
      </div>

      <div className="flex justify-between items-center mb-2">
        <span className="text-xl font-bold text-blue-600">
          {ad.price.toLocaleString("ru-RU")} ₽
        </span>
        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
          {ad.category}
        </span>
      </div>

      <div className="text-xs text-gray-500">
        {new Date(ad.createdAt).toLocaleDateString("ru-RU")}
      </div>
    </div>
  );
};
