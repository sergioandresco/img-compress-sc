import imageCompression from 'browser-image-compression';

async function compressImage(imageInput, options = {}) {
  let imageFile;

  if (typeof imageInput === 'string' && imageInput.startsWith('http')) {
    const response = await fetch(imageInput);
    const blob = await response.blob();
    imageFile = new File([blob], 'image.jpg', { type: blob.type });
  } else if (imageInput instanceof File) {
    imageFile = imageInput;
  } else {
    throw new Error('Invalid input type: must be a URL or a File');
  }

  const compressionOptions = {
    maxSizeMB: options.maxSizeMB || 1,
    maxWidthOrHeight: options.maxWidthOrHeight || 1024,
    useWebWorker: options.useWebWorker || true,
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