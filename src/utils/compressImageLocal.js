// src/compressLocal.js
import imageCompression from 'browser-image-compression';

const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/tiff', 'image/avif', 'image/svg+xml'];

export const compressLocalImage = async (file, maxQuality = 80) => {
  if (!validImageTypes.includes(file.type)) {
    throw new Error('Tipo de archivo no soportado. Acepta JPEG, JPG, PNG, WEBP, TIFF, AVIF y SVG.');
  }

  const options = {
    maxSizeMB: 1, // Puedes ajustar esto según tus necesidades
    useWebWorker: true,
    initialQuality: maxQuality / 100, // Usar solo la calidad especificada
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Error al comprimir la imagen local:', error);
    throw error;
  }
};