import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Theme style: always 'glass' (Royal Purple & Imperial Gold Luxe Glassmorphism)
  const [theme, setTheme] = useState('glass');

  // Animation intensity: always 'high' (Premium 3D Tilt, magnetic glow, shimmers)
  const [animIntensity, setAnimIntensity] = useState('high');

  useEffect(() => {
    // Clear legacy minimal mode cached in browser localStorage
    if (localStorage.getItem('hamper_theme_mode') === 'minimal') {
      localStorage.removeItem('hamper_theme_mode');
    }
    localStorage.setItem('hamper_theme_mode', 'glass');
    localStorage.setItem('hamper_anim_intensity', 'high');
    
    const root = document.documentElement;
    root.classList.add('theme-glass', 'anim-premium');
    root.classList.remove('theme-minimal', 'anim-classic');
  }, []);

  const toggleTheme = () => {
    setTheme('glass');
  };

  const toggleAnimIntensity = () => {
    setAnimIntensity('high');
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: 'glass',
        setTheme,
        toggleTheme,
        isGlass: true,
        animIntensity: 'high',
        setAnimIntensity,
        toggleAnimIntensity,
        isPremiumAnim: true
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
