/**
 * MINESWEEPER
 * User chooses n size of board (n x n)
 * Mines: 20% of total boxes
 * 
 * Values of boxes:
 * -1   =   mine
 * 0    =   non-adjacent
 * 1...8   =   adjacent
 * 
 * Two boards:
 * board    =>  values generated at the beginning
 * playerBoard  =>  values hidden (all cells are initially x, and when revealed -1 = * and 0 = " ")
 * 
 * console.log's for playing are in the target language
 * console.debug's are in English
 */

let board = [[]];
let playerBoard = [[]];
let boardSize = 0;
let numberOfMines = 0;

/* -------
    Input
   ------- */
boardSize = parseInt(prompt(`- BUSCAMINAS -\nIntroduce un número para determinar los dos lados del tablero (p. ej., 5 para un 5x5):`));
// WIP: Verificar...

numberOfMines = parseInt(boardSize * 0.2);

alert(`Se creará un tablero ${boardSize}x${boardSize} con ${numberOfMines} minas.`);
console.log(`Número de minas: ${numberOfMines}`);

/* --------------
    Ready, set...
   -------------- */
board = generateBoard(boardSize, "0");
console.debug(`Values board generated`);
placeMines(board, boardSize, numberOfMines);

playerBoard = generateBoard(boardSize, "x");
console.debug(`Player board generated`);

console.table(board); //debug

/* -------
    Go!
   ------- */
play(board, playerBoard);

/* ------------------------------------------------------------------------------------------------------------------------------
    Functions
   ----------- */
function generateBoard(size, emptyChar) {
    let brd = [];

    for (i = 0; i < size; i++) {
        brd[i] = []; // Create row

        for (j = 0; j < size; j++) brd[i][j] = emptyChar; // Create empty row x column
    }
    
    return brd;
}

function placeMines(board, boardSize, numberOfMines) {
    /*
     * Create random [row, col] coordenates,
     * store them in function-level array to keep track and avoid repetitions,
     * and add each new mine to actual board
     */
    
    let mineCoordenates = [];
    let coord; // = [row, col]
    let row = -1;
    let col = -1;
    let coordIsNew;

    for (i = 0; i < numberOfMines; i++) {
        do {
            coordIsNew = true;

            row = getRandomCoordinate(0, boardSize-1); // e.g. boardSize = 10 => Possible results are 0...9
            col = getRandomCoordinate(0, boardSize-1);
            coord = [row, col];

            for (i = 0; i < mineCoordenates.length && coordIsNew; i++) {
                if (coord === mineCoordenates[i]) coordIsNew = false;
            }
        } while (!coordIsNew);

        // Add to coord array
        mineCoordenates.push(coord);
        console.debug(`Coordinates so far: ${mineCoordenates}`);

        // Add mine
        board[row][col] = "-1";
        
        /*
         * Update adjacent boxes: try every possible one (but accounting for borders)
         * · · ·
         * · * ·
         * · · ·
         */

        console.debug(`Updating adjacents of mine [${row}][${col}]`);
        for (i = row-1; i <= row+1; i++) {
            if (i < 0 || i >= boardSize) continue;

            for (j = col-1; j <= col+1; j++) {
                if (j < 0 || j >= boardSize) continue;
                else if (i == row && j == col) continue;
                else updateAdjacentBoxes(board, i, j);
            }
        }
        console.debug(`Finished placing mine [${row}][${col}]`)
    }

    console.debug(`Aaand that was the last mine`)
}

function getRandomCoordinate(min, max) {
    return Math.floor(Math.random() * (max + 1));
}

function updateAdjacentBoxes(board, r, c) {
    // Used when placing mines
    if (board[r][c] !== -1) {
        board[r][c]++;
        console.debug(`Adjacent [${r}][${c}] updated`)
    } else console.debug(`Adjacent [${r}][${c}] is another mine`);
}

function showEmptyAdjacentBoxes(board, playerBoard, row, col) {
    playerBoard[row][col] = " "; // · to distinguish from non-touched cells

    for (i = row-1; i <= row+1; i++) {
        if (i < 0 || i >= board.length) continue; // Skip to next iteration if we are in a row border

        for (j = col-1; j <= col+1; j++) {
            // Using == sometimes to account for num/string
            // Skip
            if (j < 0 || j >= board[i].length) continue; // ... if we are in a column border
            else if (i === row && j === col) continue; // ... if we are in this very same cell
            else if (board[i][j] == -1) continue; // ... if it's a mine
            else if (playerBoard[i][j] !== "x") continue; // ... if it's already revealed

            // Go on
            else if (board[i][j] == 0) showEmptyAdjacentBoxes(board, playerBoard, i, j); // Recursion
            else playerBoard[i][j] = board[i][j]; // Show numeric flag and stop iteration
        }
    }
}

function play(board, playerBoard) {
    let playing = true;
    let row, col;
    let round = 0;

    console.info(`=== BUSCAMINAS ===`);
    console.table(playerBoard); // First instance, with no values shown

    while (playing) {
        round++;
        console.info(`=== RONDA ${round} ===`)
        
        row = parseInt(prompt(`RONDA ${round} - Elige fila (0-${boardSize-1}):`));
        col = parseInt(prompt(`RONDA ${round} - Elige columna (0-${boardSize-1}):`));
        // WIP: Añadir verificación

        if (board[row][col] == -1) {
            console.error(`¡BUM! Se acabó el juego.`);
            playerBoard[row][col] = "*";
            playing = false;
        } else if (playerBoard[row][col] === " ") {
            console.log(`Ya se ha destapado esa casilla.`);
        } else if (board[row][col] == 0) {
            console.log(`Ninguna mina a la vista.`);
            showEmptyAdjacentBoxes(board, playerBoard, row, col);
        } else {
            console.warn(`Una mina anda cerca...`);
            playerBoard[row][col] = board[row][col];
        }

        console.table(playerBoard);
    }
}