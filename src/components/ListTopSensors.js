import React, { Component } from "react";
import { WiSmoke, WiThermometer } from "weather-icons-react";
import { getRandomInt } from "./Utils";
import AppSyncSensor from "./AppSyncSensor";
import AppSyncSensorDos from "./AppSyncSensorDos";
class ListSensorsNarrow extends Component {
  render() {
    return (
      <>
        <table className="table">
          <thead>
            <tr className="display-4">
              <th scope="col">
                <h4>Real-time Readings </h4>
              </th>
              <th scope="col" className="text-center">
                <WiSmoke size={50} color="#000" />
                <h4>Smoke</h4>
              </th>
              <th scope="col" className="text-center">
                <WiThermometer size={50} color="#000" />
                <h4>Temp.</h4>
              </th>
            </tr>
            <AppSyncSensorDos />
            <AppSyncSensor />
          </thead>
          <tbody id="sensorList">
            {this.props.sensors.map((sensor, key) => {
              return (
                <tr key={key}>
                  <td>{sensor.name}</td>
                  {/* smoke  */}
                  <td className="text-center">{getRandomInt(95, 120)}</td>
                  <td className="text-center">{getRandomInt(23, 29)}</td>
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
