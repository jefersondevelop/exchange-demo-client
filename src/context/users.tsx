import React, { useMemo, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as usersActions from '../actions/users'
import { useAlert } from './alertContext';

const UserContext = React.createContext(null);

// Provider for main components inside tree.

export const UsersProvider = (props?: any) => {

    // Get data from redux state

    const { isFetching, users } = useSelector((state: any) => state.users);

    // Get control for snackbar messages.

    const { alertElement } = useAlert();

    // Get control for dispatch actions for state redux update.

    const dispatch = useDispatch();

    const value = useMemo(() => {

        const getAllUsers = () => {
            dispatch(usersActions.fetchGetAllUsers(alertElement));
        }

        return ({
            users,
            getAllUsers,
            isFetching
        })

    }, [
        users,
        isFetching,
        alertElement,
        dispatch
    ])

    return (
        <UserContext.Provider value={value} {...props} />
    )

}

// Hook for main component inside tree.

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('Context must to be accesible from parent.')
    }
    return context;
}