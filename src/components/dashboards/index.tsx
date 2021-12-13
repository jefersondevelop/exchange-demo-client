import React, { useState } from 'react';
import { BrowserRouter as Router, Switch as JSwitch, Route, Link, Redirect } from "react-router-dom";
import { List, ListItem, ListItemText, ListItemIcon, Switch, BottomNavigation, BottomNavigationAction, Tooltip, Zoom } from '@material-ui/core';
import ExitToAppOutlined from '@material-ui/icons/ExitToAppOutlined';
import AssessmentRounded from '@material-ui/icons/AssessmentRounded';
import { AccountCircle, Brightness4, Brightness7 } from '@material-ui/icons';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { useMain } from '../../context/mainContext';
import PeopleIcon from '@material-ui/icons/People';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import UserList from './admin/users'
import Home from './admin/home';
import clsx from 'clsx';

// JElements
import JLabel from '@jelements/Label';
import Wrapper from '@jelements/wrapper/Wrapper';
import JInputControlLabel from '@jelements/InputControlLabel';
import Profile from './exchanger/profile';
import HomeIcon from '@material-ui/icons/Home';
import { ProfileProvider } from '../../context/profile';
import { countries } from '../../tools/countries';
import { isNulliFyField } from '../../tools/validations';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import ExchangerHome from './exchanger/home';
import { ExchangeProvider } from '../../context/exchange';
import Calculator from './exchanger/calculator';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import SendMoneySteps from './exchanger/sendMoney';
import Account from './exchanger/accounts';
import ExchangeList from './admin/exchanges/';
import { UsersProvider } from '../../context/users';
import { NewExchange } from './admin/exchanges/newExchange';
import Transaction from './exchanger/transaction';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    root2: {
        position: "fixed",
        bottom: "0px",
        left: "0px",
        right: "0px",
        marginBottom: "0px",
        width: "100vw"
    },
    bottomHeaderItem: {
        marginLeft: 30
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    showHeaderItems: {
        display: 'block',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    showBottomHeader: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'flex'
        }
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    itemPadding: {
        padding: 20
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    listitem: {
        marginLeft: '-10%'
    },
    large: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
}));


