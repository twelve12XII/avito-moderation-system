import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 ${theme}`}
    >
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Модерация
                </span>
              </Link>
              <div className="flex space-x-6">
                <Link
                  to="/list"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/list") || isActive("/")
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Список объявлений
                </Link>
                <Link
                  to="/stats"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/stats")
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Статистика
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleThemeToggle}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label={`Переключить на ${
                  theme === "light" ? "тёмную" : "светлую"
                } тему`}
              >
                {theme === "light" ? (
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                )}
              </button>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                Тема: <span className="font-medium">{theme}</span>
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                Модератор:{" "}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Алексей Петров
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="transition-colors duration-200">{children}</main>
    </div>
  );
};
