import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userLogout} from "../redux/actions";
import {apiGetUserPoints} from '../utils/api';

class Stats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loyalty: 0.0
        };
    }

    componentDidMount() {
        apiGetUserPoints(this.props.userId, data =>{
            console.log(data)
            this.setState({
                loyalty:data.Loyalty,
            });

          });
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