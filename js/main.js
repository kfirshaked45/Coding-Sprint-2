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
  if (checkOnSticker(pos)) {
    checkOnSticker(pos);
    gStartPos = pos;
  }
  if (!isLineClicked(pos)) return;
  gisDrag = true;
  gStartPos = pos;
}

function onMove(ev) {
  if (gisStickerDrag && !gisDrag) {
    const pos = getEvPos(ev);
    const dx = pos.x - gStartPos.x;
    const dy = pos.y - gStartPos.y;
    updateStickerPos(dx, dy);
    gStartPos = pos;
    renderMeme();
    return;
  } else if (!gisStickerDrag && gisDrag) {
    const pos = getEvPos(ev);
    const dx = pos.x - gStartPos.x;
    const dy = pos.y - gStartPos.y;
    updateTextPos(dx, dy);
    gStartPos = pos;
    renderMeme();
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
