import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userLogout} from "../redux/actions";

class Collector extends Component {
    render() {
        return (
            <div>
                <h1>Заявки</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(Collector);