import React from "react";
import "./App.css";

const Marker = props => {
  const { color, name, id } = props;
  return (
    <>
      {" "}
      <div
        className="marker"
        style={{
          backgroundColor: color,
          cursor: "pointer",
          border: "2px solid green"
        }}
        title={name}
      />
      <div className="pt-2 pull-right font-weight-bold marker-text">
        &nbsp; <span className="alpha-bg">{name}</span>
      </div>
    </>
  );
};

export default Marker;
