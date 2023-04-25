var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };
var gImgs = [
  { id: 4, url: 'imgs/4.jpg', keywords: ['funny', 'cat'] },
  { id: 5, url: 'imgs/5.jpg', keywords: ['funny', 'cat'] },
];
var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 20,
      align: 'left',
      color: 'red',
    },
    {
      txt: 'Pilpel',
      size: 20,
      align: 'Middle',
      color: 'white',
    },
  ],
};
let currentLineIndex = 0;

function getMeme() {
  return gMeme;
}
function getLines() {
  return gMeme.lines;
}

function getImg(meme) {
  return gImgs.find((img) => img.id === meme.selectedImgId);
}
function setLineTxt(text) {
  gMeme.lines[currentLineIndex].txt = text;
}
function setLineColor(color) {
  gMeme.lines[currentLineIndex].color = color;
}
function setFontSize(action) {
  if (action === 'plus') {
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
