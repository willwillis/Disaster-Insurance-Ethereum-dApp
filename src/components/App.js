import React, { Component } from "react";
import Web3 from "web3";
// import logo from "../logo.png";
import "./App.css";
import Lassie from "../abis/Lassie.json";
import Navbar from "./Navbar";
import About from "./About";
import Main from "./Main";
// import Trends from "./Trends";

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
      name: ""
    };

    this.createSensor = this.createSensor.bind(this);
    //this.purchaseSensor = this.purchaseSensor.bind(this);
  }

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
        <Navbar account={this.state.account} />
        <About />
        <div className="container-fluid mt-0">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              {this.state.loading ? (
                <div id="loader" className="text-center">
                  <p className="text-center">Loading...</p>
                </div>
              ) : (
                <Main
                  sensors={this.state.sensors}
                  createSensor={this.createSensor}
                  contractState={this.state.contractState}
                  responderState={this.state.responderState}
                  smokeThresholdBreached={this.state.smokeThresholdBreached}
                  temperatureThresholdBreached={
                    this.state.temperatureThresholdBreached
                  }
                />
              )}
            </main>
            {/* <Trends /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
