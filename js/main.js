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
  // Get the ev pos from mouse or touch
  const pos = getEvPos(ev);
  if (!isLineClicked(pos)) return;
  gisDrag = true;

  // console.log('pos:', pos)

  // console.log('Down')

  //Save the pos we start from
  gStartPos = pos;
}

function onMove(ev) {
  if (!gisDrag) return;
  // console.log('Move');

  const pos = getEvPos(ev);
  // Calc the delta , the diff we moved
  const dx = pos.x - gStartPos.x;
  const dy = pos.y - gStartPos.y;

  updateTextPos(dx, dy);
  // Save the last pos , we remember where we`ve been and move accordingly
  gStartPos = pos;
  // The canvas is render again after every move
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
