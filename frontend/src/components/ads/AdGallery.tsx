interface AdGalleryProps {
  images: string[];
  title: string;
}

export const AdGallery = ({ images, title }: AdGalleryProps) => {
  return (
    <div className="images bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Изображения</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center"
          >
            <span className="text-gray-500 text-sm">
              <img src={image} alt={title} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
