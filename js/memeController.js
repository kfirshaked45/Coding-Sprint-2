let gElCanvas;
let gCtx;
let gElGallery;

function renderGallery() {
  gElGallery = document.querySelector('.imgs-container');
  let strHTML = '';
  gImgs.forEach((img) => {
    strHTML += `<img class='gallery-img' onclick=onImgSelect(${img.id})  src="${img.url}"/>`;
  });

  gElGallery.innerHTML = strHTML;
}
function onImgSelect(id) {
  setImg(id);

  renderMeme();
}

function renderMeme() {
  const selectedMeme = getMeme();
  var memeDisplay = document.querySelector('.img-editor');
  memeDisplay.classList.add('show-canvas');
  var elGalleryContainer = document.querySelector('.gallery-container');
  elGalleryContainer.classList.add('hidden');
  const selectedImg = getImg(selectedMeme);
  const img = new Image();
  img.src = selectedImg.url;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    drawText();

    // gCtx.save();
  };
}

function drawText() {
  const lines = getLines();
  console.log(lines);
  lines.forEach((line) => {
    gCtx.font = `${line.size}px Arial`;
    gCtx.textAlign = line.align;
    gCtx.textBaseline = 'middle';
    gCtx.strokeStyle = 'white';
    gCtx.fillStyle = line.fontColor;
    gCtx.fillText(line.txt, line.posX, line.posY);
    gCtx.strokeText(line.txt, line.posX, line.posY);
  });
}

// function clearCanvas() {
//   gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
// }
// function clearCurrText(x, y, width, height) {
//   gCtx.clearRect(x, y, width, height);
// }
