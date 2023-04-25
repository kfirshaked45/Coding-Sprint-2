function renderGallery() {
  const imgGallery = document.querySelector('.imgs-container');
  let strHTML = '';
  gImgs.forEach((img) => {
    strHTML += `<img class='gallery-img' onclick=onImgSelect(${img.id})  src="${img.url}"/>`;
  });

  imgGallery.innerHTML = strHTML;
}
function onImgSelect(id) {
  setImg(id);
  renderMeme();
}
