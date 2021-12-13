import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import JButton from './Button';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(0, 0, 5, 0),
        },
        buttonLetter: {
            color: 'inherit'
        },
        image: {
            width: '50%',
            height: '50%'
        }
    }),
);

interface JImageModalProps {
    image?: string,
    title?: string
}

const JModalImage: React.FC<JImageModalProps> = ({ image, title = 'Ver' }): JSX.Element => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <JButton
                variant="contained"
                component="label"
                title={'Ver ' + title}
                classes={classes.buttonLetter}
                startIcon={<VisibilityIcon />}
                onClick={handleOpen}
            ></JButton>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper} >
                        <h2 id="transition-modal-title">{title}</h2>
                        <img className={classes.image} src={image} alt="Imagen" />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default JModalImage