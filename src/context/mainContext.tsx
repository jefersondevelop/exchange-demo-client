import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React, { useMemo, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { red } from '@material-ui/core/colors';
import * as mainActions from '../actions/main'
import { useAlert } from './alertContext';
import { RegisterUser, LoginUser } from '../models/index';
import 'typeface-rubik';

const MainContext = React.createContext(null);


// Provider for main components inside tree.

export const MainProvider = (props?: any) => {

    // Get data from redux state

    const { user, isFetching, themeType } = useSelector((state: any) => state.main);

    // Get control for snackbar messages.

    const { alertElement } = useAlert();

    // Get control for dispatch actions for state redux update.

    const dispatch = useDispatch();

    const theme = createMuiTheme({
        palette: {
            type: themeType ? themeType : 'light',
            error: red,
            secondary: {
                main: '#4E4E4E',
                dark: 'white'
            }
        },
        typography: {
            fontFamily: [
                'rubik',
                'serif',
            ].join(',')
        }
    });

    const value = useMemo(() => {

        const changeTheme = () => {
            dispatch(mainActions.changeTheme(alertElement))
        }

        const handleInputChange = (event: any) => {
            dispatch(mainActions.handleInputChange(event))
        }

        const handleRegisterInputChange = (event: any) => {
            dispatch(mainActions.handleRegisterInputChange(event))
        }

        const login = (user: LoginUser) => {
            dispatch(mainActions.loginUser(user, alertElement));
        }

        const register = (user: RegisterUser) => {
            dispatch(mainActions.register(user, alertElement))
        }

        const recoverPass = (email: string) => {
            dispatch(mainActions.recoverPass(email, alertElement))
        }

        const validateChangePass = (password: string, confirmPassword: string, token: string | null) => {
            dispatch(mainActions.validateChangePass(password, confirmPassword, token, alertElement))
        }

        const logout = () => {
            dispatch(mainActions.logout())
        }

        return ({
            user,
            isFetching,
            handleInputChange,
            login,
            logout,
            changeTheme,
            themeType,
            register,
            recoverPass,
            validateChangePass,
            handleRegisterInputChange
        })

    }, [user, alertElement, isFetching, themeType, dispatch])

    return (
        <ThemeProvider theme={theme}>
            <MainContext.Provider value={value} {...props} />
        </ThemeProvider>
    )

}

// Hook for main component inside tree.

export const useMain = () => {
    const context = useContext(MainContext);
    if (!context) {
        throw new Error('Context must to be accesible from parent.')
    }
    return context;
}