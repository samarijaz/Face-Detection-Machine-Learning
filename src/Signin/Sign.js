import React, { Component } from "react";

class signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      passWord: "",
    };
  }

  onEmailChange = (e) => {
    this.setState({ signInEmail: e.target.value });
  };
  onPasswordChange = (e) => {
    this.setState({ passWord: e.target.value });
  };

  onSubmit = () => {
    fetch("https://fathomless-refuge-48138.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.passWord,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      });
  };
  render() {
    return (
      <article className="br3 ba b--black-15 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
        <main className="pa4 black-100">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0 center">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset  bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset  bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="center">
              <input
                onClick={this.onSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="1h-copy mt3 center grow pointer">
              <p
                onClick={() => this.props.onRouteChange("register")}
                className="f4 link dim black db"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default signin;
