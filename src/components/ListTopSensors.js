import React, { Component } from "react";
import { WiSmoke, WiThermometer } from "weather-icons-react";
import { getRandomInt } from "./Utils";
class ListSensorsNarrow extends Component {
  render() {
    return (
      <>
        <h4>Real-time Readings</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sensor</th>
              <th scope="col" className="text-center">
                <WiSmoke size={50} color="#000" />
              </th>
              <th scope="col" className="text-center">
                <WiThermometer size={50} color="#000" />
              </th>
            </tr>
          </thead>
          <tbody id="sensorList">
            <tr>
              <td></td>
              <td></td>
            </tr>
            {this.props.sensors.map((sensor, key) => {
              return (
                <tr key={key}>
                  <td>{sensor.name}</td>
                  <td className="text-center">{getRandomInt(5, 8)}</td>
                  <td className="text-center">{getRandomInt(60, 63)}</td>
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
