import type { ModerationHistory as ModerationHistoryType } from "../../types/ad";

interface ModerationHistoryProps {
  history: ModerationHistoryType[];
}

export const ModerationHistory = ({ history }: ModerationHistoryProps) => {
  const getActionColor = (action: string) => {
    switch (action) {
      case "approved":
        return "text-green-600";
      case "rejected":
        return "text-red-600";
      case "requestChanges":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const getActionText = (action: string) => {
    switch (action) {
      case "approved":
        return "Одобрено";
      case "rejected":
        return "Отклонено";
      case "requestChanges":
        return "Возвращено на доработку";
      default:
        return action;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        История модерации
      </h2>

      {history.length > 0 ? (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium text-gray-900">
                  {item.moderatorName}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(item.timestamp).toLocaleString("ru-RU")}
                </span>
              </div>

              <p
                className={`text-sm font-medium ${getActionColor(item.action)}`}
              >
                {getActionText(item.action)}
              </p>

              {item.comment && (
                <p className="text-sm text-gray-600 mt-1">{item.comment}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">Нет истории модерации</p>
      )}
    </div>
  );
};
