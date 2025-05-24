// components/Modal.tsx
import React, { useEffect, useRef } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({ open, onClose, title, children, maxWidth = "max-w-lg" }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  // Clic en dehors
  function handleOverlayClick(e: React.MouseEvent) {
    if (ref.current && e.target === ref.current) onClose();
  }

  if (!open) return null;
  return (
    <div
  ref={ref}
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fadein overflow-y-auto"
  style={{ minHeight: "100vh" }}
  onMouseDown={handleOverlayClick}
  aria-modal="true"
  tabIndex={-1}
  role="dialog"
>

      <div className={`w-full ${maxWidth} relative`}>
  {title && <h2>...</h2>}
  {children}
</div>
    </div>
  );
}
