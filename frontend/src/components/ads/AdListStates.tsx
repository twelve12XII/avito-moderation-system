interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({
  message = "Загрузка объявлений...",
}: LoadingStateProps) => (
  <div className="text-center py-12">
    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
    <p className="text-gray-600 text-lg">{message}</p>
  </div>
);

interface ErrorStateProps {
  error: Error;
}

export const ErrorState = ({ error }: ErrorStateProps) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
    <h3 className="text-lg font-medium text-red-800 mb-2">Произошла ошибка</h3>
    <p className="text-red-600">{error.message}</p>
  </div>
);

export const EmptyState = () => (
  <div className="text-center py-12 bg-white rounded-lg border">
    <div className="text-gray-400 mb-4">
      <svg
        className="w-16 h-16 mx-auto"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      Объявления не найдены
    </h3>
    <p className="text-gray-500">
      Попробуйте изменить параметры поиска или фильтры
    </p>
  </div>
);
