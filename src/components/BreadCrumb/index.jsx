import React from "react";

import "./styles.css";

function BreadCrumb(props) {
  let { data } = props;

  function updateStack(index) {
    const parent = data[index].parent;

    props.setParent(parent);
    props.setStackParent(data.slice(0, ++index));
  }

  return (
    <nav aria-label="breadcrumb" className="nav-breadcrumb">
      <ol className="breadcrumb">
        {data.map((element, index, array) => {
          const { legend } = element;
          const isEndArray = Object.keys(array).length - 1 === index;

          return (
            <li
              key={index}
              className={`breadcrumb-item ${isEndArray ? "active" : ""}`}
            >
              {" "}
              {isEndArray ? (
                legend
              ) : (
                <span onClick={() => updateStack(index)}>{legend}</span>
              )}{" "}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default BreadCrumb;
