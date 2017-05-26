import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Button extends Component {
  render() {
    return (
      <button onClick={this.props.onClick} type="button">
        {this.props.children}
      </button>
    );
  }
}

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p><strong>Counter Example</strong></p>
        <p>I have been clicked: <strong>{this.state.count}</strong> times</p>
        <Button size="expanded" onClick={this.handleClick}>click me</Button>
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    const style = {
      card: {
        width: "100%",
        background: "#fff",
        borderRadius: "5px",
        WebkitBoxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
        position: "relative",
        padding: "30px 40px 30px 40px",
        margin: "10px"
      }
    };
    return (
      <section className="container">

        <div className="row">
          <div className="card" style={style.card}>
            <p>
              I use <strong>flexbox</strong> for my layouts!
            </p>
            <p>
              Check out the
              {" "}
              <NavLink to={"/style-guide"}><strong>StyleGuide</strong></NavLink>
            </p>
          </div>

          <div className="card" style={style.card}>
            <p>
              Links that don't match up with a URL defined in the router
              will be handled by the noMatch component.<br />
              <NavLink to={"/some-random-link"}>
                <strong>Example not found link</strong>
              </NavLink>
            </p>
          </div>
          <div className="card" style={style.card}>
            <Counter />
          </div>
        </div>
      </section>
    );
  }
}
