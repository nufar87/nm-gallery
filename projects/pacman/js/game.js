'use strict';

const WALL = '#';
const FOOD = '🍔';
const EMPTY = ' ';
const SUPER_FOOD = '🥦';
const CHERRY = '🍒';

var countFood;
var gIntervalCherry;

const gGame = {
  score: 0,
  isOn: false,
  foodCount: 0,
  isWon: false,
};
var gBoard;

function onInit() {
  gGame.score = 0;
  document.querySelector('h2 span').innerText = gGame.score;

  // Model:
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  gIntervalCherry = setInterval(addCherry, 1500);
  console.log(gBoard);
  // Dom
  renderBoard(gBoard, '.board-container');
  gGame.isOn = true;
}

function buildBoard() {
  const size = 10;
  const board = [];

  for (var i = 0; i < size; i++) {
    board.push([]);
    for (var j = 0; j < size; j++) {
      board[i][j] = FOOD;
      gGame.foodCount++;
      if (
        i === 0 ||
        i === size - 1 ||
        j === 0 ||
        j === size - 1 ||
        (j === 3 && i > 4 && i < size - 2)
      ) {
        board[i][j] = WALL;
        gGame.foodCount--;
      } else if (
        (i === 1 && j === 1) ||
        (i === 8 && j === 1) ||
        (i === 1 && j === 8) ||
        (i === 8 && j === 8)
      ) {
        board[i][j] = SUPER_FOOD;
      }

      gGame.foodCount--;
    }
  }
  return board;
}

function updateScore(diff) {
  // update model and dom
  gGame.score += diff;
  document.querySelector('h2 span').innerText = gGame.score;
}

function gameOver() {
  renderCell(gPacman.location, EMPTY);
  gGame.isOn = false;
  const message = gGame.isWon ? 'Victory!' : 'Game - Over :/';
  document.querySelector('.modal h2').innerText = message;
  document.querySelector('.modal').style.display = 'block';
  clearInterval(gIntervalGhosts);
  clearInterval(gIntervalCherry);
}

function checkVictory() {
  if (!gGame.foodCount) {
    gGame.isWon = true;
    gameOver();
  }
}

function addCherry() {
  var emptyPos = getEmptyPos(gBoard);
  if (!emptyPos) return;
  // Model
  gBoard[emptyPos.i][emptyPos.j] = CHERRY;
  // Dom
  renderCell(emptyPos, CHERRY);
}

function getEmptyPos(board) {
  var emptyPoses = [];
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      var cell = board[i][j];
      if (cell === EMPTY) {
        var pos = { i: i, j: j };
        emptyPoses.push(pos);
      }
    }
  }
  var randIdx = getRandomInt(0, emptyPoses.length);
  return emptyPoses[randIdx];
}
