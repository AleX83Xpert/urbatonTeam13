import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {apiGetClaims, apiAcceptGarbage, apiGetGarbageTypes, apiGetCitizens} from "../utils/api";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    fab: {
        // margin: theme.spacing.unit,
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
        zIndex: 1
    },
});

class Collector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            claims: [],
            currentClaim: null,
            weight: 0,
            newClaimMode: false,
            citizenLoginSearch: '',
            selectedCitizenId: null,
            citizens: [],
            currentCitizen: null,
            garbageTypeSearch: '',
            garbageTypes: [],
            currentGarbageType: null,
            garbageTypeMode: false,
        };
    }

    componentDidMount() {
        apiGetClaims(1, claims => {
            this.setState({claims});
        });
        apiGetCitizens('', citizens => {
            this.setState({citizens: citizens});
        });
        apiGetGarbageTypes(types => {
            this.setState({garbageTypes: types});
        });
    }

    claimClickHandler = claimId => {
        const filteredClaims = this.state.claims.filter(claim => claim.id === claimId);
        this.setState({
            currentClaim: filteredClaims.length === 1 ? filteredClaims[0] : null
        });
    };

    citizenClickHandler = id => {
        const filteredCitizens = this.state.citizens.filter(citizen => citizen.id === id);
        this.setState({
            currentCitizen: filteredCitizens.length === 1 ? filteredCitizens[0] : null
        });
    };

    garbageClickHandler = id => {
        const filteredGarbageTypes = this.state.garbageTypes.filter(type => type.id === id);
        this.setState({
            currentGarbageType: filteredGarbageTypes.length === 1 ? filteredGarbageTypes[0] : null
        });
    };

    weightChangeHandler = e => {
        this.setState({
            weight: parseInt(e.target.value) < 0 ? 0 : parseInt(e.target.value)
        });
    };

    citizenLoginChangeHandler = e => {
        this.setState({
            citizenLoginSearch: e.target.value
        });
    };

    garbageTypeChangeHandler = e => {
        this.setState({
            garbageTypeSearch: e.target.value
        });
    };

    acceptGarbage = () => {
        const {weight, currentClaim} = this.state;
        const {userId} = this.props;
        if (currentClaim) {
            alert(`accept ${weight}kg of ${currentClaim.garbageType}`);
            apiAcceptGarbage(userId, currentClaim.citizenId, currentClaim.garbageType, weight, () => {
                this.setState({
                    currentClaim: null,
                    weight: 0
                });
            });
        }
    };

    render() {
        const {classes, fullScreen} = this.props;
        const {
            claims, currentClaim, weight,
            newClaimMode, garbageTypeMode,
            citizenLoginSearch, garbageTypeSearch,
            selectedCitizenId, citizens,
            currentCitizen, garbageTypes,
            currentGarbageType
        } = this.state;
        return (
            <div>
                <h1>Заявки</h1>
                <Fab color="primary" aria-label="Add" className={classes.fab} onClick={() => {
                    this.setState({
                        newClaimMode: true
                    });
                }}>
                    <AddIcon/>
                </Fab>
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
                </List>

                {/* ACCEPT GARBAGE */}
                <Dialog
                    fullScreen={fullScreen}
                    open={currentClaim !== null}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"Прием"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Теперь надо взвесить мусор!
                        </DialogContentText>
                        <TextField
                            label="Сколько килограмм?"
                            type="number"
                            onChange={this.weightChangeHandler}
                            autoFocus
                            value={weight}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            this.setState({
                                currentClaim: null
                            });
                        }} color="primary">
                            Отмена
                        </Button>
                        <Button onClick={this.acceptGarbage} color="primary" disabled={weight === 0}>
                            Принять
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* NEW CLAIM (select citizen)*/}
                <Dialog
                    fullScreen={fullScreen}
                    open={newClaimMode}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"Новая заявка"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            йцукенг
                        </DialogContentText>
                        <TextField
                            label="Логин гражданина"
                            onChange={this.citizenLoginChangeHandler}
                            autoFocus
                            value={citizenLoginSearch}
                        />
                        {citizenLoginSearch && citizenLoginSearch !== '' && <List component="nav">
                            {
                                citizens.filter(citizen => citizen.login.toLowerCase().indexOf(citizenLoginSearch.toLowerCase()) >= 0).map(citizen => {
                                    return (
                                        <ListItem key={`claim${citizen.id}`} alignItems="flex-start" button
                                                  onClick={() => {
                                                      this.citizenClickHandler(citizen.id);
                                                  }}>
                                            <ListItemAvatar>
                                                <Avatar alt={citizen.login}
                                                        src="https://material-ui.com/static/images/avatar/1.jpg"/>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={`${citizen.login}`}
                                                secondary=""
                                            />
                                        </ListItem>
                                    );
                                })
                            }
                        </List>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            this.setState({
                                newClaimMode: false,
                                currentCitizen: null,
                                citizenLoginSearch: ''
                            });
                        }} color="primary">
                            Отмена
                        </Button>
                        <Button onClick={() => {
                            this.setState({
                                newClaimMode: false,
                                garbageTypeMode: true
                            });
                        }} color="primary" disabled={currentCitizen === null}>
                            Далее >
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* GARBAGE TYPE (select citizen)*/}
                <Dialog
                    fullScreen={fullScreen}
                    open={garbageTypeMode}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"Тип мусора"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        </DialogContentText>
                        <TextField
                            label="Тип мусора"
                            onChange={this.garbageTypeChangeHandler}
                            autoFocus
                            value={garbageTypeSearch}
                        />
                        {garbageTypeSearch && garbageTypeSearch !== '' && <List component="nav">
                            {
                                garbageTypes.filter(type => type.title.toLowerCase().indexOf(garbageTypeSearch.toLowerCase()) >= 0).map(type => {
                                    return (
                                        <ListItem key={`claim${type.id}`} alignItems="flex-start" button
                                                  onClick={() => {
                                                      this.garbageClickHandler(type.id);
                                                  }}>
                                            <ListItemText
                                                primary={`${type.title}`}
                                                secondary=""
                                            />
                                        </ListItem>
                                    );
                                })
                            }
                        </List>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            this.setState({
                                garbageTypeMode: false,
                                currentGarbageType: null,
                                currentCitizen: null,
                                garbageTypeSearch: '',
                                citizenLoginSearch: ''
                            });
                        }} color="primary">
                            Отмена
                        </Button>
                        <Button onClick={() => {
                            alert('123')
                        }} color="primary" disabled={currentGarbageType === null}>
                            Далее >
                        </Button>
                    </DialogActions>
                </Dialog>
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

export default connect(mapStateToProps)(withStyles(styles)(withMobileDialog()(Collector)));