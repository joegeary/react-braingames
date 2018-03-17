import React from 'react';
import { withStyles } from 'material-ui-next';

import Cell from './Cell';

const styles = (theme) => ({
    root: {
        margin: '0 auto',
        border: '2px solid grey',
        borderCollapse: 'collapse',
    },
    row: {
        '&:nth-child(3n+4) input': {
            borderTop: '2px solid grey'
        }
    }
});

const Board = (props) => {
    const { classes } = props;

    return (
        <table className={classes.root}>
            <tbody>
                {props.board.map((row, i) => (
                    <tr key={i} className={classes.row}>
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
};

export default withStyles(styles)(Board);
