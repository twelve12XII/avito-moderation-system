import type { Seller } from "../../types/ad";

interface SellerInfoProps {
  seller: Seller;
}

export const SellerInfo = ({ seller }: SellerInfoProps) => {
  return (
    <div className="seller bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Продавец</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Имя:</span>
          <span className="text-gray-900 font-medium">{seller.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Рейтинг:</span>
          <span className="text-gray-900">{seller.rating}/5</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Объявлений:</span>
          <span className="text-gray-900">{seller.totalAds}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Зарегистрирован:</span>
          <span className="text-gray-900">
            {new Date(seller.registeredAt).toLocaleString("ru-RU")}
          </span>
        </div>
      </div>
    </div>
  );
};
