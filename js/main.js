let gElCanvas;
let gCtx;
let gElGallery;
let gStartPos;
let gisDrag = false;
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend'];

function init() {
  gElCanvas = document.getElementById('my-canvas');
  gCtx = gElCanvas.getContext('2d');

  addListeners();
  countKeyWords();
  renderGallery();
}

function addListeners() {
  addMouseListeners();
  addTouchListeners();
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown);
  gElCanvas.addEventListener('mousemove', onMove);
  gElCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown);
  gElCanvas.addEventListener('touchmove', onMove);
  gElCanvas.addEventListener('touchend', onUp);
}
function onDown(ev) {
  const pos = getEvPos(ev);
  if (isLineClicked(pos)) {
    gisDrag = true;
    gStartPos = pos;
    return;
  }
  if (checkOnSticker(pos)) {
    gisStickerDrag = true;
    gStartPos = pos;
    return;
  }
}

function onMove(ev) {
  const pos = getEvPos(ev);
  if (!gStartPos) return;
  const dx = pos.x - gStartPos.x;
  const dy = pos.y - gStartPos.y;
  if (gisStickerDrag === true) {
    updateStickerPos(dx, dy);
    gStartPos = pos;
    renderMeme();
    return;
  }
  if (gisDrag === true) {
    updateTextPos(dx, dy);
    gStartPos = pos;
    renderMeme();
  } else {
    return;
  }
}

function onUp() {
  gisDrag = false;
  gisStickerDrag = false;
}

function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  if (TOUCH_EVS.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    };
  }
  return pos;
}

function downloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg'); // image/jpeg the default format
  elLink.href = imgContent;
  savegMemes();
}
function backToIndex() {
  window.location = 'index.html';
}

function showSavedHideElse() {
  hideEditor();
  hideGallery();
  showSaved();
}
function showEditorHideElse() {
  showEditor();
  hideGallery();
  hideSaved();
}
function showEditor() {
  const elEditorDisplay = document.querySelector('.img-editor');
  elEditorDisplay.classList.remove('hidden');
}
function hideGallery() {
  const elGalleryContainer = document.querySelector('.gallery-container');
  elGalleryContainer.classList.add('hidden');
}
function hideSaved() {
  const elExistingContainer = document.querySelector('.existing-container');
  elExistingContainer.classList.add('hidden');
}
function hideEditor() {
  const elEditorDisplay = document.querySelector('.img-editor');
  elEditorDisplay.classList.add('hidden');
}
function showSaved() {
  const elExistingContainer = document.querySelector('.existing-container');
  elExistingContainer.classList.remove('hidden');
}
