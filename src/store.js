import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers/index';

export default function configureStore(initialState = {}) {
    const logger = createLogger({
        collapsed: true,
        diff: true
    });

    const enhancers = [
        applyMiddleware(logger)
    ];

    const store = createStore(rootReducer, initialState, compose(...enhancers));

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
};
