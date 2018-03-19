import undoable, { includeAction } from 'redux-undo';

import {
    SUDOKU_TOGGLE_NEW_GAME_MENU,
    SUDOKU_START_GAME,
    SUDOKU_SOLVE_GAME,
    SUDOKU_SQUARE_CHANGE, 
    SUDOKU_SQUARE_SELECT,
    SUDOKU_UNDO,
    SUDOKU_REDO,
    SUDOKU_CLEAR_HISTORY,
    SUDOKU_USE_HINT,
    SUDOKU_HINTS,
    SUDOKU_TOGGLE_PENCIL_MODE
} from '../constants/actions';

const INITIAL_STATE = {
    difficulty: 'EASY',
    showNewGameMenu: false,
    hints: SUDOKU_HINTS,
    board: [],
    selected: undefined,
    pencilMode: false
};

const sudoku = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SUDOKU_TOGGLE_NEW_GAME_MENU:
            return {
                ...state,
                showNewGameMenu: !state.showNewGameMenu
            };

        case SUDOKU_START_GAME:
            return {
                ...state,
                difficulty: action.difficulty || state.difficulty,
                board: action.board,
                hints: SUDOKU_HINTS
            };

        case SUDOKU_SQUARE_CHANGE:
            return {
                ...state,
                board: action.newBoard
            };

        case SUDOKU_SQUARE_SELECT:
            return {
                ...state,
                selected: action.cell
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

        case SUDOKU_TOGGLE_PENCIL_MODE:
            return {
                ...state,
                pencilMode: !state.pencilMode
            }
            
        default:
            return state;
    }
}

export default undoable(sudoku, { 
    filter: includeAction(SUDOKU_SQUARE_CHANGE),
    undoType: SUDOKU_UNDO, 
    redoType: SUDOKU_REDO,
    syncFilter: true,
    clearHistoryType: SUDOKU_CLEAR_HISTORY,
    neverSkipReducer: true
});
