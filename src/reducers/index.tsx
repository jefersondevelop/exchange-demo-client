import { combineReducers } from 'redux'
import mainReducer from './main'
import exchangeReducer from './exchanges'
import usersReducer from './users'
import transactionReducer from './transactions'

const appReducer = combineReducers({
    main: mainReducer,
    users: usersReducer,
    exchanges: exchangeReducer,
    transactions: transactionReducer
});

const rootReducer = (state: any, action: any) => {
    if (action.type === 'LOGOUT_USER') {
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer;