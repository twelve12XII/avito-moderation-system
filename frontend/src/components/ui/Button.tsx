import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  disabled?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  type,
  className,
  disabled,
}: ButtonProps) => {
  const baseClasses =
    "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-primary text-black hover:bg-primary/90 focus:ring-primary/50",
    secondary:
      "bg-secondary text-black hover:bg-secondary/90 focus:ring-secondary/50",
    tertiary:
      "bg-tertiary text-black hover:bg-tertiary/90 focus:ring-tertiary/50",
    danger: "bg-red-600 text-black hover:bg-red-700 focus:ring-red-500",
  };

  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className || ""}
  `.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
