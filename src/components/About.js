import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto ">
        <img src="lassie.png" v-space="10" class="float-left" />

        <div class="alert" role="alert">
          <b class="lead">Customer: State of California</b>
          <p class="">Smoke and Termerature Sensors</p>

          <small>
            Manually refresh this page after MetaMask confirms interactions with
            the contract are successful. #FixMe!!
          </small>
        </div>
      </div>
    );
  }
}

export default About;
