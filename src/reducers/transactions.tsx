import { isNulliFyField, isValidEmail } from '../tools/validations';
import * as transactionActions from '../actions/transaction';

const transactionFields: any = {
    "targetCountry": "País",
    "reciptEmail": "Correo",
    "reciptName": "Beneficiario",
    "reciptPhone": "Teléfono",
    "reciptAccount": "Cuenta"
}

const initialState = {

    transaction: {
        targetCountry: '',
        comission: 0,
        valueToSent: 0,
        valueSent: 0,
        source: '',
        target: '',
        reciptEmail: '',
        reciptName: '',
        reciptPhone: '',
        reciptAccount: '',
        errorMessage: {}
    },
    transactions: [],
    isFetchingTransaction: false
}

const transactionReducer = (state: any = initialState, action: any): Object => {

    switch (action.type) {
        case transactionActions.RESET_CALCULATOR_FORM_FIELDS:
            return Object.assign({}, state, {
                transaction: Object.assign({}, state.transaction, {
                    comission: 0,
                    valueSent: '',
                    source: '',
                    target: '',
                    valueToSent: ''
                })
            })

        case transactionActions.HANDLE_TRANSACTION_INPUT_CHANGE:
            switch (action.event.target.name) {
                case 'targetCountry':
                case 'comission':
                case 'valueSent':
                case 'source':
                case 'target':
                case "reciptName":
                case "reciptPhone":
                case "reciptAccount":
                    if (isNulliFyField(action.event.target.value)) {
                        return Object.assign({}, state, {
                            transaction: Object.assign({}, state.transaction, {
                                [action.event.target.name]: action.event.target.value,
                                errorMessage: Object.assign({}, state.transaction.errorMessage, {
                                    [action.event.target.name]: `Ingrese ${transactionFields[action.event.target.name]}`
                                })
                            })
                        })
                    }
                    return Object.assign({}, state, {
                        transaction: Object.assign({}, state.transaction, {
                            [action.event.target.name]: action.event.target.value,
                            errorMessage: Object.assign({}, state.transaction.errorMessage, {
                                [action.event.target.name]: null
                            })
                        })
                    })


                case "reciptEmail":
                    if (!isValidEmail(action.event.target.value)) {
                        return Object.assign({}, state, {
                            transaction: Object.assign({}, state.transaction, {
                                [action.event.target.name]: action.event.target.value,
                                errorMessage: Object.assign({}, state.transaction.errorMessage, {
                                    [action.event.target.name]: `Ingrese ${transactionFields[action.event.target.name]} válido.`
                                })
                            })
                        })
                    }
                    return Object.assign({}, state, {
                        transaction: Object.assign({}, state.transaction, {
                            [action.event.target.name]: action.event.target.value,
                            errorMessage: Object.assign({}, state.transaction.errorMessage, {
                                [action.event.target.name]: null
                            })
                        })
                    })

                case 'valueToSent':
                    if (isNulliFyField(action.event.target.value) || action.event.target.value < 0) {
                        return Object.assign({}, state, {
                            transaction: Object.assign({}, state.transaction, {
                                [action.event.target.name]: action.event.target.value,
                                errorMessage: Object.assign({}, state.transaction.errorMessage, {
                                    [action.event.target.name]: `${transactionFields[action.event.target.name]} debe ser un número válido.`
                                })
                            })
                        })
                    }
                    return Object.assign({}, state, {
                        transaction: Object.assign({}, state.transaction, {
                            [action.event.target.name]: action.event.target.value,
                            errorMessage: Object.assign({}, state.transaction.errorMessage, {
                                [action.event.target.name]: null
                            })
                        })
                    })

                default:
                    return Object.assign({}, state, {
                        transaction: Object.assign({}, state.transaction, {
                            [action.event.target.name]: action.event.target.value,
                            errorMessage: Object.assign({}, state.transaction.errorMessage, {
                                [action.event.target.name]: null
                            })
                        })
                    })
            }

        case transactionActions.REQUEST_EXECUTE_TRANSACTION:
            return Object.assign({}, state, {
                isFetchingTransaction: true
            })

        case transactionActions.REQUEST_EXECUTE_TRANSACTION_FAILED:
            return Object.assign({}, state, {
                isFetchingTransaction: false
            })

        case transactionActions.REQUEST_EXECUTE_TRANSACTION_SUCCEDED:
            return Object.assign({}, state, {
                isFetchingTransaction: false,
                transaction: {
                    targetCountry: '',
                    comission: 0,
                    valueToSent: 0,
                    valueSent: 0,
                    source: '',
                    target: '',
                    reciptEmail: '',
                    reciptName: '',
                    reciptPhone: '',
                    reciptAccount: '',
                    errorMessage: {}
                },
                transactions: [
                    ...state.transactions,
                    action.transaction
                ]
            })

        default:
            return state;
    }

}

export default transactionReducer;