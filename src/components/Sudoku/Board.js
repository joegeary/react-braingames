import React from 'react';
import Cell from './Cell';

const Board = (props) => (
    <table className="sudoku">
        <tbody>
            {props.board.map((row, i) => (
                <tr key={i}>
                    {row.map((cell) => (
                        <Cell 
                            key={cell.x + '' + cell.y}
                            cell={cell}
                            board={props.board}
                            onCellChange={props.onCellChange}
                        />
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);

export default Board;
