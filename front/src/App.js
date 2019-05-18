import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import './App.css';
import SignIn from "./pages/SignIn";
import MainMenu from './components/MainMenu'

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                    <h1 className="App-title">GarbageCollector</h1>
                    <MainMenu/>
                </header>
                <div>
                    {/*<Route exact path="/" component={Home}/>*/}
                    <Route exact path="/login" component={SignIn}/>
                    {/*<Route exact path="/about" component={About}/>*/}
                    {/*<Route exact path="/code" component={Code}/>*/}
                    {/*<Route exact path="/contact" component={Contact}/>*/}
                    {/*<Route exact path="/presence" component={info}/>*/}
                </div>
            </div>
        </Router>
    );
}

export default App;
