import React, { Component } from 'react'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      redirectToReferrer: false,
      login: window.localStorage.getItem('auth')
    }
  }

  login() {
    window.localStorage.setItem('auth', true)
    this.setState(() => ({
      redirectToReferrer: true,
      login: window.localStorage.getItem('auth')
    }))
  }
  
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

export default Login