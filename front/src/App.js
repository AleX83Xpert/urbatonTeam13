import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from 'react-redux';
import './App.css';
import SignIn from "./containers/SignIn";
import Main from './containers/Main';
import {ConnectedRouter} from 'connected-react-router'

function App(props) {
    const {history, isLoggedIn} = props;
    return (
        <ConnectedRouter history={history}>
            <div className="App">
                <div>
                    <Switch>
                        <Route exact path="/" render={() => {
                            if (isLoggedIn) {
                                return <Redirect to="/app"/>;
                            } else {
                                return <Redirect to="/login"/>;
                            }
                        }}/>
                        <Route path="/app" component={Main}/>
                        <Route path="/login" component={SignIn}/>
                    </Switch>
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
