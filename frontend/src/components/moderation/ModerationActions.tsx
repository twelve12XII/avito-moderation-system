import { Button } from "../ui/Button";

interface ModerationActionsProps {
  onApprove: () => void;
  onReject: () => void;
  onRequestChanges: () => void;
  isRejecting?: boolean;
  isRequestChanges?: boolean;
}

export const ModerationActions = ({
  onApprove,
  onReject,
  onRequestChanges,
  isRejecting = false,
  isRequestChanges = false,
}: ModerationActionsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        Панель действий модератора
      </h2>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          onClick={onApprove}
          variant="primary"
          size="small"
          className="flex-1"
        >
          Одобрить
        </Button>

        <Button
          onClick={onReject}
          variant="danger"
          size="small"
          className="flex-1"
          disabled={isRejecting}
        >
          {isRejecting ? "..." : "Отклонить"}
        </Button>

        <Button
          onClick={onRequestChanges}
          variant="secondary"
          size="small"
          className="flex-1"
          disabled={isRequestChanges}
        >
          {isRequestChanges ? "..." : "Вернуть"}
        </Button>
      </div>
    </div>
  );
};
