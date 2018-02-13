import React, { Component } from 'react';
import Cell from './Cell';

export default class Board extends Component {

    generateBoard() {
        const boardState = this.props.boardState;
        const board = [];

        for (let x = 0; x < boardState.length; x++) {
            let row = [];
            
            for (let y = 0; y < boardState[x].length; y++) {
                const cell = boardState[x][y];
                row.push(
                    <Cell 
                        key={x+''+y}
                        x={x}
                        y={y}
                        value={cell.value}
                        editable={cell.editable}
                        valid={cell.valid}
                        onValueChange={this.onValueChange}
                    />
                );
            }

            board.push(<tr key={x}>{row}</tr>);
        }

        return board;
    }

    onValueChange = (x, y, value) => {
        this.props.onValueChange(x, y, value);
    }

    render() {
        const board = this.generateBoard();
        return (
            <table><tbody>
                {board}
            </tbody></table>
        );
    }
}
