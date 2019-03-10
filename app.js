// Bad naming for function. Function is an 'action' name should reflect what function do
// e.g.: checkWinCondition/testWinCondition/checkResult/testResult/
function winConditions() {
    const table = document.getElementById('table');
    const winPattern = '123456789101112131415';

    // Lets simplify code below

    // Use some array magic and turn your [tr][td] matrix into flat array with td`s content
    const cellsContent = [].map.call(table.rows, row => [].slice.call(row.cells))
                         .flat()
                         .map(cell => cell.innerText);

    // Compare strings what could be easier? :)
    const isGameFinished = winPattern == cellsContent.join('');

    document.getElementById('win').hidden = !isGameFinished;

    /* Very strange and weird logic but it works 
        You get a prize for the most obscure win condition
    */
    //const tableSizeRows = table.rows.length;
    //const tableSizeColumn = table.rows[0].cells.length;

    // var counter = 0;

    // Bad naming. Controller of what ?!
    // var controller = true;

    // /*first condition*/
    // for (let i = 0; i < tableSizeRows; i++) {
    //     for (let j = 0; j < tableSizeColumn; j++) {
    //         counter++;
    //         if(counter > 15) {
    //             break;
    //         }
    //         if(+table.rows[i].cells[j].innerText !== counter){
    //             controller = false;
    //             break;
    //         }
    //     }
    // }

    // if(controller){
    //     document.getElementById('win').hidden = false;
    //     return;
    // }

    // /*second condition*/
    // controller = true;
    // counter = 16;
    // for (let i = tableSizeRows - 1; i >= 0 ; --i) {
    //     for (let j = tableSizeColumn - 1; j >= 0; --j) {

    //         counter--;
    //         if(counter < 1) {
    //             break;
    //         }
    //         if(+table.rows[i].cells[j].innerText !== counter){
    //             controller = false;
    //             break;
    //         }
    //     }
    // }

    // if(controller){
    //     document.getElementById('win').hidden = false;
    //     return;
    // }

    // /*third condition*/
    // controller = true;
    // counter = 0;
    // for (let i = 0; i < tableSizeRows; i++) {
    //     for (let j = 0; j < tableSizeColumn; j++) {
    //         counter++;
    //         if(counter > 15) {
    //             break;
    //         }
    //         if(+table.rows[j].cells[i].innerText !== counter){
    //             controller = false;
    //             break;
    //         }
    //     }
    // }

    // if(controller){
    //     document.getElementById('win').hidden = false;
    //     return;
    // }
}

function newGame() {
    // Don't use such constructions. It's better to get element once and then use that variable
    document.getElementById('win').hidden = true;

    // Here the same. Even if you use const in every function it is better to get table once. This element won't be changed
    const table = document.getElementById('table');

    // Bad naming again. As far as our game grid dimensions are not dynamic just manually put values to the array. No need for loop here :)
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

    /* Bad naming. tableRowsSize or just rowsSize would be better
        You can see the name for variable in the object chain - table.rows.length (just camelCase it) -> tableRowsLength(rowsLength)
    */

    // No need for consts,vars and inner loop here. Just single loop and get index using math operators
    // See below
    const tableSizeRows = table.rows.length;
    const tableSizeColumn = table.rows[0].cells.length;
    var counter = 0;
    for (let i = 0; i < tableSizeRows; i++) {
        for (let j = 0; j < tableSizeColumn; j++) {
            table.rows[i].cells[j].innerText = arr[counter];
            counter++;
        }
    }

    // for (var i = 0; i < arr.length; i++) {
    //     table.rows[Math.floor(i / 4)].cells[i % 4].innerText = arr[i];
    // }
}

// Very strange place for initialization function :)
// Call it at the very top or bottom
newGame();

function move() /*<--- event param here */ {
    // Don't refer to global 'event' variable, define event as parameter in the handler function
    // You placed 'event.target' into constant but still refer to 'even.target' below. Use your constant :)
    const elem = event.target;

    // Lets make easier code instead of commented one
    swapCells(+elem.dataset.row - 1, elem.dataset.colum, elem)  ||
    swapCells(+elem.dataset.row + 1, elem.dataset.colum, elem)  ||
    swapCells(+elem.dataset.row, +elem.dataset.colum - 1, elem) ||
    swapCells(+elem.dataset.row, +elem.dataset.colum + 1, elem);
    
    // // Bad naming x 4! You defined constants with indexes but gave them names with 'cell' word
    // const upCell = +elem.dataset.row - 1;
    // const downCell = +elem.dataset.row + 1;
    // const leftCell = +elem.dataset.colum - 1;
    // const rightCell = +elem.dataset.colum + 1;

    // // Too many 'if' constructions
    // if(upCell > -1 ){
    //     if(table.rows[upCell].cells[elem.dataset.colum].innerText === ''){
    //         table.rows[upCell].cells[elem.dataset.colum].innerText = event.target.innerText;
    //         event.target.innerText = '';
    //     }
    // }

    // if(downCell < 4 ){
    //     if(table.rows[downCell].cells[elem.dataset.colum].innerText === ''){
    //         table.rows[downCell].cells[elem.dataset.colum].innerText = event.target.innerText;
    //         event.target.innerText = '';
    //     }
    // }

    // if(leftCell > -1 ){
    //     if(table.rows[elem.dataset.row].cells[leftCell].innerText === ''){
    //         table.rows[elem.dataset.row].cells[leftCell].innerText = event.target.innerText;
    //         event.target.innerText = '';
    //     }
    // }

    // if(rightCell < 4 ){
    //     if(table.rows[elem.dataset.row].cells[rightCell].innerText === ''){
    //         table.rows[elem.dataset.row].cells[rightCell].innerText = event.target.innerText;
    //         event.target.innerText = '';
    //     }
    // }

    winConditions();
}

function swapCells(rowIndex, colIndex, current) {
    const rows = document.getElementById('table').rows;
    const testee = rows[rowIndex] ? rows[rowIndex].cells[colIndex] : null;
    const canSwap =  testee && testee.innerText === '';

    if (canSwap) {
        testee.innerText = current.innerText;
        current.innerText = '';
    }

    return canSwap;
}
