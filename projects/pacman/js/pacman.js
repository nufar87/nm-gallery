'use strict';

const PACMAN = '😷';
var gPacman;

function createPacman(board) {
  // initialize gPacman...
  gPacman = {
    location: {
      i: 6,
      j: 7,
    },
    isSuper: false,
  };
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function onMovePacman(ev) {
  if (!gGame.isOn) return;
  // use getNextLocation(), nextCell
  const nextLocation = getNextLocation(ev);
  // console.log('nextLocation', nextLocation)
  if (!nextLocation) return;

  const nextCellContent = gBoard[nextLocation.i][nextLocation.j];
  // console.log('nextCellContent', nextCellContent)
  // return if cannot move
  if (nextCellContent === WALL) return;
  // hitting a ghost? call gameOver
  if (nextCellContent === GHOST) {
    if (gPacman.isSuper) {
      removeGhost(nextLocation);
    } else {
      gameOver();
      return;
    }
  }
  if (nextCellContent === FOOD) {
    updateScore(1);
    gGame.foodCount--;
    checkVictory();
  } else if (nextCellContent === CHERRY) {
    updateScore(10);
  } else if (nextCellContent === SUPER_FOOD) {
    if (gPacman.isSuper) {
      return;
    } else {
      updateScore(10);
      setTimeout(ateSuperFood, 1000);
      setTimeout(afterSuperFood, 6000);
    }
  }

  // moving from current location:
  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // update the DOM
  renderCell(gPacman.location, EMPTY);
  // Move the pacman to new location:
  // update the model
  gPacman.location = nextLocation;
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // update the DOM
  renderCell(gPacman.location, PACMAN);
}

function getNextLocation(eventKeyboard) {
  // console.log('eventKeyboard.code', eventKeyboard.code)
  const nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };
  // figure out nextLocation
  switch (eventKeyboard.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    default:
      return null;
  }

  return nextLocation;
}

function ateSuperFood() {
  gPacman.isSuper = true;
  console.log(gPacman.isSuper, 'gPacman.isSuper');
}

function afterSuperFood() {
  gPacman.isSuper = false;
  console.log(gPacman.isSuper, 'gPacman.isSuper');
  gGhosts = gGhosts.concat(gDeadGhosts);
  gDeadGhosts = [];
  console.log(gDeadGhosts, 'gDeadGhosts');
  console.log(gGhosts, 'gGhosts');
}
