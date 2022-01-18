import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NewsItemRow = styled.div`
  margin-top: -1px;
  border: 1px solid #dddddd;
  padding: 4px 0;
  background: #f6f6ef;
  border-bottom-width: 6px;
  border-bottom-color: #ff6600;
`
const PageButton = styled(Link)`
  font-size: 14px;
  font-weight: bold;
  color: #ff6600;
  &:hover {
    color: #d55500;
  }
  &[disabled] {
    color: #aaaaaa;
    cursor: default;
    pointer-events: none;
  }
`
const Divider = styled.span`
  width: 3px;
  height: 60%;
  margin: 0 4px;
  background: #ff6600;
`
const NewsItemFooter = ({ page, total, progressing }) => {
  return (
    <NewsItemRow className="w-100 d-flex flex-sm-row flex-column align-items-center justify-content-end">
       <PageButton to={page > 0 ? `/?page=${page - 1}` : '/'} className="btn btn-sm btn-link text-decoration-none" disabled={page <= 0 || progressing}>Previous</PageButton>
       <Divider />
       <PageButton to={page < total ? `/?page=${page + 1}` : '/'} className="btn btn-sm btn-link text-decoration-none" disabled={page === total -1 || progressing}>Next</PageButton>
    </NewsItemRow>
  )
}

NewsItemFooter.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  progressing: PropTypes.bool.isRequired
}

export default NewsItemFooter
