import React, { Component } from "react";
import {
  contractStateToString,
  responderStateToString,
  thresholdToString
} from "./Utils";
import GaugeChart from "react-gauge-chart";
import { Container, Row, Col, Alert, Image } from "react-bootstrap";

class Main extends Component {
  render() {
    return (
      <div id="content">
        <>
          {" "}
          <Alert variant={"secondary"}>
            <Container>
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
                  <h5 class="text-center">Manager State</h5>
                  <GaugeChart
                    id="gauge-chart1"
                    nrOfLevels={3}
                    percent={0.15}
                    needleColor="#345243"
                    textColor="black"
                    formatTextValue={value =>
                      contractStateToString(this.props.contractState)
                    }
                  />
                </Col>
                <Col xs={12} lg={3}>
                  <h5 class="text-center">Response Team</h5>
                  <GaugeChart
                    id="gauge-chart2"
                    nrOfLevels={3}
                    percent={0.15}
                    needleColor="#345243"
                    textColor="black"
                    formatTextValue={value =>
                      responderStateToString(this.props.responderState)
                    }
                  />
                </Col>

                <Col xs={12} lg={3}>
                  <h5 class="text-center">Smoke Threshold</h5>
                  <GaugeChart
                    id="gauge-chart3"
                    percent={0.1}
                    colors={["#5BE12C", "#F5CD19", "#EA4228"]}
                    nrOfLevels={2}
                    textColor="black"
                    formatTextValue={value => "Below Threshold"}
                  />
                </Col>

                <Col xs={12} lg={3}>
                  <h5 class="text-center">Temperature Threshold</h5>
                  <GaugeChart
                    id="gauge-chart4"
                    nrOfLevels={2}
                    percent={0.15}
                    needleColor="#345243"
                    colors={["#5BE12C", "#F5CD19", "#EA4228"]}
                    textColor="black"
                    formatTextValue={value => "Below Threshold"}
                  />
                </Col>
              </Row>
            </Container>
          </Alert>
        </>
        <h2>Real-time Map</h2>
        <Image src="./static-wild-fire.png" fluid rounded height={100} />

        <h2>Add a Sensor</h2>
        <form
          onSubmit={event => {
            event.preventDefault();
            const name = this.sensorName.value;
            // const price = window.web3.utils.toWei(
            //   this.sensorPrice.value.toString(),
            //   "Ether"
            // );
            const lat = this.sensorLat.value;
            const lon = this.sensorLon.value;
            const endpoint = this.sensorEndpoint.value;
            this.props.createSensor(name, lat, lon, endpoint);
          }}
        >
          <div className="form-group mr-sm-2">
            <input
              id="sensorName"
              type="text"
              ref={input => {
                this.sensorName = input;
              }}
              className="form-control"
              placeholder="Sensor Name"
              required
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="sensorLat"
              type="text"
              ref={input => {
                this.sensorLat = input;
              }}
              className="form-control"
              placeholder="Sensor Latitude"
              required
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="sensorLon"
              type="text"
              ref={input => {
                this.sensorLon = input;
              }}
              className="form-control"
              placeholder="Sensor Longitude"
              required
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="sensorEndpoint"
              type="text"
              ref={input => {
                this.sensorEndpoint = input;
              }}
              className="form-control"
              placeholder="AWS Endpoint"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Sensor
          </button>
        </form>
        <p>&nbsp;</p>
        <h2>Sensor List</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Lat</th>
              <th scope="col">Lon</th>
              <th scope="col">Endpoint</th>
              <th scope="col">Owner</th>
            </tr>
          </thead>
          <tbody id="sensorList">
            {this.props.sensors.map((sensor, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{sensor.id.toString()}</th>
                  <td>{sensor.name}</td>
                  <td>{sensor.lat}</td>
                  <td>{sensor.lon}</td>
                  <td>{sensor.endpoint}</td>
                  <td>{sensor.owner}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
