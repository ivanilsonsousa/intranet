import React from "react";

import "./styles.css";

function Callout(props) {
  let classes = "callout " + props.className;

  return (
    <div className={classes}>
      <div className="row d-flex justify-content-between px-2">
        <h4>{props.title}</h4>
        <span>{props.date}</span>
      </div>
      <div className="row px-2">{props.description}</div>
    </div>
  );
}

export default Callout;
