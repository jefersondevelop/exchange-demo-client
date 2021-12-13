import { LoginUser } from "models/login";
import { areLoginParamsValid, areRegisterParamsValid, areRecoverPassValid, areValidatePassChangeValid } from "./validations";
// import { translate } from '../tools/translater'
import { RegisterUser } from "../models/register";
import { doRequest } from "./index";
import history from '@history'

export const REQUEST_MAIN = 'REQUEST_MAIN';
export const REQUEST_LOGIN_SUCCEDED = 'REQUEST_LOGIN_SUCCEDED'
export const REQUEST_LOGIN_FAILED = 'REQUEST_LOGIN_FAILED'

export const REQUEST_REGISTER_SUCCEDED = 'REQUEST_REGISTER_SUCCEDED'
export const REQUEST_REGISTER_FAILED = 'REQUEST_REGISTER_FAILED'

export const REQUEST_RECOVER_PASS_SUCCEDED = 'REQUEST_RECOVER_PASS_SUCCEDED'
export const REQUEST_RECOVER_PASS_FAILED = 'REQUEST_RECOVER_PASS_FAILED'

export const REQUEST_VALIDATE_CHANGE_PASS_SUCCEDED = 'REQUEST_VALIDATE_CHANGE_PASS_SUCCEDED'
export const REQUEST_VALIDATE_CHANGE_PASS_FAILED = 'REQUEST_VALIDATE_CHANGE_PASS_FAILED'

export const LOGOUT_USER = 'LOGOUT_USER'
export const CHANGE_THEME = 'CHANGE_THEME'

export const HANDLE_INPUT_CHANGE = 'HANDLE_INPUT_CHANGE'
export const HANDLE_REGISTER_INPUT_CHANGE = 'HANDLE_REGISTER_INPUT_CHANGE'

function requestMain() {
    return {
        type: REQUEST_MAIN
    }
}

function requestLoginSucceded(user: any) {
    return {
        type: REQUEST_LOGIN_SUCCEDED,
        user
    }
}

function requestLoginFailed() {
    return {
        type: REQUEST_LOGIN_FAILED
    }
}

function requestRegisterSucceded() {
    return function (dispatch: CallableFunction) {
        dispatch({
            type: REQUEST_REGISTER_SUCCEDED
        })
        history.push('/login');
        history.go(0)
    }
}

function requestRegisterFailed() {
    return {
        type: REQUEST_REGISTER_FAILED
    }
}

function requestRecoverPassSucceded() {

    return {
        type: REQUEST_RECOVER_PASS_SUCCEDED
    }

}

function requestRecoverPassFailed() {

    return {
        type: REQUEST_RECOVER_PASS_FAILED
    }

}

function requestValidateChangePassSucceded() {
    return function (disptach: any) {

        disptach({ type: REQUEST_VALIDATE_CHANGE_PASS_SUCCEDED })
        setTimeout(() => {
            window.location.pathname = '/'
        }, 2000)
    }
}

function requestValidateChangePassFailed() {
    return {

        type: REQUEST_VALIDATE_CHANGE_PASS_FAILED

    }
}

export function signOutDueSessionExpired() {
    return function (dispatch: CallableFunction) {
        dispatch(logout())
    }
}

export function handleInputChange(event: any) {
    return {
        type: HANDLE_INPUT_CHANGE,
        event
    }
}

export function handleRegisterInputChange(event: any) {
    return {
        type: HANDLE_REGISTER_INPUT_CHANGE,
        event
    }
}

