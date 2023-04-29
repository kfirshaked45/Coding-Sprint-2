function renderGallery() {
  gElGallery = document.querySelector('.imgs-container');
  let strHTML = '';
  let imgsToRender = gFilteredImgs !== undefined ? gFilteredImgs : gImgs;

  imgsToRender.forEach((img) => {
    strHTML += `<img class='gallery-img' onclick=onImgSelect(${img.id})  src="${img.url}"/>`;
  });
  gElGallery.innerHTML = strHTML;
  renderKeyWordsList();
}

function renderKeyWordsList() {
  const elListContainer = document.querySelector('.list-frequent');
  let listStrHTML = '';
  let currentPageItem = getCurrentKeywordPages();

  if (!currentPageItem) return;
  currentPageItem.forEach((item) => {
    const size = gKeywordSearchCountMap[item];
    listStrHTML += `<li style='font-size: ${12 + size}px' onclick='filterItems("${item}")' >${item}</li>`;
  });
  elListContainer.innerHTML = listStrHTML;
}
function renderSaved() {
  hideAllDisplays();
  creategMemes();
  const elSavedMemes = document.querySelector('.existing-container');
  let strHTML = '';
  // <img class='gallery-img' onclick=onImgSelect(${meme.selectedImgId})  src="${meme.url}"/>
  gMemes.forEach((meme) => {
    let imgUrl = gImgs.find((img) => img.id === meme.selectedImgId);
    console.log(meme);
    strHTML += `<img class='saved-img' src="${imgUrl.url}" />`;
  });
  elSavedMemes.innerHTML = strHTML;
}
function showAbout() {
  hideAllDisplays();
  var elAbout = document.querySelector('.about');
  elAbout.innerHTML = `<h1>Example Text</h1>`;
}

function hideAllDisplays() {
  const elEditorDisplay = document.querySelector('.img-editor');
  elEditorDisplay.classList.add('hidden');
  const elGalleryContainer = document.querySelector('.gallery-container');
  elGalleryContainer.classList.add('hidden');
}
function filterItems(item) {
  const filteredItems = gImgs.filter((img) => {
    const key = img.keywords;
    return key.includes(item);
  });
  gFilteredImgs = filteredItems;
  renderGallery();
}
function filterSearchBar(searchText) {
  const filterSearched = gImgs.filter((img) => {
    const key = img.keywords;
    return key.includes(searchText);
  });

  gFilteredImgs = filterSearched;
  renderGallery();
}
function backToIndex() {
  window.location = 'index.html';
}

// function clearCanvas() {
//   gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
// }
// function clearCurrText(x, y, width, height) {
//   gCtx.clearRect(x, y, width, height);
// }
