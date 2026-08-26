import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 300; // Total frames extracted by FFmpeg

const Hero = () => {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const targetProgress = useRef(0.5);
  const currentProgress = useRef(0.5);
  const animationFrameRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Helper to draw a frame onto the canvas with object-cover math
  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = imagesRef.current[index];

    if (!img || !img.complete) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth || 1280;
    const imgHeight = img.naturalHeight || 720;

    // Calculate aspect ratios for "object-cover"
    const canvasRatio = canvasWidth / canvasHeight;
    const imgRatio = imgWidth / imgHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      drawHeight = canvasHeight;
      // Focus slightly right (65% focal point) on desktop
      offsetX = (canvasWidth - drawWidth) * 0.65;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    // 1. Preload all 300 images into memory
    let loadedCount = 0;
    const loadedImages = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      // Pad frame index to 4 digits: frame_0001.webp ... frame_0300.webp
      const paddedIndex = String(i).padStart(4, "0");
      img.src = `/frames/frame_${paddedIndex}.webp`;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          // Draw initial frame as soon as frame 1 arrives
          renderFrame(0);
        }
        if (loadedCount === FRAME_COUNT) {
          setImagesLoaded(true);
        }
      };

      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    // 2. Handle canvas high-DPI scaling & resizing
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Re-render current frame on window resize
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(currentProgress.current * FRAME_COUNT)
      );
      renderFrame(frameIndex);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // 3. Track cursor position across the window
    const handlePointerMove = (e) => {
      targetProgress.current = Math.max(
        0,
        Math.min(1, e.clientX / window.innerWidth)
      );
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // 4. Smooth lerp animation loop
    const animate = () => {
      const lerpFactor = 0.12; // Easing smoothness

      currentProgress.current +=
        (targetProgress.current - currentProgress.current) * lerpFactor;

      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(currentProgress.current * FRAME_COUNT)
      );

      renderFrame(frameIndex);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section className="min-h-[85vh] lg:min-h-[90vh] relative overflow-hidden bg-[#FDFBF7] flex items-center">
      {/* Background Canvas Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />
      </div>

      {/* Left Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7]/90 via-[#FDFBF7]/40 to-transparent w-full md:w-2/3 lg:w-1/2 pointer-events-none z-[1]" />

      {/* Hero Content Layer */}
      <div className="relative z-10 max-w-xl text-left pl-6 lg:pl-16 space-y-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#2F2A26] leading-[1.05]">
          Curated Gift Hampers for Life&apos;s Best Moments
        </h1>

        <p className="text-base sm:text-lg text-[#5F5750] leading-relaxed max-w-lg">
          Thoughtfully curated gift hampers designed to make every celebration, milestone, and special moment unforgettable.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <button
            type="button"
            className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-[#2F2A26] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#463D36] hover:-translate-y-0.5"
          >
            Shop Collections
          </button>

          <button
            type="button"
            className="pointer-events-auto inline-flex items-center justify-center rounded-full border border-[#2F2A26]/30 bg-white/60 backdrop-blur-sm px-7 py-3.5 text-sm font-medium text-[#2F2A26] transition-all duration-300 hover:bg-white hover:-translate-y-0.5"
          >
            Build Your Own
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;