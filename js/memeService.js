let gKeywordSearchCountMap = {};
const gImgs = [
  { id: 1, url: 'imgs/1.jpg', keywords: ['woman', 'smile'] },
  { id: 2, url: 'imgs/2.jpg', keywords: ['funny', 'old', 'president'] },
  { id: 3, url: 'imgs/3.jpg', keywords: ['cute', 'dog', 'animal'] },
  { id: 4, url: 'imgs/4.jpg', keywords: ['cute', 'baby', 'animal', 'dog'] },
  { id: 5, url: 'imgs/5.jpg', keywords: ['funny', 'cute', 'baby'] },
  { id: 6, url: 'imgs/6.jpg', keywords: ['funny', 'cat', 'cute', 'sleepy'] },
  { id: 7, url: 'imgs/7.jpg', keywords: ['funny', 'guy', 'sarcastic'] },
  { id: 8, url: 'imgs/8.jpg', keywords: ['baby', 'funny', 'devious'] },
  { id: 9, url: 'imgs/9.jpg', keywords: ['guy', 'serious'] },
  { id: 10, url: 'imgs/10.jpg', keywords: ['mad', 'guy', 'funny'] },
  { id: 11, url: 'imgs/11.jpg', keywords: ['sarcastic', 'guy', 'funny'] },
  { id: 12, url: 'imgs/12.jpg', keywords: ['sarcastic', 'devious', 'guy'] },
  { id: 13, url: 'imgs/13.jpg', keywords: ['funny', 'baby', 'dancing'] },
  { id: 14, url: 'imgs/14.jpg', keywords: ['old', 'president', 'guy'] },
  { id: 15, url: 'imgs/15.jpg', keywords: ['funny', 'baby'] },
  { id: 16, url: 'imgs/16.jpg', keywords: ['cute', 'dog', 'animal'] },
  { id: 17, url: 'imgs/17.jpg', keywords: ['laugh', 'president', 'guy'] },
  { id: 18, url: 'imgs/18.jpg', keywords: ['guy', 'awkward'] },
  { id: 19, url: 'imgs/19.jpg', keywords: ['guy', 'sarcastic'] },
  { id: 20, url: 'imgs/20.jpg', keywords: ['serious', 'guy'] },
  { id: 21, url: 'imgs/21.jpg', keywords: ['sarcastic', 'guy'] },
  { id: 22, url: 'imgs/22.jpg', keywords: ['woman', 'smile'] },
  { id: 23, url: 'imgs/23.jpg', keywords: ['guy', 'smile'] },
  { id: 24, url: 'imgs/24.jpg', keywords: ['president', 'serious'] },
  { id: 25, url: 'imgs/25.jpg', keywords: ['funny', 'toys', 'sarcastic'] },
];
const gStickers = [
  { id: 1, url: 'imgs/sticker1.png' },
  { id: 2, url: 'imgs/sticker2.png' },
  { id: 3, url: 'imgs/sticker3.png' },
  { id: 4, url: 'imgs/sticker4.png' },
  { id: 5, url: 'imgs/sticker5.png' },
  { id: 6, url: 'imgs/sticker6.png' },
  { id: 7, url: 'imgs/sticker7.png' },
  { id: 8, url: 'imgs/sticker8.png' },
  { id: 9, url: 'imgs/sticker9.png' },
];
let gMeme = {
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
let gFilteredImgs;
let currentLineIndex = 0;
const KEYWORD_LIST_PAGE_SIZE = 5;
const STICKER_LIST_PAGE_SIZE = 4;
let gKeyWordPageIdx = 0;
let gStickerPageIdx = 0;
function filterSearchBar(searchText) {
  const filterSearched = gImgs.filter((img) => {
    const key = img.keywords;
    return key.includes(searchText);
  });

  gFilteredImgs = filterSearched;
  renderGallery();
}
function getCurrentKeywordPages() {
  const startIdx = gKeyWordPageIdx * KEYWORD_LIST_PAGE_SIZE;
  const keys = [];
  for (const [key, value] of Object.entries(gKeywordSearchCountMap)) {
    keys.push(key);
  }
  if (keys.length / KEYWORD_LIST_PAGE_SIZE === gKeyWordPageIdx) {
    gKeyWordPageIdx = 0;
    return;
  } else {
    return keys.slice(startIdx, startIdx + KEYWORD_LIST_PAGE_SIZE);
  }
}
getCurrentStickerPages();
function getCurrentStickerPages() {
  const startIdx = gStickerPageIdx * STICKER_LIST_PAGE_SIZE;
  const urls = [];
  for (const [key, value] of Object.entries(gStickers)) {
    urls.push(value.url);
  }
  if (urls.length / STICKER_LIST_PAGE_SIZE === gKeyWordPageIdx) {
    gStickerPageIdx = 0;
    return;
  } else {
    return urls.slice(startIdx, startIdx + STICKER_LIST_PAGE_SIZE);
  }
}

function nextStickerPage() {
  if (gStickerPageIdx === gStickers.length / STICKER_LIST_PAGE_SIZE) return;
  gStickerPageIdx++;
  renderMeme();
}
function prevStickerPage() {
  if (gStickerPageIdx === 0) return;
  gStickerPageIdx--;
  renderMeme();
}

function nextKeyWordPage() {
  gKeyWordPageIdx++;
  renderGallery();
}

function countKeyWords() {
  for (let i = 0; i < gImgs.length; i++) {
    var keywords = gImgs[i].keywords;
    for (let j = 0; j < keywords.length; j++) {
      const currKeyword = keywords[j];
      if (gKeywordSearchCountMap[currKeyword]) {
        gKeywordSearchCountMap[currKeyword]++;
      } else {
        gKeywordSearchCountMap[currKeyword] = 1;
      }
    }
  }
}

function setFontSize(action) {
  if (action === 'plus') {
    gMeme.lines[currentLineIndex].size += 2;
  } else {
    gMeme.lines[currentLineIndex].size -= 2;
  }
  _saveMeme();
}
function switchLine() {
  const lines = getLines();
  if (gMeme.selectedLineIdx + 1 === lines.length) gMeme.selectedLineIdx = 0;
  else gMeme.selectedLineIdx++;

  return gMeme.selectedLineIdx;
}

function moveLinePos(action) {
  var currMemeDetails = gMeme.lines[currentLineIndex];

  if (action === 'up') {
    currMemeDetails.posY -= 10;
  } else {
    currMemeDetails.posY += 10;
  }
  _saveMeme();
}

function updateTextPos(dx, dy) {
  const line = getCurrLine();

  line.posX += dx;
  line.posY += dy;
  _saveMeme();
}

function deleteLine() {
  const line = getCurrLine();
  gMeme.lines.splice(line, 1);
  _saveMeme();
}
function addLine(txt) {
  gMeme = loadFromStorage('meme-editor');
  // if (gMeme && gMeme.length > 0) return;

  gMeme.lines.push(_createLine(txt));

  _saveMeme();
}
function addLineInput(txt) {
  gMeme = loadFromStorage('meme-editor');
  setLineTxt(txt);
  if (gMeme.lines.length > 0) return;

  gMeme.lines.push(_createLine(txt));

  _saveMeme();
}

function _saveMeme() {
  saveToStorage('meme-editor', gMeme);
}
function isLineClicked(pos) {
  const checkPointInPath = gCtx.isPointInPath(pos.x, pos.y);
  return checkPointInPath;
}

// function _createMemes() {
//   gMeme = loadFromStorage('meme-editor');
//   if (gMeme && gMeme.length > 0) return;
//   gMeme = _createMeme(1, 0);
//   _saveMeme();
// }
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
