import { takeLatest, all, fork, join } from 'redux-saga/effects'

import { NewsTypes } from '../Redux/NewsRedux'
import { fetchNews } from './NewsSaga'

export default function * root () {
    yield all([
        takeLatest(NewsTypes.FETCH_NEWS, fetchNews)
    ])
}

export const waitAll = sagas => function * () {
  const tasks = sagas.map(([saga, ...params]) => {
    return fork(saga, params[0])
  })

  yield all(tasks)
}
