import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoid2lsbHdpbGxpcyIsImEiOiJjanp2d2Z4aDcwMHFmM25wem95a3o3bzhiIn0.KcQntwKgiKyyzQmAn5qQ7Q"
});

class MapBox extends Component {
  render() {
    return (
      <>
        <h2> Mapbox</h2>
        <Map
          style="mapbox://styles/mapbox/satellite-v9"
          containerStyle={{
            height: "300px",
            width: "100%"
          }}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}
          >
            <Feature coordinates={[37.85, -120.083333]} />
          </Layer>
        </Map>
      </>
    );
  }
}

export default MapBox;
