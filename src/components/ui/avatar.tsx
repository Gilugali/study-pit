import * as React from "react";
import { cn } from "../../lib/utils";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ src, alt, fallback, className, size = 'md' }: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-xl',
  };

  const showFallback = !src || imageError;
  const initials = fallback?.slice(0, 2).toUpperCase() || alt?.slice(0, 2).toUpperCase() || '?';

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-full bg-primary/10 text-primary font-semibold overflow-hidden",
        sizeClasses[size],
        className
      )}
    >
      {!showFallback ? (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
