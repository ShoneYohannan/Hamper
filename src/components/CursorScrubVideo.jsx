import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Upload, RotateCcw, MousePointer, Sparkles } from 'lucide-react';

export default function CursorScrubVideo() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [videoSrc, setVideoSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [useCanvasFallback, setUseCanvasFallback] = useState(true);
  const [scrubProgress, setScrubProgress] = useState(0); // 0 to 1
  const [isHovering, setIsHovering] = useState(false);
  const [videoFileName, setVideoFileName] = useState(null);

  // Lerp interpolation state refs
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const animFrameId = useRef(null);

  // Render dynamic 3D hamper scene onto canvas frame by frame
  const renderCanvasFrame = useCallback((progress) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Deep Forest Green background gradient
    const bgGrad = ctx.createRadialGradient(width/2, height/2, 50, width/2, height/2, width*0.7);
    bgGrad.addColorStop(0, '#1E5042');
    bgGrad.addColorStop(1, '#0D2921');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Draw grid/mesh background effect
    ctx.strokeStyle = 'rgba(183, 138, 69, 0.12)';
    ctx.lineWidth = 1;
    const gridSpacing = 40;
    for (let x = 0; x < width; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const angle = progress * Math.PI * 2;
    const centerX = width / 2;
    const centerY = height / 2 + Math.sin(angle * 2) * 12;

    // Draw glowing ambient light beneath hamper
    const glowGrad = ctx.createRadialGradient(centerX, centerY + 80, 10, centerX, centerY + 80, 180);
    glowGrad.addColorStop(0, 'rgba(212, 175, 55, 0.35)');
    glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + 80, 180 + Math.cos(angle)*20, 45, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw rotating 3D Hamper Box representation
    ctx.save();
    ctx.translate(centerX, centerY);

    // Hamper Basket Body
    const hamperW = 220;
    const hamperH = 140;

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.ellipse(0, hamperH/2 + 20, hamperW/2 + 20, 30, 0, 0, Math.PI * 2);
    ctx.fill();

    // Wicker Basket
    const basketGrad = ctx.createLinearGradient(-hamperW/2, 0, hamperW/2, 0);
    basketGrad.addColorStop(0, '#8C6734');
    basketGrad.addColorStop(0.5, '#C29B38');
    basketGrad.addColorStop(1, '#6E4E20');
    ctx.fillStyle = basketGrad;
    ctx.beginPath();
    ctx.roundRect(-hamperW/2, -hamperH/2 + 30, hamperW, hamperH, 16);
    ctx.fill();

    // Wicker Texture Weave lines
    ctx.strokeStyle = 'rgba(40, 25, 10, 0.3)';
    ctx.lineWidth = 3;
    for (let i = -hamperW/2 + 15; i < hamperW/2; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i + Math.sin(progress * 10 + i) * 3, -hamperH/2 + 32);
      ctx.lineTo(i + Math.sin(progress * 10 + i) * 3, hamperH/2 + 28);
      ctx.stroke();
    }

    // Gift Box 1 inside basket (Champagne bottle / Box)
    const box1X = -50 + Math.sin(angle) * 15;
    const box1Y = -hamperH/2 - 20 + Math.cos(angle) * 8;
    ctx.fillStyle = '#153D32';
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(box1X - 35, box1Y - 45, 70, 90, 8);
    ctx.fill();
    ctx.stroke();

    // Gold ribbon on Box 1
    ctx.fillStyle = '#D4AF37';
    ctx.fillRect(box1X - 6, box1Y - 45, 12, 90);

    // Gift Box 2 inside basket (Red festive box)
    const box2X = 35 + Math.cos(angle) * 15;
    const box2Y = -hamperH/2 - 10;
    ctx.fillStyle = '#A32828';
    ctx.beginPath();
    ctx.roundRect(box2X - 30, box2Y - 35, 60, 70, 6);
    ctx.fill();
    ctx.stroke();

    // Ribbon bow
    ctx.fillStyle = '#FFFDF8';
    ctx.beginPath();
    ctx.arc(box2X, box2Y - 35, 10, 0, Math.PI * 2);
    ctx.fill();

    // Sparkle Particles based on scrub
    ctx.fillStyle = '#FFF5D0';
    for (let p = 0; p < 8; p++) {
      const px = Math.sin(angle + p * 1.2) * (140 + p * 10);
      const py = Math.cos(angle * 1.5 + p) * (90 + p * 5) - 20;
      const size = Math.abs(Math.sin(angle * 3 + p)) * 4 + 2;
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();

    // Text & Progress Indicator Overlay on Canvas
    ctx.fillStyle = 'rgba(255, 253, 248, 0.9)';
    ctx.font = '600 13px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`SCRUB FRAME: ${Math.round(progress * 100)}%`, 24, height - 24);

    ctx.textAlign = 'right';
    ctx.fillText('3D HAMPER SCRUBBER', width - 24, height - 24);
  }, []);

  // Main lerp animation loop using requestAnimationFrame
  useEffect(() => {
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animateScrub = () => {
      // Smooth lerp interpolation factor
      const diff = Math.abs(targetProgress.current - currentProgress.current);
      if (diff > 0.0005) {
        currentProgress.current = lerp(currentProgress.current, targetProgress.current, 0.15);
        setScrubProgress(currentProgress.current);

        // Update video element current time if loaded
        if (videoRef.current && videoRef.current.duration && !isPlaying) {
          const targetTime = currentProgress.current * videoRef.current.duration;
          if (Math.abs(videoRef.current.currentTime - targetTime) > 0.02) {
            videoRef.current.currentTime = targetTime;
          }
        }
      }

      // Always update canvas renderer with current interpolated progress
      renderCanvasFrame(currentProgress.current);

      animFrameId.current = requestAnimationFrame(animateScrub);
    };

    animFrameId.current = requestAnimationFrame(animateScrub);

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [renderCanvasFrame, isPlaying]);

  // Handle Mouse movement across container to scrub target value
  const handleMouseMove = (e) => {
    if (!containerRef.current || isPlaying) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const progress = Math.max(0, Math.min(1, x / rect.width));
    targetProgress.current = progress;
  };

  // Handle Touch movement for Mobile responsiveness
  const handleTouchMove = (e) => {
    if (!containerRef.current || !e.touches[0] || isPlaying) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const progress = Math.max(0, Math.min(1, x / rect.width));
    targetProgress.current = progress;
  };

  // Handle Video file upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setVideoFileName(file.name);
      setUseCanvasFallback(false);
      setIsLoaded(false);
    }
  };

  // Toggle play/pause simulation
  const togglePlay = () => {
    if (videoRef.current && !useCanvasFallback) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Reset scrub position
  const handleReset = () => {
    targetProgress.current = 0;
    currentProgress.current = 0;
    setScrubProgress(0);
  };

  // Continuous auto-rotate when playing
  useEffect(() => {
    let playInterval;
    if (isPlaying) {
      playInterval = setInterval(() => {
        targetProgress.current = (targetProgress.current + 0.01) % 1;
      }, 30);
    }
    return () => clearInterval(playInterval);
  }, [isPlaying]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* Outer Card Container styled with centered layout and overflow-hidden */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-video md:aspect-[4/3] min-h-[460px] max-h-[600px] rounded-3xl bg-[#153D32] border border-[#1E5042] shadow-2xl flex items-center justify-center overflow-hidden cursor-crosshair group transition-all duration-300 hover:shadow-brand-green/20"
      >
        {/* Canvas Renderer for 3D interactive hamper scrub - Object Contain */}
        <canvas 
          ref={canvasRef} 
          width={600} 
          height={500}
          className={`w-full h-full object-contain object-center transition-opacity duration-300 ${
            useCanvasFallback ? 'block' : 'hidden'
          }`}
        />

        {/* Video Element if user uploads custom video - Object Contain */}
        {videoSrc && !useCanvasFallback && (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setIsLoaded(true)}
            className="w-full h-full object-contain object-center"
          />
        )}

        {/* Interactive Overlay & Cursor Scrub Guide */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none flex flex-col justify-between p-6">
          {/* Header Bar inside frame */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-2 bg-[#0D2921]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#1E5042]">
              <Sparkles className="w-3.5 h-3.5 text-[#B78A45] animate-pulse" />
              <span className="text-xs font-medium text-[#FFFDF8]">
                {useCanvasFallback ? 'Interactive 3D Frame Scrubber' : videoFileName}
              </span>
            </div>

            {/* Video / Canvas Switcher Pill */}
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 text-xs font-medium text-[#FFFDF8] bg-[#153D32]/90 hover:bg-[#1E5042] px-3 py-1.5 rounded-full border border-[#B78A45]/40 cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5 text-[#B78A45]" />
                <span>Upload Video</span>
                <input 
                  type="file" 
                  accept="video/mp4,video/webm,video/quicktime" 
                  onChange={handleFileUpload} 
                  className="hidden" 
                />
              </label>
            </div>
          </div>

          {/* Center Hint Prompt when not scrubbing actively */}
          {!isHovering && !isPlaying && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 text-center pointer-events-none animate-subtle-pulse">
              <div className="w-12 h-12 rounded-full bg-[#153D32]/80 backdrop-blur-md border border-[#B78A45] flex items-center justify-center text-[#D4AF37] shadow-lg">
                <MousePointer className="w-5 h-5 animate-bounce" />
              </div>
              <p className="text-sm font-medium text-[#FFFDF8] drop-shadow-md">
                Move cursor left/right to scrub video frames
              </p>
            </div>
          )}

          {/* Floating Cursor Position Line */}
          {isHovering && !isPlaying && (
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-[#D4AF37] pointer-events-none transition-all duration-75 shadow-[0_0_12px_#D4AF37]"
              style={{ left: `${scrubProgress * 100}%` }}
            >
              <div className="absolute top-4 -translate-x-1/2 bg-[#B78A45] text-[#153D32] font-bold text-[10px] px-2 py-0.5 rounded shadow">
                {Math.round(scrubProgress * 100)}%
              </div>
            </div>
          )}

          {/* Bottom Scrub Controls & Progress Bar */}
          <div className="pointer-events-auto flex flex-col gap-2.5">
            {/* Timeline Progress Bar */}
            <div 
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const progress = (e.clientX - rect.left) / rect.width;
                targetProgress.current = progress;
              }}
              className="w-full h-2 bg-black/40 backdrop-blur-md rounded-full overflow-hidden cursor-pointer border border-[#1E5042] relative group/track"
            >
              <div 
                className="h-full bg-gradient-to-r from-[#B78A45] to-[#D4AF37] transition-all duration-75"
                style={{ width: `${scrubProgress * 100}%` }}
              />
            </div>

            {/* Play/Pause & Info Controls */}
            <div className="flex items-center justify-between text-xs text-[#FFFDF8]/90">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full bg-[#153D32]/90 hover:bg-[#1E5042] border border-[#1E5042] text-[#D4AF37] transition-colors"
                  title={isPlaying ? 'Pause auto-scrub' : 'Play auto-scrub'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleReset}
                  className="p-2 rounded-full bg-[#153D32]/90 hover:bg-[#1E5042] border border-[#1E5042] text-[#FFFDF8] transition-colors"
                  title="Reset to frame 0"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <span className="font-mono text-[11px] text-[#D4AF37]">
                  Frame {(scrubProgress * 60).toFixed(0)} / 60
                </span>
              </div>

              {videoSrc && (
                <button
                  onClick={() => setUseCanvasFallback(!useCanvasFallback)}
                  className="text-[11px] underline text-[#B78A45] hover:text-[#D4AF37] transition-colors"
                >
                  Switch to {useCanvasFallback ? 'Uploaded Video' : '3D Canvas'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
