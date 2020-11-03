import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

function Option(props) {
  return (
    <Link
      to={props.to}
      className="option-dashboard"
      style={{ backgroundColor: props.backgroundColor }}
    >
      <img src={props.image} style={{ height: "55px" }} alt="logo" />
      <span className="m-3">{props.legend}</span>
    </Link>
  );
}

export default Option;
