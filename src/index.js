import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';

import './index.css';
import App from './App';
import { newGame } from './actions/sudoku';

const store = configureStore();
store.dispatch(newGame('EASY'));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
