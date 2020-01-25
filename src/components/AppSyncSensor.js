import React, { Component } from "react";
import { Col } from "react-bootstrap";
// import linkState from "react-link-state";

// import { Logger } from "aws-amplify";

import Amplify from "@aws-amplify/core";
import "@aws-amplify/pubsub";
import API, { graphqlOperation, Logger } from "@aws-amplify/api";
import aws_exports from "../aws-exports.js";
Amplify.configure(aws_exports);

console.log(
  " @ DEBUG @ aws_exports:" + JSON.stringify(Amplify.configure(aws_exports))
);

const onUpdateSensor = `subscription 
OnUpdateSensor{onUpdateSensor(id: "Pi4") 
{id,temp,smoke,lat,long,timestamp}}`;

class AppSyncSensor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      temp: "",
      smoke: "",
      lat: "",
      lon: "",
      timestamp: "",
      display: false
    };

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
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
            console.log(
              "@ DEBUG @ TEMP IS: " + event.value.data.onUpdateSensor.temp
            );

            if (event.value.data.onUpdateSensor.temp > 40) {
              console.log("@ DEBUG @ TEMP THRESHOLD BREACHED ----------");
              this.props.setTemp(true, "Pi4");
            }
            this.setState({
              smoke: event.value.data.onUpdateSensor.smoke
            });
            if (event.value.data.onUpdateSensor.smoke > 200) {
              this.props.setSmoke(true, "Pi4");
              console.log("@ DEBUG @ I SMOKE Breached.....");
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
        <td>Pi 4</td>
        <td className="text-center">{this.state.smoke}</td>
        <td className="text-center">{this.state.temp}</td>
      </tr>
    );
  }
}

export default AppSyncSensor;
