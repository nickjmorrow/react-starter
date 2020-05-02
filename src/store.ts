import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { rootSaga } from './rootSaga';
import { rootReducer } from './rootReducer';
import { RootState } from './RootState';
import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState: RootState) => {
    const middleware = [routerMiddleware(createBrowserHistory())];

    const composeEnhancers = composeWithDevTools({});
    const store = createStore(
        rootReducer,
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
        composeEnhancers(applyMiddleware(...middleware)),
    );

    return store;
};

export const store = configureStore((window as any).initialReduxState);
