function handleTextChange(text) {
  setLineTxt(text);
  renderMeme();
}
function handleFontColor(color) {
  setLineColor(color);
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

function addText() {
  addLine('Example Text');
  renderMeme();
}
function handleDelete() {
  deleteLine();
  renderMeme();
}

// function addTouchListeners() {
//   gElCanvas.addEventListener('touchmove', onMove);
//   gElCanvas.addEventListener('touchstart', onDown);
//   gElCanvas.addEventListener('touchend', onUp);
// }
// function addMouseListeners() {
//   gElCanvas.addEventListener('mousemove', onMove);
//   gElCanvas.addEventListener('mousedown', onDown);
//   gElCanvas.addEventListener('mouseup', onUp);
// }
function drawText() {
  const lines = getLines();
  console.log(lines);

  lines.forEach((line) => {
    const textWidth = gCtx.measureText(line.txt).width;
    const textHeight = parseInt(line.size);
    console.log(textWidth, textHeight);
    gCtx.font = `${line.size}px Arial`;
    gCtx.textAlign = line.align;
    gCtx.textBaseline = 'middle';
    gCtx.strokeStyle = 'white';
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
  gCtx.beginPath();
  gCtx.rect(currentLine.posX - width / 2 - padding, currentLine.posY - padding, width + padding * 2, currentLine.size + padding * 2);
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = 'red';
  gCtx.stroke();
  gCtx.closePath();
}
