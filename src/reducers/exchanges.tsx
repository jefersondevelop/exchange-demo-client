import { isNulliFyField } from '../tools/validations';
import * as exchangeActions from '../actions/exchanges';

const fields: any = {
    "sourceName": "Fuente",
    "targetName": "Destino",
    "comission": "Comisión",
    "type": "Tipo",
    "finalValue": "Valor"
}

const initialState = {
    exchange: {
        sourceName: '',
        targetName: '',
        comission: 0,
        finalValue: 0,
        type: '',
        isActive: true,
        errorMessage: {

        }
    },
    exchanges: [],
    isFetching: false

};

const exchangeReducer = (state: any = initialState, action: any): Object => {

    switch (action.type) {


        case exchangeActions.REQUEST_GET_EXCHANGES:
            return Object.assign({}, state, {
                isFetching: true
            })

        case exchangeActions.REQUEST_GET_EXCHANGES_SUCCEDED:
            return Object.assign({}, state, {
                exchanges: action.exchanges,
                exchange: {
                    sourceName: '',
                    targetName: '',
                    comission: 0,
                    finalValue: 0,
                    type: '',
                    isActive: true,
                    errorMessage: {

                    }
                },
                isFetching: false
            })

        case exchangeActions.REQUEST_GET_EXCHANGES_FAILED:
            return Object.assign({}, state, {
                isFetching: false
            })

        case exchangeActions.HANDLE_EXCHANGE_INPUT_CHANGE:
            switch (action.event.target.name) {
                case 'sourceName':
                case 'targetName':
                case 'type':
                    if (isNulliFyField(action.event.target.value)) {
                        return Object.assign({}, state, {
                            exchange: Object.assign({}, state.exchange, {
                                [action.event.target.name]: action.event.target.value,
                                errorMessage: Object.assign({}, state.exchange.errorMessage, {
                                    [action.event.target.name]: `Ingrese ${fields[action.event.target.name]}`
                                })
                            })
                        })
                    }
                    return Object.assign({}, state, {
                        exchange: Object.assign({}, state.exchange, {
                            [action.event.target.name]: action.event.target.value,
                            errorMessage: Object.assign({}, state.exchange.errorMessage, {
                                [action.event.target.name]: null
                            })
                        })
                    })

                case 'comission':
                case 'finalValue':
                    if (isNulliFyField(action.event.target.value) || action.event.target.value < 0) {
                        return Object.assign({}, state, {
                            exchange: Object.assign({}, state.exchange, {
                                [action.event.target.name]: action.event.target.value,
                                errorMessage: Object.assign({}, state.exchange.errorMessage, {
                                    [action.event.target.name]: `${fields[action.event.target.name]} debe ser un número válido.`
                                })
                            })
                        })
                    }
                    return Object.assign({}, state, {
                        exchange: Object.assign({}, state.exchange, {
                            [action.event.target.name]: action.event.target.value,
                            errorMessage: Object.assign({}, state.exchange.errorMessage, {
                                [action.event.target.name]: null
                            })
                        })
                    })

                default:
                    return Object.assign({}, state, {
                        exchange: Object.assign({}, state.exchange, {
                            [action.event.target.name]: action.event.target.value
                        })
                    })
            }

        case exchangeActions.REQUEST_SAVE_EXCHANGE:
            return Object.assign({}, state, {
                isFetching: true
            })

        case exchangeActions.REQUEST_SAVE_EXCHANGE_FAILED:
            return Object.assign({}, state, {
                isFetching: false
            })

        case exchangeActions.REQUEST_SAVE_EXCHANGE_SUCCEDED:
            return Object.assign({}, state, {
                isFetching: false,
                exchange: {
                    sourceName: '',
                    targetName: '',
                    comission: 0,
                    finalValue: 0,
                    type: '',
                    isActive: true,
                    errorMessage: {

                    }
                },
                exchanges: [...state.exchanges, action.exchange]
            })

        case exchangeActions.REQUEST_DELETE_EXCHANGE:
            return Object.assign({}, state, {
                isFetching: true
            })

        case exchangeActions.REQUEST_DELETE_EXCHANGE_SUCCEDED:
            return Object.assign({}, state, {
                exchanges: state.exchanges.filter((exchange: any) => { return exchange.id !== action.exchange.id }),
                exchange: {},
                isFetching: false
            })

        case exchangeActions.REQUEST_DELETE_EXCHANGE_FAILED:
            return Object.assign({}, state, {
                isFetching: false
            })

        case exchangeActions.REQUEST_GET_EXCHANGE:
            return Object.assign({}, state, {
                isFetching: true
            })

        case exchangeActions.REQUEST_GET_EXCHANGE_SUCCEDED:
            return Object.assign({}, state, {
                isFetching: false,
                exchange: Object.assign({}, action.exchange, {
                    errorMessage: {
                    }
                })
            })

        case exchangeActions.REQUEST_GET_EXCHANGE_FAILED:
            return Object.assign({}, state, {
                isFetching: false
            })

        case exchangeActions.REQUEST_UPDATE_EXCHANGE:
            return Object.assign({}, state, {
                isFetching: true
            })

        case exchangeActions.REQUEST_UPDATE_EXCHANGE_SUCCEDED:
            return Object.assign({}, state, {
                isFetching: false,
                exchange: action.exchange,
                exchanges: state.exchanges.map((exchange: any) => {
                    if (exchange.id === action.exchange.id) {
                        return action.exchange
                    }
                    return exchange
                })
            })

        case exchangeActions.REQUEST_UPDATE_EXCHANGE_FAILED:
            return Object.assign({}, state, {
                isFetching: false
            })

        default:
            return state

    }

}

export default exchangeReducer;
