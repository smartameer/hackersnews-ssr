import { combineReducers, createStore, applyMiddleware } from 'redux'
import Immutable from 'seamless-immutable'
import createSagaMiddleware from 'redux-saga'

import rootSaga from '../Sagas'
import { reducer as NewsReducer } from './NewsRedux'

export const reducers = combineReducers({
  news: NewsReducer
})

export const sagaMiddleware = createSagaMiddleware()

export default (initialState) => {
  const store = createStore(
    reducers,
    Immutable(initialState),
    applyMiddleware(sagaMiddleware)
  )
  store.runSaga = sagaMiddleware.run
  store.runSaga(rootSaga)
  return store
}

