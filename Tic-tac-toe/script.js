const X_CLASS = "x";
const O_CLASS = "o";
const winning_combs = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winMessage = document.getElementById("winningMessage");
const restart = document.getElementById("restartButton");
const winTextElement = document.querySelector("[data-winning-message-text]");
let oTurn;

startGame();

restart.addEventListener("click", startGame);

// Function in which marks are registered
function startGame() {
	oTurn = false;
	cellElements.forEach((cell) => {
		cell.classList.remove(X_CLASS);
		cell.classList.remove(O_CLASS);
		cell.removeEventListener("click", playGame);
		cell.addEventListener("click", playGame, { once: true });
	});
	setBoardHoverClass();
	winMessage.classList.remove("show");
}

function playGame(e) {
	const cell = e.target;
	const currentClass = oTurn ? O_CLASS : X_CLASS;

	// Call the function place a mark
	placeMark(cell, currentClass);

	// Call game logic functions
	// IF there is no right combination and no draw,
	// we keep on playing
	if (checkWin(currentClass)) {
		gameEnd(false);
	} else if (isDraw()) {
		gameEnd(true);
	} else {
		swapTurns();
		setBoardHoverClass();
	}
}

// Check for draw
function isDraw() {
	return [...cellElements].every((cell) => {
		return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
	});
}

// Display the messages
function gameEnd(draw) {
	if (draw) {
		winTextElement.innerText = "Draw :(";
	} else {
		winTextElement.innerText = `${oTurn ? "O won!" : "X won!"}`;
	}
	winMessage.classList.add("show");
}

// Function to place mark
function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

//  Switch turns
function swapTurns() {
	oTurn = !oTurn;
}

// Update the hover by checking who's turn it is
function setBoardHoverClass() {
	board.classList.remove(X_CLASS);
	board.classList.remove(O_CLASS);
	if (oTurn) {
		board.classList.add(O_CLASS);
	} else {
		board.classList.add(X_CLASS);
	}
}

// Check for win
function checkWin(currentClass) {
	return winning_combs.some((combination) => {
		return combination.every((index) => {
			return cellElements[index].classList.contains(currentClass);
		});
	});
}