export function loginUser(userParams: LoginUser, alert: any) {


    return function (dispatch: CallableFunction) {

        if (!areLoginParamsValid(userParams)) {
            alert.enqueueSnackbar(
                'Ingrese valores válido para acceder.',
                {
                    variant: 'error',
                    autoHideDuration: 3000,
                    action: alert.action,
                }
            )
            return;
        }
        dispatch(requestMain())

        return fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(userParams)
        })
            .then(
                (response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return response.json().then((err) => {
                            throw err;
                        });
                    }

                }
            )
            .then((json) => {
                if (json && json.status !== 500) {
                    dispatch(requestLoginSucceded(json.data));
                    alert.enqueueSnackbar(
                        'Haz iniciado sesión correctamente.',
                        {
                            variant: 'success',
                            autoHideDuration: 3000,
                            action: alert.action,
                        }
                    )
                } else {
                    dispatch(requestLoginFailed());
                    alert.enqueueSnackbar(
                        'Hubo un error en el acceso.',
                        {
                            variant: 'error',
                            autoHideDuration: 3000,
                            action: alert.action,
                        }
                    )
                }
            })
            .catch(async (error) => {
                if (error.message === 'Validation failed') {
                    for (let i in error.data.errors) {
                        error.data.errors[i].map(async (e: string) => {
                            // let text = await translate(e, 'es');
                            alert.enqueueSnackbar(
                                e,
                                {
                                    variant: 'error',
                                    autoHideDuration: 3000,
                                    action: alert.action,
                                }
                            )
                            return e;
                        })
                    }

                    dispatch(requestLoginFailed());
                    return;
                }
                // error.message = await translate(error.message, 'es');
                console.log(error.message)
                alert.enqueueSnackbar(
                    error.message,
                    {
                        variant: 'error',
                        autoHideDuration: 3000,
                        action: alert.action,
                    }
                )
                dispatch(requestLoginFailed());
            });
    }

}

export function logout() {
    return {
        type: LOGOUT_USER
    }
}

export function changeTheme(alert: any) {

    return function (dispatch: CallableFunction) {

        alert.enqueueSnackbar(
            'Haz cambiado de tema correctamente.',
            {
                variant: 'success',
                autoHideDuration: 3000,
                action: alert.action,
            }
        )

        dispatch({ type: CHANGE_THEME })
    }
}

export function register(userParams: RegisterUser, alert: any) {


    return function (dispatch: CallableFunction) {

        if (!areRegisterParamsValid(userParams)) {
            alert.enqueueSnackbar(
                'Ingrese valores válido para registrarse.',
                {
                    variant: 'error',
                    autoHideDuration: 3000,
                    action: alert.action,
                }
            )
            return;
        }

        userParams = Object.assign({}, userParams, {
            ...userParams.profile
        })

        dispatch(requestMain())

        doRequest(
            `${process.env.REACT_APP_API_URL}/auth/register`,
            'POST',
            userParams,
            null,
            false,
            dispatch,
            requestRegisterSucceded,
            requestRegisterFailed,
            true,
            true,
            null,
            false,
            alert
        )

    }

}

export function recoverPass(email: string, alert: any) {

    return function (dispatch: CallableFunction) {

        if (!areRecoverPassValid(email)) {
            alert.enqueueSnackbar(
                'Ingrese email válido para recuperar.',
                {
                    variant: 'error',
                    autoHideDuration: 3000,
                    action: alert.action,
                }
            )
            return;
        }

        dispatch(requestMain())

        doRequest(
            `${process.env.REACT_APP_API_URL}/auth/recover`,
            'POST',
            { email },
            null,
            false,
            dispatch,
            requestRecoverPassSucceded,
            requestRecoverPassFailed,
            true,
            true,
            null,
            false,
            alert
        )

    }
}

export function validateChangePass(password: string, confirmPassword: string, token: string | null, alert: any) {

    return function (dispatch: CallableFunction) {

        if (!areValidatePassChangeValid(password, confirmPassword, token)) {
            alert.enqueueSnackbar(
                'Ingrese valores válidos para cambiar tu contraseña.',
                {
                    variant: 'error',
                    autoHideDuration: 3000,
                    action: alert.action,
                }
            )
            return;
        }

        dispatch(requestMain())

        doRequest(
            `${process.env.REACT_APP_API_URL}/auth/validatepass`,
            'POST',
            { password, confirmPassword, recoverHash: token },
            null,
            false,
            dispatch,
            requestValidateChangePassSucceded,
            requestValidateChangePassFailed,
            true,
            true,
            null,
            false,
            alert
        )

    }
}