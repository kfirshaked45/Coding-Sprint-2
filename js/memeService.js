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
  selectedStickerIdx: 0,
  lines: [],
  stickers: [],
};
let gFilteredImgs;
let currentLineIndex = 0;
let currentStickerIndex = 0;
const KEYWORD_LIST_PAGE_SIZE = 5;
const STICKER_LIST_PAGE_SIZE = 4;
let gKeyWordPageIdx = 0;
let gStickerPageIdx = 0;
let gUploadedImg;
let gMemes = [];
let gisStickerDrag = false;
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
  renderStickers();
}
function prevStickerPage() {
  if (gStickerPageIdx === 0) return;
  gStickerPageIdx--;
  renderStickers();
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
function switchSticker() {
  const stickers = getStickers();

  if (gMeme.selectedStickerIdx + 1 === stickers.length) gMeme.selectedStickerIdx = 0;
  else gMeme.selectedStickerIdx++;
  return gMeme.selectedStickerIdx;
}

function updateTextPos(dx, dy) {
  const line = getCurrLine();
  line.posX += dx;
  line.posY += dy;
  _saveMeme();
}
function updateStickerPos(dx, dy) {
  const sticker = getCurrSticker();
  sticker.posX += dx;
  sticker.posY += dy;
  _saveMeme();
}

function deleteLine() {
  const line = getCurrLine();
  gMeme.lines.splice(line, 1);
  _saveMeme();
}
function addLine(txt) {
  gMeme = loadFromStorage('meme-editor');

  gMeme.lines.push(_createLine(txt));

  _saveMeme();
}

function addSticker(src) {
  gMeme = loadFromStorage('meme-editor');
  gMeme.stickers.push(_createSticker(src));
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
function savegMemes() {
  gMemes = loadFromStorage('meme-storage');
  if (!gMemes) gMemes = [];
  gMemes.push(gMeme);
  saveToStorage('meme-storage', gMemes);
}

function setImg(id) {
  gMeme.selectedImgId = id;
  _saveMeme();
}

function _createLine(txt) {
  return {
    txt,
    size: 30,
    align: 'center',
    posX: 250,
    posY: 50,
    font: 'impact',
  };
}
function _createSticker(src) {
  return {
    url: src,
    posX: 200,
    posY: 50,
    width: 70,
    height: 70,
  };
}
function getMeme() {
  return gMeme;
}
function creategMemes() {
  gMemes = loadFromStorage('meme-storage');
  if (gMemes && gMemes.length > 0) return;

  _saveMeme();
}
function getStickers() {
  return gMeme.stickers;
}
function getLines() {
  return gMeme.lines;
}
function getStickers() {
  return gMeme.stickers;
}
function getCurrLine() {
  return gMeme.lines[currentLineIndex];
}
function getCurrSticker() {
  return gMeme.stickers[currentStickerIndex];
}

function getImg(meme) {
  return gImgs.find((img) => img.id === meme.selectedImgId);
}
function setLineTxt(text) {
  if (gMeme.lines.length === 0) return;
  console.log(gMeme);
  gMeme.lines[currentLineIndex].txt = text;
  _saveMeme();
}
function setAlign(action) {
  gMeme.lines[currentLineIndex].align = action;
  _saveMeme();
}
function setLineColor(color) {
  gMeme.lines[currentLineIndex].fontColor = color;
  _saveMeme();
}
function setStrokeColor(color) {
  gMeme.lines[currentLineIndex].strokeColor = color;
  console.log(gMeme);
  _saveMeme();
}
function isLineClicked(pos) {
  const checkPointInPath = gCtx.isPointInPath(pos.x, pos.y);
  console.log(checkPointInPath);
  return checkPointInPath;
}
