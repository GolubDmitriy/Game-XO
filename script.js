const cells = document.getElementsByClassName('cell');
let player = 'X';
let gameField = []

for (let i = 0; i < 3; ++i) {
    gameField.push([])
}

for (cell of cells) {
    cell.addEventListener('click', gameStep);
}

function gameStep(event) {
    if (!event.target.innerHTML) {
        event.target.innerHTML = player;
        gameFieldAddValue([event.target.dataset.value])
        changePlayer();
    }
}

function changePlayer() {
    if (player === 'X') {
        player = 'O';
    } else {
        player = 'X';
    }
}

function gameFieldAddValue(value) {
    gameField[Math.floor(value / 3)][value % 3] = player
}
