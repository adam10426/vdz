import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
  wiggle: number;
  color: string;
}

export function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const freshPetals: Petal[] = Array.from({ length: 15 }).map((_, i) => {
      const size = Math.random() * 12 + 8; // 8px to 20px
      return {
        id: i,
        x: Math.random() * 100, // percentage from left
        y: -10 - Math.random() * 20, // start above screen
        size,
        delay: Math.random() * 10,
        duration: Math.random() * 15 + 15, // 15s to 30s
        rotation: Math.random() * 360,
        wiggle: Math.random() * 30 + 10,
        color: Math.random() > 0.6 ? '#f4c2c2' : '#fff0f2', // soft blush or warm white
      };
    });
    setPetals(freshPetals);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute rounded-full opacity-60"
          style={{
            left: `${petal.x}%`,
            top: `${petal.y}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 0.8}px`,
            backgroundColor: petal.color,
            boxShadow: '0 2px 8px rgba(244, 194, 194, 0.2)',
            transform: `rotate(${petal.rotation}deg)`,
            animation: `fall-${petal.id} ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
          }}
        />
      ))}
      <style>{`
        ${petals
          .map(
            (petal) => `
          @keyframes fall-${petal.id} {
            0% {
              top: -10%;
              transform: translateX(0) rotate(${petal.rotation}deg);
            }
            50% {
              transform: translateX(${petal.wiggle}px) rotate(${petal.rotation + 180}deg);
            }
            100% {
              top: 110%;
              transform: translateX(-${petal.wiggle}px) rotate(${petal.rotation + 360}deg);
            }
          }
        `
          )
          .join('\n')}
      `}</style>
    </div>
  );
}
