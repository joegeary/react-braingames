import { START_TIMER, STOP_TIMER, RESET_TIMER } from '../constants/actions';

const INITIAL_STATE = {
    startedAt: undefined,
    stoppedAt: undefined,
    baseTime: undefined
};

const stopwatch = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case START_TIMER:
            return {
                ...state,
                baseTime: action.baseTime,
                startedAt: action.now,
                stoppedAt: undefined
            };

        case STOP_TIMER:
            return {
                ...state,
                stoppedAt: action.now
            };

        case RESET_TIMER:
            return {
                ...state,
                baseTime: 0,
                startedAt: state.startedAt ? action.now : undefined,
                stoppedAt: state.stoppedAt ? action.now : undefined
            };
            
        default:
            return state;
    }
}

export default stopwatch;
