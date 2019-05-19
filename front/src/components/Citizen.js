import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userLogout} from "../redux/actions";
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {apiAcceptGarbage, apiGetGarbageTypes} from '../utils/api';
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
        width: '90%',
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
            selectedGarbageType: null,
            searchGarbageType: '',

            collectors: [],
            selectedCollector: null,
            searchCollector: '',
        };
    }

    componentDidMount() {
        apiGetGarbageTypes(types => {
            this.setState({garbageTypes: types});
        });
        // apiGetCollectors(types, data => {
        //     this.setState({
        //         collectors: data,
        //     });
        // });
    }

    garbageTypeChangeHandler = e => {
        this.setState({searchGarbageType: e.target.value});
    };

    collectorChangeHandler = e => {
        this.setState({searchCollector: e.target.value});
    };

    render() {
        const {classes, userId} = this.props;
        const {garbageTypes, selectedGarbageType, searchGarbageType, collectors, selectedCollector, searchCollector} = this.state;
        return (
            <div>
                {selectedGarbageType == null && <div>
                    <TextField
                        className={classes.textField}
                        label="Введите тип мусора (стекло, пластик, мебель,...)"
                        value={searchGarbageType}
                        onChange={this.garbageTypeChangeHandler}
                        disabled={this.state.selectedGarbageType !== null}
                    />
                    {searchGarbageType && searchGarbageType !== '' && <List component="nav">
                        {
                            garbageTypes.filter(type => type.name.toLowerCase().indexOf(searchGarbageType.toLowerCase()) >= 0).map(type => {
                                return (
                                    <ListItem key={`claim${type.code}`} alignItems="flex-start" button
                                              onClick={() => {
                                                  this.setState({
                                                      selectedGarbageType: type,
                                                      searchGarbageType: type.name
                                                  }, () => {
                                                      apiGetCollectors(this.state.selectedGarbageType.code, collectors => {
                                                          this.setState({collectors});
                                                      });
                                                  });
                                              }}>
                                        <ListItemText
                                            primary={`${type.name}`}
                                            secondary=""
                                        />
                                    </ListItem>
                                );
                            })
                        }
                    </List>}
                </div>}
                {selectedGarbageType !== null && collectors.length > 0 && <TextField
                    className={classes.textField}
                    label="Выберите сборщика"
                    value={searchGarbageType}
                    onChange={this.garbageTypeChangeHandler}
                />}
                {selectedGarbageType !== null && selectedCollector === null && collectors.length > 0 && selectedCollector === null &&
                <div>
                    <h5>Выберите сборщика</h5>
                    <List component="nav">
                        {
                            collectors.map(collector => {
                                return (
                                    <ListItem key={`claim${collector.id}`} alignItems="flex-start" button
                                              onClick={() => {
                                                  this.setState({
                                                      selectedCollector: collector,
                                                  });
                                              }}>
                                        <ListItemText
                                            primary={`${collector.params.name} ${parseInt(collector.params.on_export) === 1 ? 'Доступен вывоз' : ''}`}
                                            secondary={collector.address}
                                        />
                                    </ListItem>
                                );
                            })
                        }
                    </List>
                </div>}
                {selectedCollector !== null && <div>Сборщик: {selectedCollector.params.name}</div>}
                {selectedCollector !== null &&
                <Button variant="contained"
                        color="primary"
                        onClick={e => {
                            const isCall = parseInt(selectedCollector.params.on_export) === 1;//Вызов к себе
                            // alert(isCall ? 'вызов' : 'Сдать');
                            apiAcceptGarbage(selectedCollector.id, userId, selectedGarbageType.code, 0, data => {
                                console.log('claim created', data);
                                if (isCall) {
                                    alert('Окей, к вам приедет мусорщик, ждите!');
                                } else {
                                    alert('Подойдите по адресу ' + selectedCollector.address + '! Не забудьте взять мусор :)');
                                }
                                window.location.reload();
                            }, isCall);
                        }}>{parseInt(selectedCollector.params.on_export) === 1 ? 'Вызвать' : 'Сдать мусор'}</Button>}
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
