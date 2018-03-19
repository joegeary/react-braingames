import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import GameList from './components/game/GameList';
import GameRules from './components/game/GameRules';

import Sudoku from './components/sudoku/Sudoku';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={GameList} />
                    <Route exact path="/:game/rules" component={GameRules} />
                    <Route exact path="/sudoku" component={Sudoku} />
                </Switch>
            </BrowserRouter>
        );
    }
};

export default App;
