import React, { Component } from "react";
import { Container, Row, Col, Alert, Image } from "react-bootstrap";

class Map extends Component {
  render() {
    return (
      <>
        <h2>Real-time Map</h2>
        <Image src="./static-wild-fire.png" fluid rounded height={100} />
      </>
    );
  }
}

export default Map;
