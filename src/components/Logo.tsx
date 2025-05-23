import React from "react";
import { Shield } from "lucide-react";

interface LogoProps {
  size?: number; // taille de l’icône (par défaut 48)
  textSize?: string; // taille du texte Tailwind, ex : "text-3xl"
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  size = 48,
  textSize = "text-3xl",
  className = "",
}) => (
  <div className={`flex items-center space-x-2 ${className}`}>
    {/* Bouclier turquoise (teal-400) */}
    <Shield size={size} className="text-teal-400" />
    {/* Texte blanc (ou gris très clair) */}
    <span className={`${textSize} font-extrabold text-gray-200 tracking-tight select-none`}>
      NeutVault
    </span>
  </div>
);

export default Logo;
