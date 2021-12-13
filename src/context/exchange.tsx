import { areTransactionValid } from '../actions/validations';
import React, { useMemo, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as exchangeActions from '../actions/exchanges'
import * as transactionActions from '../actions/transaction'
import { useAlert } from './alertContext';

const ExchangeContext = React.createContext(null);

// Provider for main components inside tree.

export const ExchangeProvider = (props?: any) => {

    // Get data from redux state

    const { isFetching, exchanges, exchange } = useSelector((state: any) => state.exchanges);
    const { transaction } = useSelector((state: any) => state.transactions);

    // Get control for snackbar messages.

    const { alertElement } = useAlert();

    // Get control for dispatch actions for state redux update.

    const dispatch = useDispatch();

    const value = useMemo(() => {

        const resetCalculatorForm = () => {
            dispatch(transactionActions.resetCalculatorFormFields())
        }

        const getExchangeDetails = (exchangeId: string) => {
            dispatch(exchangeActions.fetchGetExchange(exchangeId, alertElement))
        }

        const updateExchange = (exchange: any) => {
            dispatch(exchangeActions.fetchUpdateExchange(exchange, alertElement))
        }

        const deleteExchange = (exchangeId: string) => {
            dispatch(exchangeActions.deleteExchange(exchangeId, alertElement))
        }

        const handleExchangeInputChange = (event: any) => {
            dispatch(exchangeActions.handleExchangeInputChange(event))
        }

        const handleTransactionInputChange = (event: any) => {
            dispatch(transactionActions.handleTransactionChange(event))
        }

        const getExchanges = () => {
            dispatch(exchangeActions.fetchGetExchanges(alertElement));
        }

        const saveExchange = (exchange: any) => {
            dispatch(exchangeActions.fetchSaveExchanges(exchange, alertElement))
        }

        const transactionValid = (transaction: any): Boolean => {
            return areTransactionValid(transaction)
        }

        const executeTransaction = (transaction: any) => {
            dispatch(transactionActions.executeTransaction(transaction, alertElement))
        }

        return ({
            exchange,
            transaction,
            exchanges,
            getExchanges,
            isFetching,
            deleteExchange,
            handleExchangeInputChange,
            getExchangeDetails,
            handleTransactionInputChange,
            updateExchange,
            resetCalculatorForm,
            saveExchange,
            transactionValid,
            executeTransaction
        })

    }, [
        exchange,
        transaction,
        exchanges,
        alertElement,
        isFetching,
        dispatch
    ])

    return (
        <ExchangeContext.Provider value={value} {...props} />
    )

}

// Hook for main component inside tree.

export const useExchange = () => {
    const context = useContext(ExchangeContext);
    if (!context) {
        throw new Error('Context must to be accesible from parent.')
    }
    return context;
}