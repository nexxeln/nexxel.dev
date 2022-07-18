import Image from "next/image";
import { FC, useState } from "react";
import { clsx } from "clsx";

export const GalleryImage: FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <a href="#" className="group">
      <div className="w-full overflow-hidden bg-gray-200 rounded-lg aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt={alt}
          src={src}
          layout="fill"
          objectFit="cover"
          className={clsx(
            "group-hover:opacity-75 duration-700 ease-in-out",
            isLoading
              ? "grayscale blur-2xl scale-110"
              : "grayscale-0 blur-0 scale-100"
          )}
        />
      </div>
    </a>
  );
};

const Gallery = () => {
  return (
    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      <GalleryImage src="/images/nexxel.webp" alt="nexxel's avatar" />
      <GalleryImage src="/images/nexxel.webp" alt="nexxel's avatar" />
      <GalleryImage src="/images/nexxel.webp" alt="nexxel's avatar" />
      <GalleryImage src="/images/nexxel.webp" alt="nexxel's avatar" />
      <GalleryImage src="/images/nexxel.webp" alt="nexxel's avatar" />
      <GalleryImage src="/images/nexxel.webp" alt="nexxel's avatar" />
      <GalleryImage src="/images/nexxel.webp" alt="nexxel's avatar" />
      <GalleryImage src="/images/nexxel.webp" alt="nexxel's avatar" />

      {}
    </div>
  );
};

export default Gallery;
