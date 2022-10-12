'use strict';
//model
var gNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
console.log(gNums.length);
var gGameInterval;
var elCallNum = document.querySelector('.number');
var gIsClicked = false;
var gNextNum = 1;
var intervalId;

function onInit() {
  renderBoard(gNums);
}

function onCellClicked(elTd) {
  var elClickedNum = +elTd.getAttribute('data-num');
  console.log(elClickedNum);
  // if game is finished //not working
  if (elClickedNum === gNums.length) {
    renderBoard(gNums);
    gNextNum = 1;
    !gIsClicked;
    intervalId = clearInterval();
    console.log(intervalId);
  }
  if (!gIsClicked) {
    var startTime = Date.now();
    intervalId = setInterval(function () {
      var elapsedTime = Date.now() - startTime;
      document.querySelector('.timer').innerText = (elapsedTime / 1000).toFixed(
        3
      );
    }, 100);
    gIsClicked = true;
  }

  elCallNum.innerText = gNextNum;
  if (elClickedNum === gNextNum) {
    elTd.classList.toggle('color');
    gNextNum++;
  }
}

function renderBoard(nums) {
  var rows = Math.sqrt(nums.length);
  var cols = Math.sqrt(nums.length);

  var strHTML = '';
  var randomIndex = 0;
  for (var row = 0; row < rows; row++) {
    strHTML += '<tr>';
    for (var col = 0; col < cols; col++) {
      randomIndex = Math.floor(Math.random() * nums.length);
      var num = nums[randomIndex];
      //   console.log('num', num);
      strHTML += `<td data-num=${num} onclick="onCellClicked(this)">${num}</td>`;
      nums.splice(randomIndex, 1); // removed used value;
    } // next col;

    strHTML += '</tr>';
  } // next row;
  var elBoard = document.querySelector('.board');
  elBoard.innerHTML = strHTML;

  elCallNum.innerText = gNextNum;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
