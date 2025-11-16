import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { REJECTION_REASONS as REQUEST_CHANGES_REASONS } from "../../constants/rejectionReasons";

interface RequestChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestChanges: (reason: string, comment?: string) => void;
  isSubmitting?: boolean;
}

export const RequestChangesModal = ({
  isOpen,
  onClose,
  onRequestChanges,
  isSubmitting = false,
}: RequestChangesModalProps) => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [customReason, setCustomReason] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!selectedReason) return;

    const finalReason =
      selectedReason === "Другое" ? customReason : selectedReason;

    if (!finalReason.trim()) return;

    onRequestChanges(finalReason, comment || undefined);

    if (!isSubmitting) {
      resetForm();
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setSelectedReason("");
    setCustomReason("");
    setComment("");
  };

  if (!isOpen) return null;

  const finalReason =
    selectedReason === "Другое" ? customReason : selectedReason;
  const isSubmitDisabled =
    !selectedReason ||
    (selectedReason === "Другое" && !customReason.trim()) ||
    isSubmitting;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden">
        <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-200">
          <h2 className="text-xl font-semibold text-yellow-800">
            Вернуть на доработку
          </h2>
          <p className="text-yellow-600 text-sm mt-1">
            Укажите причину возврата объявления
          </p>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Причина возврата *
            </label>
            <div className="space-y-2">
              {REQUEST_CHANGES_REASONS.map((reason) => (
                <label
                  key={reason}
                  className="flex items-start space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="request-changes-reason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="mt-1 text-yellow-600 focus:ring-yellow-500"
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
                placeholder="Введите причину возврата..."
                value={customReason}
                onChange={setCustomReason}
                className="w-full"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Дополнительный комментарий для автора
            </label>
            <textarea
              placeholder="Опишите, что именно нужно исправить..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
            />
          </div>

          {selectedReason && (
            <div className="bg-gray-50 rounded-lg p-3 border">
              <h4 className="text-sm font-medium text-gray-700 mb-1">
                Будет отправлено автору:
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
            disabled={isSubmitting}
          >
            Отмена
          </Button>
          <Button
            onClick={handleSubmit}
            variant="secondary"
            disabled={isSubmitDisabled}
          >
            {isSubmitting ? "Отправка..." : "Вернуть на доработку"}
          </Button>
        </div>
      </div>
    </div>
  );
};
