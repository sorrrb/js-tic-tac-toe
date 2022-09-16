const displayController = (() => {
  let playerOne = null;
  let playerTwo = null;
  let playerAI = null;

  let isGameActive = false;
  let turnCount = null;
  let activeMark = null;

  const boardNode = document.querySelector(`div.gameboard`);
  boardNode.addEventListener('click', drawCallback);
  
  const gameCells = document.querySelectorAll(`div.gamecell`);

  const startButton = document.querySelector(`button.gameboard-button`);
  startButton.addEventListener('click', startCallback);

  const endScreen = document.querySelector(`div.game-end`);
  const closeEndScreen = (document.querySelector(`div.result-head`)).lastElementChild;
  closeEndScreen.addEventListener('click', function() {
    endScreen.style.visibility = `hidden`;
  })

  const nameEditButtons = document.querySelectorAll(`div.profile-head > img`);
  nameEditButtons.forEach((button) => {
    button.addEventListener('click', changeName);
  })

  function changeName(e) {
    const inputField = document.createElement(`input`);
    inputField.setAttribute('size', '8');
    inputField.classList.add('name-field');
    const nodeToReplace = ((e.target).parentNode).previousElementSibling;
    const refID = nodeToReplace.getAttribute(`id`);
    inputField.setAttribute(`id`, refID);
    const refNode = nodeToReplace.parentNode;
    refNode.replaceChild(inputField, nodeToReplace);
    
    inputField.addEventListener('keydown', (e) => {
      console.log(e.key);
      if (e.key === `Enter`) {
        const storeName = e.target.value;
        const referenceID = inputField.getAttribute(`id`);
        const newHead = document.createElement(`h2`);
        newHead.setAttribute(`id`, referenceID);
        const replaceRef = e.target.parentNode;
        replaceRef.replaceChild(newHead, inputField);
        newHead.textContent = storeName;
        this.removeEventListener('keydown', arguments.callee);
      }
      else return;
    })
  }

  // Event Listener callbacks
  function startCallback(e) {
    turnCount = 1;

    if(isGameActive || typeof(isGameActive) === `object`) {
      gameBoard.resetBoard();
      e.target.textContent = `START`;
      isGameActive = false;
    }

    else {
      isGameActive = true;
      e.target.textContent = `RESTART`;
    }

    const firstPlayerName = (document.getElementById(`first`)).textContent;
    const secondPlayerName = (document.getElementById(`second`)).textContent;
    const firstPlayerMark = (document.querySelector(`p.mark-one`)).textContent;
    const secondPlayerMark = (document.querySelector(`p.mark-two`)).textContent;

    playerOne = Player(firstPlayerName, firstPlayerMark);
    playerTwo = Player(secondPlayerName, secondPlayerMark);

    activeMark = playerOne.mark;
  }

  function drawCallback(e) {
    if (isGameActive) {
      for (let i = 0; i < gameCells.length; i++) {
        if (gameCells.item(i) === e.target && !(e.target.textContent)) {
          gameBoard.drawToPage(i, activeMark);
          let isGameOver = gameBoard.checkEnd(i);
          if (isGameOver) {
            const winMessage = document.querySelector(`.result-message`);
            const sideMessage = (document.querySelector(`div.result-card`).lastElementChild);
            winMessage.textContent = (activeMark === playerOne.mark ? `${playerOne.name} Wins!` : `${playerTwo.name} Wins!`);
            sideMessage.textContent = `Thanks for playing!`
            isGameActive = null;
            endScreen.style.visibility = `visible`;
          }
          else if (typeof(isGameOver) === 'object') {
            const winMessage = document.querySelector(`.result-message`);
            const sideMessage = (document.querySelector(`div.result-card`).lastElementChild);
            winMessage.textContent = `It's a Draw!`;
            sideMessage.textContent = `Play again?`
            isGameActive = null;
            endScreen.style.visibility = `visible`;
          }
          else {
            swapActiveMark();
            turnCount++;
          }
        }
      }
    }
  }

  // Public & Private functions
  const displayMove = (index, mark) => {
    const cellReference = gameCells.item(index);
    cellReference.textContent = mark;
  }

  const swapActiveMark = () => {
    if (!isGameActive) return;
    switch(activeMark) {
      case playerOne.mark:
        activeMark = playerTwo.mark;
        break;
      case playerTwo.mark:
        activeMark = playerOne.mark;
        break;
      default:
        console.log(`Error!`);
        break;
    }
  }

  return {
    gameCells,
    playerOne,
    playerTwo,
    playerAI,
    isGameActive,
    turnCount,
    activeMark,
    displayMove
   };
})();



const gameBoard = (() => {
  let board = [``, ``, ``, ``, ``, ``, ``, ``, ``];

  const drawToPage = (index, mark) => {
    board[index] = mark;
    displayController.displayMove(index, mark);
  }

  const resetBoard = () => {
    board = [``, ``, ``, ``, ``, ``, ``, ``, ``];
    (displayController.gameCells).forEach((cell) => {
      cell.textContent = ``;
    })
  }

  const winCombinations = [`012`, `345`, `678`, `036`, `147`, `258`, `048`, `246`];

  const checkEnd = startIndex => {
    let gameOver = false;
    for (let i = 0; i < winCombinations.length; i++) {
      if (winCombinations[i].includes(startIndex)) {
        const testWin = winCombinations[i];
        if (board[testWin.charAt(0)] === board[testWin.charAt(1)] && board[testWin.charAt(1)] === board[testWin.charAt(2)]) {
          return true;
        }
      }
    }

    gameOver = (board.includes(``) ? false : null);
    return gameOver;
  }

  return { 
    drawToPage,
    resetBoard,
    checkEnd
   };
})();



const Player = (name, mark) => {
  
  return {
    name,
    mark
   };
}



const loaderManager = (() => {
  function resolveLoading() {
    return new Promise(resolve => {
      setTimeout(() => {
       resolve(`none`); 
      }, 5000);
    });
  }

  async function asyncUnload() {
    const loader = document.getElementById(`load`);
    loader.style.display = await resolveLoading();
  }

  return {
    asyncUnload
  };
})();

// Global

loaderManager.asyncUnload();