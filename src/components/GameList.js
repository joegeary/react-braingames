import React, { Component } from 'react';
import { Grid, IconButton, Tab, Tabs, AppBar } from 'material-ui-next';
import AccountCircleIcon from 'material-ui-icons-next/AccountCircle';

import ViewContainer from './layout/ViewContainer';
import LayoutAppBar from './layout/LayoutAppBar';
import ScrollView from './layout/ScrollView';
import LayoutBody from './layout/LayoutBody';
import GameCard from './GameCard';
import allGames from '../games';

const styles = {
    content: {
        paddingBottom: 60
    }
};

class GameList extends Component {
    state = {
        selectedTab: 0,
        selectedGames: allGames
    };

    handleTabChange = (evt, value) => {
        let selectedGames = allGames;
        switch (value) {
            case 1:
                selectedGames = allGames.filter(game => game.category === 'puzzle');
                break;
            case 2:
                selectedGames = allGames.filter(game => game.category === 'arcade');
                break;
            case 3:
                selectedGames = allGames.filter(game => game.favorite);
                break;
            default:
                selectedGames = allGames;
                break;
        }

        this.setState({ 
            selectedTab: value,
            selectedGames
        });
    };

    render() {
        const appBarRight = (
            <IconButton><AccountCircleIcon /></IconButton>
        );

        return (
            <ViewContainer>
                <LayoutAppBar
                    title="React Brain Games"
                    iconElementRight={appBarRight}
                />
                <AppBar position="static" color="default">
                <Tabs
                    value={this.state.selectedTab}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="All Games" />
                    <Tab label="Puzzle" />
                    <Tab label="Arcade" />
                    <Tab label="Favorites" />
                </Tabs>
                </AppBar>
                <ScrollView>
                    <LayoutBody style={styles.content}>
                        <Grid container spacing={24}>
                            {this.state.selectedGames.map(game => (
                                <Grid item xs={12} sm={4} lg={3} key={game.key}>
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