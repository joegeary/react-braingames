

const DIFFICULTY = {
    'EASY': 62,
    'MEDIUM': 53,
    'HARD': 44,
    'VERYHARD': 35,
    'INSANE': 26,
    'IMPOSSIBLE': 17
};

const getBlankBoard = (size) => {
    let board = [];

    for (let x = 0; x < size; x++) {
        board.push([]);

        for (let y = 0; y < size; y++) {
            board[x].push('0');
        }
    }

    return board;
}

export const generateBoard = (difficulty) => {
    if (typeof difficulty === 'string' || typeof difficulty === 'undefined') {
        difficulty = DIFFICULTY[difficulty] || DIFFICULTY.EASY;
    }

    // bounds check between easy and impossible difficulty
    difficulty = Math.max(difficulty, DIFFICULTY.IMPOSSIBLE);
    difficulty = Math.min(difficulty, DIFFICULTY.EASY);



    // give up and try again
    return generateBoard(difficulty);
}