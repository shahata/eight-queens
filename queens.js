'use strict';

const N = 8;

function print(board) {
  return board.map(queenLocation => new Array(N).fill().map((x, i) => {
    return i === queenLocation ? '*' : '-';
  }).join(' ')).join('\n');
}

function valid(board) {
  return board.every((currQueenLocation, rowIndex) => {
    return board.slice(rowIndex + 1).every((queenLocation, rowOffset) => {
      return queenLocation !== currQueenLocation &&
             queenLocation !== currQueenLocation + rowOffset + 1 &&
             queenLocation !== currQueenLocation - rowOffset - 1;
    });
  });
}

function next(board) {
  let increment = true;
  board = board.map(queenLocation => {
    if (increment) {
      queenLocation = (queenLocation + 1) % N;
      increment = queenLocation === 0;
    }
    return queenLocation;
  });
  return increment ? null : board;
}

function queens() {
  let board = new Array(N).fill(0);
  let count = 0;
  console.time('queens');
  do {
    if (valid(board)) {
      console.log(++count);
      console.log(print(board), '\n');
    }
    board = next(board);
  } while (board);
  console.timeEnd('queens');
}

queens();
