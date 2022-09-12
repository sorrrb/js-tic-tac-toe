const gameBoard = (() => {
  const MARKERS = [`X`, `O`];
  let playingBoard = [``, ``, ``, ``, ``, ``, ``, ``, ``]; // zero-based 0-8
  const sendMoveToBoard = (index, marker) => {
    playingBoard[index] = marker;
  };

  return { MARKERS, sendMoveToBoard };
})();

const displayController = (() => {
  const boardCells = document.querySelectorAll(`div.gamecell`);
  boardCells.forEach((cell) => {
    cell.addEventListener('click', function() {
      const indexRef = cell.dataset.index;
      console.log(indexRef);
    });
  })

  const drawMove = (player, index) => {
    
  };

  return { boardCells, drawMove };
})();

const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker };
};

/* 
To me it makes sense for the displayController to show the board on screen, and also add the proper ev listeners. Currently your gamecell's don't have anything that identifies them. Make sure each one corresponds to a board index so you can add an extra class name for example. And the simplest way is to just do one thing at a time. Add an event listener that marks an X. That works? Okay now switch from X to O. That works? Now make it so it doesn't allow for clicking on same cell. And so on
*/