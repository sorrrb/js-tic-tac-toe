/* Module - Represents the full playing board for a Tic-Tac-Toe game
Returns:
- getBoard [to retrieve board state]
- printBoard [to print board state to the console]
- takeSquare [to fill a square on the board]
*/
const gameboard = (function () {
  const cols = 3;
  const rows = 3;
  const board = [];

  /* 2D Array
  [ [0, 0, 0], 
    [0, 0, 0],
    [0, 0, 0] ]
  - row 0 represents top row
  - col 0 represents left-most column  
  */
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(Square());
    }
  }

  const getBoard = () => board;

  const printBoard = () => {
    const consoleBoard = board.map((row) => row.map((square) => square.getToken())); // Loop through rows, then columns to find value of each square
    console.log(consoleBoard);
  }

  const takeSquare = (row, column, token) => {
    if (board[row][column].getToken()) return;
    board[row][column].addToken(token);
  }

  return { getBoard, printBoard, takeSquare };
})();





/* Factory Function - Represents an individual square on a Tic-Tac-Toe board
Returns:
- getToken [method] [grabs token of referenced square]
- addToken [method] [adds token to referenced square]
value property represents status of game square, holding 1 of 3 number values
0 [represents an empty square]
1 [represents a square occupied by Player One's token]
2 [represents a square occupied by Player Two's token] */
function Square() {
  let value = 0;

  const getToken = () => value;

  const addToken = token => {
    value = token;
  };

  return { getToken, addToken };
}





/* Module - Represents the controller for a game of Tic-Tac-Toe, handling game state, flow and win logic
Returns:
- getActivePlayer [method] [grabs current active player]
- 
*/
const gameController = (function () {
  const board = gameboard;
  const playerOneName = 'Player One';
  const playerTwoName = 'Player Two';
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

  let winner = null; // Set default winner to null
  let isGameOver = false; // Set default game state as active

  const setWinner = () => {
    isGameOver = true;
    winner = getActivePlayer().name;
  }

  let activePlayer = players[0]; // Set default active player to P1

  const getActivePlayer = () => activePlayer;

  const switchActivePlayer = () => {
    activePlayer = (activePlayer === players[0] ? players[1] : players[0]);
  };

  const printNewRound = () => {
    board.printBoard();
    console.log(`It is ${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    console.log(`Playing move at [${row}, ${column}]`);
    board.takeSquare(row, column, getActivePlayer().token);

    const checkEnd = (function () {
      const boardState = board.getBoard();

      // Check given object array to see if all objects (squares) value is equal
      const checkAllEqual = testArr => {
        const emptySquares = testArr.filter((square) => square.getToken() === 0);
        if (emptySquares.length > 0) return false; // Check if a square in a given 3x1 line is empty

        return (testArr.every((square) => square.getToken() === testArr[0].getToken() ? true : false)); // https://dev.to/rajnishkatharotiya/function-to-check-if-all-records-are-equal-in-array-javascript-3mo3#:~:text=Javascript%20Useful%20Snippets%20%E2%80%94%20allEqual(),allEqual%20%3D%20arr%20%3D%3E%20arr.
      };

      // Check board for horizontal wins
      const checkRow = (function () {
        const foundWin = boardState.filter((row) => checkAllEqual(row));
        if (foundWin.length > 0) setWinner();
      })();

      // Check board for vertical wins
      const checkCol = (function () {
        const matrixLength = boardState.length;
        const reformatBoard = [];

        for (let j = 0; j < matrixLength; j++) { // Transposes dimensions of 2D array
          reformatBoard[j] = Array(matrixLength);
          for (let i = 0; i < matrixLength; i++) {
            reformatBoard[j][i] = boardState[i][j];
          }
        }

        const foundWin = reformatBoard.filter((column) => checkAllEqual(column));
        if (foundWin.length > 0) setWinner();
      })();

      // Check board for a draw
      const checkDraw = (function () {

      })();
    })();

    if (isGameOver) {
      const hasWinner = (winner === null ? false : true);
      board.printBoard();
      if (hasWinner) return (`${winner} wins! Play again?`);
      return `It's a tie! Play again?`;
    }

    switchActivePlayer(); // Switches player
    printNewRound(); // Starts next round
  }

  printNewRound(); // Starts the game

  return { playRound };
})();