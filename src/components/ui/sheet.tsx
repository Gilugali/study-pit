import * as React from "react";
import { cn } from "../../lib/utils";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: 'left' | 'right';
}

export function Sheet({ open, onClose, children, side = 'right' }: SheetProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn(
          "fixed top-0 bottom-0 w-[300px] bg-background border-border z-50 shadow-xl transition-transform duration-300",
          side === 'right' ? 'right-0 border-l' : 'left-0 border-r',
          open ? 'translate-x-0' : side === 'right' ? 'translate-x-full' : '-translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </>
  );
}
