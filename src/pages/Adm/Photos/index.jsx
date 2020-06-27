import React from "react";
import Header from "../../../components/Header";

import photo_icon from "../../../assets/photo.svg";

function Photos() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="container-fluid d-flex align-items-baseline w-100">
          <div className="d-flex align-items-end pl-2 pt-5">
            {" "}
            <img src={photo_icon} style={{ width: "45px" }} alt="Photos" />
            <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">
              Fotos
            </h3>
          </div>
          {/* <button type="button" className="btn btn-info align-self-end ml-auto" > */}
          <label
            htmlFor="upload"
            className="btn btn-info align-self-end m-0 ml-auto"
            title="Fazer upload de arquivo"
          >
            Adicionar Foto <i className="fas fa-plus"></i>
            <input
              type="file"
              name="Document"
              id="upload"
              style={{ width: "0", height: "0" }}
            />
          </label>
          {/* </button> */}
        </div>
        <hr className="my"></hr>
        <div className="container"></div>
      </div>
    </>
  );
}

export default Photos;
