import { all, put, call } from 'redux-saga/effects'

import * as NewsAPI from '../API/NewsAPI'
import NewsActions from '../Redux/NewsRedux'
import * as RequestStatus from '../Entities/RequestStatus'

export function * fetchNews ({ page = 0 }) {
  const response = yield call(NewsAPI.fetchNews, { page })

  if (response.err) {
    yield put(NewsActions.setFetchNewsRequestStatus(RequestStatus.ERROR))
  } else {
    const { hits, nbHits, nbPages, page } = response.data

    yield all([
      put(NewsActions.storeNews(hits, nbHits, nbPages, page)),
      put(NewsActions.setFetchNewsRequestStatus(RequestStatus.OK))
    ])
  }
}
