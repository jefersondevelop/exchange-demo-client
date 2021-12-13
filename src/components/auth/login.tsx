import React, { useRef } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import VpnKeyIconOutlined from '@material-ui/icons/VpnKeyOutlined';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { makeStyles } from '@material-ui/core/styles';
import { Fade, Grow, useMediaQuery } from '@material-ui/core';
import Copyright from '../utils/copyrights'
import { useMain } from '../../context/mainContext'
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom'

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
}));

const Login = () => {

  const { handleInputChange, login, user }: any = useMain();

  const loginReference = useRef<HTMLButtonElement>(null);

  useMediaQuery('(min-width:600px) { .paper { margin: 40px 100px !important } }');

  const classes = useStyles();

  return (
    <Fade in={true}>

      <div className={classes.paper}>
        <JLabel
          component="h1"
          variant="h3"
          classes={classes.title}
        >
          Exchange Demo Login
      </JLabel>
        <JAvatar
          alt='login-icon'
          classes={classes.avatar}
          variant='circular'
        >
          <VpnKeyIconOutlined />
        </JAvatar>
        <JLabel
          component="h1"
          variant="h5"
          classes={classes.title}
        >
          Acceder
                    </JLabel>
        <div className={classes.form}>
          <JInput
            id="email"
            name="email"
            label="Correo electrónico"
            variant="outlined"
            margin="normal"
            required={true}
            autoFocus={true}
            error={user?.errorMessage?.email ? true : false}
            errorText={user?.errorMessage?.email ? user.errorMessage.email : ''}
            value={user.email}
            onChange={handleInputChange}
            placeholder="example@yopmail.com"
            onKeyUp={(event: any) => {
              if (event.keyCode === 13) {
                if (loginReference !== undefined && loginReference.current !== undefined) {
                  loginReference.current?.click()
                }
              }
            }}
            props={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <JInput
            id="password"
            variant="outlined"
            margin="normal"
            required={true}
            name="password"
            label="Contraseña"
            placeholder="*************"
            type="password"
            onChange={handleInputChange}
            value={user.password}
            onKeyUp={(event: any) => {
              if (event.keyCode === 13) {
                if (loginReference !== undefined && loginReference.current !== undefined) {
                  loginReference.current?.click()
                }
              }
            }}
            error={user?.errorMessage?.password ? true : false}
            errorText={user?.errorMessage?.password ? user.errorMessage.password : ''}
            props={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyIcon />
                </InputAdornment>
              ),
            }}

          />
          <div >
            <Grow in={true} timeout={500}>
              <JButton
                title='Acceder'
                onClick={() => login(user)}
                classes={classes.submit}
                reference={loginReference}
              >

              </JButton>
            </Grow>
          </div>
          <Grid container>
            <Grid item xs>
              <Link to="/recover" className={classes.link}>
                ¿Olvidó su contraseña?
            </Link>
            </Grid>
            <Grid item>
              <Link to="/register" className={classes.link} >
                ¿No tiene cuenta? Registrate
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

export default Login;