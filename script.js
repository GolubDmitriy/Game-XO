let player = 'X';
let gameField = [];
let lengthGameField = 4;
let numberCellsToWin = 3;
const btnGameReset = document.getElementsByClassName('btn-game-reset')[0];
const btnChangeSettings = document.getElementById('change-settings');
const main = document.getElementsByClassName('main')[0];

btnChangeSettings.addEventListener('click', changeSettings)

btnGameReset.addEventListener('click', gameReset);

drawingGameField(lengthGameField);

for (let i = 0; i < lengthGameField; ++i) {
    gameField.push([])
}

function gameStep(event) {
    if (!event.target.innerHTML) {
        event.target.innerHTML = player;
        gameFieldAddValue([event.target.dataset.value]);
        if (testCheck()) {
            console.log('win: ', player);
            endRound();
            return;
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

function checkDiagonal(positionCheckX, positionCheckY) {
    let rightDiagonal = true;
    let leftDiagonal = true;
    for (let i = 0; i < numberCellsToWin; ++i) {
        rightDiagonal = rightDiagonal && gameField[positionCheckX + i][positionCheckY + i] === player;
        leftDiagonal = leftDiagonal && gameField[numberCellsToWin + positionCheckX - i - 1][positionCheckY + i] === player;
    } 
    return rightDiagonal || leftDiagonal;
}

function checkLines(positionCheckX, positionCheckY) {
    for (let x = 0; x < numberCellsToWin; ++x) {
        let vertical = true;
        let horizontal = true;
        for (let y = 0; y < numberCellsToWin; ++y) {
            vertical = vertical && gameField[y + positionCheckY][x + positionCheckX] === player;
            horizontal = horizontal && gameField[x + positionCheckX][y + positionCheckY] === player;
        }
        if (vertical || horizontal) {
            return true;
        }
    }
}

function drawingGameField(numberCells) {
    let dataValue = 0;
    for (let i = 0; i < numberCells; ++i) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < numberCells; ++j) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-value', dataValue++);
            cell.addEventListener('click', gameStep)
            row.appendChild(cell);
        }
        main.appendChild(row);
    }
}

function testCheck() {
    for (let i = 0; i <= gameField.length - numberCellsToWin; ++i) {
        for (let j = 0; j <= gameField.length - numberCellsToWin; ++j) {
            if (checkDiagonal(i, j) || checkLines(i, j)) {
                return true
            }
        }
    }
}

function endRound() {
    const cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
        cell.removeEventListener('click', gameStep);
    }
}

function gameReset() {
    const cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
        cell.innerHTML = '';
        cell.addEventListener('click', gameStep);
    }
    player = 'X';
    gameField= [];
    for (let i = 0; i < lengthGameField; ++i) {
        gameField.push([])
    }
}

function clearGameField() {
    main.innerHTML = '';
    gameField= [];
    for (let i = 0; i < lengthGameField; ++i) {
        gameField.push([])
    }
}

function changeSettings() {
    gameReset();
    lengthGameField = Number(document.getElementById('size-field').value);
    numberCellsToWin = Number(document.getElementById('number-line-to-win').value);
    clearGameField();
    drawingGameField(lengthGameField);
}
