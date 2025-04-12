'use client';

import { useEffect, useState } from 'react';

type MatrixColumn = {
  x: number;
  chars: string[];
  speed: number;
  opacity: number;
};

export function MatrixBackground() {
  const [columns, setColumns] = useState<MatrixColumn[]>([]);
  
  useEffect(() => {
    // Only run on desktop browsers
    if (typeof window === 'undefined' || window.innerWidth < 768) {
      return;
    }
    
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columnCount = Math.floor(window.innerWidth / 20); // One column every 20px
    
    // Create matrix columns
    const initColumns = Array.from({ length: columnCount }, (_, i) => {
      const charCount = 5 + Math.floor(Math.random() * 15); // Random length between 5-20 chars
      return {
        x: (i * 20) + Math.random() * 10, // Add some randomness to x position
        chars: Array.from({ length: charCount }, () => characters.charAt(Math.floor(Math.random() * characters.length))),
        speed: 25 + Math.random() * 50, // Faster speed (half the original)
        opacity: 0.05 + Math.random() * 0.2 // Lower opacity for better contrast
      };
    });
    
    setColumns(initColumns);
    
    // Recreate the columns on window resize
    const handleResize = () => {
      const newColumnCount = Math.floor(window.innerWidth / 20);
      const newColumns = Array.from({ length: newColumnCount }, (_, i) => {
        const charCount = 5 + Math.floor(Math.random() * 15);
        return {
          x: (i * 20) + Math.random() * 10,
          chars: Array.from({ length: charCount }, () => characters.charAt(Math.floor(Math.random() * characters.length))),
          speed: 25 + Math.random() * 50, // Faster speed
          opacity: 0.05 + Math.random() * 0.2
        };
      });
      
      setColumns(newColumns);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // No columns on mobile
  if (columns.length === 0) {
    return null;
  }
  
  return (
    <div className="matrix-bg">
      {columns.map((column, colIndex) => (
        <div 
          key={colIndex}
          className="matrix-column"
          style={{
            left: `${column.x}px`,
            opacity: column.opacity,
            animationDuration: `${column.speed}s`,
          }}
        >
          {column.chars.map((char, charIndex) => (
            <div key={charIndex}>{char}</div>
          ))}
        </div>
      ))}
    </div>
  );
}