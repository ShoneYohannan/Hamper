import React, { useEffect, useRef } from 'react';

export default function HeroBannerTracker({ onOpenBuilder }) {
  const videoRef = useRef(null);
  const isVideoReady = useRef(false);
  const targetProgress = useRef(0.5);
  const currentProgress = useRef(0.5);

  useEffect(() => {
    // 1. Listen for global cursor position across the whole window
    const handlePointerMove = (e) => {
      const normalizedX = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
      targetProgress.current = normalizedX;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // 2. High-performance lerp animation loop (no React re-renders)
    let animationFrameId;
    const updateScrub = () => {
      // 0.15 smoothing factor for instantaneous, fluid eye & face tracking
      currentProgress.current += (targetProgress.current - currentProgress.current) * 0.15;

      const video = videoRef.current;
      if (video && isVideoReady.current && video.duration && !isNaN(video.duration)) {
        const targetTime = currentProgress.current * video.duration;
        if (Math.abs(video.currentTime - targetTime) > 0.005) {
          video.currentTime = targetTime;
        }
      }

      animationFrameId = requestAnimationFrame(updateScrub);
    };

    animationFrameId = requestAnimationFrame(updateScrub);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleLoadedMetadata = () => {
    isVideoReady.current = true;
  };

  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden bg-[#FDFBF7]">

      {/* 1. Full-Bleed Background Video Container */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <video
          ref={videoRef}
          src="/hero-character.mp4"
          muted
          playsInline
          preload="auto"
          disableRemotePlayback
          controls={false}
          autoPlay={false}
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full h-full object-cover object-right md:object-[75%_center] lg:object-right"
        />
        {/* Soft horizontal gradient mask to keep text ultra-readable without covering the girl */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7]/95 via-[#FDFBF7]/50 to-transparent w-full md:w-2/3 lg:w-1/2 pointer-events-none z-[1]" />
      </div>

      {/* 2. Text & CTAs Floating On Top */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="max-w-xl text-left space-y-6">

          <span className="inline-block text-xs uppercase tracking-[0.2em] text-[#1B3B2B] font-semibold">
            Gifts with a little more meaning
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1B3B2B] leading-[1.15] tracking-tight">
            Curated Gift Hampers <br className="hidden sm:inline" />
            for Life's Best Moments
          </h1>

          <p className="text-[#4A4A4A] text-base sm:text-lg leading-relaxed max-w-md">
            Handcrafted treats, luxury essentials, and thoughtful surprises delivered with love.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4 pointer-events-auto">
            <a
              href="#collections"
              className="bg-[#1B3B2B] text-[#FDFBF7] px-8 py-3.5 rounded-full font-medium shadow-md hover:bg-[#152e22] hover:shadow-lg transition-all transform hover:-translate-y-0.5 inline-flex items-center justify-center"
            >
              Shop Collections
            </a>
            <button
              onClick={onOpenBuilder}
              className="border border-[#1B3B2B] text-[#1B3B2B] bg-white/60 backdrop-blur-sm px-8 py-3.5 rounded-full font-medium hover:bg-white transition-all inline-flex items-center justify-center"
            >
              Build Your Own
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}