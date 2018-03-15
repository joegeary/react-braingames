import { START_TIMER, STOP_TIMER, RESET_TIMER } from '../constants/actions';

export const startTimer = (baseTime = 0) => {
    return {
        type: START_TIMER,
        baseTime: baseTime,
        now: new Date().getTime()
    };
}

export const stopTimer = () => {
    return {
        type: STOP_TIMER,
        now: new Date().getTime()
    };
}

export const resetTimer = () => {
    return {
        type: RESET_TIMER,
        now: new Date().getTime()
    };
}