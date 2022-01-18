import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'
import Container from 'react-bootstrap/Container'

const App = ({ route }) => {
  return (
    <Container>
      {renderRoutes(route.routes)}
    </Container>
  )
}

App.propTypes = {
  route: PropTypes.objectOf(PropTypes.any)
};

App.defaultProps = {
  route: null
}

export default App
