import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

const DIR = process.env.REACT_APP_DIR;

function BreadCrumb(props) {
  let { data, path } = props;

  return (
    <nav aria-label="breadcrumb" className="nav-breadcrumb">
      <ol className="breadcrumb">
        {data.map((element, index, array) => {
          const { legend, parent } = element;
          const isEndArray = Object.keys(array).length - 1 === index;

          return ( 
            <li
              key={index}
              className={`breadcrumb-item ${isEndArray ? "active" : ""}`}
            >
              {isEndArray ? (
                legend
              ) : (
                <Link
                  to={`/${DIR}/${path}/${parent}`}
                >
                  {legend}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default BreadCrumb;
