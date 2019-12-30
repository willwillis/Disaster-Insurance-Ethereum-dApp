import React, { Component } from "react";

class Main extends Component {
  render() {
    return (
      <div id="content">
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
