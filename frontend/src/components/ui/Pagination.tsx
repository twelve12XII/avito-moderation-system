interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  className = "",
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (endPage - startPage < 4) {
      if (currentPage < 3) {
        endPage = Math.min(totalPages, 5);
      } else if (currentPage > totalPages - 2) {
        startPage = Math.max(1, totalPages - 4);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            flex items-center justify-center w-10 h-10 rounded-lg border
            transition-all duration-200
            ${
              currentPage === 1
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-800"
            }
          `}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex items-center space-x-1">
          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`
                min-w-[40px] h-10 px-3 text-sm font-medium rounded-lg border
                transition-all duration-200
                ${
                  currentPage === page
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                }
              `}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            flex items-center justify-center w-10 h-10 rounded-lg border
            transition-all duration-200
            ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-800"
            }
          `}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="text-sm text-gray-600 text-center">
        Показано {startItem}-{endItem} из {totalItems.toLocaleString("ru-RU")}{" "}
        объявлений
      </div>
    </div>
  );
};
