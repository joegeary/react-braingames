import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Paper, List, ListItem, ListItemText, IconButton } from 'material-ui-next';
import MoreVertIcon from 'material-ui-icons-next/MoreVert';

import ViewContainer from './layout/ViewContainer';
import LayoutAppBar from './layout/LayoutAppBar';
import ScrollView from './layout/ScrollView';
import LayoutBody from './layout/LayoutBody';

const games = [{
    key: 'sudoku',
    title: 'Suduku'
}, {
    key: 'minesweeper',
    title: 'Minesweeper'
}, {
    key: 'slider',
    title: 'Slide Puzzle'
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
                        <Paper square>
                            <List component="nav">
                                {games.map(game => (
                                    <ListItem button key={game.key} component={Link} to={'/' + game.key}>
                                        <ListItemText primary={game.title} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </LayoutBody>
                </ScrollView>
            </ViewContainer>
        )
    }
}

export default GameList;