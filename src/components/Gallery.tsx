import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

const BlurImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-neutral-800 xl:aspect-w-7 xl:aspect-h-8">
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        onLoadingComplete={() => setIsLoading(false)}
        className={clsx(
          "duration-700 ease-in-out",
          isLoading
            ? "scale-110 blur-2xl grayscale"
            : "scale-100 blur-0 grayscale-0"
        )}
      />
    </div>
  );
};

export { BlurImage };
