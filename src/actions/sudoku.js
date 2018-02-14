import { chunk } from 'lodash';

import { EASY, MEDIUM, HARD } from '../components/Sudoku/games';
import {
    SUDOKU_NEW_GAME,
    SUDOKU_RESET_GAME,
    SUDOKU_SOLVE_GAME,
    SUDOKU_UNDO,
    SUDOKU_REDO,
    SUDOKU_SQUARE_CHANGE
} from '../constants/actions';

export const newGame = (difficulty) => {
    const board = generateBoard(difficulty);

    return {
        type: SUDOKU_NEW_GAME,
        difficulty,
        board
    };
}

export const changeSquareValue = (x, y, value, board) => {
    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[x][y].value = value;

    return {
        type: SUDOKU_SQUARE_CHANGE,
        newBoard
    };
}


// find a better place to put these
const generateBoard = (difficulty) => {
    let board = chunk(getRandomGame(difficulty).split(''), 9);
    
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            const value = board[x][y] === '0' ? '' : board[x][y];
            
            board[x][y] = {
                editable: value,
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