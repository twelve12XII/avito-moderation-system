interface InputProps {
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  value?: string;
  onChange?: (value: string, e?: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
}: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value, e);
  };
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className}`}
    />
  );
};
