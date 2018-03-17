import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import GameList from './components/GameList';

import Sudoku from './components/sudoku/Sudoku';
import Rules from './components/Rules';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={GameList} />
                    <Route exact path="/:game/rules" component={Rules} />
                    <Route exact path="/sudoku" component={Sudoku} />
                </Switch>
            </BrowserRouter>
        );
    }
};

export default App;
