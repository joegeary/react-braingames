import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { parse, stringify } from 'qs';
import { Grid, IconButton, Tab, Tabs, AppBar } from 'material-ui-next';
import AccountCircleIcon from 'material-ui-icons-next/AccountCircle';

import ViewContainer from '../layout/ViewContainer';
import LayoutAppBar from '../layout/LayoutAppBar';
import ScrollView from '../layout/ScrollView';
import LayoutBody from '../layout/LayoutBody';
import GameCard from './GameCard';
import allGames from '../../games';

const styles = {
    content: {
        paddingBottom: 60
    }
};

class GameList extends Component {

    handleTabChange = (evt, value) => {
        var qs = this.getQueryParams();
        qs.category = value;

        this.props.history.push('/?' + stringify(qs));
    };

    getQueryParams() {
        const { location } = this.props;
        return location.search ? parse(location.search.substring(1)) : {};
    }

    getCategories() {
        const categories = allGames.map(g => g.category);
        return Array.from(new Set(categories));
    }

    getSelectedCategory(queryParams, categories) {
        if (queryParams.category && (queryParams.category.toLowerCase() === 'favorites' || categories.indexOf(queryParams.category.toLowerCase()) > -1)) {
            return queryParams.category.toLowerCase();
        }

        return 'all'
    }

    getFilteredGames(selectedCategory) {
        return allGames.filter(game => game.category === selectedCategory || selectedCategory === 'all' || (selectedCategory === 'favorites' && game.favorite));
    }

    render() {
        const queryParams = this.getQueryParams();
        const categories = this.getCategories();
        const selectedCategory = this.getSelectedCategory(queryParams, categories);
        const filteredGames = this.getFilteredGames(selectedCategory);        

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
                    value={selectedCategory}
                    onChange={this.handleTabChange}
                    centered
                >
                    <Tab label="All Games" value="all" />
                    {categories.map(category => (
                        <Tab label={category} value={category} />
                    ))}
                    <Tab label="Favorites" value="favorites" />
                </Tabs>
                </AppBar>
                <ScrollView>
                    <LayoutBody style={styles.content}>
                        <Grid container spacing={24}>
                            {filteredGames.map(game => (
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

export default withRouter(GameList);