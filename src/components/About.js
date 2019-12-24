import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto ">
        <img src="lassie.png" v-space="10" class="float-left" />

        <div class="alert" role="alert">
          <b class="lead">List and buy fictitious products today!</b>
          <p class="">
            This{" "}
            <a href="https://rinkeby.etherscan.io/address/0x0a9bb924cf4ae1fc0a3e1ab28e1a7503cf2c0f84">
              Contract
            </a>{" "}
            is deployed to the{" "}
            <a href="https://www.rinkeby.io/#stats" class="alert-link">
              Rinkeby
            </a>{" "}
            Test Ethereum Network.
          </p>

          <small>
            Manually refresh this page after MetaMask confirms interactions with
            the contract are successful.
          </small>
        </div>
      </div>
    );
  }
}

export default About;
