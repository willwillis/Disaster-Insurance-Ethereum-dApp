import React, { Component, useEffect, useState } from "react";
import { Container, Row, Col, Alert, Image } from "react-bootstrap";
import {
  contractStateToString,
  responderStateToString,
  thresholdToString,
  thresholdToValue,
  contractToValue
} from "./Utils";

import GaugeChart from "react-gauge-chart";

const chartStyle = {
  class: "text-center"
};

class Guage extends Component {
  render() {
    return (
      <>
        {/* <h2>Contract Overview</h2> */}
        <Alert variant={""}>
          <Container fluid>
            <Row>
              <Col lg={6}>
                <h3 class="text-center">Contract Parties</h3>
              </Col>
              <Col lg={6} class="text-center">
                <h3 class="text-center">Contract Variables</h3>
              </Col>
            </Row>
            <Row>
              <Col xs={12} lg={3}>
                <h5 class="text-center">Lassie Insurance Status</h5>
                <GaugeChart
                  id="gauge-chart1"
                  nrOfLevels={3}
                  percent={contractToValue(this.props.contractState)}
                  needleColor="#345243"
                  textColor="black"
                  formatTextValue={value =>
                    contractStateToString(this.props.contractState)
                  }
                  animDelay={6700}
                />
              </Col>
              <Col xs={12} lg={3}>
                <h5 class="text-center">Fire Defense Co. Status</h5>
                <GaugeChart
                  id="gauge-chart2"
                  nrOfLevels={3}
                  percent={contractToValue(this.props.responderState)}
                  needleColor="#345243"
                  textColor="black"
                  formatTextValue={value =>
                    responderStateToString(this.props.responderState)
                  }
                  animDelay={8000}
                />
              </Col>

              <Col xs={12} lg={3}>
                <h5 class="text-center">Smoke Threshold</h5>
                <GaugeChart
                  id="gauge-chart3"
                  percent={thresholdToValue(this.props.smokeThresholdBreached)}
                  colors={["#5BE12C", "#F5CD19", "#EA4228"]}
                  nrOfLevels={2}
                  textColor="black"
                  formatTextValue={value =>
                    thresholdToString(this.props.smokeThresholdBreached)
                  }
                  animDelay={5000}
                />
              </Col>

              <Col xs={12} lg={3}>
                <h5 class="text-center">Temperature Threshold</h5>
                <GaugeChart
                  id="gauge-chart4"
                  nrOfLevels={2}
                  percent={thresholdToValue(
                    this.props.temperatureThresholdBreached
                  )}
                  needleColor="#345243"
                  colors={["#5BE12C", "#F5CD19", "#EA4228"]}
                  textColor="black"
                  formatTextValue={value =>
                    thresholdToString(this.props.temperatureThresholdBreached)
                  }
                  animDelay={3000}
                />
              </Col>
            </Row>
          </Container>
        </Alert>
      </>
    );
  }
}

export default Guage;
