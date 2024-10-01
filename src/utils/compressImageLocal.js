const fs = require('fs');
const sharp = require('sharp');

async function compressLocalImage(imageInput, options = {}) {
  let buffer;

  if (typeof imageInput === 'string' && fs.existsSync(imageInput)) {
    buffer = fs.readFileSync(imageInput);
  } else {
    throw new Error('Invalid input type: must be a valid file path');
  }

  const compressedImage = await sharp(buffer)
    .toFormat(options.format || 'jpeg', { quality: options.quality || 80 })
    .toBuffer();

  return compressedImage;
}

async function compressLocalImages(imageInputs, options = {}) {
  const compressedImages = {};

  for (let index = 0; index < imageInputs.length; index++) {
    const input = imageInputs[index];
    const compressedImage = await compressLocalImage(input, options);
    compressedImages[`image${index}`] = compressedImage; // Guardar en un objeto con claves dinámicas
  }

  return compressedImages;
}

// Exportar las funciones
module.exports = {
  compressLocalImage,
  compressLocalImages,
};