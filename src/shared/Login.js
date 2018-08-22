import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)

    let isAuth = false
    if (__isBrowser__) {
      isAuth = window.localStorage.getItem('auth')
    }

    this.state = {
      redirectToReferrer: false,
      login: isAuth
    }

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  login() {
    window.localStorage.setItem('auth', true)
    this.setState(() => ({
      redirectToReferrer: true,
      login: window.localStorage.getItem('auth')
    }))
  }

  logout() {
    window.localStorage.setItem('auth', false)
    this.setState(() => ({
      redirectToReferrer: false,
      login: window.localStorage.getItem('auth')
    }))
  }
  
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    console.log('from', from)
    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={this.login}>Log in</button>
        <button onClick={this.logout}>Log out</button>
      </div>
    )
  }
}

export default Login