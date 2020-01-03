import React, { Component } from "react";

class AddSensor extends Component {
  //   createSensor(name, lat, lon, endpoint) {
  //     this.setState({ loading: true });
  //     this.state.lassie.methods
  //       .createSensor(name, lat, lon, endpoint)
  //       .send({ from: this.state.account })
  //       .once("receipt", receipt => {
  //         this.setState({ loading: false });
  //       });
  //   }

  render() {
    return (
      <>
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
      </>
    );
  }
}

export default AddSensor;
