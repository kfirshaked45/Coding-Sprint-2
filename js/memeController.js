function renderGallery() {
  gElGallery = document.querySelector('.imgs-container');
  let strHTML = '';
  let imgsToRender = gFilteredImgs !== undefined ? gFilteredImgs : gImgs;
  // if (gFilteredImgs.length === 0) imgsToRender = gImgs;
  imgsToRender.forEach((img) => {
    strHTML += `<img class='gallery-img' onclick=onImgSelect(${img.id})  src="${img.url}"/>`;
  });
  gElGallery.innerHTML = strHTML;
  const elListContainer = document.querySelector('.list-frequent');
  let listStrHTML = '';
  let currentPageItem = getCurrentKeywordPages();
  if (!currentPageItem) return;
  currentPageItem.forEach((item) => {
    listStrHTML += `<li>${item}</li>`;
  });
  elListContainer.innerHTML = listStrHTML;
}

function renderMeme() {
  showCanvasHideGallery();
  renderStickers();
  drawCanvas();
}

function renderStickers() {
  const elStickerDiv = document.querySelector('.stickers');
  let stickersUrls = getCurrentStickerPages();
  let stickerStrHTML = '<i class="fa-solid fa-angle-left angles"  onclick=prevStickerPage()></i>';
  stickersUrls.forEach((url) => {
    stickerStrHTML += `<li><img src='${url}' class='sticker-img' onclick=drawSticker(this) /></li>`;
  });
  elStickerDiv.innerHTML = stickerStrHTML + `<i class="fa-solid fa-angle-right angles"  onclick=nextStickerPage()></i>`;
}

function showCanvasHideGallery() {
  const memeDisplay = document.querySelector('.img-editor');
  memeDisplay.classList.add('show-canvas');
  const elGalleryContainer = document.querySelector('.gallery-container');
  elGalleryContainer.classList.add('hidden');
}
function drawCanvas() {
  const selectedMeme = getMeme();
  const selectedImg = getImg(selectedMeme);
  const img = new Image();
  img.src = selectedImg.url;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    drawText();

    // gCtx.save();
  };
}
// function clearCanvas() {
//   gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
// }
// function clearCurrText(x, y, width, height) {
//   gCtx.clearRect(x, y, width, height);
// }
