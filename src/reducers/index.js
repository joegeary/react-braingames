import { combineReducers } from 'redux';

import stopwatch from './stopwatch';
import sudoku from './sudoku';

const rootReducer = combineReducers({
    stopwatch,
    sudoku
});

export default rootReducer;