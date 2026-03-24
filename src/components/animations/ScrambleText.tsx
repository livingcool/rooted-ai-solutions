import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

const ScrambleText: React.FC<ScrambleTextProps> = ({ text, className = "" }) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let iteration = 0;
    let intervalId: ReturnType<typeof setInterval>;

    const animate = () => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (letter === " ") return " ";
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalId);
      }
      iteration += 0.5; // Controls the speed of decoding
    };

    intervalId = setInterval(animate, 30);
    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <motion.span 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      {displayText}
    </motion.span>
  );
};

export default ScrambleText;
