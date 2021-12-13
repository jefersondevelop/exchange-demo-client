import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import RecoverPass from './recoverPass';
import Register from './register';
import Login from './login'

import { BrowserRouter as Router, Switch as JSwitch, Route, Redirect } from "react-router-dom";
import ValidateChangePass from './validatePass';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(/assets/img/exchange-login2.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
}));


const Auth = () => {

  const classes = useStyles();

  return (
    <Router>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={6} md={4} className={classes.image} />
        <Grid item xs={12} sm={6} md={8} component={Paper} elevation={6} square>
          <JSwitch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route exact path='/login'><Login /></Route>
            <Route exact path='/register'><Register /></Route>
            <Route exact path='/recover'><RecoverPass /></Route>
            <Route exact path='/recoverpass'><ValidateChangePass /></Route>
            <Route>
              <Redirect to="/login" />
            </Route>
          </JSwitch>
        </Grid>
      </Grid>
    </Router>
  );
}

export default Auth;