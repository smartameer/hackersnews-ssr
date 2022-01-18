import Home from './Containers/Home'
import NotFound from './Containers/NotFound'
import App from './App'

export default [
  {
    component: App,
    routes: [
      {
        component: Home,
        path: [ '/', '/news' ],
        exact: true
      },
      {
        component: NotFound
      }
    ]
  }
]
