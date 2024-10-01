import axios from 'axios';
import imageCompression from 'browser-image-compression';

async function compressImage(imageInput, options = {}) {
  let imageFile;

  if (typeof imageInput === 'string' && imageInput.startsWith('http')) {
    const response = await axios.get(`https://cors-anywhere.herokuapp.com/${imageInput}`, { responseType: 'blob' }); // Usar proxy CORS
    const blob = response.data;
    imageFile = new File([blob], 'image.jpg', { type: blob.type });
  } else if (imageInput instanceof File) {
    imageFile = imageInput;
  } else {
    throw new Error('Invalid input type: must be a URL or a File');
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

export { compressImage, compressImages };