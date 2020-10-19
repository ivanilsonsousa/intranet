import React, { useState, useEffect, useContext, memo } from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";

import { Context } from "../../Context/AuthContext";

import api from "../../services/api";
import logo from "../../assets/logo-intranet.svg";

import "./styles.css";

function Header(props) {
  const [modal, setModal] = useState(false);
  const { authenticated, handleLogout } = useContext(Context);
  const [ip, setIp] = useState("");

  function logout() {
    handleLogout();
    setModal(false);
  }

  useEffect(() => {
    api
      .get("/my-ip")
      .then((res) => setIp(`Meu IP é ${ res.data.ip }`))
      .catch(() => setIp("Sem conexão"));
  }, []);

  return (
    <>
      <div className="sub-header d-flex bg-light px-3 align-items-center">
        <Link to="/">
          <img src={logo} style={{ height: "60px" }} alt="logo" />
        </Link>
        <div className="row d-flex justify-content-sm-between align-items-sm-center w-100 px-sm-5 justify-content-end pr-2 pr-sm-0">
          <h1 className="display-4 m-0 no-touch">Intranet</h1>
          <div className="d-flex justify-content-sm-between align-items-sm-center ">
            <span className="meu-ip mr-2">{ ip }</span>
            {
            authenticated &&
            <button
              type="button"
              className="btn btn-light"
              onClick={() => setModal(true)}
            >
              <i className="fas fa-sign-out-alt" title="Sair do sistema"></i>
            </button>
            }
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark color-default p-0">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse pl-2"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <li className={`nav-item ${props.flag === "Home" && "active" }`}>
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li
              className={`nav-item ${props.flag === "Empresa" && "active"}`}
            >
              <Link className="nav-link" to="/company">
                Empresa
              </Link>
            </li>
            <li className={`nav-item ${props.flag === "TI" && "active"}`}>
              <Link className="nav-link" to="/login">
                Configurações
              </Link>
            </li>
            <li
              className={`nav-item ${
                props.flag === "Documentos" && "active"
              }`}
            >
              <Link className="nav-link" to="/documents">
                Documentos
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Modal
        title={"Deseja realmente sair do sistema"}
        show={modal}
        onDisable={setModal}
        func={() => logout()}
      />
    </>
  );
}

export default memo(Header);
