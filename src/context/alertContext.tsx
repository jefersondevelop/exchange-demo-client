import { IconButton } from '@material-ui/core';
import React, { useMemo, useContext, Fragment } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useSnackbar } from 'notistack';

const AlertContext = React.createContext(null);

// Action for snackbar closing.

const ActionCustom = (key: any) => {


    const { closeSnackbar } = useSnackbar();
    return (

        <Fragment>
            <IconButton aria-label="upload picture" component="span" onClick={() => closeSnackbar(key)} >
                <CloseIcon color="action" />
            </IconButton>
        </Fragment >


    )
}

// Provider for main components inside tree.

export const AlertProvider = (props?: any) => {

    // Get control for snackbar messages.

    const { enqueueSnackbar } = useSnackbar();


    const value = useMemo(() => {

        return ({
            alertElement: {
                enqueueSnackbar,
                action: ActionCustom
            }
        })

    }, [enqueueSnackbar])

    return (
        <AlertContext.Provider value={value} {...props} />
    )

}

// Hook for main component inside tree.

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('Context must to be accesible from parent.')
    }
    return context;
}