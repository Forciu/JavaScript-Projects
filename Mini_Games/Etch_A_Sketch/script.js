const startGameButton = document.getElementById(`game-start-button`)
const restartGameButton = document.getElementById(`restart-button`)
let paintingPicture = document.getElementById(`painting-picture`)
const container = document.getElementById(`container`)

function blockGameButton(button, event) {
    button.removeEventListener('click', event);
    button.classList.remove('hover-style');
    button.classList.add('button-blocker');
}

function activeGameButton(button, event) {
    button.addEventListener('click', event);
    button.classList.add('hover-style');
    button.classList.remove('button-blocker');
}

function createPaintingPictureBox() {
    let box = document.createElement('div');
    box.className = `point-box`

    paintingPicture.appendChild(box);
}

function restartGame() {
    let box = document.querySelectorAll('.point-box');
    box.forEach(element => {
        element.remove();
    })

    activeGameButton(startGameButton, gameStarted)
}

function createPaintedBox() {
    let paintedBoxLength = 841;

    for (let i = 0; i < paintedBoxLength; i++) {
        createPaintingPictureBox();
    }
}

function changePointBoxColor(e) {
    const currentBg = getComputedStyle(e.currentTarget).backgroundColor;

    const isTransparent = currentBg === 'rgba(0, 0, 0, 0)' || currentBg === 'transparent';

    if (isTransparent) {
        const randomNumber = () => Math.floor(Math.random() * 256);
        e.currentTarget.style.backgroundColor = `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
    }
}

function gameStarted() {
    createPaintedBox();

    let pointBox = document.querySelectorAll('.point-box');
    pointBox.forEach(element => {
        element.addEventListener("mouseleave", changePointBoxColor)
    })

    blockGameButton(startGameButton, gameStarted);
}

startGameButton.addEventListener("click", gameStarted);
restartGameButton.addEventListener("click", restartGame);