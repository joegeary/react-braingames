import React, { Component } from 'react';

export default class Cell extends Component {

    render() {
        const value = this.props.value === '0' ? '' : this.props.value;
        const valid = this.props.editable ? (this.props.valid ? 'valid' : 'invalid') : '';

        return (
            <td>
                <input 
                    className={`square ${valid}`}
                    type="text" 
                    value={value} 
                    disabled={!this.props.editable}
                    onChange={this.handleValueChange} 
                    onClick={this.handleInputClick}
                />
            </td>
        )
    }

    handleInputClick = (e) => {
        e.target.select();
    }

    handleValueChange = (e) => {
        var val = e.target.value;

        if (this.isValid(val)) {
            this.props.onValueChange(this.props.x, this.props.y, val);
        }
    }

    isValid = (val) => {
        return (val === '' || (val.length === 1 && !isNaN(val)));
    }

}
