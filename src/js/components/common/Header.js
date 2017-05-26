import React, { Component } from "react";
import { SuperCellIcon } from "../common/Icons";
import Nav from "./Nav";
import { Link } from "react-router-dom";

export default class Header extends Component {
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
            <header id="header">
              <div className="section-wrap">
                <h1><Link to="./">SuperCell 2.0.0 <SuperCellIcon /> Build 2016</Link></h1>
                <Nav />
              </div>
            </header>
          </div>
        </div>
      </section>
    );
  }
}
