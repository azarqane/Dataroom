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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fadein"
      onMouseDown={handleOverlayClick}
      aria-modal="true"
      tabIndex={-1}
      role="dialog"
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl p-8 w-full ${maxWidth} animate-popin relative`}
      >
        {title && <h2 className="text-2xl font-extrabold text-teal-600 mb-6 text-center">{title}</h2>}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-teal-100 hover:bg-teal-200 text-teal-600 rounded-full p-2 transition"
          aria-label="Fermer"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        {children}
      </div>
    </div>
  );
}
