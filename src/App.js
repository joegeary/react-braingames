import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import GameList from './components/GameList';

import Sudoku from './components/sudoku/Sudoku';
import SudokuRules from './components/sudoku/Rules';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={GameList} />
                    <Route exact path="/sudoku" component={Sudoku} />
                    <Route exact path="/sudoku/rules" component={SudokuRules} />
                </Switch>
            </BrowserRouter>
        );
    }
};

export default App;
