import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { Container, Content, HeaderDescription } from "../../components/Layout";
import Footer from "../../components/Footer";
import Modal from "../../components/ModalNew";
import Directory from "../../components/Directory2";
import api from "../../services/api";

import { Context } from "../../context/AuthContext";
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
      <Container>
        <HeaderDescription 
          title="Procedimento Operacionais Padrão" 
          icon={file_icon}
          iconTam="45" 

          data={stackParent}
          path="pops"
          setStackParent={setStackParent}
          stackParent={stackParent}
        >
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
        </HeaderDescription>
        <Content>
          <Directory
            data={dir}
            load={load}
            path="pops"
            setDirUpdate={setDirUpdate}
          />
        </Content>
      </Container> 
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
