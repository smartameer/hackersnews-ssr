import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const NewsItemRow = styled.div`
  margin-top: -1px;
  border: 1px solid #ff6600;
  padding: 4px 0;
  background: #ff6600
`
const NewsItemHeading = styled.div`
  min-width: 100px;
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
`
const NewsItemHeader = () => {
  return (
    <NewsItemRow className="w-100 d-flex flex-sm-row flex-column align-items-center">
        <NewsItemHeading className="text-center">Comments</NewsItemHeading>
        <NewsItemHeading className="text-center">Vote Count</NewsItemHeading>
        <NewsItemHeading className="text-center">UpVote</NewsItemHeading>
        <NewsItemHeading>News Details</NewsItemHeading>
    </NewsItemRow>
  )
}

export default NewsItemHeader
