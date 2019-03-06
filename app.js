function winConditions() {
    const table = document.getElementById('table');

    const tableSizeRows = table.rows.length;
    const tableSizeColumn = table.rows[0].cells.length;
    var counter = 0;
    var controller = true;

    /*first condition*/
    for (let i = 0; i < tableSizeRows; i++) {
        for (let j = 0; j < tableSizeColumn; j++) {
            counter++;
            if(counter > 15) {
                break;
            }
            if(+table.rows[i].cells[j].innerText !== counter){
                controller = false;
                break;
            }
        }
    }

    if(controller){
        document.getElementById('win').hidden = false;
        return;
    }

    /*second condition*/
    controller = true;
    counter = 16;
    for (let i = tableSizeRows - 1; i >= 0 ; --i) {
        for (let j = tableSizeColumn - 1; j >= 0; --j) {

            counter--;
            if(counter < 1) {
                break;
            }
            if(+table.rows[i].cells[j].innerText !== counter){
                controller = false;
                break;
            }
        }
    }

    if(controller){
        document.getElementById('win').hidden = false;
        return;
    }

    /*third condition*/
    controller = true;
    counter = 0;
    for (let i = 0; i < tableSizeRows; i++) {
        for (let j = 0; j < tableSizeColumn; j++) {
            counter++;
            if(counter > 15) {
                break;
            }
            if(+table.rows[j].cells[i].innerText !== counter){
                controller = false;
                break;
            }
        }
    }

    if(controller){
        document.getElementById('win').hidden = false;
        return;
    }
}

function newGame() {
    document.getElementById('win').hidden = true;

    const table = document.getElementById('table');

    var arr = [];
    for (let i = 0; i < 15; ++i){
        arr[i] = i + 1;
    }

    var currentIndex = arr.length;
    while (currentIndex !== 0){
        var randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        var temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }

    arr.push('');

    const tableSizeRows = table.rows.length;
    const tableSizeColumn = table.rows[0].cells.length;
    var counter = 0;
    for (let i = 0; i < tableSizeRows; i++) {
        for (let j = 0; j < tableSizeColumn; j++) {
            table.rows[i].cells[j].innerText = arr[counter];
            counter++;
        }
    }
}

newGame();

function move() {
    const table = document.getElementById('table');

    const elem = event.target;
    const upCell = +elem.dataset.row - 1;
    const downCell = +elem.dataset.row + 1;
    const leftCell = +elem.dataset.colum - 1;
    const rightCell = +elem.dataset.colum + 1;
    if(upCell > -1 ){
        if(table.rows[upCell].cells[elem.dataset.colum].innerText === ''){
            table.rows[upCell].cells[elem.dataset.colum].innerText = event.target.innerText;
            event.target.innerText = '';
        }
    }

    if(downCell < 4 ){
        if(table.rows[downCell].cells[elem.dataset.colum].innerText === ''){
            table.rows[downCell].cells[elem.dataset.colum].innerText = event.target.innerText;
            event.target.innerText = '';
        }
    }

    if(leftCell > -1 ){
        if(table.rows[elem.dataset.row].cells[leftCell].innerText === ''){
            table.rows[elem.dataset.row].cells[leftCell].innerText = event.target.innerText;
            event.target.innerText = '';
        }
    }

    if(rightCell < 4 ){
        if(table.rows[elem.dataset.row].cells[rightCell].innerText === ''){
            table.rows[elem.dataset.row].cells[rightCell].innerText = event.target.innerText;
            event.target.innerText = '';
        }
    }

    winConditions();
}



