let player = 'X';
let gameField = [];
const lengthGameField = 4
const numberCellsToWin = 4

drawingGameField(lengthGameField);

for (let i = 0; i < lengthGameField; ++i) {
    gameField.push([])
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
    for (let i = 0; i < numberCellsToWin; ++i) {
        rightDiagonal = rightDiagonal && gameField[i][i] === player;
        leftDiagonal = leftDiagonal && gameField[numberCellsToWin - i - 1][i] === player;
    } 
    return rightDiagonal || leftDiagonal;
}

function checkLines() {
    for (let x = 0; x < numberCellsToWin; ++x) {
        let vertical = true;
        let horizontal = true;
        for (let y = 0; y < numberCellsToWin; ++y) {
            vertical = vertical && gameField[y][x] === player;
            horizontal = horizontal && gameField[x][y] === player;
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
        document.body.appendChild(row);
    }
}
