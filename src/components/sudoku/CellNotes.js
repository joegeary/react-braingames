import React from 'react';
import { withStyles } from 'material-ui-next';

const styles = {
    notes: {
        width: '100%',
        height: '100%',
        fontSize: '9px'
    }
};

const CellNotes = (props) => {
    const { cell, classes } = props;

    return (
        <table className={classes.notes}>
        <tbody>
            <tr>
                <td>{cell.notes['1'] ? 1 : ' '}</td>
                <td>{cell.notes['2'] ? 2 : ' '}</td>
                <td>{cell.notes['3'] ? 3 : ' '}</td>
            </tr>
            <tr>
                <td>{cell.notes['4'] ? 4 : ' '}</td>
                <td>{cell.notes['5'] ? 5 : ' '}</td>
                <td>{cell.notes['6'] ? 6 : ' '}</td>
            </tr>
            <tr>
                <td>{cell.notes['7'] ? 7 : ' '}</td>
                <td>{cell.notes['8'] ? 8 : ' '}</td>
                <td>{cell.notes['9'] ? 9 : ' '}</td>
            </tr>
        </tbody>
        </table>
    )
};

export default withStyles(styles)(CellNotes);