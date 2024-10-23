import React from 'react';
import generateR2Url from '../lib/cloudflareR2';

type CloudflareImageProps = {
  id: string;
  alt: string;
};

const CloudflareImage: React.FC<CloudflareImageProps> = ({ id, alt }) => {
  const imageUrl = generateR2Url(id);

  return <img src={imageUrl} alt={alt} />;
};

export default CloudflareImage;