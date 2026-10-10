import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 pointer-events-none select-none">{char}</span>
      <motion.span
        style={{ opacity }}
        className="absolute inset-0"
      >
        {char}
      </motion.span>
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let charIndexCounter = 0;

  return (
    <p
      ref={containerRef}
      className={`relative inline-block text-center ${className}`}
    >
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        return (
          <span key={`w-${wordIndex}`} className="inline-block whitespace-nowrap">
            {wordChars.map((char) => {
              const currentIdx = charIndexCounter++;
              // Map character index smoothly across the scroll progress
              const start = currentIdx / totalChars;
              const end = Math.min(1, start + 0.08);
              return (
                <Character
                  key={`c-${currentIdx}`}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </p>
  );
};
