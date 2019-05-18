import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userLogout} from "../redux/actions";
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});


class Citizen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            garbageTypes: [],
            search:[]

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

    /*function findArrayElementByTitle(array, title) {
        return array.find((element) => {
          return element.title === title;
        })
      }*/
   searchType = e => {
          const value = e.target.value.toLowerCase();

           const filter = this.state.garbageTypes.filter(type => {
          return type.title.toLowerCase().includes(value);
    });
    this.setState({
        search: filter,
        value:value
    });


};






    render() {
        const {classes} = this.props;
        const {garbageTypes,search,value} = this.state;

        const types = [];
        for (const type of garbageTypes) {
            types.push(<div>{type.title}</div>);
        }
        const tt = search.length === 0 ? null : (<div>
            <ul>{search.map((item) =>
             <li>{item.title}</li>)}</ul> </div>);
        console.log(tt);
        return (

            <div>
                <h1>Строка поиска</h1>
                <TextField
                  id="standard-search"
                  label={"Выберите тип"}
                  type="search"
                  className={classes.textField}
                  margin="normal"
                  onChange={this.searchType}
                  value={value}
                />

                {tt}
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Citizen));
