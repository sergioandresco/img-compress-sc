const axios = require('axios');
const imageCompression = require('browser-image-compression');

async function compressImage(imageInput, options = {}) {
  let imageFile;

  if (typeof imageInput === 'string' && imageInput.startsWith('http')) {
    const response = await axios.get(imageInput, { responseType: 'blob' });
    const blob = response.data;
    imageFile = new File([blob], 'image.jpg', { type: blob.type });
  } else {
    throw new Error('Invalid input type: must be a URL');
  }

  const compressionOptions = {
    maxSizeMB: 1,
    useWebWorker: true,
    initialQuality: options.quality || 80,
  };

  const compressedImage = await imageCompression(imageFile, compressionOptions);
  return compressedImage;
}

async function compressImages(imageInputs, options = {}) {
  const compressedImages = [];

  for (let input of imageInputs) {
    const compressedImage = await compressImage(input, options);
    compressedImages.push(compressedImage);
  }

  return compressedImages;
}

// Exportar las funciones
module.exports = {
  compressImage,
  compressImages,
};