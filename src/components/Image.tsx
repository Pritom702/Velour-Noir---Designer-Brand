import React, { useState, ImgHTMLAttributes } from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  className?: string;
  alt?: string;
  src?: string;
}

export function Image({ className, fallbackText, alt, src, ...props }: ImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 border border-white/10 ${className}`}>
        <span className="font-accent text-[10px] uppercase tracking-widest text-ash text-center px-4">
          {fallbackText || alt || "Image Pending"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}
