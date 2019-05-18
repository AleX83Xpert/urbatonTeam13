import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux';
import './App.css';
import SignIn from "./containers/SignIn";
import Main from './containers/Main';
import {ConnectedRouter} from 'connected-react-router'
import About from "./components/About";

function App(props) {
    const {history, isLoggedIn} = props;
    return (
        <ConnectedRouter history={history}>
            <div className="App">
                <div>
                    <Route exact path="/" render={() => {
                        if (isLoggedIn) {
                            return <Redirect to="/app"/>;
                        } else {
                            return <Redirect to="/login"/>;
                        }
                    }}/>
                    <Route exact path="/app" component={Main}/>
                    <Route exact path="/app/about" component={About}/>
                    <Route exact path="/login" component={SignIn}/>
                </div>
            </div>
        </ConnectedRouter>
    );
}

const mapStateToProps = (state /*, ownProps*/) => {
    const {main} = state;
    return {
        isLoggedIn: main.isLoggedIn
    }
};

export default connect(mapStateToProps)(App);
