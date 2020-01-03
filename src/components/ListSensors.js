import React, { Component } from "react";

class ListSensors extends Component {
  render() {
    return (
      <>
        <h2>Full Sensor List</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Lat</th>
              <th scope="col">Lon</th>
              <th scope="col">IoT Endpoint</th>
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
      </>
    );
  }
}

export default ListSensors;
