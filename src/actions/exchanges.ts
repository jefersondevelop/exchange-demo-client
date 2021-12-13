import { doRequest } from "./index"
import { areExchangeFormValid } from "./validations"

export const REQUEST_GET_EXCHANGES = 'REQUEST_GET_EXCHANGES'
export const REQUEST_GET_EXCHANGES_SUCCEDED = 'REQUEST_GET_EXCHANGES_SUCCEDED'
export const REQUEST_GET_EXCHANGES_FAILED = 'REQUEST_GET_EXCHANGES_FAILED'

export const HANDLE_EXCHANGE_INPUT_CHANGE = 'HANDLE_EXCHANGE_INPUT_CHANGE'

export const REQUEST_SAVE_EXCHANGE = 'REQUEST_SAVE_EXCHANGE'
export const REQUEST_SAVE_EXCHANGE_SUCCEDED = 'REQUEST_SAVE_EXCHANGE_SUCCEDED'
export const REQUEST_SAVE_EXCHANGE_FAILED = 'REQUEST_SAVE_EXCHANGE_FAILED'

export const REQUEST_DELETE_EXCHANGE = 'REQUEST_DELETE_EXCHANGE'
export const REQUEST_DELETE_EXCHANGE_SUCCEDED = 'REQUEST_DELETE_EXCHANGE_SUCCEDED'
export const REQUEST_DELETE_EXCHANGE_FAILED = 'REQUEST_DELETE_EXCHANGE_FAILED'

export const REQUEST_GET_EXCHANGE = 'REQUEST_GET_EXCHANGE'
export const REQUEST_GET_EXCHANGE_SUCCEDED = 'REQUEST_GET_EXCHANGE_SUCCEDED'
export const REQUEST_GET_EXCHANGE_FAILED = 'REQUEST_GET_EXCHANGE_FAILED'

export const REQUEST_UPDATE_EXCHANGE = 'REQUEST_UPDATE_EXCHANGE'
export const REQUEST_UPDATE_EXCHANGE_SUCCEDED = 'REQUEST_UPDATE_EXCHANGE_SUCCEDED'
export const REQUEST_UPDATE_EXCHANGE_FAILED = 'REQUEST_UPDATE_EXCHANGE_FAILED'

function requestGetExchanges() {

    return {
        type: REQUEST_GET_EXCHANGES
    }

}

function requestSaveExchange() {

    return {
        type: REQUEST_SAVE_EXCHANGE
    }

}

function requestGetExchangesSucceded(exchanges: any[]) {

    return {
        type: REQUEST_GET_EXCHANGES_SUCCEDED,
        exchanges
    }

}

function requestGetExchangesFailed() {

    return {
        type: REQUEST_GET_EXCHANGES_FAILED
    }

}

function requestGetExchange() {

    return {
        type: REQUEST_GET_EXCHANGE
    }

}

function requestGetExchangeSucceded(exchange: any) {

    return {
        type: REQUEST_GET_EXCHANGE_SUCCEDED,
        exchange
    }

}

function requestGetExchangeFailed() {

    return {
        type: REQUEST_GET_EXCHANGE_FAILED
    }

}

function requestUpdateExchange() {
    return {
        type: REQUEST_UPDATE_EXCHANGE
    }
}

function requestUpdateExchangeSucceded(exchange: any) {
    return function (disptach: CallableFunction) {
        disptach({
            type: REQUEST_UPDATE_EXCHANGE_SUCCEDED,
            exchange
        })
    }
}

function requestUpdateExchangeFailed() {
    return {
        type: REQUEST_UPDATE_EXCHANGE_FAILED
    }
}

function requestSaveExchangeSucceded(exchange: any) {

    return function (dispatch: CallableFunction) {
        dispatch({
            type: REQUEST_SAVE_EXCHANGE_SUCCEDED,
            exchange
        })
        window.location.pathname = '/exchanges'
    }
}

function requestSaveExchangeFailed() {

    return {
        type: REQUEST_SAVE_EXCHANGE_FAILED
    }

}

function requestDeleteExchange() {

    return {
        type: REQUEST_DELETE_EXCHANGE
    }

}

function requestDeleteExchangeSucceded(exchange: string) {

    return {
        type: REQUEST_DELETE_EXCHANGE_SUCCEDED,
        exchange
    }

}

function requestDeleteExchangeFailed() {

    return {
        type: REQUEST_DELETE_EXCHANGE_FAILED
    }

}

export function handleExchangeInputChange(event: any) {
    return {
        type: HANDLE_EXCHANGE_INPUT_CHANGE,
        event
    }
}

export function fetchGetExchanges(alert: any) {

    return function (dispatch: CallableFunction, getState: any) {

        let mainUser = getState().main.user;

        dispatch(requestGetExchanges())

        doRequest(
            `${process.env.REACT_APP_API_URL}/exchanges`,
            'GET',
            null,
            mainUser,
            false,
            dispatch,
            requestGetExchangesSucceded,
            requestGetExchangesFailed,
            false,
            true,
            null,
            false,
            alert
        )

    }


}

export function fetchSaveExchanges(exchange: any, alert: any) {

    return function (dispatch: CallableFunction, getState: any) {

        let mainUser = getState().main.user;
        delete exchange.errorMessage;

        if (!areExchangeFormValid(exchange)) {
            alert.enqueueSnackbar(
                'Ingrese valores válido para la divisa.',
                {
                    variant: 'error',
                    autoHideDuration: 3000,
                    action: alert.action,
                }
            )
            return;
        }

        dispatch(requestSaveExchange())

        doRequest(
            `${process.env.REACT_APP_API_URL}/exchanges`,
            'POST',
            exchange,
            mainUser,
            false,
            dispatch,
            requestSaveExchangeSucceded,
            requestSaveExchangeFailed,
            true,
            true,
            null,
            false,
            alert
        )

    }


}

export function deleteExchange(exchangeId: string, alert: any) {

    return function (dispatch: CallableFunction, getState: any) {

        dispatch(requestDeleteExchange())

        let user = getState().main.user

        doRequest(
            `${process.env.REACT_APP_API_URL}/exchanges/${exchangeId}`,
            'DELETE',
            null,
            user,
            false,
            dispatch,
            requestDeleteExchangeSucceded,
            requestDeleteExchangeFailed,
            true,
            true,
            null,
            false,
            alert
        )

    }

}

export function fetchGetExchange(exchangeId: string, alert: any) {

    return function (dispatch: CallableFunction, getState: any) {

        dispatch(requestGetExchange())

        let user = getState().main.user

        doRequest(
            `${process.env.REACT_APP_API_URL}/exchanges/${exchangeId}`,
            'GET',
            null,
            user,
            false,
            dispatch,
            requestGetExchangeSucceded,
            requestGetExchangeFailed,
            false,
            true,
            null,
            false,
            alert
        )
    }

}

export function fetchUpdateExchange(exchange: any, alert: any) {

    return function (dispatch: CallableFunction, getState: any) {

        let mainUser = getState().main.user;
        delete exchange.errorMessage;

        if (!areExchangeFormValid(exchange)) {
            alert.enqueueSnackbar(
                'Ingrese valores válido para la divisa.',
                {
                    variant: 'error',
                    autoHideDuration: 3000,
                    action: alert.action,
                }
            )
            return;
        }

        dispatch(requestUpdateExchange())

        doRequest(
            `${process.env.REACT_APP_API_URL}/exchanges`,
            'PUT',
            exchange,
            mainUser,
            false,
            dispatch,
            requestUpdateExchangeSucceded,
            requestUpdateExchangeFailed,
            true,
            true,
            null,
            false,
            alert
        )

    }


}