import React, { Component } from "react";

class ListSensorsNarrow extends Component {
  render() {
    return (
      <>
        <h4>Recently Added Sensors</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody id="sensorList">
            {this.props.sensors.map((sensor, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{sensor.id.toString()}</th>
                  <td>{sensor.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default ListSensorsNarrow;
