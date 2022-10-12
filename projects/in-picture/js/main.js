'use script';
var gQuests = [
  {
    id: 1,
    opts: [
      'The monkey lost his mom',
      'The monkey is not sure that he likes banana',
    ],
    correctOptIndex: 0,
  },
  {
    id: 2,
    opts: ['The lion likes strawberry', 'The lion likes his mom cuisine'],
    correctOptIndex: 1,
  },
  {
    id: 3,
    opts: [
      'The rabbit sit in the train with a cat',
      'The rabbit sit in the train with a doll',
    ],
    correctOptIndex: 1,
  },
  {
    id: 4,
    opts: ['Ruti got the blue balloon', 'Ruti got the purple balloon'],
    correctOptIndex: 0,
  },
  {
    id: 5,
    opts: [
      'Tal met Ilana first on the way to the ganon',
      'Tal met Dan on his way to the ganon',
    ],
    correctOptIndex: 0,
  },
];

var gCurrQuestIdx = 0;
var elImg = document.querySelector('.img');
console.log(elImg);
var elImgs = [
  'img/0.jpeg',
  'img/1.jpeg',
  'img/2.jpeg',
  'img/3.jpeg',
  'img/4.jpeg',
];

function onInitGame() {
  renderQuest(gCurrQuestIdx);
}

var elBtns = document.querySelectorAll('.btn');

function onCheckAnswer(elBtn) {
  if (+elBtn.dataset.num === gQuests[gCurrQuestIdx].correctOptIndex) {
    gCurrQuestIdx++;
    if (gCurrQuestIdx === gQuests.length) {
      gCurrQuestIdx = 0;
    }
    renderQuest(gCurrQuestIdx);
  } else {
    console.log('wrong');
  }
}

function renderQuest(gCurrQuestIdx) {
  elImg.src = elImgs[gCurrQuestIdx];

  elBtns[0].innerText = gQuests[gCurrQuestIdx].opts[0];
  elBtns[1].innerText = gQuests[gCurrQuestIdx].opts[1];
}
