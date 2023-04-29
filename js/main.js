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
// Handle the listeners
function addListeners() {
  addMouseListeners();
  addTouchListeners();
  // Listen for resize ev
  // window.addEventListener('resize', () => {
  //   resizeCanvas();
  // });
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
  if (!isLineClicked(pos)) return;
  gisDrag = true;
  gStartPos = pos;
}

function onMove(ev) {
  if (!gisDrag) return;
  const pos = getEvPos(ev);
  const dx = pos.x - gStartPos.x;
  const dy = pos.y - gStartPos.y;
  updateTextPos(dx, dy);
  gStartPos = pos;
  renderMeme();
}

function onUp() {
  gisDrag = false;
}

// function resizeCanvas() {
//   const elContainer = document.querySelector('.canvas-container');
//   gElCanvas.width = elContainer.offsetWidth;
//   gElCanvas.height = elContainer.offsetHeight;
// }

function getEvPos(ev) {
  // Gets the offset pos , the default pos
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };

  // Check if its a touch ev
  if (TOUCH_EVS.includes(ev.type)) {
    //soo we will not trigger the mouse ev
    ev.preventDefault();
    //Gets the first touch point
    ev = ev.changedTouches[0];
    //Calc the right pos according to the touch screen
    // console.log('ev.pageX:', ev.pageX)
    // console.log('ev.pageY:', ev.pageY)
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    };
    // console.log('pos:', pos)
  }
  return pos;
}

function downloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg'); // image/jpeg the default format
  elLink.href = imgContent;
  savegMemes();
}
