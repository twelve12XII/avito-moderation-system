import { Card } from "../ui/Card";
import type { Ad } from "../../types/ad";

interface AdGridProps {
  ads: Ad[];
  onAdClick: (ad: Ad) => void;
}

export const AdGrid = ({ ads, onAdClick }: AdGridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
    {ads.map((ad) => (
      <Card key={ad.id} ad={ad} onClick={onAdClick} />
    ))}
  </div>
);
