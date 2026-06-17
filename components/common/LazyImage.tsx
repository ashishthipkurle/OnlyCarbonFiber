"use client";

import React from 'react';
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface LazyImageProps extends LazyLoadImageProps {
  alt: string;
  className?: string;
}

export function LazyImage({ alt, className = '', src, ...props }: LazyImageProps) {
  return (
    <LazyLoadImage
      alt={alt}
      effect="blur"
      src={src}
      className={className}
      wrapperClassName={`w-full h-full block ${className.includes('absolute') ? 'absolute inset-0' : ''}`}
      {...props}
    />
  );
}
