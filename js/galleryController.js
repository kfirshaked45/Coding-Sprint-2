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
