import {createStore} from "redux"
import reducers from "./reducers"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'study_trek',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, reducers)

  const store = createStore(persistedReducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

  export let persistedStore = persistStore(store);

  export default store;