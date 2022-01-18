import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const NotFound = ({ staticContext = {} }) => {
  staticContext.notFound = true

  const head = () => {
    return (
      <Helmet key={Math.random()}>
        <title>Hackers News - Error</title>
      </Helmet>
    )
  }

  return (
    <div className="container">
      {head()}
      <h1>Error</h1>
      <p>Page not found. Please try again!</p>
    </div>
  )
}

NotFound.propTypes = {
  staticContext: PropTypes.objectOf(PropTypes.any)
}

NotFound.defaultProps = {
  staticContext: {}
}

export default NotFound
