const gameBoard = (() => {
  let playingBoard = [``, ``, ``, ``, ``, ``, ``, ``, ``]; // zero-based 0-8
  const sendMoveToBoard = (index, marker) => {
    playingBoard[index] = marker;
  };

  const clearPlayingBoard = () => {
    playingBoard = [``, ``, ``, ``, ``, ``, ``, ``, ``];
  }

  const checkEnd = () => {

    let boardReference = playingBoard.slice();

    if ((boardReference[0]) && (boardReference[0] === boardReference[1]) && (boardReference[1] === boardReference[2])) { // Horizontal win conditions
      console.log('Win');
    }
    else if ((boardReference[3]) && (boardReference[3] === boardReference[4]) && (boardReference[4] === boardReference[5])) {
      console.log('Win');
    }
    else if ((boardReference[6]) && (boardReference[6] === boardReference[7]) && (boardReference[7] === boardReference[8])) {
      console.log('Win');
    }

    else if ((boardReference[0]) && (boardReference[0] === boardReference[3]) && (boardReference[3] === boardReference[6])) { // Vertical win conditions
      console.log('Win');
    }
    else if ((boardReference[1]) && (boardReference[1] === boardReference[4]) && (boardReference[4] === boardReference[7])) {
      console.log('Win');
    }
    else if ((boardReference[2]) && (boardReference[2] === boardReference[5]) && (boardReference[5] === boardReference[8])) {
      console.log('Win');
    }

    else if ((boardReference[0]) && (boardReference[0] === boardReference[4]) && (boardReference[4] === boardReference[8])) { // Diagonal win conditions
      console.log('Win');
    }
    else if ((boardReference[2]) && (boardReference[2] === boardReference[4]) && (boardReference[4] === boardReference[6])) {
      console.log('Win');
    }

    else {
      for (const boardSpace in boardReference) {
        if (!boardReference[boardSpace]) return; // Ensures board is full
      }
      console.log('Draw');
    }

  }

  return { sendMoveToBoard, checkEnd, clearPlayingBoard };
})();

const displayController = (() => {
  let upcomingMarker = `X`;
  const boardCells = document.querySelectorAll(`div.gamecell`);
  boardCells.forEach((cell) => {

    cell.addEventListener('click', function() {

      const indexRef = cell.dataset.index;
      if (cell.textContent) return; // Return if move is played in space
      gameBoard.sendMoveToBoard(indexRef, upcomingMarker); // Update gameboard
      cell.textContent = upcomingMarker; // Update display

      switch(upcomingMarker) { // Update new display marker
        case `X`:
          upcomingMarker = `O`;
          break;
        case `O`:
          upcomingMarker = `X`;
          break;
        default:
          console.log('ERROR');
          break;
      }
      gameBoard.checkEnd();
    });
  })

  const resetBoard = () => {
    gameBoard.clearPlayingBoard();
    boardCells.forEach((cell) => {
      cell.textContent = ``;
    })
    upcomingMarker = `X`;
  }

  const openMenuButton = document.querySelector(`button.menu-open`);
  openMenuButton.addEventListener('click', function() {
    const modalMenu = document.querySelector(`div.menu`);
    modalMenu.style.visibility = `visible`;
  })

  const closeMenuButton = (document.querySelector(`div.menu-close`)).firstElementChild;
  closeMenuButton.addEventListener('click', function() {
    const modalMenu = document.querySelector(`div.menu`);
    modalMenu.style.visibility = `hidden`;
  })

  const resetButton = document.querySelector(`button.reset`);
  resetButton.addEventListener('click', resetBoard);

  return { upcomingMarker, boardCells, resetBoard };
})();

const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;

  return { getName, getMarker };
};

/* 
To me it makes sense for the displayController to show the board on screen, and also add the proper ev listeners. Currently your gamecell's don't have anything that identifies them. Make sure each one corresponds to a board index so you can add an extra class name for example. And the simplest way is to just do one thing at a time. Add an event listener that marks an X. That works? Okay now switch from X to O. That works? Now make it so it doesn't allow for clicking on same cell. And so on
*/