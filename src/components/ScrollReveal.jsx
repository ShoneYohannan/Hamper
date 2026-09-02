import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal component for minimal, editorial on-scroll entrance animations.
 * Uses IntersectionObserver for 60fps hardware-accelerated transitions.
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  distance = 18,
  duration = 550,
  direction = 'up', // 'up' | 'none'
  threshold = 0.1
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // If browser doesn't support IntersectionObserver or reduced motion is preferred
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const el = elementRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold]);

  const initialTransform = direction === 'up' ? `translateY(${distance}px)` : 'none';

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : initialTransform,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
}
