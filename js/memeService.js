var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };
var gImgs = [
  { id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'cat'] },
  { id: 2, url: 'imgs/2.jpg', keywords: ['funny', 'cat'] },
  { id: 3, url: 'imgs/3.jpg', keywords: ['funny', 'cat'] },
  { id: 4, url: 'imgs/4.jpg', keywords: ['funny', 'cat'] },
  { id: 5, url: 'imgs/5.jpg', keywords: ['funny', 'cat'] },
  { id: 6, url: 'imgs/6.jpg', keywords: ['funny', 'cat'] },
  { id: 7, url: 'imgs/7.jpg', keywords: ['funny', 'cat'] },
  { id: 8, url: 'imgs/8.jpg', keywords: ['funny', 'cat'] },
  { id: 9, url: 'imgs/9.jpg', keywords: ['funny', 'cat'] },
  { id: 10, url: 'imgs/10.jpg', keywords: ['funny', 'cat'] },
  { id: 11, url: 'imgs/11.jpg', keywords: ['funny', 'cat'] },
];
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    // {
    //   txt: 'I sometimes eat Falafel',
    //   size: 20,
    //   align: 'left',
    //   strokeColor: 'white',
    //   fontColor: 'black',
    //   posX: 250,
    //   posY: 50,
    // },
    // {
    //   txt: 'Pilpel',
    //   size: 20,
    //   align: 'Middle',
    //   strokeColor: 'white',
    //   fontColor: 'black',
    //   posX: 100,
    //   posY: 50,
    // },
  ],
};
let currentLineIndex = 0;

function getMeme() {
  return gMeme;
}
function getLines() {
  return gMeme.lines;
}
function getCurrLine() {
  return gMeme.lines[currentLineIndex];
}

function getImg(meme) {
  return gImgs.find((img) => img.id === meme.selectedImgId);
}
function setLineTxt(text) {
  gMeme.lines[currentLineIndex].txt = text;
}
function setAlign(action) {
  gMeme.lines[currentLineIndex].align = action;
}
function setLineColor(color) {
  gMeme.lines[currentLineIndex].fontColor = color;
}
function setFontSize(action) {
  if (action === 'plus') {
    console.log(gMeme);
    gMeme.lines[currentLineIndex].size += 2;
  } else {
    gMeme.lines[currentLineIndex].size -= 2;
  }
}
function switchLine() {
  const lines = getLines();
  if (gMeme.selectedLineIdx + 1 === lines.length) gMeme.selectedLineIdx = 0;
  else gMeme.selectedLineIdx++;

  return gMeme.selectedLineIdx;
}
function selectRandomMeme() {
  var randomImg = getRandomIntInclusive(1, gImgs.length);

  gMeme.selectedImgId = randomImg;
}
function moveLinePos(action) {
  var currMemeDetails = gMeme.lines[currentLineIndex];

  if (action === 'up') {
    currMemeDetails.posY -= 10;
    _saveMeme();
  } else {
    currMemeDetails.posY += 10;
  }
}

function setImg(id) {
  gMeme.selectedImgId = id;
  _saveMeme();
}

function _createLine(txt) {
  return {
    txt,
    size: 20,
    align: 'center',
    posX: 250,
    posY: 50,
  };
}
function deleteLine() {
  gMeme.lines.splice(gMeme.lines[currentLineIndex], 1);
  _saveMeme();
}
function addLine(txt) {
  gMeme = loadFromStorage('meme-editor');
  // if (gMeme && gMeme.length > 0) return;

  gMeme.lines.push(_createLine(txt));

  _saveMeme();
}

// function _createMemes() {
//   gMeme = loadFromStorage('meme-editor');
//   if (gMeme && gMeme.length > 0) return;
//   gMeme = _createMeme(1, 0);
//   _saveMeme();
// }

function _saveMeme() {
  saveToStorage('meme-editor', gMeme);
}

// function _createMeme(selectedImgId, selectedLineIdx = 0) {
//   return {
//     selectedImgId,
//     selectedLineIdx,
//     lines: [],
//     strokeColor: 'white',
//     fontColor: 'black',
//   };
// }

// function onDeleteBook(event, bookId) {
//   event.stopPropagation();
//   const currBookIndex = gBooks.findIndex((book) => book.id === bookId);
//   gBooks.splice(currBookIndex, 1);
//   _saveBooks();
//   renderBooks();
// }
// function onAddBook(title, price) {
//   title = prompt('Title of book?');
//   price = prompt('Price of book?');
//   const newBook = _createBook(title, price);
//   gBooks.push(newBook);
//   _saveBooks();
//   renderBooks();
// }function filterSearchBooks(searchText) {
//   const filteredBooks = gBooks.filter(
//     (book) =>
//       book.id.toLowerCase().includes(searchText) ||
//       book.title.toLowerCase().includes(searchText) ||
//       book.price.toLowerCase().includes(searchText)
//   );
//   _saveBooks();
//   return filteredBooks;
// }
