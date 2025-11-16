interface LoadingStateProps {
  message?: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

export const LoadingState = ({
  message = "Загрузка...",
  size = "medium",
  className = "",
}: LoadingStateProps) => {
  const sizeClasses = {
    small: "h-8 w-8",
    medium: "h-12 w-12",
    large: "h-16 w-16",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center py-8 ${className}`}
    >
      <div
        className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]} mb-4`}
      ></div>
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  );
};
