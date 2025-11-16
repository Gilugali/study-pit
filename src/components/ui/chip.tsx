import * as React from "react";
import { cn } from "../../lib/utils";

interface ChipProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'accent';
  className?: string;
}

export function Chip({ children, selected, onClick, variant = 'default', className }: ChipProps) {
  const variantClasses = {
    default: selected
      ? 'bg-primary text-primary-foreground'
      : 'bg-muted text-muted-foreground hover:bg-muted/80',
    primary: selected
      ? 'bg-primary text-primary-foreground'
      : 'bg-primary/10 text-primary hover:bg-primary/20',
    accent: selected
      ? 'bg-accent text-accent-foreground'
      : 'bg-accent/10 text-accent hover:bg-accent/20',
  };

  return (
    <button
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors",
        variantClasses[variant],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      aria-pressed={selected}
    >
      {children}
    </button>
  );
}
