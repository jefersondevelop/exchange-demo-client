import { makeStyles, Snackbar, Theme } from "@material-ui/core";
import { useState } from "react";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

interface JAlertProps {
    message: string,
    type: "success" | "info" | "warning" | "error" | undefined
}

const AlertToastr: React.FC<JAlertProps> = ({ message = '', type = undefined }): JSX.Element => {
    const classes = useStyles();
    const [open, setOpen] = useState(true)

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className={classes.root}>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type}>
                    {message}
                </Alert>
            </Snackbar>

        </div>

    )
}

export default AlertToastr;