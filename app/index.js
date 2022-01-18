import '@babel/polyfill'
import express from 'express'
import path from 'path'
import React from 'react'
import { matchRoutes } from 'react-router-config';
import compression from 'compression'

import renderer from './src/Utils/Renderer'
import createStore, { sagaMiddleware } from './src/Redux'
import { waitAll } from './src/Sagas'
import Routes from './src/Routes'

const app = express()

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    return false
  }
  return compression.filter(req, res)
}

app.use(
  compression({
    level: 2,
    filter: shouldCompress
  })
)

const port = process.env.PORT || 4000

app.use(express.static('public'))
app.get('*', function(req, res, next) {

  const store = createStore()

  const routes = matchRoutes(Routes, req.path)
  routes.map(({ route: { component = false }, match: { isExact, params }}) => {
    if (isExact) {
      if (component && component['preload']) {
        const preloader = component['preload'](req.query)

        sagaMiddleware.run(
          waitAll(preloader)
        ).toPromise().then(() => {
          const context = {}
          const content = renderer(req, store, context)
          res.status(200).send(content)
        }).catch((e) => {
          console.log(e.stack)
          res.status(400).send('Invalid Path')
        })
      }
    } else {
      res.status(404).send('Not found')
    }
  })
})
app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})
