import React, { Component } from "react";
import Dialog from "./Dialog";
import { FaRegUserCircle } from "react-icons/fa";

// Thank you https://appdividend.com/2018/03/30/react-bootstrap-modal-example-tutorial/
class Navbar extends Component {
  render() {
    console.log(this.props);
    const networkDataAddress = this.props.networkDataAddress;

    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="/"
          rel="noopener noreferrer"
        >
          <span role="img"> 🔥 </span> Lassie Disaster Response
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <span className="text-white">
              <span id="account">
                <FaRegUserCircle /> &nbsp;
                <small>{this.props.account}</small>
              </span>
            </span>
            &nbsp; &nbsp; &nbsp;
            <Dialog
              networkDataAddress={networkDataAddress}
              yourAccount={this.props.account}
              contractName={this.props.contractName}
              networkID={this.props.networkID}
              blockNumber={this.props.blockNumber}
            />
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
