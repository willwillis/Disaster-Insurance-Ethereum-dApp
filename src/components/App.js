import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import Lassie from "../abis/Lassie.json";
import Navbar from "./Navbar";
import About from "./About";
import Guage from "./Guage";
import ListTopSensors from "./ListTopSensors";
import { Row, Col } from "react-bootstrap";
import AddSensor from "./AddSensor";
import GMap from "./GMap";
import ListSensors from "./ListSensors";
import SiteFooter from "./SiteFooter";
import { FaNetworkWired } from "react-icons/fa";
import OverrideResponder from "./OverrideResponder";
import AppSyncSensor from "./AppSyncSensor";
import AppSyncSensorDos from "./AppSyncSensorDos"; // refactor || die($!)

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
      networkId: "",
      mapCenter: {
        lat: -25.2744,
        lng: 133.7751
      }
    };

    this.createSensor = this.createSensor.bind(this);
    this.setResponderState = this.setResponderState.bind(this);
    this.setTemp = this.setTemp.bind(this);
    this.setSmoke = this.setSmoke.bind(this);
  }

  // moved this logic to AddSensor.js COmponent.
  createSensor(name, lat, lon, endpoint) {
    //this.setState({ loading: true });
    this.state.lassie.methods
      .createSensor(name, lat, lon, endpoint)
      .send({ from: this.state.account })
      .once("receipt", receipt => {
        this.setState({ loading: false });
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

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div id="loader" className="text-center">
            <p className="text-center align-middle height-100">
              <h1 className="bigger">
                <FaNetworkWired />
              </h1>
              <h1>Connecting to Ethereum Network...</h1>
            </p>
          </div>
        ) : (
          <>
            <Navbar
              account={this.state.account}
              networkDataAddress={this.state.networkDataAddress}
              contractName={this.state.name}
              networkID={this.state.networkID}
              blockNumber={this.state.blockNumber}
            />
            <About contractName={this.state.name} />
            <Row>
              <Col xs={12} lg={9}>
                <Guage
                  contractState={this.state.contractState}
                  responderState={this.state.responderState}
                  smokeThresholdBreached={this.state.smokeThresholdBreached}
                  temperatureThresholdBreached={
                    this.state.temperatureThresholdBreached
                  }
                />
                <GMap
                  sensors={this.state.sensors}
                  center={this.state.mapCenter}
                  zoom={4}
                />
              </Col>
              <Col xs={12} lg={3} className={"p-3 mb-2 bg-light text-dark"}>
                <Row>
                  <Col>
                    Smoke Threshold: 200
                    <br />
                    Temp Threshold: 40
                  </Col>
                </Row>
                <Row>
                  <AppSyncSensor
                    sensorName={"Pi4"}
                    setTemp={this.setTemp}
                    setSmoke={this.setSmoke}
                    smokeThresholdBreached={this.state.smokeThresholdBreached}
                    temperatureThresholdBreached={
                      this.state.temperatureThresholdBreached
                    }
                  ></AppSyncSensor>
                  <AppSyncSensorDos
                    sensorName={"PiZero"}
                    setTemp={this.setTemp}
                    setSmoke={this.setSmoke}
                    smokeThresholdBreached={this.state.smokeThresholdBreached}
                    temperatureThresholdBreached={
                      this.state.temperatureThresholdBreached
                    }
                  ></AppSyncSensorDos>
                </Row>
                <ListTopSensors
                  sensors={this.state.sensors.slice(-3).reverse()}
                />
                <AddSensor createSensor={this.createSensor} />
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <ListSensors sensors={this.state.sensors} />
              </Col>
            </Row>
            <SiteFooter sensors={this.state.sensors} />
            <Row>
              <Col>
                {" "}
                <OverrideResponder setResponderState={this.setResponderState} />
              </Col>
              <Col></Col>
            </Row>
          </>
        )}
      </div>
    );
  }
}

export default App;
