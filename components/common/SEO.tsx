"use client";

import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
}

export function SEO({
  title = 'OnlyCarbonFiber — Premium Carbon Fiber Products',
  description = 'A premium e-commerce platform showcasing Indian carbon fiber accessories and performance parts.',
  canonicalUrl = 'https://onlycarbonfiber.com',
  ogType = 'website',
  ogImage = 'https://onlycarbonfiber.com/og-image.jpg', // Placeholder
}: SEOProps) {
  const fullTitle = title === 'OnlyCarbonFiber — Premium Carbon Fiber Products' 
    ? title 
    : `${title} | OnlyCarbonFiber`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
