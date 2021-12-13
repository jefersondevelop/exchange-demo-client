import { doRequest } from "./index"

export const REQUEST_EXECUTE_TRANSACTION = 'REQUEST_EXECUTE_TRANSACTION'
export const REQUEST_EXECUTE_TRANSACTION_SUCCEDED = 'REQUEST_EXECUTE_TRANSACTION_SUCCEDED'
export const REQUEST_EXECUTE_TRANSACTION_FAILED = 'REQUEST_EXECUTE_TRANSACTION_FAILED'

export const HANDLE_TRANSACTION_INPUT_CHANGE = 'HANDLE_TRANSACTION_INPUT_CHANGE'
export const RESET_CALCULATOR_FORM_FIELDS = 'RESET_CALCULATOR_FORM_FIELDS'

function requestExecuteTransaction() {

    return {
        type: REQUEST_EXECUTE_TRANSACTION
    }

}

function requestExecuteTransactionSucceded(transaction: any) {

    return function (dispatch: CallableFunction) {

        dispatch({
            type: REQUEST_EXECUTE_TRANSACTION_SUCCEDED,
            transaction
        })
        window.location.reload();
    }

}

function requestExecuteTransactionFailed() {

    return {
        type: REQUEST_EXECUTE_TRANSACTION_FAILED
    }

}

export function resetCalculatorFormFields() {
    return {
        type: RESET_CALCULATOR_FORM_FIELDS
    }
}

export function handleTransactionChange(event: any) {
    return {
        type: HANDLE_TRANSACTION_INPUT_CHANGE,
        event
    }
}

export function executeTransaction(transaction: any, alert: any) {

    return function (dispatch: CallableFunction, getState: any) {

        let mainUser = getState().main.user;

        dispatch(requestExecuteTransaction())

        let body = {
            account: {
                reciptAccount: transaction.reciptAccount,
                reciptEmail: transaction.reciptEmail,
                reciptName: transaction.reciptName,
                reciptPhone: transaction.reciptPhone,
                userId: mainUser.id
            },
            targetCountry: transaction.targetCountry,
            comission: transaction.comission,
            source: transaction.source,
            target: transaction.target,
            valueSent: transaction.valueSent,
            valueToSent: transaction.valueToSent
        }

        doRequest(
            `${process.env.REACT_APP_API_URL}/transactions`,
            'POST',
            body,
            mainUser,
            false,
            dispatch,
            requestExecuteTransactionSucceded,
            requestExecuteTransactionFailed,
            true,
            true,
            null,
            false,
            alert
        )

    }


}