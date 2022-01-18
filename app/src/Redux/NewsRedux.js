import Immutable from 'seamless-immutable'
import { createReducer, createActions } from 'reduxsauce'

import * as RequestStatus from '../Entities/RequestStatus'

export const INITIAL_STATE = Immutable({
  newsList: [],
  totalNews: 0,
  page: 0,
  totalPages: 0,
  fetchNewsRequestStatus: RequestStatus.INITIAL
})

const { Types, Creators } = createActions({
  fetchNews: ['page'],
  setFetchNewsRequestStatus: ['status'],
  storeNews: ['news', 'totalNews', 'totalPages', 'page']
})

export const NewsTypes = Types

export default Creators

/**
 * Listeners
 */
export const fetchNews = (state, { page }) => state.merge({ fetchNewsRequestStatus: RequestStatus.INPROGRESS, page })

export const setFetchNewsRequestStatus = (state, { status }) => state.merge({ fetchNewsRequestStatus: status })

export const storeNews = (state, { news, totalNews, totalPages, page }) => state.merge({ newsList: news, totalNews, totalPages, page })

/**
 * ACTIONS
 */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_NEWS]: fetchNews,
  [Types.SET_FETCH_NEWS_REQUEST_STATUS]: setFetchNewsRequestStatus,
  [Types.STORE_NEWS]: storeNews
})
