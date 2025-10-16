const playerOneScore = document.getElementById("player1")
const playerTwoScore = document.getElementById('player2')
const button = document.querySelectorAll(".choice-button")
const gameInfo = document.querySelector("#player-activity-txt")
const choiceButtonContainer = document.getElementById("player-available-move-container")


let userScore = 0;
let computerScore = 0;

function createComputerChoice() {
    const choices = ['Rock', 'Paper', 'Scissors'];

    let computerChoice = choices[Math.floor(Math.random() * choices.length)];
    changePlayersMoveImage(2, computerChoice)
    return computerChoice;
}

function createPlayerChoice(playerChoice) {
    changePlayersMoveImage(1, playerChoice)

    return playerChoice;
}

function changePlayersMoveImage(playerNumber, pick) {
    const playersMoveImage = document.querySelector(
        `.players-move[data-player="${playerNumber}"] img`);
    playersMoveImage.src = `img/${pick}.png`
}

function gameOver(Winner) {
    if (confirm(`The winner is ${Winner}`)) {
        restartStats();
    }
    else {
        restartStats();
        button.forEach(button => { button.remove() });
        createRestartButton();
    }
}

function createRestartButton() {
    choiceButtonContainer.innerHTML = "";
    const container = createButtonContainer();

    let restartBtn = document.createElement("button");

    restartBtn.className = "choice-button restart-button";
    restartBtn.id = "restart-button";
    restartBtn.textContent = "Restart Game";

    container.appendChild(restartBtn);

    restartBtn.addEventListener("click", () => {
        createChoiceButtons();
    })
}

function createButtonContainer() {
    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("player-available-move");

    choiceButtonContainer.appendChild(buttonContainer);
    return buttonContainer;
}

function restartStats() {
    userScore = 0;
    computerScore = 0;
    gameInfo.textContent = ``
    playerOneScore.innerHTML = `0`;
    playerTwoScore.innerHTML = `0`;
}

function createChoiceButtons() {
    choiceButtonContainer.innerHTML = "";

    const container = createButtonContainer();

    const moves = ["Rock", "Paper", "Scissors"];

    moves.forEach(move => {
        const btn = document.createElement("button");
        btn.classList.add("choice-button");
        btn.textContent = move;
        btn.addEventListener("click", startGame);
        container.appendChild(btn);
    });
}

function startGame(e) {
    let playerChoice = createPlayerChoice(e.target.textContent);
    let computerChoice = createComputerChoice()

    if (playerChoice === computerChoice) {
        gameInfo.textContent = `DRAW!!!!!`
    } else if (
        playerChoice === "Rock" && computerChoice === "Scissors" ||
        playerChoice === "Paper" && computerChoice === "Rock" ||
        playerChoice === "Scissors" && computerChoice === "Paper"
    ) {
        userScore++
        playerOneScore.innerHTML = `${userScore}`;
        gameInfo.textContent = `Player WIN!`
        if (userScore === 3) { gameOver("Player") }
    }
    else {
        computerScore++
        playerTwoScore.innerHTML = `${computerScore}`;
        gameInfo.textContent = `Computer WIN!`
        if (computerScore === 3) { gameOver("computer") }
    }
}

button.forEach((button) => {
    button.addEventListener("click", startGame);
})