import React, { Component } from 'react';
import { Grid, IconButton } from 'material-ui-next';
import MoreVertIcon from 'material-ui-icons-next/MoreVert';

import ViewContainer from './layout/ViewContainer';
import LayoutAppBar from './layout/LayoutAppBar';
import ScrollView from './layout/ScrollView';
import LayoutBody from './layout/LayoutBody';
import GameCard from './GameCard';

const games = [{
    key: 'sudoku',
    title: 'Suduku',
    abbr: 'SU',
    description: 'Sudoku is a number placing puzzle based on a 9x9 grid with several given numbers. The object is to place the numbers 1 to 9 in the empty squares so that each row, each column and each 3x3 box contains the same number only once.'
}, {
    key: 'minesweeper',
    title: 'Minesweeper',
    abbr: 'MS'
}, {
    key: 'slider',
    title: 'Slide Puzzle',
    abbr: 'SP'
}];

const styles = {
    content: {
        paddingBottom: 60
    }
};

class GameList extends Component {
    handleTouchTapItem = (e, item) => {
        e.preventDefault();

        debugger;
    };

    render() {
        const appBarRight = (
            <IconButton><MoreVertIcon /></IconButton>
        );

        return (
            <ViewContainer>
                <LayoutAppBar
                    title="React Brain Games"
                    iconElementRight={appBarRight}
                />
                <ScrollView>
                    <LayoutBody style={styles.content}>
                        <Grid container spacing={24}>
                            {games.map(game => (
                                <Grid item xs={3}>
                                    <GameCard game={game} />
                                </Grid>
                            ))}
                        </Grid>
                    </LayoutBody>
                </ScrollView>
            </ViewContainer>
        )
    }
}

export default GameList;