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
        gameFieldAddValue([event.target.dataset.value]);
        if (checkGame()) {
            console.log('win: ', player)
            return
        }
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
    gameField[Math.floor(value / gameField.length)][value % gameField.length] = player
}

function checkGame() {
    return checkDiagonal() || checkLines();
}

function checkDiagonal() {
    let rightDiagonal = true;
    let leftDiagonal = true;
    for (let i = 0; i < gameField.length; ++i) {
        rightDiagonal = rightDiagonal && gameField[i][i] === player;
        leftDiagonal = leftDiagonal && gameField[gameField.length - i - 1][i] === player;
    } 
    return rightDiagonal || leftDiagonal;
}

function checkLines() {
    for (let x = 0; x < gameField.length; ++x) {
        let vertical = true;
        let horizontal = true;
        for (let y = 0; y < gameField.length; ++y) {
            vertical = vertical && gameField[y][x] === player;
            horizontal = horizontal && gameField[x][y] === player;
        }
        if (vertical || horizontal) {
            return true;
        }
    }
}
