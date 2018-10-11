'use strict';
var WALL = '#';
var FOOD = '.';
var EMPTY = ' ';
var SUPERFOOD = '🏸'

var gBoard;
var gState = {
  score: 0,
  isGameDone: false
};

function init() {
  gState.isGameDone = false;
  hideGameOver();
  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, '.board-container');
  console.table(gBoard);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j == 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
      }
    }
  }
board[1][1] = SUPERFOOD
board[1][8] = SUPERFOOD
board[8][1] = SUPERFOOD
board[8][8] = SUPERFOOD

  return board;
}

// This function is called from both pacman and ghost to check engage
function checkEngage(cell, opponent) {
  if (cell === opponent) {
    // TODO: basic support for eating super-food (which is not in the game yet)
    if (gPacman.isSuper) {
      console.log('Ghost is dead');
      killGhost(cell)
    } else {
      clearInterval(gIntervalGhosts);
      gState.isGameDone = true;
      // TODO: GameOver popup with a play again button
      // alert('Game Over!');
      showGameOverModal()
      changeSpanYouLose()
      return true;
    }
  }
  return false;
}



// this function updates both the model and the dom for the score
function updateScore(value) {
  gState.score += value;
  document.querySelector('header > h3 > span').innerText = gState.score;
}

function checkIfWon() {
  gState.isGameDone = true;
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j] === FOOD || gBoard[i][j] === SUPERFOOD) { gState.isGameDone = false }
    }
  }
  showGameOverModal()
}

function showGameOverModal() {
  if (gState.isGameDone === true) {
    var elModal = document.querySelector('.game-over');
    elModal.style.display = 'block'
  }
}

function hideGameOver() {
  if (gState.isGameDone === false) {
    var elModal = document.querySelector('.game-over');
    elModal.style.display = 'none'
  }
}

function changeSpanYouLose() {
  var elSpan = document.querySelector('.winner')
  elSpan.innerText = 'You lost.'
}
