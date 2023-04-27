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
function handleSwitch() {
  currentLineIndex = switchLine();
  console.log(currentLineIndex);
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

function addText() {}
