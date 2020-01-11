import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const API_KEY = process.env.GOOGLE_MAP_API_KEY;

class SimpleMap extends Component {
  static defaultProps = {
    // center: { // California
    //   lat: 37.85,
    //   lng: -120.083333
    // },
    center: {
      // Australia
      lat: -35.85,
      lng: 148
    },
    zoom: 11
  };

  //   static getMapOptions = (maps: Maps) => {
  //     return {
  //       streetViewControl: false,
  //       scaleControl: true,
  //       fullscreenControl: false,
  //       styles: [
  //         {
  //           featureType: "poi.business",
  //           elementType: "labels",
  //           stylers: [
  //             {
  //               visibility: "off"
  //             }
  //           ]
  //         }
  //       ],
  //       gestureHandling: "greedy",
  //       disableDoubleClickZoom: true,
  //       minZoom: 11,
  //       maxZoom: 18,

  //       mapTypeControl: true,
  //       mapTypeId: maps.MapTypeId.SATELLITE,
  //       mapTypeControlOptions: {
  //         style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
  //         position: maps.ControlPosition.BOTTOM_CENTER,
  //         mapTypeIds: [
  //           maps.MapTypeId.ROADMAP,
  //           maps.MapTypeId.SATELLITE,
  //           maps.MapTypeId.HYBRID
  //         ]
  //       },

  //       zoomControl: true,
  //       clickableIcons: false
  //     };
  //   };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "450px", width: "100%" }} className="">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDVu7n8GFMljA8sDPmEC24k-0RIjXFVaVo" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          mapTypeId={"satellite"}
          options={this.getMapOptions}
        >
          {this.props.sensors.map((sensor, key) => {
            return (
              <Marker
                lat={sensor.lat}
                lng={sensor.lon}
                name={sensor.name}
                color={"white"}
              />
            );
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
