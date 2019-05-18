import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userLogout} from "../redux/actions";

class Citizen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            garbageTypes: []
        };
    }

    componentDidMount() {
        //эмуляция задержки запроса к серверу
        setTimeout(() => {
            this.setState({
                garbageTypes: [
                    {id: 'glass', title: 'Стекло'},
                    {id: 'plastic', title: 'Пластик'},
                    {id: 'metall', title: 'Металл'},
                    {id: 'wood', title: 'Дерево'},
                    {id: 'clothes', title: 'Одежда/тряпки'}
                ]
            });
        }, 1000);
    }

    render() {
        const {garbageTypes} = this.state;

        const types = [];
        for (const type of garbageTypes) {
            types.push(<div>{type.title}</div>);
        }

        return (
            <div>
                <h1>Строка поиска</h1>
                {types}
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

export default connect(mapStateToProps, mapDispatchToProps)(Citizen);