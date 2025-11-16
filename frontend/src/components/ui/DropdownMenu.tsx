interface DropdownMenuProps {
  items: string[];
  onChange: (item: string) => void;
  value: string;
  label?: string;
}

export const DropdownMenu = ({
  items,
  onChange,
  value,
  label,
}: DropdownMenuProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={handleOnChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white text-gray-900"
      >
        {items.map((item) => (
          <option key={item} value={item} className="py-2">
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
