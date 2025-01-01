import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';
import { FC } from 'react';

const RESOURCE_URL = process.env.NEXT_PUBLIC_CF_R2_BUCKET_URL;
// console.log("RESOURCE_URL:", RESOURCE_URL);

const CustomImage: FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const imageUrl = `${RESOURCE_URL}${src}`;
  // console.log("Image URL:", imageUrl);
  return <Image src={imageUrl} alt={alt} layout="responsive" width={800} height={600} />;
};

const MDXcomponents = {
  img: CustomImage,
};

export const MDXProvider = ({ source }: { source: any }) => (
  <MDXRemote {...source} components={MDXcomponents} />
);

export default MDXcomponents;