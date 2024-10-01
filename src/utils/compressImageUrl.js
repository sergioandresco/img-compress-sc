// src/compressFromUrl.js
const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/tiff', 'image/avif', 'image/svg+xml'];

export const compressImageFromUrl = async (url, maxQuality = 80) => {
  const image = new Image();
  image.crossOrigin = 'Anonymous'; // Permite manejar CORS

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      // Convertir a formato JPEG o PNG
      const compressedDataUrl = canvas.toDataURL('image/jpeg', maxQuality / 100);
      resolve(compressedDataUrl);
    };

    image.onerror = (error) => {
      console.error('Error al cargar la imagen desde URL:', error);
      reject(error);
    };

    image.src = url; // Carga la imagen
  });
};