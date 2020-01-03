import React, { Component } from "react";
import Web3 from "web3";
// import logo from "../logo.png";
import "./App.css";
import Lassie from "../abis/Lassie.json";
import Navbar from "./Navbar";
import About from "./About";
import Guage from "./Guage";
// import ListSensors from "./ListSensors";
import ListSensorsNarrow from "./ListSensorsNarrow";
import { Container, Row, Col, Alert, Image } from "react-bootstrap";
import AddSensor from "./AddSensor";
import Trends from "./Trends";
import MapBox from "./MapBox";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

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
      networkId: ""
    };

    this.createSensor = this.createSensor.bind(this);
  }

  // moved this logic to AddSensor.js COmponent.
  createSensor(name, lat, lon, endpoint) {
    this.setState({ loading: true });
    this.state.lassie.methods
      .createSensor(name, lat, lon, endpoint)
      .send({ from: this.state.account })
      .once("receipt", receipt => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        <Navbar
          account={this.state.account}
          networkDataAddress={this.state.networkDataAddress}
          contractName={this.state.name}
          networkID={this.state.networkID}
          blockNumber={this.state.blockNumber}
        />
        <About />
        {this.state.loading ? (
          <div id="loader" className="text-center">
            <p className="text-center">Loading...</p>
          </div>
        ) : (
          <>
            <Row>
              <Col xs={12} lg={9}>
                <Guage
                  createSensor={this.createSensor}
                  contractState={this.state.contractState}
                  responderState={this.state.responderState}
                  smokeThresholdBreached={this.state.smokeThresholdBreached}
                  temperatureThresholdBreached={
                    this.state.temperatureThresholdBreached
                  }
                />
                <MapBox sensors={this.state.sensors} />
                <Trends />
              </Col>
              <Col xs={12} lg={3}>
                <ListSensorsNarrow sensors={this.state.sensors} />
                {/* <AddSensor /> */}
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
                    this.createSensor(name, lat, lon, endpoint);
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
              </Col>
            </Row>
          </>
        )}
      </div>
    );
  }
}

export default App;
