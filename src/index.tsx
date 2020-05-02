import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './components/App';

ReactDOM.render(
    <Provider store={store}>
        <App name="World" />
    </Provider>,
    document.querySelector('#container'),
);

if (module && module.hot) {
    module.hot.accept();

    module.hot.addStatusHandler(status => {
        if (status === 'prepare') console.clear();
    });
}
