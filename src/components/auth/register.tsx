import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Fade, FormControl, Grow, InputLabel, MenuItem, Select } from '@material-ui/core';
import Copyright from '../utils/copyrights'
import { useMain } from '../../context/mainContext'
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';

// JElements

import JButton from '@jelements/Button';
import JLabel from '@jelements/Label';
import JInput from '@jelements/Input';
import JAvatar from '@jelements/Avatar';
import JInputControlLabel from '@jelements/InputControlLabel';
import { countries } from '../../tools/countries';


const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(8, 25),
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(8, 5),
            fontSize: 12
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#009fe3",
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#009fe3",
        '&:hover': {
            backgroundColor: "#0078e3"
        }
    },
    title: {
        textAlign: 'center',
        paddingTop: 0,
        marginBottom: 50
    },
    titleCustom: {
        textAlign: 'center',
        paddingTop: 0,
        paddingBottom: "0 !important"
    },
    link: {
        textDecoration: 'none',
        color: '#009fe3'
    },
    justify: {
        textAlign: 'center'
    },
    formControl: {
        marginTop: "25px",
        width: "100%"
    },
    select: {
        marginTop: "15px",
        width: "100%"
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
    label: {
        marginLeft: 10
    }
}));

const Register = () => {

    const { user, register, handleRegisterInputChange }: any = useMain();

    const classes = useStyles();

    return (
        <Fade in={true}>
            <div className={classes.paper}>
                <JLabel
                    component="h1"
                    variant="h3"
                    classes={classes.title}
                >
                    Registrate gratis
                </JLabel>
                <JAvatar
                    alt='login-icon'
                    classes={classes.avatar}
                    variant='circular'
                >
                    <PermIdentityIcon />
                </JAvatar>
                <JLabel
                    component="h1"
                    variant="h5"
                    classes={classes.title}
                >
                    Ingresa tus datos
                </JLabel>
                <div className={classes.form}>
                    <JInput
                        id="username"
                        name="profile.username"
                        label="Nombre"
                        variant="outlined"
                        margin="normal"
                        required={true}
                        autoFocus={true}
                        value={user.profile?.username ? user.profile.username : ''}
                        placeholder="Nombre"
                        onChange={handleRegisterInputChange}
                        error={user?.errorMessage?.profile?.username ? true : false}
                        errorText={user?.errorMessage?.profile?.username ? user.errorMessage.profile.username : ''}
                        props={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControl variant="outlined" className={classes.select}>
                        <InputLabel id="demo-simple-select-filled-label">País</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            label="Age"
                            name="profile.currentCountry"
                            onChange={handleRegisterInputChange}
                            value={user?.profile?.currentCountry ? user.profile.currentCountry : ''}
                        >
                            {
                                countries.map(country => (

                                    <MenuItem key={country.label} value={country.value}>
                                        <JInputControlLabel
                                            classes={classes.label}
                                            control={
                                                <img style={{ maxHeight: '32px', maxWidth: '32px' }} src={country.src} alt={country.label} />
                                            }
                                            label={country.label}
                                        />
                                    </MenuItem>


                                ))
                            }
                        </Select>
                    </FormControl>
                    <JInput
                        id="email"
                        name="email"
                        label="Correo"
                        variant="outlined"
                        margin="normal"
                        required={true}
                        autoFocus={false}
                        value={user.email}
                        placeholder="example@yopmail.com"
                        classes={classes.formControl}
                        onChange={handleRegisterInputChange}
                        error={user?.errorMessage?.email ? true : false}
                        errorText={user?.errorMessage?.email ? user.errorMessage.email : ''}
                        props={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <JInput
                        id="password"
                        name="password"
                        label="Contraseña"
                        variant="outlined"
                        type='password'
                        margin="normal"
                        required={true}
                        autoFocus={false}
                        value={user.password}
                        classes={classes.formControl}
                        onChange={handleRegisterInputChange}
                        error={user?.errorMessage?.password ? true : false}
                        errorText={user?.errorMessage?.password ? user.errorMessage.password : ''}
                        placeholder="***********"
                        props={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <JInput
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirmar Contraseña"
                        variant="outlined"
                        margin="normal"
                        type='password'
                        required={true}
                        autoFocus={false}
                        value={user.confirmPassword}
                        onChange={handleRegisterInputChange}
                        error={user?.errorMessage?.confirmPassword ? true : false}
                        errorText={user?.errorMessage?.confirmPassword ? user.errorMessage.confirmPassword : ''}
                        classes={classes.formControl}
                        placeholder="***********"
                        props={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Grow in={true} timeout={500}>
                        <JButton
                            title='Registrar'
                            onClick={() => register(user)}
                            classes={classes.submit}
                        >

                        </JButton>
                    </Grow>
                    <Grid container className={classes.justify}>
                        <Grid item xs>
                            <Link to="/login" className={classes.link}>
                                ¿Ya tienes cuenta? Ingresa
                        </Link>
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </div>
            </div>
        </Fade>
    );
}

export default Register;