export default function Dashboard() {
    const classes = useStyles();

    const { logout, themeType, changeTheme, user }: any = useMain();

    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const currentCountryFlag = (currentCountry: string) => {
        if (isNulliFyField(currentCountry)) {
            return null
        }
        let result = countries.filter((country) => { return (country.value === currentCountry) });
        if (result.length > 0) {
            return result[0]
        }
        return null;
    }

    const returnRoutesByRole = (roleName: string = 'EXCHANGER') => {

        if (roleName === 'EXCHANGER') {
            return (
                <>
                    <Link to='/' className={classes.link}>
                        <Tooltip placement='right-end' TransitionComponent={Zoom} title="Inicio" aria-label="Inicio">
                            <ListItem className={classes.itemPadding} button key={'_home'}>
                                <ListItemIcon><HomeWorkIcon /></ListItemIcon>
                                <ListItemText className={classes.listitem} primary={"Inicio"} />
                            </ListItem>
                        </Tooltip>
                    </Link>
                    <Link to='/sendMoney' className={classes.link}>
                        <Tooltip placement='right-end' TransitionComponent={Zoom} title="Realizar transferencia" aria-label="Realizar transferencia">
                            <ListItem className={classes.itemPadding} button key={'_transfer'}>
                                <ListItemIcon><LocalAtmIcon /></ListItemIcon>
                                <ListItemText className={classes.listitem} primary={"Realizar transferencia"} />
                            </ListItem>
                        </Tooltip>
                    </Link>
                    <Link to='/accounts' className={classes.link}>
                        <Tooltip placement='right-end' TransitionComponent={Zoom} title="Cuentas bancarias" aria-label="Cuentas bancarias">
                            <ListItem className={classes.itemPadding} button key={'_account'}>
                                <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
                                <ListItemText className={classes.listitem} primary={"Cuentas bancarias"} />
                            </ListItem>
                        </Tooltip>
                    </Link>
                    <Link to='/calculator' className={classes.link}>
                        <Tooltip placement='right-end' TransitionComponent={Zoom} title="Calculadora" aria-label="Calculadora">
                            <ListItem className={classes.itemPadding} button key={'_calculator'}>
                                <ListItemIcon><KeyboardIcon /></ListItemIcon>
                                <ListItemText className={classes.listitem} primary={"Calculadora"} />
                            </ListItem>
                        </Tooltip>
                    </Link>
                </>
            )
        }

        return (
            <>
                <Link to='/' className={classes.link}>
                    <ListItem className={classes.itemPadding} button key={'_report'}>
                        <ListItemIcon><AssessmentRounded /></ListItemIcon>
                        <ListItemText className={classes.listitem} primary={"Reporte general"} />
                    </ListItem>
                </Link>
                <Link to='/users' className={classes.link}>
                    <ListItem className={classes.itemPadding} button key={'_user'}>
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <ListItemText className={classes.listitem} primary={"Usuarios"} />
                    </ListItem>
                </Link>
                <Link to='/exchanges' className={classes.link}>
                    <ListItem className={classes.itemPadding} button key={'_exchanges'}>
                        <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
                        <ListItemText className={classes.listitem} primary={"Divisas"} />
                    </ListItem>
                </Link>
            </>
        )

    }

    return (
        <Router >
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" >
                    {/*className={clsx(classes.appBar, open && classes.appBarShift)}> */}
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            <a href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                                Dashboard {(user?.role?.name === 'EXCHANGER') && ' - Exchanger'}
                            </a>
                        </Typography>
                        {
                            (currentCountryFlag(user.profile.currentCountry)) &&
                            <JInputControlLabel
                                control={
                                    <img style={{ maxHeight: '32px', maxWidth: '32px', marginLeft: 10, marginRight: 5, cursor: 'pointer' }} src={currentCountryFlag(user.profile.currentCountry)?.src} alt={currentCountryFlag(user.profile.currentCountry)?.label} />
                                }
                                label=""
                            />
                        }
                        <JInputControlLabel
                            control={
                                <Tooltip TransitionComponent={Zoom} title="Alternar tema oscuro/claro" aria-label="Alternar tema oscuro/claro">
                                    <Switch
                                        checked={(themeType === 'dark')}
                                        onChange={changeTheme}
                                        size='medium'
                                        color="default"
                                        value={themeType}
                                        checkedIcon={<Brightness7 color="action" fontSize='small'></Brightness7>}
                                        icon={<Brightness4 fontSize='small'></Brightness4>}
                                    />
                                </Tooltip>
                            }
                            label={themeType}
                        />
                        <Link to="/profile" className={`${classes.link} ${classes.showHeaderItems}`}>
                            <IconButton color="inherit">
                                <Badge>
                                    <AccountCircle />
                                </Badge>
                            </IconButton>
                        </Link>
                        <IconButton className={classes.showHeaderItems} color="inherit" onClick={() => logout()}>
                            <Badge color="primary">
                                <ExitToAppOutlined />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {/* <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <JLabel component="h5" variant="inherit" color="inherit" classes={classes.title}>
                            LOGO
                    </JLabel>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <List>
                        {
                            returnRoutesByRole(user.role.name)
                        }
                    </List>
                </Drawer> */}
                <main className={classes.content}>
                    <Wrapper>
                        <div className={classes.appBarSpacer} />
                        {
                            (user?.role?.name === 'EXCHANGER') ?
                                <JSwitch>
                                    <Route exact path="/login">
                                        <Redirect to="/" />
                                    </Route>
                                    <Route exact path='/'>
                                        <ExchangeProvider>
                                            <Transaction />
                                        </ExchangeProvider>
                                    </Route>
                                    <Route exact path='/sendMoney'>
                                        <ExchangeProvider>
                                            <SendMoneySteps />
                                        </ExchangeProvider>
                                    </Route>
                                    <Route exact path='/accounts'>
                                        <Account />
                                    </Route>
                                    <Route exact path='/calculator'>
                                        <ExchangeProvider>
                                            <Calculator />
                                        </ExchangeProvider>
                                    </Route>
                                    <Route exact path='/profile'>
                                        <ProfileProvider>
                                            <Profile />
                                        </ProfileProvider>
                                    </Route>
                                    <Route exact path='/users'><UserList /></Route>
                                    <Route>
                                        <Redirect to="/" />
                                    </Route>
                                </JSwitch>
                                :
                                <JSwitch>
                                    <Route exact path="/login">
                                        <Redirect to="/" />
                                    </Route>
                                    <Route exact path='/'><Home /></Route>
                                    <Route exact path='/profile'>
                                        <ProfileProvider>
                                            <Profile />
                                        </ProfileProvider>
                                    </Route>
                                    <Route exact path='/users'>
                                        <UsersProvider>
                                            <UserList />
                                        </UsersProvider>
                                    </Route>
                                    <Route exact path='/exchanges'>
                                        <ExchangeProvider>
                                            <ExchangeList />
                                        </ExchangeProvider>
                                    </Route>
                                    <Route exact path='/exchanges/new'>
                                        <ExchangeProvider>
                                            <NewExchange />
                                        </ExchangeProvider>
                                    </Route>
                                    <Route exact path='/exchanges/:exchangeId/edit'>
                                        <ExchangeProvider>
                                            <NewExchange />
                                        </ExchangeProvider>
                                    </Route>
                                    <Route>
                                        <Redirect to="/" />
                                    </Route>
                                </JSwitch>
                        }
                    </Wrapper>
                </main>
            </div>
            <BottomNavigation
                onChange={(event: any, newValue: any) => {
                    console.log(newValue);
                }}
                showLabels
                className={`${classes.showBottomHeader} ${classes.root2}`}
            >
                <BottomNavigationAction
                    className={classes.bottomHeaderItem}
                    label="Inicio"
                    icon={<HomeIcon />}
                    component={Link}
                    to="/"
                />
                <BottomNavigationAction
                    label="Perfil"
                    icon={<AccountCircle />}
                    component={Link}
                    to="/profile"
                />
                <BottomNavigationAction
                    label="Cerrar sesión"
                    icon={<ExitToAppOutlined />}
                    onClick={() => logout()}
                />
            </BottomNavigation>
        </Router>
    );
}