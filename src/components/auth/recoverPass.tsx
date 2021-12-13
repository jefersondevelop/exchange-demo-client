import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Fade, Grow } from '@material-ui/core';
import Copyright from '../utils/copyrights'
import { useMain } from '../../context/mainContext'
import InputAdornment from '@material-ui/core/InputAdornment';
import { Link } from 'react-router-dom'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import EmailIcon from '@material-ui/icons/Email';

// JElements

import JButton from '@jelements/Button';
import JLabel from '@jelements/Label';
import JInput from '@jelements/Input';
import JAvatar from '@jelements/Avatar';


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

const RecoverPass = () => {

    const { user, handleRegisterInputChange, recoverPass }: any = useMain();

    const classes = useStyles();

    return (
        <Fade in={true}>
            <div className={classes.paper}>
                <JLabel
                    component="h1"
                    variant="h3"
                    classes={classes.title}
                >
                    ¿Haz olvidado tu contraseña?
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
                    Ingresa un email para recueperarla
                </JLabel>
                <div className={classes.form}>
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
                    <Grow in={true} timeout={500}>
                        <JButton
                            title='Enviar'
                            onClick={() => recoverPass(user.email)}
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

export default RecoverPass;