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
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {apiGetClaims, apiAcceptGarbage, apiGetGarbageTypes} from "../utils/api";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
});

class Collector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            claims: [],
            currentClaim: null,
            weight: 0,
        };
    }

    componentDidMount() {
        apiGetClaims(1, claims => {
            this.setState({claims});
        });
    }

    claimClickHandler = claimId => {
        const filteredClaims = this.state.claims.filter(claim => claim.id === claimId);
        this.setState({
            currentClaim: filteredClaims.length === 1 ? filteredClaims[0] : null
        });
    };

    weightChangeHandler = e => {
        this.setState({
            weight: parseInt(e.target.value) < 0 ? 0 : parseInt(e.target.value)
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
        const {claims, currentClaim, weight} = this.state;
        return (
            <div>
                <h1>Заявки</h1>
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