import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(rest);

  return <Route {...rest} render={(props) => {
    let isAuth = false
    if(__isBrowser__){
      isAuth = window.localStorage.getItem('auth') === "true";
    } else {

    }
    if (isAuth)
      return <Component {...props} />
    else
      return <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
      }} />
    }
  }/>
}

export default PrivateRoute