import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'

import { agoTimeFormat } from '../Utils/Util'

const NewsItemRow = styled.div`
  margin-top: -1px;
  border: 1px solid #cccccc;
  padding: 4px 0;
  background: ${props => props.index % 2 === 0 ? '#dddddd80' : '#f6f6ef'}
`
const NewsTitle = styled.div`
  font-size: 14px;
  color: #000000;
`
const NewsComments = styled.div`
  min-width: 100px;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
`
const NewsPoint = styled(NewsComments)`
  color: ${props => props.point >= 75 ? '#dd55500' : (props.point >= 100 ? '#ff6600' : '#000000')}
`

const NewsVote = styled(Button)`
  min-width: 100px;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  color: #888888!important;
`
const getOrigin = url => {
  if (url !== null) {
    const origin = new URL(url).host
    return origin.replace('www.', '')
  }
  return ''
}

const NewsItem = ({ id, item }) => {
  const { points, title, story_title, num_comments, author, story_url: url, created_at_i } = item

  return (
    <NewsItemRow index={id} className="w-100 d-flex flex-sm-row flex-column align-items-center">
        <NewsComments>{num_comments || '-'}</NewsComments>
        <NewsPoint point={points}>{points || '-'}</NewsPoint>
        <NewsVote title="UpVote" size="sm" variant="link" className="text-decoration-none">&#9650;</NewsVote>
        <NewsTitle>
          {title || story_title} <small>{url && (
            <a target='_new' className="text-decoration-none text-secondary" href={url}>({getOrigin(url)})</a>
          )} <span className="text-muted">by</span><strong> {author} </strong><span className="text-muted">{agoTimeFormat(created_at_i)}</span></small>
        </NewsTitle>
    </NewsItemRow>
  )
}

NewsItem.propTypes = {
  id: PropTypes.number.isRequired,
  item: PropTypes.objectOf(PropTypes.any)
}

export default NewsItem
