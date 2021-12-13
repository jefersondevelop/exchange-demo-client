import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


const makeStore = () => {
    let store = createStore(persistedReducer,
        applyMiddleware(
            thunkMiddleware
        )
    )

    let persistor = persistStore(store)

    return { store, persistor }
}

export default makeStore;