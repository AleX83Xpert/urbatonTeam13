import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userLogout} from "../redux/actions";

class Stats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loyalty: 0.0
        };
    }

    componentDidMount() {
        //эмуляция задержки запроса к серверу
        setTimeout(() => {
            this.setState({
                loyalty: 100.0
            });
        }, 1000);
    }

    render() {
        const {loyalty} = this.state;

        return (
            <div>
                <h1>Эко-бонусы</h1>
                {loyalty}
            </div>
        );
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    const {main} = state;
    return {
        isLoggedIn: main.isLoggedIn,
        userId: main.userId,
        userRole: main.userRole,
    }
};

const mapDispatchToProps = {userLogout};

export default connect(mapStateToProps, mapDispatchToProps)(Stats);