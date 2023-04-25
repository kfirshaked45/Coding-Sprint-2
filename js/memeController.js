let gElCanvas;
let gCtx;

function renderMeme() {
  const selectedMeme = getMeme();
  // console.log(memeText, memeFont, memeColor);
  const selectedImg = getImg(selectedMeme);
  const img = new Image();
  img.src = selectedImg.url;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    drawText();

    // gCtx.save();
  };
}
// function drawText(text, x, y, color, size) {
//   gCtx.lineWidth = 2;
//   gCtx.strokeStyle = 'white';
//   gCtx.fillStyle = color;
//   gCtx.font = `${size} Arial`;
//   gCtx.textAlign = 'center';
//   gCtx.textBaseline = 'middle';

//   gCtx.fillText(text, x, y); // Draws (fills) a given text at the given (x, y) position.
//   gCtx.strokeText(text, x, y); // Draws (strokes) a given text at the given (x, y) position.
// }

function drawText() {
  const lines = getLines();
  console.log(lines);
  lines.forEach((line) => {
    gCtx.font = `${line.size}px Arial`;
    gCtx.textAlign = line.align;
    gCtx.textBaseline = 'middle';
    gCtx.strokeStyle = 'white';
    gCtx.fillStyle = line.color;
    gCtx.fillText(line.txt, 250, 50);
    gCtx.strokeText(line.txt, 250, 50);
  });
}

// function clearCanvas() {
//   gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
// }
function handleTextChange(text) {
  setLineTxt(text);
  renderMeme();
}
function handleColorChange(color) {
  setLineColor(color);
  renderMeme();
}
function handleFont(action) {
  setFontSize(action);
  renderMeme();
}
function handleSwitch() {
  currentLineIndex = switchLine();
  console.log(currentLineIndex);
}
