const sharp = require('sharp');
const axios = require('axios');
const fs = require('fs');

async function compressImage(imageInput, options = {}) {
  let buffer;

  // Verificar si la entrada es una URL o un buffer
  if (typeof imageInput === 'string' && imageInput.startsWith('http')) {
    // Si es una URL, descarga la imagen
    const response = await axios({
      url: imageInput,
      responseType: 'arraybuffer',
    });
    buffer = Buffer.from(response.data, 'binary');
  } else if (typeof imageInput === 'string' && fs.existsSync(imageInput)) {
    // Si es una ruta de archivo local, léelo directamente
    buffer = fs.readFileSync(imageInput);
  } else if (Buffer.isBuffer(imageInput)) {
    // Si es un buffer, úsalo directamente
    buffer = imageInput;
  } else {
    throw new Error('Invalid input type: must be a URL, file path, or Buffer');
  }

  // Comprimir la imagen
  const compressedImage = await sharp(buffer)
    .toFormat(options.format || 'jpeg', { quality: options.quality || 80 })
    .toBuffer();

  return compressedImage;
}

async function compressImagesSync(imageInputs, options = {}) {
  const compressedImages = {};
  
  for (let index = 0; index < imageInputs.length; index++) {
    const input = imageInputs[index];
    const compressedImage = await compressImage(input, options);
    compressedImages[`image${index}`] = compressedImage; // Guardar en un objeto con claves dinámicas
  }
  
  return compressedImages;
}

module.exports = { compressImage, compressImagesSync };