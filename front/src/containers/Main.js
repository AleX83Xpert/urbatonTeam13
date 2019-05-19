import React, {Component} from 'react';
import {Link} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import DoneAll from '@material-ui/icons/DoneAll';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {userLogout} from "../redux/actions";
import Citizen from "../components/Citizen";
import Collector from "../components/Collector";
import Stats from "../components/Stats";
import About from "../components/About";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
            menuSelected: "app"
        };
    }

    handleMenuItemClick = (item) => {
        this.setState(oldState => ({
            mobileOpen: oldState.mobileOpen,
            menuSelected: item
        }))
    };

    handleDrawerToggle = () => {
        this.setState(state => ({mobileOpen: !state.mobileOpen}));
    };

    drawChild = (selectedMenuItem, userRole) => {
        switch (selectedMenuItem) {
            case "app":
                return userRole === 'citizen' ? (<Citizen/>) : (<Collector/>);
            case "stats":
                return (<Stats/>);
            case "about":
                return (<About/>);
        }
    };

    getIcon = (iconId) => {
        if (iconId === 0)
            return (
                <InboxIcon/>
            );
        if (iconId === 1)
            return (
                <DoneAll/>
            );
        if (iconId === 2)
            return (
                <MailIcon/>
            );
        return null
    };

    render() {
        const {classes, theme, isLoggedIn, userLogout, userRole} = this.props;

        if (!isLoggedIn) {
            return <Redirect to="/login"/>;
        }

        const drawer = (
            <div>
                <div className={classes.toolbar}>
                    <Link to="/">Лого</Link>
                </div>
                <Divider/>
                <List>
                    <Link to="/app">
                        <ListItem button key="app" onClick={() => this.handleMenuItemClick("app")}>
                            <ListItemIcon>{this.getIcon(0)}</ListItemIcon>
                            <ListItemText primary="Главная"/>
                        </ListItem>
                    </Link>
                    <Link to="/app/stats">
                        <ListItem button key="stats" onClick={() => this.handleMenuItemClick("stats")}>
                            <ListItemIcon>{this.getIcon(1)}</ListItemIcon>
                            <ListItemText primary="Доcтижения"/>
                        </ListItem>
                    </Link>
                    <Link to="/app/about">
                        <ListItem button key="about" onClick={() => this.handleMenuItemClick("about")}>
                            <ListItemIcon>{this.getIcon(2)}</ListItemIcon>
                            <ListItemText primary="O..."/>
                        </ListItem>
                    </Link>
                </List>
                <Divider/>
                <List>
                    <ListItem button key="logout" onClick={() => {
                        userLogout();
                        localStorage.removeItem('userId');
                        localStorage.removeItem('userRole');
                    }}>
                        <ListItemIcon>{2 % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                        <ListItemText primary="Выйти"/>
                    </ListItem>
                </List>
            </div>
        );

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Garbage Collector
                        </Typography>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer}>
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    {this.drawChild(this.state.menuSelected, userRole)}
                </main>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(App));