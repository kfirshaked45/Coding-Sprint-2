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
  // const currMemeDetails = gMeme.lines[currentLineIndex];
  // const textWidth = gCtx.measureText(currMemeDetails.txt).width;
  // const textHeight = parseInt(currMemeDetails.size);
  currentLineIndex = switchLine();
  makeBorder();
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
function drawText() {
  const lines = getLines();

  lines.forEach((line) => {
    gCtx.font = `${line.size}px Arial`;
    gCtx.textAlign = line.align;
    gCtx.textBaseline = 'middle';
    gCtx.strokeStyle = line.strokeColor;
    gCtx.fillStyle = line.fontColor;
    gCtx.strokeText(line.txt, line.posX, line.posY);
    gCtx.fillText(line.txt, line.posX, line.posY);
    makeBorder();
  });
}
function makeBorder() {
  const currentLine = getCurrLine();
  if (!currentLine) return;
  const padding = 20;
  const width = gCtx.measureText(currentLine.txt).width;
  const height = parseInt(currentLine.size);
  console.log(height);
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

function addText() {
  addLine('Example Text');
  renderMeme();
}
