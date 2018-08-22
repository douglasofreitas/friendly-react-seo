import React, { Component } from 'react'
import routes from './routes'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from '../utils/PrivateRoute'
import Navbar from './Navbar'
import NoMatch from './NoMatch'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          {routes.map(({ path, exact, component: C, ...rest }) => {
            if (rest.private) {
              return <PrivateRoute
                key={path}
                path={path}
                exact={exact}
                component={C}
              />
            } else {
              return <Route
                key={path}
                path={path}
                exact={exact}
                render={(props) => (
                  <C {...props} {...rest} />
                )}
              />
            }
            
          })}
          <Route render={(props) => <NoMatch {...props} />} />
        </Switch>
      </div>
    )
  }
}

export default App
