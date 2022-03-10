"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard(width, height) {
  for (let i = 0; i < height; i++) {
    board[i] = new Array(width).fill();
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.getElementById("board");

  // Creating a top row w/ id: column-top with an event listener that handleClick 
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // for every column, creates a table data cell, sets its' index as id, and appends it to the top row 
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // appends top row to the htmlBoard element

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    let tableRow = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      let tableCell = document.createElement("td");
      tableCell.setAttribute("id", `${y}-${x}`);
      tableRow.append(tableCell);
    }
    htmlBoard.append(tableRow);
  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {

  for (let i = HEIGHT - 1; i >= 0; i--) {
    if (board[i][x] === undefined) {
      return i;
    }

  }
  return null;
  // let last = board[x].findIndex(num => (num === 1 || num === 2));
  // return (board[x].length - last);
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  let cell = document.getElementById(`${y}-${x}`);
  let circle = document.createElement("div");
  circle.classList.add("piece");


  if (currPlayer === 1) {
    circle.classList.add("p1");
  }
  else {
    circle.classList.add("p2");
  }

  cell.append(circle);
  console.log(cell);
  console.log(x);
  console.log(y);
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table

  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  if (board.every(row => row.every(cell => cell !== undefined))) {
    endGame("it's a tie");
  }


  // switch players
  currPlayer = (currPlayer === 1) ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player
    // access board loop thru

    for (let cell of cells) {
      // y has to be bigger or equal to 0 y has to be less than height
      // x has to be bigger or equal to 0 x has to be less than the width
      //board at index y, index x is ==== currplayer
    }


    let result = cells.every(cell => {
      let y = cell[0];
      let x = cell[1];
      return y >=0 && x >=0 && y < HEIGHT && x < WIDTH && board[y][x] === currPlayer
    });
    console.log(result);
    return result;

  }

  
  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y,x], [y+1,x], [y+2,x], [y+3,x]];
      let diagDL = [[y,x], [y+1,x-1], [y+2,x-2], [y+3,x-3]];
      let diagDR = [[y,x], [y+1,x+1], [y+2,x+2], [y+3,x+3]];

      

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
  
}

makeBoard(WIDTH, HEIGHT);
makeHtmlBoard();
