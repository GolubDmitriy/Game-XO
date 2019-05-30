const cells = document.getElementsByClassName('cell');

for (cell of cells) {
    cell.addEventListener('click', gameStep)
}

function gameStep(event) {
    if (!event.target.innerHTML) {
        event.target.innerHTML = 'X'
    } else {
        console.log('no')
    }
}
