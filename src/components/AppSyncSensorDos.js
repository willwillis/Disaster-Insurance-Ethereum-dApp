import React, { Component } from "react";
import { Col } from "react-bootstrap";

// import { Logger } from "aws-amplify";

import Amplify from "@aws-amplify/core";
import "@aws-amplify/pubsub";
import API, { graphqlOperation, Logger } from "@aws-amplify/api";
import aws_exports from "../aws-exports.js";
Amplify.configure(aws_exports);

console.log(
  " @ DEBUG @ aws_exports:" + JSON.stringify(Amplify.configure(aws_exports))
);

// const onUpdateSensor = `subscription OnUpdateSensor($id: ID!) {
//     onUpdateSensor(id: $id) {
//       id
//       temp
//       smoke
//       lat
//       long
//       timestamp
//     }
//   }
//   `;

const onUpdateSensor = `subscription 
OnUpdateSensor{onUpdateSensor(id: "PiZero") 
{id,temp,smoke,lat,long,timestamp}}`;

class AppSyncSensorDos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      temp: "",
      smoke: "",
      lat: "",
      lon: "",
      timestamp: "",
      display: false,
      smokeThreshold: 200,
      tempThreshold: 40,
      smokeClass: "",
      tempClass: ""
    };

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  thresholdBreachedClass(value, threshold) {
    if (threshold > value) {
      // we've breached
      return "alert alert-danger";
    } else {
      return "";
    }
  }

  async componentDidMount() {
    console.log("@ DEBUG @ I got to componentDidMount.... ");
    this.subscription = API.graphql(graphqlOperation(onUpdateSensor)).subscribe(
      {
        next: event => {
          //   console.log("@ DEBUG @ I got to subscribe");
          if (event) {
            console.log(
              "Subscription: " + JSON.stringify(event.value.data, null, 2)
            );
            this.setState({ display: true });
            this.setState({
              temp: event.value.data.onUpdateSensor.temp
            });
            if (this.temp > this.tempThreshold) {
              this.state.tempClass = "text-center alert alert-danger";
              this.props.setTemp(true, "PiZero");
            } else {
              this.state.tempClass = "text-center";
            }
            this.setState({
              smoke: event.value.data.onUpdateSensor.smoke
            });
            if (event.value.data.onUpdateSensor.smoke > this.smokeThreshold) {
              this.state.smokeClass = "text-center alert alert-danger";
              this.props.setSmoke(true, "PiZero");
            } else {
              this.state.smokeClass = "text-center";
            }
          }
        }
      }
    );
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <tr className="display-4">
        <td>Pi Zero</td>
        {""}
        <td className={this.state.smokeClass}>{this.state.smoke}</td>
        <td className={this.state.tempClass}>{this.state.temp}</td>
      </tr>
    );
  }
}

export default AppSyncSensorDos;
