import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Theme style: 'glass' (Luxe Glassmorphism) or 'minimal' (Editorial Minimalist)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('hamper_theme_mode');
    return saved === 'minimal' ? 'minimal' : 'glass';
  });

  // Animation intensity: 'high' (Premium 3D Tilt, magnetic glow, shimmers) or 'classic' (previous smooth minimal reveals)
  const [animIntensity, setAnimIntensity] = useState(() => {
    const savedAnim = localStorage.getItem('hamper_anim_intensity');
    return savedAnim === 'classic' ? 'classic' : 'high';
  });

  useEffect(() => {
    localStorage.setItem('hamper_theme_mode', theme);
    const root = document.documentElement;
    if (theme === 'glass') {
      root.classList.add('theme-glass');
      root.classList.remove('theme-minimal');
    } else {
      root.classList.add('theme-minimal');
      root.classList.remove('theme-glass');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('hamper_anim_intensity', animIntensity);
    const root = document.documentElement;
    if (animIntensity === 'high') {
      root.classList.add('anim-premium');
      root.classList.remove('anim-classic');
    } else {
      root.classList.add('anim-classic');
      root.classList.remove('anim-premium');
    }
  }, [animIntensity]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'glass' ? 'minimal' : 'glass'));
  };

  const toggleAnimIntensity = () => {
    setAnimIntensity((prev) => (prev === 'high' ? 'classic' : 'high'));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        isGlass: theme === 'glass',
        animIntensity,
        setAnimIntensity,
        toggleAnimIntensity,
        isPremiumAnim: animIntensity === 'high'
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
