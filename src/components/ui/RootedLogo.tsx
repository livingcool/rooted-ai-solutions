import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface RootedLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

const RootedLogo: React.FC<RootedLogoProps> = ({ 
  className, 
  size = 40, 
  showText = true 
}) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div 
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center"
      >
        <Image
          src="/logo-symbol.png"
          alt="RootedAI Logo"
          width={size}
          height={size}
          className="w-full h-full object-contain"
          style={{ 
            filter: "drop-shadow(0 0 8px rgba(197, 190, 248, 0.4))"
          }}
          priority
        />
      </div>
      {showText && (
        <span className="font-display font-black text-2xl tracking-tighter text-[#240747] dark:text-[#F9EFE9]">
          Rooted<span className="text-[#F6851B]">AI</span>
        </span>
      )}
    </div>
  );
};

export default RootedLogo;
