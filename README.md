# img-compressor-sc

![img-compressor-sc logo](assets/img/img-compressor-sc.jpg)

## Easy images compressor for to use

img-compressor-sc is a library in Node.js for compress images by URL and images in local location in live time.

> You can use this library for compress differents image types in live time to make your 
> project more light.

## Description

This library is a project think by a frontend developer with the need of, how can to use many images with a light size and very easy to implementate?, when for example the client or the design team we give the images packet and these has a high weight, wich cause our web page are very slow.

This library solve that problem with your funcionalities which help us to compress many images before the web page loaded or your web component.

## Accepted formats

| # | format       |
|---|--------------|
| 1 | `JPEG / JPG` |
| 2 | `PNG`        |
| 3 | `WebP`       |
| 4 | `TIFF`       |
| 5 | `AVIF`       |
| 6 | `SVG`        |

Note: In the SVG format is manipulation of vector, not compression.

## Installation

You can add img-compressor-sc in your project via npm.

```
npm install img-compressor-sc
```

After installation, you need import the components.

```js
import { compressImage, compressImagesSync } from ‘img-compressor-sc’;
```

## Usage and Examples

### React

```jsx
import { useState, useEffect } from 'react';
import { compressImage } from 'img-compressor-sc';

const App = () => {
  const [compressedUrlImage, setCompressedUrlImage] = useState(null);
  const [compressedLocalImage, setCompressedLocalImage] = useState(null);

  useEffect(() => {
    const jpgUrl = 'https://img.freepik.com/foto-gratis/montanas-vestrahorn-stokksnes-islandia_335224-667.jpg';
    const localImagePath = './img/test.jpg';

    const compressImages = async () => {
      // Compress img from URL
      const compressedFromUrl = await compressImage(jpgUrl, { quality: 80 });
      setCompressedUrlImage(URL.createObjectURL(new Blob([compressedFromUrl])));

      // Compress local img
      const response = await fetch(localImagePath);
      const imageBuffer = await response.arrayBuffer();
      const compressedFromLocal = await compressImage(imageBuffer, { quality: 80 });
      setCompressedLocalImage(URL.createObjectURL(new Blob([compressedFromLocal])));
    };

    compressImages();
  }, []);

  return (
    <div>
      <div>
        <h3>Imagen Comprimida desde URL</h3>
        {compressedUrlImage ? <img src={compressedUrlImage} alt="Compressed from URL" /> : <p>Loading...</p>}
      </div>
      <div>
        <h3>Imagen Comprimida desde Archivo Local</h3>
        {compressedLocalImage ? <img src={compressedLocalImage} alt="Compressed from Local" /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default App;
```

### VUE

```js
<template>
  <div>
    <div>
      <h3>Compress img from URL</h3>
      <img v-if="compressedUrlImage" :src="compressedUrlImage" alt="Compressed from URL" />
      <p v-else>Loading...</p>
    </div>
    <div>
      <h3>Compress local img</h3>
      <img v-if="compressedLocalImage" :src="compressedLocalImage" alt="Compressed from Local" />
      <p v-else>Loading...</p>
    </div>
  </div>
</template>

<script>

import { compressImage } from 'img-compressor-sc';

export default {
  data() {
    return {
      compressedUrlImage: null,
      compressedLocalImage: null
    };
  },
  mounted() {
    const jpgUrl = 'https://img.freepik.com/foto-gratis/montanas-vestrahorn-stokksnes-islandia_335224-667.jpg';
    const localImagePath = './img/test.jpg';

    const compressImages = async () => {
      // Compress img from URL
      const compressedFromUrl = await compressImage(jpgUrl, { quality: 80 });
      const urlBlob = new Blob([compressedFromUrl]);
      this.compressedUrlImage = URL.createObjectURL(urlBlob);

      // Compress local img
      const response = await fetch(localImagePath);
      const imageBuffer = await response.arrayBuffer();
      const compressedFromLocal = await compressImage(imageBuffer, { quality: 80 });
      const localBlob = new Blob([compressedFromLocal]);
      this.compressedLocalImage = URL.createObjectURL(localBlob);
    };

    compressImages();
  }
};
</script>
```

### JS Vainilla

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Image Compressor Example</title>
  <script src="path/to/img-compressor-sc.js"></script>
</head>
<body>
  <div id="app">
    <p>Loading...</p>
  </div>

  <script>
    const app = document.getElementById('app');
    const jpgUrl = 'https://img.freepik.com/foto-gratis/montanas-vestrahorn-stokksnes-islandia_335224-667.jpg';
    const localImagePath = './img/test.jpg';

    async function compressImages() {
      // Compress img from URL
      const compressedFromUrl = await imgCompressorSc.compressImage(jpgUrl, { quality: 80 });
      const urlBlob = new Blob([compressedFromUrl]);
      const urlImage = URL.createObjectURL(urlBlob);

      // Compress local img
      const response = await fetch(localImagePath);
      const imageBuffer = await response.arrayBuffer();
      const compressedFromLocal = await imgCompressorSc.compressImage(imageBuffer, { quality: 80 });
      const localBlob = new Blob([compressedFromLocal]);
      const localImage = URL.createObjectURL(localBlob);

      // Render both images
      app.innerHTML = `
        <h3>Img compress from URL</h3>
        <img src="${urlImage}" alt="Compressed from URL" />
        <h3>Img compress from local files</h3>
        <img src="${localImage}" alt="Compressed from Local" />
      `;
    }

    compressImages();
  </script>
</body>
</html>
```