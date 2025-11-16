import { Link } from "react-router-dom";
import { Button } from "./Button";

interface ErrorStateProps {
  error?: Error | null;
  title?: string;
  message?: string;
  actionLink?: string;
  actionText?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState = ({
  error,
  title = "Произошла ошибка",
  message,
  actionLink = "/list",
  actionText = "Вернуться к списку",
  onRetry,
  className = "",
}: ErrorStateProps) => {
  const displayMessage =
    message ||
    error?.message ||
    "Что-то пошло не так. Попробуйте обновить страницу.";

  return (
    <div
      className={`flex flex-col items-center justify-center py-12 text-center ${className}`}
    >
      <div className="text-red-500 mb-4">
        <svg
          className="w-16 h-16 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 max-w-md">{displayMessage}</p>

      <div className="flex flex-col sm:flex-row gap-3">
        {onRetry && (
          <Button onClick={onRetry} variant="primary" size="medium">
            Попробовать снова
          </Button>
        )}

        {actionLink && (
          <Link to={actionLink}>
            <Button variant="secondary" size="medium">
              {actionText}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
