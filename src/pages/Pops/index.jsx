import React from "react";
import Header from "../../components/Header";
import Search from "../../components/Search";
import Tree from "../../components/Accordion";

import file from "../../assets/file-black.svg";

function Pops() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="container-fluid d-flex align-items-baseline w-100">
          <div className="d-flex align-items-end pl-2 pt-5">
            {" "}
            <img src={file} style={{ width: "50px" }} alt="Posts" />
            <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">
              POPs
            </h3>
          </div>
          <Search className="ml-auto" onChange={() => {}} />
        </div>
        <hr className="my"></hr>
        <div className="container mx-3">
          <Tree />
        </div>
      </div>
    </>
  );
}

export default Pops;
