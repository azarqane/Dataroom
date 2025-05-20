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
  <div className={`flex items-center ${className}`}>
    <Shield style={{ width: size, height: size }} className="text-teal-600" />
    <span className={`ml-3 font-bold text-gray-900 ${textSize}`}>NeutVault</span>
  </div>
);

export default Logo;
