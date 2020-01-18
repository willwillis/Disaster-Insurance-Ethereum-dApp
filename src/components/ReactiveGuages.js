import React, { Component } from "react";
import ReactDOM from "react-dom";
import Web3 from "web3";
import Lassie from "../abis/Lassie.json";
import Guage from "./Guage";
import { Container, Row, Col, Alert, Image } from "react-bootstrap";
import {
  contractStateToString,
  responderStateToString,
  thresholdToString,
  thresholdToValue,
  contractToValue
} from "./Utils";

import GaugeChart from "react-gauge-chart";

class ReactiveGuages extends Component {
  async loadWeb3() {
    // window.alert('loadWeb3')
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Lassie.networks[networkId];
    this.setState({ networkID: networkId });
    const blockNumber = await web3.eth.getBlockNumber();
    console.log("blockNumber: " + blockNumber);
    this.setState({ blockNumber });
    if (networkData) {
      // window.alert('loadBlockChainData ... networkData is truthy...')
      const lassie = web3.eth.Contract(Lassie.abi, networkData.address);
      this.setState({ lassie });
      const sensorCount = await lassie.methods.sensorCount().call();
      console.log(sensorCount.toString());
      this.setState({ sensorCount });
      for (var i = 1; i <= sensorCount; i++) {
        const sensor = await lassie.methods.sensors(i).call();
        this.setState({
          sensors: [...this.state.sensors, sensor]
        });
      }
      const networkDataAddress = networkData.address;
      this.setState({ networkDataAddress });

      const contractState = await lassie.methods.contractState().call();
      this.setState({ contractState });

      const responderState = await lassie.methods.responderState().call();
      this.setState({ responderState });

      const smokeThresholdBreached = await lassie.methods
        .smokeThresholdBreached()
        .call();
      this.setState({ smokeThresholdBreached });

      const temperatureThresholdBreached = await lassie.methods
        .temperatureThresholdBreached()
        .call();
      this.setState({ temperatureThresholdBreached });

      const name = await lassie.methods.name().call();
      this.setState({ name });

      console.log("Sensors");
      console.log(this.state.sensors);
      console.log("contractState" + this.state.contractState);
      this.setState({ loading: false });
    } else {
      window.alert("Lassie contract not deployed to detected network.");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      sensorCount: 0,
      sensors: [],
      loading: true,
      blockNumber: "",
      contractState: "",
      responderState: "",
      smokeThreshold: 1,
      tempThreshold: 150,
      smokeThresholdBreached: "",
      temperatureThresholdBreached: "",
      name: "",
      networkDataAddress: "",
      networkId: "",
      mapCenter: {
        lat: -25.2744,
        lng: 133.7751
      },
      date: new Date()
    };

    // this.createSensor = this.createSensor.bind(this);
    // this.setResponderState = this.setResponderState.bind(this);
    // this.setTemp = this.setTemp.bind(this);
    // this.setSmoke = this.setSmoke.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 4000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // moved this logic to AddSensor.js COmponent.
  createSensor(name, lat, lon, endpoint) {
    //this.setState({ loading: true });
    this.state.lassie.methods
      .createSensor(name, lat, lon, endpoint)
      .send({ from: this.state.account })
      .once("receipt", receipt => {
        this.setState({ loading: false });
        window.location.reload(true);
      });
  }

  setResponderState(newInt) {
    //this.setState({ loading: true });
    this.state.lassie.methods
      .setResponderState(newInt)
      .send({ from: this.state.account })
      .once("receipt", receipt => {
        this.setState({ loading: false });
      });
  }

  setSmoke(breachedBool, sensorName) {
    this.state.lassie.methods
      .setSmoke(breachedBool, sensorName)
      .send({ from: this.state.account })
      .once("receipt", receipt => {
        this.setState({ loading: false, temperatureThresholdBreached: true });
      });
  }

  setTemp(breachedBool, sensorName) {
    this.state.lassie.methods
      .setTemperature(breachedBool, sensorName)
      .send({ from: this.state.account })
      .once("receipt", receipt => {
        this.setState({ loading: false, smokeThresholdBreached: true });
      });
  }

  tick() {
    this.loadWeb3();
    this.loadBlockchainData();
  }

  render() {
    return (
      <div>
        <>
          {this.state.loading ? (
            <div>Loading..</div>
          ) : (
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
                      percent={
                        contractToValue(this.state.contractState) || 0.15
                      }
                      needleColor="#345243"
                      textColor="black"
                      formatTextValue={value =>
                        contractStateToString(this.state.contractState) ||
                        "Loading.."
                      }
                      animDelay={500}
                    />
                  </Col>
                  <Col xs={12} lg={3}>
                    <h5 class="text-center">Fire Defense Co. Status</h5>
                    <GaugeChart
                      id="gauge-chart2"
                      nrOfLevels={3}
                      percent={
                        contractToValue(this.state.responderState) || 0.15
                      }
                      needleColor="#345243"
                      textColor="black"
                      formatTextValue={value =>
                        responderStateToString(this.state.responderState) ||
                        "Loading.."
                      }
                      animDelay={500}
                    />
                  </Col>

                  <Col xs={12} lg={3}>
                    <h5 class="text-center">Smoke Threshold</h5>
                    <GaugeChart
                      id="gauge-chart3"
                      percent={
                        thresholdToValue(this.state.smokeThresholdBreached) ||
                        0.15
                      }
                      colors={["#5BE12C", "#F5CD19", "#EA4228"]}
                      nrOfLevels={2}
                      textColor="black"
                      formatTextValue={value =>
                        thresholdToString(this.state.smokeThresholdBreached) ||
                        "Loading..."
                      }
                      animDelay={500}
                    />
                  </Col>

                  <Col xs={12} lg={3}>
                    <h5 class="text-center">Temperature Threshold</h5>
                    <GaugeChart
                      id="gauge-chart4"
                      nrOfLevels={2}
                      percent={
                        thresholdToValue(
                          this.state.temperatureThresholdBreached
                        ) || 0.15
                      }
                      needleColor="#345243"
                      colors={["#5BE12C", "#F5CD19", "#EA4228"]}
                      textColor="black"
                      formatTextValue={value =>
                        thresholdToString(
                          this.state.temperatureThresholdBreached
                        ) || "Loading..."
                      }
                      animDelay={500}
                    />
                  </Col>
                </Row>
              </Container>
            </Alert>
          )}
        </>
      </div>
    );
  }
}

// ReactDOM.render("<div>Hi There</div>", document.getElementById("root"));

export default ReactiveGuages;
