function renderSaved() {
  showSavedHideElse();
  creategMemes();
  const elSavedMemes = document.querySelector('.existing-container');
  let strHTML = '';
  const canvasObjectList = [];
  gMemes.forEach((meme, index) => {
    const canvasClass = `saved-meme-${index}`;
    canvasObjectList.push({ canvasClass, meme });

    strHTML += `<canvas class='${canvasClass}' width=600 height=546 onclick="editImg(${index})" ></canvas>`;
  });
  elSavedMemes.innerHTML = strHTML;
  canvasObjectList.forEach((canvasObject) => {
    const currentCanvas = document.querySelector(`.${canvasObject.canvasClass}`);
    const currentCtx = currentCanvas.getContext('2d');
    const imgId = canvasObject.meme.selectedImgId;
    const currentImg = gImgs.find((img) => img.id === imgId).url;

    const img = new Image();
    img.src = currentImg;
    img.onload = () => {
      currentCtx.drawImage(img, 0, 0, currentCanvas.width, currentCanvas.height);
      drawStickersOnSaved(canvasObject.meme.stickers, currentCtx);
      drawLinesOnSaved(canvasObject.meme.lines, currentCtx);
    };
  });
}
function editImg(memeIndex) {
  gMeme = gMemes[memeIndex];
  showEditorHideElse();
  renderMeme();
}
function drawLinesOnSaved(lines, canvasCtx) {
  lines.forEach((line) => {
    canvasCtx.font = `${line.size}px ${line.font}`;
    canvasCtx.textAlign = line.align;
    canvasCtx.textBaseline = 'middle';
    canvasCtx.strokeStyle = line.strokeColor ?? 'White';
    canvasCtx.fillStyle = line.fontColor ?? 'Black';
    canvasCtx.strokeText(line.txt, line.posX, line.posY);
    canvasCtx.fillText(line.txt, line.posX, line.posY);
  });
}
function drawStickersOnSaved(stickers, canvasCtx) {
  stickers.forEach((image) => {
    const img = new Image();
    img.src = image.url;
    img.onload = () => {
      canvasCtx.drawImage(img, image.posX, image.posY, image.width, image.height);
    };
  });
}
