import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'

import NewsActions from '../Redux/NewsRedux'
import NewsItem from '../Components/NewsItem'
import NewsItemHeader from '../Components/NewsItemHeader'
import NewsItemFooter from '../Components/NewsItemFooter'
import { fetchNews } from '../Sagas/NewsSaga'
import * as RequestStatus from '../Entities/RequestStatus'

class Home extends PureComponent {

  constructor (props) {
    super(props)
    this.head = this.head.bind(this)
    this.getNewsList = this.getNewsList.bind(this)
  }

  componentDidUpdate (prevProps) {
    const { fetchNewsRequestStatus : prevStatus, locationPage: prevPage } = prevProps
    const { fetchNewsRequestStatus, locationPage, page: currentPage } = this.props

    if (prevStatus !== fetchNewsRequestStatus && fetchNewsRequestStatus === RequestStatus.OK) {
      window.scrollTo(0, 0)
    }

    if (prevPage !== locationPage && locationPage !== currentPage) {
      this.getNewsList()
    }
  }

  head () {
    return (
      <Helmet key={Math.random()}>
        <title>Hackers News</title>
      </Helmet>
    )
  }

  getNewsList () {
    this.props.fetchNews(this.props.locationPage)
  }

  render () {
    const { newsList, page, totalPages, disabledControls } = this.props

    return (
      <Fragment>
        {this.head()}
        <Row>
          {(newsList && newsList.length) ? (
            <Fragment>
              <NewsItemHeader />
              {newsList.map((item, index) => (
                <Fragment key={index}>
                  <NewsItem item={item} id={index} />
                </Fragment>
              ))}
              <NewsItemFooter onPress={this.load} page={page} total={totalPages} progressing={disabledControls} />
            </Fragment>
          ) : (
            <div className="alert alert-warning">No news</div>
          )}
        </Row>
      </Fragment>
    )
  }
}

Home.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  locationPage: PropTypes.number.isRequired,
  newsList: PropTypes.arrayOf(PropTypes.any),
  totalNews: PropTypes.number.isRequired,
  disabledControls: PropTypes.bool.isRequired,
  fetchNewsRequestStatus: PropTypes.string.isRequired,
  fetchNews: PropTypes.func.isRequired
}

Home.preload = page => {
  return [
    [ fetchNews, page ]
  ]
}

const mapStateToProps = ({
  news: {
    newsList,
    totalNews,
    page,
    totalPages,
    fetchNewsRequestStatus
  }
}, { location: { search = '' } }) => ({
  disabledControls: fetchNewsRequestStatus === RequestStatus.INPROGRESS,
  newsList,
  totalNews,
  page,
  totalPages,
  locationPage: /\?page=\d/.test(search) ? parseInt(search.replace('?page=', '')): 0,
  fetchNewsRequestStatus
})

const mapDispatchToProps = dispatch => ({
  fetchNews: page => dispatch(NewsActions.fetchNews(page))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
