import React, { useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function TiltCard({
  children,
  className = '',
  maxTilt = 8,
  glowColor = 'rgba(212, 175, 55, 0.18)',
  onClick
}) {
  const { isPremiumAnim, isGlass } = useTheme();
  const cardRef = useRef(null);
  const [style, setStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
    transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease',
    spotlightX: 50,
    spotlightY: 50,
    isHovered: false
  });

  const handleMouseMove = (e) => {
    if (!isPremiumAnim || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(6px)`,
      transition: 'transform 0.1s ease-out',
      spotlightX: (x / rect.width) * 100,
      spotlightY: (y / rect.height) * 100,
      isHovered: true
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
      spotlightX: 50,
      spotlightY: 50,
      isHovered: false
    });
  };

  // If user turned off premium animations, render simple flat container with zero tilt
  if (!isPremiumAnim) {
    return (
      <div onClick={onClick} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: style.transform,
        transition: style.transition,
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
      className={`relative group ${className}`}
    >
      {/* Localized Spotlight Halo that tracks cursor */}
      {style.isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 280px at ${style.spotlightX}% ${style.spotlightY}%, ${
              isGlass ? glowColor : 'rgba(0, 0, 0, 0.04)'
            }, transparent 80%)`,
            mixBlendMode: isGlass ? 'screen' : 'multiply'
          }}
        />
      )}
      {children}
    </div>
  );
}
