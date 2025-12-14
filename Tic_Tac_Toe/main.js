"use strict";

const players = (mark) => {
    const getMark = () => mark

    return {
        getMark,
    }
}

const gameBoard = (() => {
    const gameBoardPlaceList = ["1", "", "", "", "", "", "", "", ""];

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
    const startGameButton = document.getElementById("start-game-button");
    const setupScene = document.getElementById("setup-scene");
    const gameScene = document.getElementById("game-scene");
    const restartButton = document.getElementById("button-restart");
    const closeGameButton = document.getElementById("button-back");

    let playerMark = null;
    let player1 = null
    let player2 = null;

    const playerMarkChoice = function () {
        playerMarkChoiceButton.forEach(button => {
            if (button.classList.contains("selected-move")) {
                button.classList.remove("selected-move");
            }
        })
        this.classList.add("selected-move");
        playerMark = this.id;

        const player1 = players(playerMark);
        const player2 = players(playerMark === 'X' ? 'O' : 'X');
    }

    const startGame = function () {
        playerMarkChoiceButton.forEach(button => {
            if (button.classList.contains("selected-move")) {
                setupScene.classList.add("display-none");
                gameScene.classList.remove("display-none");
            }
        })

        gameFlow(player1, player2)
    }

    const restartGame = () => {
        gameBoard.restartGameBoard();
    }

    const closeGame = () => {
        restartGame();
        setupScene.classList.remove("display-none");
        gameScene.classList.add("display-none");
    }

    //Buttons
    playerMarkChoiceButton.forEach(button => {
        button.addEventListener('click', playerMarkChoice);
    })
    startGameButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);
    closeGameButton.addEventListener('click', closeGame);

    return {
        playerMarkChoice,
    }
})();


const gameFlow = (player1, player2) => {

}