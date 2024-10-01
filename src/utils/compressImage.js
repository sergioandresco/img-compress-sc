import axios from 'axios';
import imageCompression from 'browser-image-compression';

async function compressImage(imageInput, options = {}) {
  let imageFile;

  if (typeof imageInput === 'string' && imageInput.startsWith('http')) {
    // Si es una URL, descarga la imagen como un array buffer
    const response = await axios({
      url: imageInput,
      responseType: 'arraybuffer',
    });
    const buffer = Buffer.from(response.data, 'binary');

    // Convertir el buffer en un Blob
    imageFile = new Blob([buffer], { type: 'image/jpeg' }); // Cambia el tipo según sea necesario
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