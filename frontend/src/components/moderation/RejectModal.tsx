import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { REJECTION_REASONS } from "../../constants/rejectionReasons";

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReject: (reason: string, comment?: string) => void;
  isRejecting?: boolean;
}
export const RejectModal = ({
  isOpen,
  onClose,
  onReject,
  isRejecting = false,
}: RejectModalProps) => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [customReason, setCustomReason] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!selectedReason) return;

    const finalReason =
      selectedReason === "Другое" ? customReason : selectedReason;

    if (!finalReason.trim()) return;

    onReject(finalReason, comment || undefined);

    if (!isRejecting) {
      setSelectedReason("");
      setCustomReason("");
      setComment("");
    }
  };

  const handleClose = () => {
    setSelectedReason("");
    setCustomReason("");
    setComment("");
    onClose();
  };

  if (!isOpen) return null;

  const finalReason =
    selectedReason === "Другое" ? customReason : selectedReason;
  const isSubmitDisabled =
    !selectedReason ||
    (selectedReason === "Другое" && !customReason.trim()) ||
    isRejecting;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden">
        <div className="bg-red-50 px-6 py-4 border-b border-red-200">
          <h2 className="text-xl font-semibold text-red-800">
            Отклонить объявление
          </h2>
          <p className="text-red-600 text-sm mt-1">
            Укажите причину отклонения
          </p>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Причина отклонения *
            </label>
            <div className="space-y-2">
              {REJECTION_REASONS.map((reason) => (
                <label
                  key={reason}
                  className="flex items-start space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="rejection-reason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="mt-1 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700 flex-1">{reason}</span>
                </label>
              ))}
            </div>
          </div>

          {selectedReason === "Другое" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Укажите свою причину *
              </label>
              <Input
                placeholder="Введите причину отклонения..."
                value={customReason}
                onChange={setCustomReason}
                className="w-full"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Дополнительный комментарий (необязательно)
            </label>
            <textarea
              placeholder="Можете добавить пояснение для автора объявления..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
            />
          </div>

          {selectedReason && (
            <div className="bg-gray-50 rounded-lg p-3 border">
              <h4 className="text-sm font-medium text-gray-700 mb-1">
                Будет отправлено:
              </h4>
              <p className="text-sm text-gray-900">
                <strong>Причина:</strong> {finalReason}
              </p>
              {comment && (
                <p className="text-sm text-gray-900 mt-1">
                  <strong>Комментарий:</strong> {comment}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <Button
            onClick={handleClose}
            variant="secondary"
            disabled={isRejecting}
          >
            Отмена
          </Button>
          <Button
            onClick={handleSubmit}
            variant="tertiary"
            disabled={isSubmitDisabled}
          >
            {isRejecting ? "Отклонение..." : "Подтвердить отклонение"}
          </Button>
        </div>
      </div>
    </div>
  );
};
