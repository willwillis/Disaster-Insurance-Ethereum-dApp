import React, { Component } from "react";
import NetworkDetails from "./NetworkDetails";
import Example from "./Example";

class Navbar extends Component {
  render() {
    console.log(this.props);
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          🔥 Lassie Disaster Response
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white">
              <span id="account">Your Account: {this.props.account}</span>
            </small>
            {/* <NetworkDetails
              networkDataAddress={this.props.networkDataAddress}
            /> */}
            <Example />
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
