import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeSquareValue } from '../../actions/sudoku';

class Cell extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    shouldComponentUpdate(newProps) {
         const oldCell = this.props.cell;
         const newCell = newProps.cell;

         return oldCell.value !== newCell.value || oldCell.editable !== newCell.editable;
    }

    onClick = (e) => {
        e.target.select();
    }

    onChange = (e) => {
        const cell = this.props.cell;
        const newValue = e.target.value;

        if (!this.isValid(newValue)) {
            e.target.value = cell.value;
            return;
        }

        this.props.changeSquareValue(cell.x, cell.y, newValue === '' ? '' : newValue, this.props.board);
        this.onClick(e);
    }

    isValid = (val) => {
        return (val === '' || /[1-9]/.test(val));
    }

    render() {
        const { cell } = this.props;
        const isValid = cell.editable ? (cell.valid ? 'valid' : 'invalid') : '';

        return (
            <td>
                <input 
                    className={`square ${isValid}`}
                    type="text" 
                    value={cell.value} 
                    disabled={!cell.editable}
                    onClick={this.onClick}
                    onChange={this.onChange}
                />
            </td>
        )
    }
}

export default connect(null, { changeSquareValue })(Cell);
