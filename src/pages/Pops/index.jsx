import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader as Spinner } from "react-spinners";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BreadCrumb from "../../components/BreadCrumb2";
import Modal from "../../components/ModalNew";
import Directory from "../../components/Directory2";
import api from "../../services/api";

import { Context } from "../../Context/AuthContext";
import "./styles.css";

import file_icon from "../../assets/file-black.svg";

const DIR = process.env.REACT_APP_DIR;

function Pops() {
  const [folder, setFolder] = useState("");
  const [dirUpdate, setDirUpdate] = useState("");
  const [dir, setDir] = useState([]);
  const [load, setLoad] = useState(true);

  const [stackParent, setStackParent] = useState([]);
  const params = useParams(`/${DIR}/pops/:parent`);
  const { authenticated } = useContext(Context);
  const { parent} = params;

  const modalNewFolder = useRef(null);
  const modalMessage = useRef(null);

  useEffect(() => {
    setLoad(true);

    // Array.from(Array(100000).keys()).map(n => console.log(n))

    api
      .get(`/pops/${parent}`)
      .then((res) => {
        console.log(res.data)
        setDir(res.data.result);
        setStackParent(res.data.bread);
        setLoad(false);
      })
      .catch((err) => {
        setLoad(false);
        setDir([]);
      });
  }, [parent, dirUpdate]);

  function closeModal() {
    setFolder("");
    modalNewFolder.current.closeModal();
  }

  function makeFolder() {
    if (!folder) {
      modalMessage.current.openModal();
      return;
    }

    api
      .post(`/pops/${parent}`, { title: folder })
      .then((response) => {
        setDirUpdate(response.data._id);
        closeModal();
      })
      .catch((err) => {
        try {
          const message =
            err.response.status === 409
              ? "Essa pasta já existe"
              : "Erro ao criar a pasta";
          alert(message);
        } catch (err) {
          alert("Sem resposta do servidor...");
        }
      });
  }

  function handleNewFile(e) {
    const { files } = e.target;

    const data = new FormData();

    data.append("type", 'file');
    data.append("parent", parent);
    
    Array.from(files).map(file => {
      data.append("files", file);
    });

    console.log(files);

    api
      .post('/pops', data)
      .then((response) => {
        setDirUpdate(Date.now());
      })
      .catch((err) => {
        console.error(err);
      });

  }

  return (
    <>
      <Header flag="Pops"/>
      <div className="container-fluid">
        <div className="container-fluid d-flex align-items-baseline w-100">
          <div className="d-flex align-items-end pl-2 pt-5">
            <img
              src={file_icon}
              style={{ width: "45px" }}
              alt="Icone de Pasta"
            />
            <h3 className=" ml-3 mb-0 display-3 title align-text-bottom">
              Procedimentos Operacionais Padrão
            </h3>
          </div>
          {authenticated && 
          <>
            <button
              type="button"
              className="btn btn-secondary align-self-end new-folder ml-auto"
              onClick={() => modalNewFolder.current.openModal()}
            >
              Nova Pasta <i className="fas fa-folder-plus"></i>
            </button>

            <label
              htmlFor={parent !== "root" ? "upload" : ""}
              className={`btn btn-light align-self-end ml-2 new-file label-upload-pop ${parent === "root" ? "btn-disabled" : ""}`}
            >
              <input
                id="upload"
                type="file"
                multiple="multiple"
                accept="application/pdf"
                onChange={handleNewFile}
                onClick={(e) => e.target.value = null }
              />
                Novo Arquivo <i className="fas fa-cloud-upload-alt"></i>
            </label>

          </>}  
        </div>
      </div>
      {stackParent && (
        <BreadCrumb
          data={stackParent}
          path="pops"
          setStackParent={setStackParent}
          stackParent={stackParent}
        />
        )}
      <div className="container-fluid">
      <hr className="my" />
        {load ? (
          <div className="container d-flex flex-column h-100 align-items-center justify-content-center pt-5">
            <Spinner sizeUnit="px" size={35} color="#4d6d6d" />
          </div>
        ) : (
          <Directory
            data={dir}
            path="pops"
            setDirUpdate={setDirUpdate}
          />
        )}
      </div>
      <Footer />

      <Modal
        title={"Nova Pasta"}
        noIcon
        ref={modalNewFolder}
        onConfirm={makeFolder}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nova Pasta"
            onChange={(e) => setFolder(e.target.value)}
          />
        </div>
      </Modal>

    </>
  );
}

export default Pops;
