import React, { Component } from "react";
import { WiSmoke, WiThermometer } from "weather-icons-react";

class IOTReadings extends Component {
  render() {
    return (
      <>
        <WiSmoke size={50} color="#000" />
        <WiThermometer size={50} color="#000" />
      </>
    );
  }
}

export default IOTReadings;
