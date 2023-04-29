function setImg(id) {
  gMeme.selectedImgId = id;
  _saveMeme();
}

function _createLine(txt) {
  return {
    txt,
    size: 30,
    align: 'center',
    posX: 250,
    posY: 50,
  };
}
function getMeme() {
  return gMeme;
}
function getLines() {
  return gMeme.lines;
}
function getCurrLine() {
  return gMeme.lines[currentLineIndex];
}

function getImg(meme) {
  return gImgs.find((img) => img.id === meme.selectedImgId);
}
function setLineTxt(text) {
  if (gMeme.lines.length === 0) return;
  gMeme.lines[currentLineIndex].txt = text;
  _saveMeme();
}
function setAlign(action) {
  gMeme.lines[currentLineIndex].align = action;
  _saveMeme();
}
function setLineColor(color) {
  gMeme.lines[currentLineIndex].fontColor = color;
  _saveMeme();
}
function setStrokeColor(color) {
  gMeme.lines[currentLineIndex].strokeColor = color;
  _saveMeme();
}
