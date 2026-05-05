import React from "react";
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
  const ANGLES = [0, 60, 120, 180, 240, 300];
  const PETAL_D = "M 50 42 C 50 15, 85 15, 80 45 C 75 75, 55 65, 50 42";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div 
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{ 
            filter: "drop-shadow(0 0 8px rgba(197, 190, 248, 0.4))"
          }}
        >
          {ANGLES.map((angle, i) => (
            <path
              key={i}
              d={PETAL_D}
              style={{
                transform: `rotate(${angle}deg)`,
                transformOrigin: "50px 50px",
              }}
              fill="none"
              stroke="currentColor"
              className="text-[#8b5cf6] dark:text-[#C5BEF8]"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}
          <circle
            cx="50"
            cy="42"
            r="2"
            className="fill-[#8b5cf6] dark:fill-[#C5BEF8]"
          />
        </svg>
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
