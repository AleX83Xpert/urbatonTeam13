import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userLogout} from "../redux/actions";
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {apiGetGarbageTypes}from '../utils/api';
import {apiGetCollectors} from '../utils/api';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 800,
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
            search:[],
            click:null,
            collectors: [],

        };
    }

    componentDidMount() {
        //эмуляция задержки запроса к серверу
        apiGetGarbageTypes(types=>{
          apiGetCollectors(types,data =>{
            this.setState({
              collectors:data,
            });

          });
          this.setState({
              garbageTypes:types
          });
        });

        /*setTimeout(() => {
            this.setState({
                garbageTypes: [
                    {id: 'glass', title: 'Стекло'},
                    {id: 'plastic', title: 'Пластик'},
                    {id: 'metall', title: 'Металл'},
                    {id: 'wood', title: 'Дерево'},
                    {id: 'clothes', title: 'Одежда/тряпки'}
                ]
            });
        }, 1000);*/


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

itemClickHandler = item => {
  const {click} = this.props;

  this.setState({
    click: (click !== null ? 1 : null),
    item: item,
  });
};




    render() {
        const {classes, fullScreen} = this.props;
        const {garbageTypes,search,value,currentItem,click, item1, collectors} = this.state;
        const types = [];
        for (const type of garbageTypes) {
            types.push(<div>{type.title}</div>);
        }
        const tt = search.length === 0 ? null : (

          <div>
            <List component="nav">

                {search.map((item) => (
                  <ListItem key = {'item${item.id}'} /**/>
                    <ListItemText


                        primary = {item.title} button onClick={() => {

                            this.itemClickHandler(item.title);


                        }}/>
                  </ListItem>
                  ))}
          </List>
          <Dialog
              fullScreen={fullScreen}
              open={click !== null}
              aria-labelledby="responsive-dialog-title"
          >
              <DialogTitle id="responsive-dialog-title">{this.state.item}</DialogTitle>
              <DialogContent>
                  <DialogContentText>

                  <List component="nav">

                      {collectors.map((collector) => (
                        <ListItem key = {`item${collector.id}`} /**/>
                          <ListItemText


                              primary = {`${collector.id}, ${collector.name}, ${collector.address}`} button onClick={() => {




                              }}/>
                        </ListItem>
                        ))}
                </List>


                  </DialogContentText>
                  
              </DialogContent>
              <DialogActions>
                  <Button onClick={() => {
                      this.setState({
                          click: null
                      });
                  }} color="primary">
                      Отмена
                  </Button>

              </DialogActions>
          </Dialog>

          </div>);
/*
             <List component="nav">
                 {claims.map(claim => (
                     <ListItem key={`claim${claim.id}`} alignItems="flex-start" button onClick={() => {
                         this.claimClickHandler(claim.id)
                     }}>
                         <ListItemAvatar>
                             <Avatar alt={claim.citizenLogin}
                                     src="https://material-ui.com/static/images/avatar/1.jpg"/>
                         </ListItemAvatar>
                         <ListItemText
                             primary={`${claim.citizenLogin}, ${claim.garbageType}`}
                             secondary={
                                 <React.Fragment>
                                     <Typography component="span" className={classes.inline} color="textPrimary">
                                         {claim.createdDttm.toLocaleString()}
                                     </Typography>
                                     {claim.address}
                                 </React.Fragment>
                             }
                         />
                     </ListItem>
                 ))}
             </List>*/



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
