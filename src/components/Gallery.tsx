import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

const BlurImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full overflow-hidden rounded-lg bg-neutral-800 aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        onLoadingComplete={() => setIsLoading(false)}
        className={clsx(
          "duration-700 ease-in-out",
          isLoading
            ? "grayscale blur-2xl scale-110"
            : "grayscale-0 blur-0 scale-100"
        )}
      />
    </div>
  );
};

export { BlurImage };
