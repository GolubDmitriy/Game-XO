const cells = document.getElementsByClassName('cell');
let player = 'X';

for (cell of cells) {
    cell.addEventListener('click', gameStep);
}

function gameStep(event) {
    if (event.target.innerHTML) {
        return
    }
    if (event.target.innerHTML !== player) {
        event.target.innerHTML = player;
    } 
    changePlayer();
}

function changePlayer() {
    if (player === 'X') {
        player = 'O';
    } else {
        player = 'X';
    }
}
