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
 * playerBoard  =>  values hidden (and where -1 = * and 0 = blank)
 */

let board = [[]];
let boardSize = 0;
let numberOfMines = 0;

/* -------
    Input
   ------- */
boardSize = parseInt(prompt(`- BUSCAMINAS -\n
    Introduce un número para determinar los dos lados del tablero (p. ej., 5 para un 5x5):`)
);
// WIP: Verificar...

numberOfMines = parseInt(boardSize * 0.2);

alert(`Se creará un tablero ${boardSize}x${boardSize} con ${numberOfMines} minas.`);
console.log(`Número de minas: ${numberOfMines}`);

/* --------------
    Create board
   -------------- */
board = generateBoard(boardSize);
placeMines(board, boardSize, numberOfMines);

// ???

play();

/* -------------------------------------------------------------------------
        FUNCTIONS
   ------------------------------------------------------------------------- */
function generateBoard(size) {
    let brd = [];

    for (i = 0; i < size; i++) {
        brd[i] = []; // Create row

        for (j = 0; j < size; j++) {
            brd[i][j] = 0; // Create empty row x column
        }
    }

    console.log(`Blank board generated`);
    
    return brd;
}

function placeMines(board, boardSize, numberOfMines) {
    /*
     * Create random [row, col] coordenates,
     * store them in function-level array to avoid repetitions
     * and add each new mine to actual board
     */
    
    let mineCoordenates = [];
    let coord; // = [row, col]
    let row;
    let col;
    let coordIsNew;

    for (i = 0; i < numberOfMines; i++) {
        do {
            coordIsNew = true;

            row = getRandomCoordinate(0, boardSize);
            col = getRandomCoordinate(0, boardSize);
            coord = [row, col];

            for (i = 0; i < mineCoordenates.length && coordIsNew; i++) {
                if (coord === mineCoordenates[i]) coordIsNew = false;
            }
        } while (!coordIsNew);

        // Add to coord array
        mineCoordenates.push(coord);

        // Add mine
        board[row][col] = -1;
        
        /*
         * Update adjacent boxes: try every possible one
         * · · ·
         * · M ·
         * · · ·
         */
        console.log(`Updating adjacents of mine [${row}][${col}]`);
        updateAdjacentBoxes(board, row-1, col-1);
        updateAdjacentBoxes(board, row-1, col);
        updateAdjacentBoxes(board, row-1, col+1);
        updateAdjacentBoxes(board, row, col-1);
        // M = updateAdjacentBoxes(board, row, col);
        updateAdjacentBoxes(board, row, col+1);
        updateAdjacentBoxes(board, row+1, col-1);
        updateAdjacentBoxes(board, row+1, col);
        updateAdjacentBoxes(board, row+1, col+1);
        console.log(`Finished placing mine [${row}][${col}]`)
    }

    console.log(`Finished placing all mines`)
}

function getRandomCoordinate(min, max) {
    return Math.floor(Math.random() * (max + 1));
}

function updateAdjacentBoxes(board, r, c) {
    try {
        if (board[r][c] !== -1) {
            board[r][c]++;
            console.info(`Adjacent [${r}][${c}] updated`)
        } else console.warn(`Adjacent [${r}][${c}] is another mine`);
    } catch (TypeError) {
        console.warn(`Adjacent [${r}][${c}] does not exist in the board`)
    }
}

function showEmptyOrNumericAdjacentBoxes(row, col) {
    // ...
}

function showBoard(board, boardSize) {
    let boardStr = "";

    for (i = 0; i < boardSize; i++) {
        boardStr += board[i].join();
        boardStr += "\n";
    }

    return boardStr;
}

function play() {
    let playing = true;
    
    while (playing) {
        //...
    }
}