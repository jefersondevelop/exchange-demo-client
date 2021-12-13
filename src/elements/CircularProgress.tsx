import React from 'react';
import { makeStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);

const ColoredLinearProgress = () => {

    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

const styles = {
    colorPrimary: {
        backgroundColor: ''
    },
    barColorPrimary: {
        backgroundColor: '#009fe3'
    }
};

export default withStyles(styles)(ColoredLinearProgress);
