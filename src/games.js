const games = [{
    key: 'sudoku',
    title: 'Suduku',
    abbr: 'SU',
    description: 'Sudoku is a number placing puzzle based on a 9x9 grid with several given numbers. The object is to place the numbers 1 to 9 in the empty squares so that each row, each column and each 3x3 box contains the same number only once.',
    category: 'puzzle',
    color: '#E04F5F',
    favorite: true,
    rules: `
Sudoku is a number placing puzzle based on a 9x9 grid with several given numbers. The object is to place the numbers 1 to 9 in the empty squares so that each row, each column and each 3x3 box contains the same number only once.

**Rules**
* A number can only appear only once on each row
* A number can only appear only once on each column
* A number can only appear only once on each 3x3 box
* The pre-placed "given" numbers cannot be changed
* A square can only contain a number from 1 to 9    
    `
}, {
    key: 'minesweeper',
    title: 'Minesweeper',
    abbr: 'MS',
    description: 'The classic mine-finding game. Search tiles to uncover clues and figure out where all the mines are. Sweep the entire area and flag all of the mines to win!',
    category: 'puzzle',
    color: '#31BEA6',
    favorite: false
}, {
    key: 'slider',
    title: 'Slide Puzzle',
    abbr: 'SP',
    description: 'Move the numbered blocks around until they are in numerical order.',
    category: 'puzzle',
    color: '#25B7D3',
    favorite: false
}, {
    key: 'snake',
    title: 'Snake',
    abbr: 'SN',
    description: 'Maneuver a line which grows in length as you run over food, while avoiding obstacles and the line itself.',
    category: 'arcade',
    color: '#FABC3D',
    favorite: false
}];

export default games;