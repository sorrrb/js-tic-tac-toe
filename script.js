// Object to represent full gameboard for game of Tic-Tac-Toe

function Gameboard() {
  const cols = 3;
  const rows = 3;
  const board = [];

  // 2D array to represent the gameboard
  // Columns represented with i (first dimension)
  // Rows represented with j (second dimension)
  // [ [], [], [] ] columns
  // [ [ [ 1 , 2 , 3], [4, 5, 6], [7, 8, 9] ]

  for (let i = 0; i < cols; i++) {
    board[i] = [];
    for (let j = 0; j < rows; j++) {
      board[i].push(Square());
    }
  }

  const getBoard = () => board;

  // Used to populate the console version

  const displayBoard = () => {
    const consoleBoard = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(consoleBoard);
  }

  return { getBoard, displayBoard };
}





// Object to represent individual squares on a Tic-Tac-Toe matrix
// (has prop 'value' which can hold 1 of 3 number values)
// 0 - [denotes empty cell]
// 1 - [denotes first player's token]
// 2 - [denotes second player's token]

function Square() {
  let value = 0;

  const getValue = () => value;

  const setValue = (newValue) => {
    value = newValue;
  }

  return { getValue, setValue };
}





// Object to handle flow control of game

function GameController() {
  const board = Gameboard();
  board.displayBoard();
}





const play = GameController();