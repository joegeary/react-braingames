import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles, IconButton } from 'material-ui-next';
import ArrowBackIcon from 'material-ui-icons-next/ArrowBack';

import ViewContainer from '../layout/ViewContainer';
import LayoutAppBar from '../layout/LayoutAppBar';
import LayoutBody from '../layout/LayoutBody';

const styles = {

};

class Rules extends React.Component {

    render() {
        const appBarLeft = (
            <IconButton component={Link} to="/sudoku">
                <ArrowBackIcon />
            </IconButton>
        );

        return (
            <ViewContainer>
                <LayoutAppBar
                    title="Sudoku - How To Play"
                    iconElementLeft={appBarLeft}
                />
                <LayoutBody>
                    <p>
                        Sudoku is a number placing puzzle based on a 9x9 grid with several given numbers. The 
                        object is to place the numbers 1 to 9 in the empty squares so that each row, each column 
                        and each 3x3 box contains the same number only once.
                    </p>
                    <p><strong>Rules</strong></p>
                    <ul>
                        <li>A number can only appear only once on each row</li>
                        <li>A number can only appear only once on each column</li>
                        <li>A number can only appear only once on each 3x3 box</li>
                        <li>The pre-placed "given" numbers cannot be changed</li>
                        <li>A square can only contain a number from 1 to 9</li>
                    </ul>
                </LayoutBody>
            </ViewContainer>
        );
    }

}

export default withStyles(styles)(Rules);