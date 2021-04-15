import React, { useState, useEffect, useContext, useRef } from "react";
import { ClipLoader as Spinner } from "react-spinners";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BreadCrumb from "../../components/BreadCrumb";
import Modal from "../../components/ModalNew";
import Directory from "../../components/Directory";
import api from "../../services/api";

import { Context } from "../../Context/AuthContext";

import { cutLegend } from "../../scripts/utils";
import "./styles.css";

import folder_icon from "../../assets/folder-black.svg";
import upload from "../../assets/upload.svg";

function Documents() {
  const [parent, setParent] = useState("root");
  const [folder, setFolder] = useState("");
  const [stackParent, setStackParent] = useState([
    { parent: "root", legend: "Início" },
  ]);
  const [file, setFile] = useState(null);
  const [titleFile, setTitleFile] = useState("");
  const [dirUpdate, setDirUpdate] = useState("");
  const [dir, setDir] = useState([]);
  const [load, setLoad] = useState(true);

  const modalNewFolder = useRef(null);
  const modalNewFile = useRef(null);
  const modalMessage = useRef(null);

  const [nameFileChoose, setNameFileChoose] = useState("");

  const { authenticated } = useContext(Context);

  function setFileUpdate(file) {
    setFile(file);
    if(!file) return

    setNameFileChoose(cutLegend(file.name, 30, true));
  }

  function updateStackParent(data) {
    let repeated = false;

    stackParent.forEach((e) => {
      if (e.parent === data.parent) {
        repeated = true;
        return;
      }
    });

    if (!repeated) setStackParent([...stackParent, data]);
  }

  function setBeforeModalNewFile() {
    modalNewFile.current.openModal();
    setNameFileChoose("");
    setFile(null);
  }

  function comeBack() {
    const stack = stackParent;
    stack.pop();
    const size = Object.keys(stack).length;
    const { parent } = stack[size - 1];
    setParent(parent);
    setStackParent(stack);
  }

  function doubleClick(data) {
    const { parent } = data;
    updateStackParent(data);

    setParent(parent);
  }

  function closeModal() {
    setFolder("");
    setFile("");
    modalNewFolder.current.closeModal();
    modalNewFile.current.closeModal();
  }

  function uploadFile() {
    if (!file || !titleFile) {
      modalMessage.current.openModal();
      return;
    }

    const data = new FormData();

    data.append("title", titleFile);
    data.append("parent", parent);
    data.append("file", file);

    console.log("AQUI")
    console.log(data)

    api
      .post("/documents", data)
      .then((response) => {
        setDirUpdate(response.data._id);
        setFile(null);
        closeModal();
      })
      .catch((err) => {
        alert(err);
        setFile(null);
      });
  }

  function makeFolder() {
    if (!folder) {
      modalMessage.current.openModal();
      return;
    }

    api
      .post("/folders", { parent, title: folder })
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

  useEffect(() => {
    api
      .get(`/documents/${parent}`)
      .then((res) => {
        setDir(res.data);
        setLoad(false);
      })
      .catch((err) => {
        setLoad(false);
        setDir([]);
      });
  }, [parent, dirUpdate]);

  return (
    <>
      <Header flag="Documentos"/>
      <div className="container-fluid">
        <div className="container-fluid d-flex align-items-baseline w-100">
          <div className="d-flex align-items-end pl-2 pt-5">
            {" "}
            <img
              src={folder_icon}
              style={{ width: "45px" }}
              alt="Icone de Pasta"
            />
            <h3 className=" ml-3 mb-0 display-3 title align-text-bottom">
              Documentos
            </h3>
          </div>
          {parent && (
            <button
              type="button"
              className={`btn btn-light align-self-end ml-auto mr-2 back`}
              disabled={parent === "root" ? true : false}
              onClick={() => comeBack()}
            >
              <i className="fas fa-chevron-left" />
              {!authenticated && <strong> Voltar</strong>}
            </button>
          )}
          {authenticated && 
          <>
            <button
              type="button"
              className="btn btn-secondary align-self-end new-folder"
              onClick={() => modalNewFolder.current.openModal()}
            >
              Nova Pasta <i className="fas fa-folder-plus"></i>
            </button>
            <button
              type="button"
              className="btn btn-light align-self-end ml-2 new-file"
              disabled={parent === "root" ? true : false}
              onClick={() => setBeforeModalNewFile()}
            >
              Novo Arquivo <i className="fas fa-cloud-upload-alt"></i>
            </button>
          </>
          }
        </div>
      </div>
      {stackParent && (
        <BreadCrumb
        data={stackParent}
        setStackParent={setStackParent}
        setParent={setParent}
        />
        )}
      <div className="container-fluid">
      <hr className="my"></hr>
        {load ? (
          <div className="container d-flex flex-column h-100 align-items-center justify-content-center pt-5">
            <Spinner sizeUnit="px" size={35} color="#4d6d6d" />
          </div>
        ) : (
          <Directory
            data={dir}
            func={doubleClick}
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

      <Modal
        title={"Novo Arquivo"}
        noIcon
        ref={modalNewFile}
        onConfirm={uploadFile}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Descrição do arquivo"
            onChange={(e) => setTitleFile(e.target.value)}
          />
          <label
            htmlFor="upload"
            className="label-upload"
            title="Fazer upload de arquivo"
          >
            <input
              type="file"
              name="Document"
              id="upload"
              onChange={(e) => setFileUpdate(e.target.files[0])}
            />
            <img src={upload} style={{ width: "45px" }} alt="Icone de Upload" />
            {nameFileChoose ? (
              <span className="text-success font-weight-bold">
                {nameFileChoose}
              </span>
            ) : (
              <span className="mt-2">Clique aqui para adiconar um arquivo</span>
            )}
          </label>
        </div>
      </Modal>

      <Modal
        title={"Preencha todos os campos"}
        message
        ref={modalMessage}
      />
    </>
  );
}

export default Documents;
