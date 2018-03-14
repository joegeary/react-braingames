import undoable, { includeAction } from 'redux-undo';

import {
    SUDOKU_TOGGLE_DIFFICULTY_PANEL,
    SUDOKU_START_GAME,
    SUDOKU_SOLVE_GAME,
    SUDOKU_SQUARE_CHANGE, 
    SUDOKU_UNDO,
    SUDOKU_REDO,
    SUDOKU_USE_HINT
} from '../constants/actions';

const INITIAL_STATE = {
    difficulty: 'EASY',
    showDifficultySelector: false,
    hints: 3,
    board: []
};

const sudoku = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SUDOKU_TOGGLE_DIFFICULTY_PANEL:
            return {
                ...state,
                showDifficultySelector: !state.showDifficultySelector
            };

        case SUDOKU_START_GAME:
            return {
                ...state,
                difficulty: action.difficulty,
                board: action.board
            };

        case SUDOKU_SQUARE_CHANGE:
            return {
                ...state,
                board: action.newBoard
            };

        case SUDOKU_SOLVE_GAME:
            return {
                ...state,
                board: action.newBoard
            }

        case SUDOKU_USE_HINT:
            return {
                ...state,
                board: action.newBoard,
                hints: state.hints - 1
            }
            
        default:
            return state;
    }
}

export default undoable(sudoku, { 
    filter: includeAction([SUDOKU_SQUARE_CHANGE, SUDOKU_START_GAME, SUDOKU_SOLVE_GAME]), 
    undoType: SUDOKU_UNDO, 
    redoType: SUDOKU_REDO
});
