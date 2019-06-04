const btnGameReset = document.getElementsByClassName('btn-game-reset')[0];
const btnChangeSettings = document.getElementById('change-settings');
const main = document.getElementsByClassName('main')[0];
const message = document.getElementById('message')

class GameField {
    
    constructor(lengthGameField, numberCellsToWin) {
        this.lengthGameField =  lengthGameField;
        this.numberCellsToWin = numberCellsToWin;
    }

    drawingGameField(gameStep) {
        let dataValue = 0;
        for (let i = 0; i < this.lengthGameField; ++i) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < this.lengthGameField; ++j) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-value', dataValue++);
                cell.addEventListener('click', gameStep)
                row.appendChild(cell);
            }
            main.appendChild(row);
        }
    }

    clearGameField() {
        main.innerHTML = '';
    }

    resetGameField(gameStep) {
        const cells = document.getElementsByClassName('cell');
        for (let cell of cells) {
            cell.innerHTML = '';
            cell.addEventListener('click', gameStep)
        }
    }

    freezeGameField(gameStep) {
        const cells = document.getElementsByClassName('cell');
        for (let cell of cells) {
            cell.removeEventListener('click', gameStep);
        }
    }

}

class Game {

    constructor(player) {
        this.gameField = new GameField(4, 3);
        this.player = player;
        this.progressGame = [];
        this.gameStep = this.gameStep.bind(this);
        this.gameReset = this.gameReset.bind(this);
        this.startNewGameWithNewSettings = this.startNewGameWithNewSettings.bind(this);
        this.numberGameMove = 0;
    }

    newProgressGame() {
        this.progressGame = [];
        this.numberGameMove = 0;
        for (let i = 0; i < this.gameField.lengthGameField; ++i) {
            this.progressGame.push([]);
        }
    }

    changePlayer() {
        if (this.player === 'X') {
            this.player = 'O';
        } else {
            this.player = 'X';
        }
    }

    gameStep(event) {
        if (!event.target.innerHTML) {
            event.target.innerHTML = this.player;
            this.progressGameAddValue(event.target.dataset.value);
            ++this.numberGameMove;
            if (this.checkGame()) {
                console.log('win: ', this.player);
                this.endRound('win');
                return;
            }
            if (this.numberGameMove === Math.pow(this.gameField.lengthGameField, 2)) {
                this.endRound('draw');
                return;
            }
            this.changePlayer();
            this.changeMessage();
        }
    }

    progressGameAddValue(value) {
        this.progressGame[Math.floor(value / this.gameField.lengthGameField)][value % this.gameField.lengthGameField] = this.player
    }

    checkDiagonal(positionCheckX, positionCheckY) {
        let rightDiagonal = true;
        let leftDiagonal = true;
        for (let i = 0; i < this.gameField.numberCellsToWin; ++i) {
            rightDiagonal = rightDiagonal && this.progressGame[positionCheckX + i][positionCheckY + i] === this.player;
            leftDiagonal = leftDiagonal && this.progressGame[this.gameField.numberCellsToWin + positionCheckX - i - 1][positionCheckY + i] === this.player;
        } 
        return rightDiagonal || leftDiagonal;
    }

    checkLines(positionCheckX, positionCheckY) {
        for (let x = 0; x < this.gameField.numberCellsToWin; ++x) {
            let vertical = true;
            let horizontal = true;
            for (let y = 0; y < this.gameField.numberCellsToWin; ++y) {
                vertical = vertical && this.progressGame[y + positionCheckY][x + positionCheckX] === this.player;
                horizontal = horizontal && this.progressGame[x + positionCheckX][y + positionCheckY] === this.player;
            }
            if (vertical || horizontal) {
                return true;
            }
        }
    }

    checkGame() {
        for (let i = 0; i <= this.gameField.lengthGameField - this.gameField.numberCellsToWin; ++i) {
            for (let j = 0; j <= this.gameField.lengthGameField - this.gameField.numberCellsToWin; ++j) {
                if (this.checkDiagonal(i, j) || this.checkLines(i, j)) {
                    return true
                }
            }
        }
    }

    endRound(msg) {
        this.gameField.freezeGameField(this.gameStep);
        this.changeMessage(msg);
    }

    gameReset() {
        this.gameField.resetGameField(this.gameStep);
        this.player = 'X';
        this.newProgressGame();
        this.changeMessage();
    }

    startNewGame() {
        this.newProgressGame();
        this.gameField.drawingGameField(this.gameStep);
        this.changeMessage();
    }

    startNewGameWithNewSettings() {
        const lengthGameField = Number(document.getElementById('size-field').value);
        const numberCellsToWin = Number(document.getElementById('number-line-to-win').value);
        this.player = 'X';
        this.gameField.clearGameField();
        this.gameField = new GameField(lengthGameField, numberCellsToWin);
        this.startNewGame();
    }

    changeMessage(resultGame) {
        if (resultGame === 'win') {
            message.innerHTML = `Раунд окончен, победил ${this.player}`;
        } else if (resultGame === 'draw') {
            message.innerHTML = `Раунд окончен, ничья`;
        } else {
            message.innerHTML = `Сейчас ходит ${this.player}`;
        }
    }

}

let newGame = new Game('X');

newGame.startNewGame();

btnChangeSettings.addEventListener('click', newGame.startNewGameWithNewSettings);

btnGameReset.addEventListener('click', newGame.gameReset);
