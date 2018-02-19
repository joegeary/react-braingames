import {
    SUDOKU_NEW_GAME,
    SUDOKU_SOLVE_GAME,
    SUDOKU_SQUARE_CHANGE
} from '../constants/actions';

const INITIAL_STATE = {
    difficulty: 'EASY',
    board: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SUDOKU_NEW_GAME:
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
        default:
            return state;
    }
}