// components/SignupButton.tsx
import React from "react";

export function SignupButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-200 active:scale-95"
      onClick={onClick}
      type="button"
    >
      S'inscrire
    </button>
  );
}
