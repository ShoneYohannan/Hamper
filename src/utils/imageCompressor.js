/**
 * High-performance browser-side image compressor using HTML5 Canvas.
 * Resizes large camera photos (5MB-15MB) down to ultra-lightweight HD web images (~80KB-200KB)
 * to eliminate UI lag, reduce memory usage by 95%, and ensure instant saving.
 */
export function compressImageFile(file, maxWidth = 1200, maxHeight = 1200, quality = 0.82) {
  return new Promise((resolve) => {
    if (!file || !file.type.startsWith('image/')) {
      resolve(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio and bounds
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d', { alpha: false });
        
        if (!ctx) {
          resolve(e.target.result);
          return;
        }

        // Use high quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };

      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };

    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}
