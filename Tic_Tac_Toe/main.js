"use strict";
const endGameModal = document.getElementById("winner-modal");

const players = (mark, name) => {
    const getMark = () => mark
    const getName = () => name

    return {
        getMark,
        getName,
    }
}

const gameBoard = (() => {
    const gameBoardPlaceList = ["", "", "", "", "", "", "", "", ""];

    const getBoardPosition = (index) => {
        return gameBoardPlaceList[index];
    }

    const setBoardMark = (mark, index) => {
        gameBoardPlaceList[index] = mark;
    }

    const restartGameBoard = () => {
        for (let i = 0; i < gameBoardPlaceList.length; i++) {
            gameBoardPlaceList[i] = '';
        }
    }

    return {
        getBoardPosition,
        setBoardMark,
        restartGameBoard,
    }
})();

const gameController = (() => {
    const playerMarkChoiceButton = document.querySelectorAll(".mark-button");
    const playerOpponentChoiceButton = document.querySelectorAll(".game-opponent-choice");
    const startGameButton = document.getElementById("start-game-button");
    const setupScene = document.getElementById("setup-scene");
    const gameScene = document.getElementById("game-scene");
    const restartButton = document.getElementById("button-restart");
    const closeGameButton = document.querySelectorAll(".button-back");
    const selectSignButton = document.querySelectorAll(".mark-button");
    const gameBoardButton = document.querySelectorAll(".board");

    let player1;
    let player2;
    let opponent;

    const playerMarkChoice = function () {
        playerMarkChoiceButton.forEach(button => {
            if (button.classList.contains("selected-move")) {
                button.classList.remove("selected-move");
            }
        })
        this.classList.add("selected-move");

        player1 = players(this.id, 'player1');
        player2 = players(this.id === 'X' ? 'O' : 'X', 'player2');
    }

    const playerOpponentChoice = function () {
        playerOpponentChoiceButton.forEach(button => {
            if (button.classList.contains("selected-move")) {
                button.classList.remove("selected-move");
            }
        })

        this.classList.add("selected-move");
        opponent = this.id;
        disableButtonMark()
    }

    const disableButtonMark = () => {
        const disabled = opponent === 'Player';

        selectSignButton.forEach(button => {
            button.disabled = disabled;
        });
        if (opponent === 'Player') {
            playerMarkChoiceButton.forEach(button => {
                if (button.classList.contains("selected-move")) {
                    button.classList.remove("selected-move");
                }
            })
        }
    };

    const initSelectedGameOptions = () => {
        const selectedOpponent = document.querySelector(".game-opponent-choice.selected-move");

        if (selectedOpponent) {
            opponent = selectedOpponent.id;
        }
    };

    const startGame = function () {
        initSelectedGameOptions();
        if (!opponent) alert('Select an opponent');

        changeToGameScene();
        gameFlow(player1, player2, opponent);
    }

    const restartGame = () => {
        gameBoard.restartGameBoard();
        activeButton = 9;

        gameBoardButton.forEach((button) => {
            button.innerHTML = ''
            button.disabled = false;
        })
    }

    const closeGame = () => {
        location.reload();
    }

    const changeToGameScene = () => {
        gameScene.classList.remove("display-none");
        setupScene.classList.add("display-none");
    }

    //Buttons
    playerMarkChoiceButton.forEach(button => {
        button.addEventListener('click', playerMarkChoice);
    })

    playerOpponentChoiceButton.forEach(button => {
        button.addEventListener('click', playerOpponentChoice);
    })

    startGameButton.addEventListener('click', startGame);
    closeGameButton.forEach((button) => {
        button.addEventListener('click', closeGame);
    })

    return {
        playerMarkChoice,
        startGame,
        restartGame,
    }
})();

const gameFlow = (player1, player2, opponent) => {
    let currentPlayer;

    if (opponent === 'Player') {
        player1 = players('O', 'Player1')
        player2 = players('X', 'Player2')

        currentPlayer = player1;
        gameEngine(player1, player2, currentPlayer);
    }
}

let activeButton = 9;
const gameEngine = (player1, player2, currentPlayer) => {
    const board = document.querySelectorAll(".board");

    function makeMove() {
        const index = Number(this.dataset.value);

        if (gameBoard.getBoardPosition(index) === '') {
            activeButton -= 1;
            if (activeButton === 0) {
                displayWinner('draw')
            }

            gameBoard.setBoardMark(currentPlayer.getMark(), index);
            this.innerHTML = currentPlayer.getMark();
            this.disabled = true;
            checkWinner();
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
    }

    const checkWinner = () => {
        const WIN_PATTERNS = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const pattern of WIN_PATTERNS) {
            const [a, b, c] = pattern;

            const valA = gameBoard.getBoardPosition(a);
            const valB = gameBoard.getBoardPosition(b);
            const valC = gameBoard.getBoardPosition(c);

            if (valA === '') continue;

            if (valA === valB && valA === valC) {
                displayWinner(currentPlayer);

                board.forEach(btn => btn.disabled = true);
                currentPlayer = null;
                return true;
            }
        }

        return false;
    };

    board.forEach(gameBoard => {
        gameBoard.addEventListener("click", makeMove);
    })
}

const displayWinner = (winner) => {
    const text = document.getElementById("winner-text");
    const againButton = document.getElementById("game-again");

    if (winner === 'draw') {
        text.textContent = `DRAW!!`;
    } else text.textContent = `${winner.getName()} (${winner.getMark()}) wins!`;

    againButton.onclick = () => nextGame(winner);

    endGameModal.classList.remove("hidden");
};

let player1Score = 0;
let player2Score = 0;
let drawScore = 0;

const nextGame = (winner) => {
    const player1GameScore = document.querySelector('.result-player p#value-o');
    const player2GameScore = document.querySelector(".result-player p#value-x");
    const drawGameScore = document.querySelector(".result-draw p#value-d");

    if (winner === 'draw') {
        drawScore++;
        drawGameScore.textContent = drawScore.toString();
    } else if (winner.getName() === 'Player1') {
        player1Score++;
        player1GameScore.textContent = player1Score.toString();
    } else {
        player2Score++;
        player2GameScore.textContent = player2Score.toString();
    }

    gameController.restartGame();
    gameController.startGame();

    activeButton = 9;
    endGameModal.classList.add("hidden");
};