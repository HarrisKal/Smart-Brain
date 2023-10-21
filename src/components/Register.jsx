import React, { Component } from "react";
import Logo from "./Logo";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    }
  }

  onNameChange = event => {
    this.setState({ name: event.target.value })
  }

  onEmailChange = event => {
    this.setState({ email: event.target.value })
  }

  onPasswordChange = event => {
    this.setState({ password: event.target.value })
  }


  // When the user clicks "register", we post the information to the backend.
  onSubmit = () => {
    fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    }).then(res => res.json()).then(user => {
      if (user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange("home");
      }
    })
  }

  render() {
    return <div className="flex flex-column items-center vh-100 ma5">
      <Logo className="mb4" />
      <article className="br3 b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5">
        <div className="pa4">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0 ">
            <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
              <input
                onChange={this.onNameChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text" name="name" id="name"
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                onChange={this.onEmailChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email" name="email-address" id="email-address"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                onChange={this.onPasswordChange}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password" name="password" id="password"
              />
            </div>
          </fieldset>
          <div className="mt3">
            <input
              onClick={this.onSubmit}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register!"
            />
          </div>
          <div className="lh-copy mt3">
            <p onClick={() => this.props.onRouteChange("signin")} className="f6 link dim black db pointer">Already have an account? Sign in</p>
          </div>
        </div>
      </article>
    </div>
  }
}