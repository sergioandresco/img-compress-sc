// src/compressLocal.js
import imageCompression from 'browser-image-compression';

export const compressLocalImage = async (files, maxQuality = 80) => {
  const options = {
    maxSizeMB: 1, // Puedes ajustar esto según tus necesidades
    useWebWorker: true,
    initialQuality: maxQuality / 100, // Usar solo la calidad especificada
  };

  try {
    // Si es un solo archivo, lo manejamos directamente
    if (!Array.isArray(files)) {
      const compressedFile = await imageCompression(files, options);
      return compressedFile;
    }

    // Si es un array de archivos, comprimimos cada uno
    const compressedFiles = await Promise.all(
      files.map(async (file) => {
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
      })
    );
    
    return compressedFiles; // Devuelve un array de archivos comprimidos
  } catch (error) {
    console.error('Error al comprimir las imágenes locales:', error);
    throw error;
  }
};