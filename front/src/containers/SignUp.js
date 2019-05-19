import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {userLogin, setUserId, setUserRole} from "../redux/actions";
import {apiSignUp} from "../utils/api";

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

class SignUn extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            isRegistered: false,
            login: '',
            password: ''
        };
    }

    doRegister = event => {
        event.preventDefault();
        const {userLogin, setUserId, setUserRole} = this.props;
        const {login, password} = this.state;
        apiSignUp(login, password, (id, role) => {
            setUserId(id);
            setUserRole(role);
            userLogin();
            localStorage.setItem('userId', id);
            localStorage.setItem('userRole', role);
        });
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
        const {classes} = this.props;
        const {isRegistered, login, password} = this.state;

        if (isRegistered) {
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
                        Регистрация
                    </Typography>
                    <form className={classes.form} onSubmit={this.doRegister}>
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
                            Зарегистрироваться
                        </Button>
                        <Link to="/login" style={{marginTop: '24px'}}>Залогиниться</Link>
                    </form>
                </Paper>
            </main>
        );
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    const {main} = state;
    return {
        isLoggedIn: main.isRegistered
    }
};

const mapDispatchToProps = {userLogin, setUserId, setUserRole};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUn));
// export default SignUn;