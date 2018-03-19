import { chunk } from 'lodash';

import { EASY, MEDIUM, HARD } from '../components/sudoku/games';
import {
    SUDOKU_START_GAME,
    SUDOKU_SOLVE_GAME,
    SUDOKU_SQUARE_CHANGE,
    SUDOKU_SQUARE_SELECT,
    SUDOKU_UNDO,
    SUDOKU_REDO, 
    SUDOKU_CLEAR_HISTORY,
    SUDOKU_TOGGLE_NEW_GAME_MENU,
    SUDOKU_USE_HINT,
    SUDOKU_TOGGLE_PENCIL_MODE
} from '../constants/actions';

export const toggleNewGameMenu = () => {
    return {
        type: SUDOKU_TOGGLE_NEW_GAME_MENU
    }
}

export const togglePencilMode = () => {
    return {
        type: SUDOKU_TOGGLE_PENCIL_MODE
    }
}

export const clearHistory = () => {
    return {
        type: SUDOKU_CLEAR_HISTORY
    }
}

export const startGame = (difficulty) => {
    const board = generateBoard(difficulty);

    return {
        type: SUDOKU_START_GAME,
        difficulty,
        board
    };
}

export const restartGame = (board) => {
    const newBoard = JSON.parse(JSON.stringify(board));

    newBoard.forEach(row => {
        row.forEach(cell => {
            if (cell.editable) {
                cell.value = '';
            }
        });
    });

    return {
        type: SUDOKU_START_GAME,
        board: newBoard
    };
}

export const solveGame = (board) => {
    const newBoard = JSON.parse(JSON.stringify(board));
    
    newBoard.forEach(row => {
        row.forEach(cell => {
            if (cell.editable) {
                cell.value = '';
                cell.notes = undefined;
            }
        });
    });

    solvePuzzle(newBoard);

    return {
        type: SUDOKU_SOLVE_GAME,
        newBoard
    }
}

export const changeSquareValue = (x, y, value, board) => {
    const newBoard = JSON.parse(JSON.stringify(board));

    newBoard[x][y].value = value === '' || value === '0' ? '' : ~~value;
    newBoard[x][y].notes = undefined;

    validateBoard(newBoard);

    return {
        type: SUDOKU_SQUARE_CHANGE,
        newBoard
    };
}

export const changeSquareNotes = (x, y, value, board) => {
    const newBoard = JSON.parse(JSON.stringify(board));
    const cell = newBoard[x][y];

    if (cell.notes === undefined) {
        cell.notes = {
            '1': false,
            '2': false,
            '3': false,
            '4': false,
            '5': false,
            '6': false,
            '7': false,
            '8': false,
            '9': false
        }
    }

    cell.notes[value] = !cell.notes[value];
    cell.value = undefined;

    return {
        type: SUDOKU_SQUARE_CHANGE,
        newBoard
    }
}

export const selectSquare = (cell) => {
    return {
        type: SUDOKU_SQUARE_SELECT,
        cell
    }
}

export const undoMove = () => {
    return {
        type: SUDOKU_UNDO
    };
}

export const redoMove = () => {
    return {
        type: SUDOKU_REDO
    };
}

export const useHint = (board) => {
    const solvedBoard = JSON.parse(JSON.stringify(board));
    const newBoard = JSON.parse(JSON.stringify(board));
    
    solvedBoard.forEach(row => {
        row.forEach(cell => {
            if (cell.editable) {
                cell.value = '';
            }
        });
    });

    solvePuzzle(solvedBoard);

    let found = false;
    while (!found) {
        const x = randomRange(0, newBoard.length - 1);
        const y = randomRange(0, newBoard[x].length - 1);

        if (newBoard[x][y].value === '') {
            found = true;
            newBoard[x][y].value = solvedBoard[x][y].value;
        }
    }

    return {
        type: SUDOKU_USE_HINT,
        newBoard
    }
}




// find a better place to put these
const randomRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateBoard = (difficulty) => {
    let board = chunk(getRandomGame(difficulty).split(''), 9);
    
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            const value = board[x][y] === '0' ? '' : ~~board[x][y];
            
            board[x][y] = {
                editable: !value,
                valid: true,
                value,
                x,
                y
            };
        }
    }

    return board;
}

const getRandomGame = (difficulty) => {
    switch (difficulty) {
        case 'MEDIUM':
            return MEDIUM[Math.floor(Math.random() * MEDIUM.length)];
        case 'HARD':
            return HARD[Math.floor(Math.random() * HARD.length)];
        default:
            return EASY[Math.floor(Math.random() * EASY.length)];
    }
}

const validateBoard = (board) => {
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            board[x][y].valid = validateCell(board, x, y);
        }
    }
}

const validateCell = (board, x, y) => {
    const value = board[x][y].value;

    if (value === '') 
        return true;

    // check the row
    for (let i = 0; i < board.length; i++) {
        if (x !== i && board[i][y].value === value) {
            return false;
        }
    }

    // check the column
    for (let i = 0; i < board[x].length; i++) {
        if (y !== i && board[x][i].value === value) {
            return false;
        }
    }

    // check the square
    const squareX = Math.floor(x / 3);
    const squareY = Math.floor(y / 3);
    for (let i = squareX * 3; i < (squareX * 3) + 3; i++) {
        for (let j = squareY * 3; j < (squareY * 3) + 3; j++) {
            if (!(i === x && j === y) && board[i][j].value === value) {
                return false;
            }
        }
    }

    return true;
}

const solvePuzzle = (board) => {   
    let nextCell = findNextEmptyCell(board);

    if (!nextCell) {
        return true;
    }

    var legalValues = findLegalValues(board, nextCell);

    for (let i = 0; i < legalValues.length; i++) {
        board[nextCell.x][nextCell.y].value = legalValues[i];
        board[nextCell.x][nextCell.y].valid = true;

        if (solvePuzzle(board)) {
            return true;
        }

        board[nextCell.x][nextCell.y].value = '';
    }

    return false;
}

const findNextEmptyCell = (board) => {
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            if (board[x][y].value === '' || board[x][y].value === 0) {
                return board[x][y];
            }
        }
    }
    
    return false;
}

const findLegalValues = (board, cell) => {
    let legalNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    board.forEach(row => {
        legalNums = legalNums.filter(n => n !== row[cell.y].value);
    });

    board[cell.x].forEach(col => {
        legalNums = legalNums.filter(n => n !== col.value);
    })

    const squareX = Math.floor(cell.x / 3);
    const squareY = Math.floor(cell.y / 3);
    for (let x = squareX * 3; x < (squareX * 3) + 3; x++) {
        for (let y = squareY * 3; y < (squareY * 3) + 3; y++) {
            legalNums = legalNums.filter(n => n !== board[x][y].value);
        }
    }
    
    for (let i = legalNums.length - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random()*(i+1)); 
        const itemAtIndex = legalNums[randomIndex]; 
         
        legalNums[randomIndex] = legalNums[i]; 
        legalNums[i] = itemAtIndex;
    }

    return legalNums;
}