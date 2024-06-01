let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

function makeMove(index) {
  if (gameBoard[index] === "") {
    gameBoard[index] = currentPlayer;
    document.getElementById("status").innerText = `Player ${currentPlayer}'s turn`;
    document.getElementById("board").children[index].innerText = currentPlayer;
    if (checkWin()) {
      document.getElementById("status").innerText = `Player ${currentPlayer} wins!`;
      celebrateWin();
      disableBoard();
    } else if (gameBoard.every(cell => cell !== "")) {
      document.getElementById("status").innerText = "It's a draw!";
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
  });
}

function celebrateWin() {
  const winCells = document.querySelectorAll('.cell');
  winCells.forEach(cell => {
    if (cell.innerText === currentPlayer) {
      cell.classList.add('win');
    }
  });
  setTimeout(() => {
    winCells.forEach(cell => {
      cell.classList.remove('win');
    });
  }, 3000);
}

function reset() {
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  document.getElementById("status").innerText = `Player ${currentPlayer}'s turn`;
  Array.from(document.getElementsByClassName("cell")).forEach(cell => {
    cell.innerText = "";
    cell.style.pointerEvents = "auto";
  });
}

function disableBoard() {
  Array.from(document.getElementsByClassName("cell")).forEach(cell => {
    cell.style.pointerEvents = "none";
  });
}
