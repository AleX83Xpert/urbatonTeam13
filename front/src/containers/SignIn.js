import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {AxiosInstance as axios} from "axios";
import {userLogin, userLogout, setUserId, setUserRole} from "../redux/actions";

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class SignIn extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoggingIn: false,
            login: '',
            password: ''
        };
    }

    doLogin = event => {
        event.preventDefault();
        const {userLogin, setUserId, setUserRole} = this.props;
        const {login, password} = this.state;
        // setTimeout(() => {
        userLogin();
        setUserId(1);
        setUserRole('citizen');
        // }, 2000);
        //alert(`LOGIN: ${login} / ${password}`);
    };

    loginHandler = e => {
        this.setState({
            login: e.target.value
        });
    };

    passwordHandler = e => {
        this.setState({
            password: e.target.value
        });
    };

    render() {
        const {classes, isLoggedIn} = this.props;
        const {login, password} = this.state;

        if (isLoggedIn) {
            return <Redirect to="/"/>;
        }

        return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Вход
                    </Typography>
                    <form className={classes.form} onSubmit={this.doLogin}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="login">Логин</InputLabel>
                            <Input id="login" name="login" autoComplete="login" autoFocus value={login}
                                   onChange={this.loginHandler}/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Пароль</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password"
                                   value={password} onChange={this.passwordHandler}/>
                        </FormControl>
                        {/*<FormControlLabel*/}
                        {/*control={<Checkbox value="remember" color="primary"/>}*/}
                        {/*label="Remember me"*/}
                        {/*/>*/}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Войти
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    const {main} = state;
    return {
        isLoggedIn: main.isLoggedIn
    }
};

const mapDispatchToProps = {userLogin, userLogout, setUserId, setUserRole};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));
