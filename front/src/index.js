import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore, {history} from './redux/store';

const userId = localStorage.getItem('userId');
const userRole = localStorage.getItem('userRole');
const store = configureStore({
    main: {
        isLoggedIn: !!userId && !!userRole,
        userId: userId,
        userRole: userRole
    }
});

ReactDOM.render(
    <Provider store={store}>
        <App history={history}/>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
