function renderMeme() {
  showCanvasHideGallery();
  drawCanvas();
  renderStickers();
}

function renderStickers() {
  const elStickerDiv = document.querySelector('.stickers');
  let stickersUrls = getCurrentStickerPages();
  let stickerStrHTML = '<i class="fa-solid fa-angle-left angles"  onclick=prevStickerPage()></i>';
  stickersUrls.forEach((url) => {
    stickerStrHTML += `<li><img src='${url}' class='sticker-img' onclick=handleSticker(this.src) /></li>`;
  });
  elStickerDiv.innerHTML = stickerStrHTML + `<i class="fa-solid fa-angle-right angles"  onclick=nextStickerPage()></i>`;
}
function handleFontColor(color) {
  setLineColor(color);
  renderMeme();
}
function handleStrokeColor(color) {
  setStrokeColor(color);
  renderMeme();
}
function handleFont(action) {
  setFontSize(action);
  renderMeme();
}
function handleAlign(action) {
  setAlign(action);

  renderMeme();
}
function handleSwitch() {
  currentLineIndex = switchLine();
  makeBorder();
  renderMeme();
}
function handleSwitchSticker() {
  currentStickerIndex = switchSticker();
  makeBorderSticker();
  renderMeme();
}
function handleFlexiable() {
  selectRandomMeme();
  renderMeme();
}
function moveText(action) {
  moveLinePos(action);
  renderMeme();
}
function onImgSelect(id) {
  setImg(id);

  renderMeme();
}
function handleChangeInput(txt) {
  addLineInput(txt);
  renderMeme();
}

function handleDelete() {
  deleteLine();
  renderMeme();
}
function selectRandomMeme() {
  var randomImg = getRandomIntInclusive(1, gImgs.length);

  gMeme.selectedImgId = randomImg;
}
function drawLine() {
  const lines = getLines();

  lines.forEach((line) => {
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.textAlign = line.align;
    gCtx.textBaseline = 'middle';
    gCtx.strokeStyle = line.strokeColor;
    gCtx.fillStyle = line.fontColor;
    gCtx.strokeText(line.txt, line.posX, line.posY);
    gCtx.fillText(line.txt, line.posX, line.posY);
    makeBorder();
  });
}

function makeBorderSticker() {
  const currentSticker = getCurrSticker();
  if (!currentSticker) return;
  const padding = 20;
  const width = 70;
  const height = 70;

  gCtx.beginPath();
  gCtx.rect(
    currentSticker.posX - width / 2 - padding,
    currentSticker.posY - height / 2 - padding,
    width + padding * 2,
    currentSticker.size + padding * 2
  );
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = 'White';
  gCtx.stroke();
  gCtx.closePath();
}

function makeBorder() {
  const currentLine = getCurrLine();
  if (!currentLine) return;
  const padding = 20;
  const width = gCtx.measureText(currentLine.txt).width;
  const height = parseInt(currentLine.size);

  gCtx.beginPath();
  gCtx.rect(
    currentLine.posX - width / 2 - padding,
    currentLine.posY - height / 2 - padding,
    width + padding * 2,
    currentLine.size + padding * 2
  );
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = 'White';
  gCtx.stroke();
  gCtx.closePath();
}
function checkOnSticker(pos) {
  const width = 70;
  const height = 70;
  const sticker = getCurrSticker();
  if (
    pos.x >= sticker.posX - width / 2 &&
    pos.x <= sticker.posX + width / 2 + height &&
    pos.y >= sticker.posY - width / 2 &&
    pos.y <= sticker.posY + width / 2 + height
  ) {
    return true;
  }

  return false;
}

function addText() {
  addLine('Example Text');
  renderMeme();
}
function drawSticker() {
  const stickers = getStickers();
  stickers.forEach((image) => {
    const img = new Image();
    img.src = image.url;
    img.onload = () => {
      gCtx.drawImage(img, image.posX, image.posY, image.width, image.height);
      makeBorder();
    };
  });
}

function handleSticker(src) {
  addSticker(src);
  renderMeme();
}

function showCanvasHideGallery() {
  const elEditorDisplay = document.querySelector('.img-editor');
  elEditorDisplay.classList.add('show-canvas');
  const elGalleryContainer = document.querySelector('.gallery-container');
  elGalleryContainer.classList.add('hidden');
}
function drawCanvas() {
  const selectedMeme = getMeme();
  const selectedImg = getImg(selectedMeme);
  const img = new Image();
  const url = gUploadedImg ? gUploadedImg : selectedImg.url;

  img.src = url;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    drawSticker();

    drawLine();
  };
}
