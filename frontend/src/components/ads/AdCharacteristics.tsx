import type { Ad } from "../../types/ad";

interface AdCharacteristicsProps {
  characteristics: Ad["characteristics"];
}

export const AdCharacteristics = ({
  characteristics,
}: AdCharacteristicsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold text-gray-900 p-4 border-b">
        Характеристики товара
      </h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">
              Характеристика
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">
              Значение
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(characteristics).map(([key, value], index) => (
            <tr
              key={key}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="px-4 py-3 text-sm font-medium text-gray-700 border-b">
                {key}
              </td>
              <td className="px-4 py-3 text-sm text-gray-900 border-b">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
