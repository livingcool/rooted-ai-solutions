'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RootedLogoProps {
  className?: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  animate?: boolean;
}

/**
 * RootedLogo - A precision SVG recreation of the RootedAI geometric logo.
 * The pattern consists of 6 overlapping ellipses rotated by 60 degrees.
 */
const RootedLogo: React.FC<RootedLogoProps> = ({
  className = "",
  size = 40,
  color = "#240747",
  strokeWidth = 1.8,
  animate = true,
}) => {
  // Ellipse parameters to match the user's provided image
  const rx = 52;  // Major radius
  const ry = 30;  // Minor radius
  const cx = 20;  // Offset from center to create the hexagonal void
  
  const angles = [0, 60, 120, 180, 240, 300];

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="-100 -100 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <g>
        {angles.map((angle, index) => (
          <motion.ellipse
            key={index}
            cx={cx}
            cy={0}
            rx={rx}
            ry={ry}
            transform={`rotate(${angle})`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            variants={{
              initial: { 
                pathLength: 0, 
                opacity: 0 
              },
              animate: { 
                pathLength: 1, 
                opacity: 1,
                transition: {
                  duration: 1.5,
                  delay: index * 0.1,
                  ease: "easeInOut"
                }
              },
              hover: {
                strokeWidth: strokeWidth * 1.5,
                transition: { duration: 0.3 }
              }
            }}
          />
        ))}
      </g>
      
      {/* Optional: Subtle center highlight if needed, 
          but based on the pic, it's just the intersections */}
    </motion.svg>
  );
};

export default RootedLogo;
