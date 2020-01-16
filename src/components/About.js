import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto ">
        <h1>
          Wild Fire Smart Contract &nbsp;
          <small class=".font-weight-normal">
            <small>
              <small>{this.props.contractName}</small>
            </small>
          </small>
        </h1>
      </div>
    );
  }
}

export default About;
