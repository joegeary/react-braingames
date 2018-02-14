import React, { Component } from 'react';
import Cell from './Cell';

const Board = (props) => (
    <table className="board">
        <tbody>
            {props.board.map((row, i) => (
                <tr key={i}>
                    {row.map((cell) => (
                        <Cell 
                            key={cell.x+''+cell.y}
                            x={cell.x}
                            y={cell.y}
                            value={cell.value}
                            editable={cell.editable}
                            valid={cell.valid}
                            //onValueChange={this.onValueChange}
                        />
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);

export default Board;
