// Object to represent full gameboard for game of Tic-Tac-Toe
const gameboard = (function () {
  const rows = 3;
  const cols = 3;
  const board = [];

  // 2D array to represent the gameboard
  // Row 0 is represented as the top row, Column 0 as the left-most column
  // [ [0, 0, 0],
  //   [0, 0, 0],
  //   [0, 0, 0] ]
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(Square());
    }
  }

  const getBoard = () => board;

  // Used to populate the board for console version only
  const displayBoard = () => {
    const consoleBoard = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(consoleBoard);
  }

  // Used to fill a square with a player's token
  const fillSquare = (row, column, token) => {
    if (board[row][column].getValue()) return; // Exit condition if square is filled
    board[row][column].setValue(token);
  }

  return { getBoard, displayBoard, fillSquare }
})();





// Object to represent individual squares on a Tic-Tac-Toe matrix
// (has prop 'value' which can hold 1 of 3 values)
// 0 - [denotes empty cell]
// 1 - [denotes first player's token X]
// 2 - [denotes second player's token O]
function Square() {
  let value = 0;

  const getValue = () => value;

  const setValue = (newValue) => {
    value = newValue;
  }

  return { getValue, setValue };
}





// Object to handle flow control of game
// Determines/sets active player flow, player
// names and win logic
const gameController = (function (playerOneName = 'Player One', playerTwoName = 'Player Two') {
  const board = gameboard;
  const players = [
    {
      name: playerOneName,
      token: 1
    },
    {
      name: playerTwoName,
      token: 2
    }
  ];

  let activePlayer = players[0]; // Sets default first to move to player one

  const switchActivePlayer = () => {
    activePlayer = (activePlayer === players[0] ? players[1] : players[0]);
  }

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.displayBoard(); // Populates console board
    console.log(`${getActivePlayer().name}'s turn..`); // Logs player's turn
  }

  const playRound = (row, column) => {
    console.log(`Playing ${getActivePlayer().name}'s move at (${row}, ${column})`); // Logs players move
    board.fillSquare(row, column, getActivePlayer().token); // Plays move onto board

    const gameOver = () => {
      const currentBoardState = board.getBoard();

      // Helper function to check if all array values are equal
      const allEqual = arr => {
        if (!arr[0].getValue()) return false;
        return arr.every(square => square.getValue() === arr[0].getValue());
      }

      // Check for horizontal wins
      const checkRowWin = (function () {
        currentBoardState.forEach(row => {
          let currentRow = allEqual(row);
          if (currentRow) {
            console.log('win') // properly finds win condition in top row for player one
          }
        })
      })();

      // Check for vertical wins
      const checkColWin = (function () {

      })();
      // Check for diagonal wins
      const checkDiagWin = (function () {

      })();

      // Check for draws
      const checkDraw = (function () {

      })();
    }

    gameOver();
    // check for win logic, win message, etc

    switchActivePlayer(); // Switches active player
    printNewRound(); // Begins next round
  }

  printNewRound(); // Initialize game

  return { getActivePlayer, playRound };
})();