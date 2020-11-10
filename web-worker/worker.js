addEventListener('message', d => {
  const imageData = d.data;
  const data = imageData.data;
  const w = imageData.width;
  const h = imageData.height;

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let index = (x + y * w) * 4;
      data[index] = data[index] * 2;
    }
  }

  postMessage(imageData, imageData.data.buffer);
});
