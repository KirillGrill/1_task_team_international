function winConditions() {
    const gameFieldTable = document.getElementById('table');
    const winImg = document.getElementById('win');
    const gameFieldTableBody = document.getElementById('tbody');

    const tableSizeRows = 4;
    const tableSizeColumn = 4;
    let quantityOfNumbersInTableOnCorrectPlaces = 0;
    let victory = true;
    
    /*first condition*/
    for (let i = 0; i < tableSizeRows; i++) {
        for (let j = 0; j < tableSizeColumn; j++) {
            quantityOfNumbersInTableOnCorrectPlaces++;
            if(quantityOfNumbersInTableOnCorrectPlaces > 15) {
                break;
            }
            if(+gameFieldTable.rows[i].cells[j].innerText !== quantityOfNumbersInTableOnCorrectPlaces){
                victory = false;
                break;
            }
        }
    }

    if(victory){
        gameFieldTableBody.removeEventListener('click', move, false);
        winImg.hidden = false;
        return;
    }

    /*second condition*/
    victory = true;
    quantityOfNumbersInTableOnCorrectPlaces = 16;
    for (let i = tableSizeRows - 1; i >= 0 ; --i) {
        for (let j = tableSizeColumn - 1; j >= 0; --j) {

            quantityOfNumbersInTableOnCorrectPlaces--;
            if(quantityOfNumbersInTableOnCorrectPlaces < 1) {
                break;
            }
            if(+gameFieldTable.rows[i].cells[j].innerText !== quantityOfNumbersInTableOnCorrectPlaces){
                victory = false;
                break;
            }
        }
    }

    if(victory){
        gameFieldTableBody.removeEventListener('click', move, false);
        winImg.hidden = false;
        return;
    }

    /*third condition*/
    victory = true;
    quantityOfNumbersInTableOnCorrectPlaces = 0;
    for (let i = 0; i < tableSizeRows; i++) {
        for (let j = 0; j < tableSizeColumn; j++) {
            quantityOfNumbersInTableOnCorrectPlaces++;
            if(quantityOfNumbersInTableOnCorrectPlaces > 15) {
                break;
            }
            if(+gameFieldTable.rows[j].cells[i].innerText !== quantityOfNumbersInTableOnCorrectPlaces){
                victory = false;
                break;
            }
        }
    }

    if(victory){
        gameFieldTableBody.removeEventListener('click', move, false);
        winImg.hidden = false;
        return;
    }
}

function newGame() {
    const gameFieldTableBody = document.getElementById('tbody');
    gameFieldTableBody.addEventListener('click', move, false);

    /*перемешивание чисел*/
    document.getElementById('win').hidden = true;

    const gameFieldTable = document.getElementById('table');

    let arr = [];
    for (let i = 0; i < 15; ++i){
        arr[i] = i + 1;
    }

    let currentIndex = arr.length;
    while (currentIndex !== 0){
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        let temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }
//-------------
    arr.push('');

    const tableSizeRows = 4;
    const tableSizeColumn = 4;
    let indexOfElementFromArr = 0;
    for (let i = 0; i < tableSizeRows; i++) {
        for (let j = 0; j < tableSizeColumn; j++) {
            gameFieldTable.rows[i].cells[j].innerText = arr[indexOfElementFromArr];
            indexOfElementFromArr++;
        }
    }
}

newGame();

function move() {
    const gameFieldTable = document.getElementById('table');

    const elem = event.target;
    const upCell = elem.dataset.row - 1;
    const downCell = +elem.dataset.row + 1;
    const leftCell = elem.dataset.colum - 1;
    const rightCell = +elem.dataset.colum + 1;
    if(upCell > -1 ){
        moveUpDown(gameFieldTable, upCell, elem);
    }

    if(downCell < 4 ){
        moveUpDown(gameFieldTable, downCell, elem);
    }

    if(leftCell > -1 ){
        moveLeftRight(gameFieldTable, leftCell, elem);
    }

    if(rightCell < 4 ){
        moveLeftRight(gameFieldTable, rightCell, elem);
    }

    winConditions();
}

function moveUpDown(gameFieldTable, Cell, elem) {
    if(gameFieldTable.rows[Cell].cells[elem.dataset.colum].innerText === ''){
        gameFieldTable.rows[Cell].cells[elem.dataset.colum].innerText = elem.innerText;
        elem.innerText = '';
    }
}

function moveLeftRight(gameFieldTable, Cell, elem) {
    if(gameFieldTable.rows[elem.dataset.row].cells[Cell].innerText === ''){
        gameFieldTable.rows[elem.dataset.row].cells[Cell].innerText =  elem.innerText;
        elem.innerText = '';
    }
}




