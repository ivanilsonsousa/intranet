import React, { useState, useEffect, createContext, useCallback, useRef, useContext } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Modal from "../../components/ModalNew";
import Search from "../../components/Search";
import Tree from "../../components/Tree";

import { Context } from "../../Context/AuthContext";

import file_icon from "../../assets/file-black.svg";

import api from "../../services/api";

const PopsContext = createContext();

function Pops() {
  const [query, setQuery] = useState("");
  const [pops, setPops] = useState([]);
  const [popsUpdate, setPopsUpdate] = useState([]);
  const [file, setFile] = useState("");
  const [files, setFiles] = useState(null);
  const [valueCurrent, setValueCurrent] = useState({});
  const modalNewFolder = useRef(null);
  const modalDelete = useRef(null);
  const modalRenameFile = useRef(null);
  let setCurrentItemSelected = () => {};

  const { authenticated } = useContext(Context);
  
  function closeModal() {
    setFile("");
    modalNewFolder.current.closeModal();
    modalRenameFile.current.closeModal();
    modalDelete.current.closeModal();
  }

  const setItemSelect = useCallback((func, item) => {
    if(func == setCurrentItemSelected) return;
   
    func(true);
    setCurrentItemSelected(false);
    setCurrentItemSelected = func;
    
    setValueCurrent(item)
  }, []);

  useEffect(() => {

    api
      .get(`/pops-tree?query=${query}`)
      .then((res) => {
        setPops(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query, popsUpdate]);

  function handleNewFolder() {
    modalNewFolder.current.openModal();
  }

  function handleNewFile(e) {
    let { _id: parent } = valueCurrent; 
    parent = parent || 'root';

    const { files } = e.target;

    const data = new FormData();

    data.append("type", 'file');
    data.append("parent", parent);

    // data.append("files", files);
    
    Array.from(files).map(file => {
      data.append("files", file);
    })

    api
      .post('/pops', data)
      .then((response) => {
        setPopsUpdate(response.data);
        
      })
      .catch((err) => {
      });

  }

  function handleDelete() {
    modalDelete.current.openModal();
  }

  function handleRename() {
    modalRenameFile.current.openModal();
  }
  
  function makeFolder() {
    let { _id: id } = valueCurrent; 

    id = id || 'root';

    api
      .post(`/pops/${id}`, { title: file , type: 'folder' })
      .then((response) => {
        setPopsUpdate(response.data);
        closeModal();
      })
      .catch((err) => {
      });
  }

  function renameFile() {
    const { _id: id } = valueCurrent; 
    
    api
      .put(`/pops/${id}`, { title: file })
      .then((response) => {
        setPopsUpdate(response.data);

        setValueCurrent({ ...valueCurrent, title: file });

        closeModal();
      })
      .catch((err) => {
      });
  }

  function deleteFile() {
    const { _id: id } = valueCurrent; 

    api
      .delete(`/pops/${id}`)
      .then((response) => {
        setPopsUpdate(response.data);
        closeModal();
        setItemSelect(() => {}, {});
      })
      .catch((err) => {
      });
  }

  function handleReseteItemSelect(e) {
    if(e.target !== e.currentTarget) return;
    e.stopPropagation();

    setItemSelect(() => {}, {});
  }

  return (
    <>
      <Header flag="Pops" />
      <div className="container" onClick={(e) => handleReseteItemSelect(e)} >
        <div className="container-fluid d-flex align-items-baseline w-100" onClick={(e) => handleReseteItemSelect(e)} >
          <div className="d-flex align-items-end pl-2 pt-5">
            {" "}
            <img src={file_icon} style={{ width: "50px" }} alt="Posts" />
            <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom" >
            Procedimentos Operacionais Padrão
            </h3>
          </div>
          <Search className="ml-auto" onChange={setQuery} />
        </div>
        <hr className="my"></hr>
        <div className="container mx-3 mb-5 min-height-70" onClick={(e) => handleReseteItemSelect(e)} >

          {authenticated && <div className="d-flex justify-content-end px-3">
            <div className="dropdown no-touch">
              <button className="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <b>Ações</b>
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {valueCurrent.type !== 'file' && <span className="dropdown-item" onClick={handleNewFolder} ><i className="fas fa-folder-plus"></i> Nova Pasta</span> }
                
                {valueCurrent.type !== 'file' 
                  && 
                  <label
                    htmlFor="upload"
                    className="label-upload-pop"
                  >
                    <span className="dropdown-item" ><i className="fas fa-file-upload"></i> Novo Arquivo</span> 
                    <input
                      id="upload"
                      type="file"
                      multiple="multiple"
                      accept="application/pdf"
                      // onChange={(e) => setFiles(e.target.files)}
                      onChange={handleNewFile}
                    />
                  </label>}

                {valueCurrent.type !== undefined && <span className="dropdown-item" onClick={handleRename} ><i className="fas fa-edit"></i> Renomear</span> }
                {valueCurrent.type !== undefined && <span className="dropdown-item" onClick={handleDelete} ><i className="fas fa-trash-alt"></i> Apagar</span> }
              </div>
            </div>
          </div> }

          <React.StrictMode>
            <PopsContext.Provider
              value={{ setItemSelect, setValueCurrent, handleReseteItemSelect }}
            >
              <Tree response={pops}/>
            </PopsContext.Provider>
          </React.StrictMode>
        </div>
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
            onChange={(e) => setFile(e.target.value)}
          />
        </div>
      </Modal>

      <Modal
        title={"Renomear Ficheiro"}
        noIcon
        ref={modalRenameFile}
        onConfirm={renameFile}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nova Pasta"
            defaultValue={valueCurrent.title}
            onChange={(e) => setFile(e.target.value)}
          />
        </div>
      </Modal>

      <Modal
        title={"Deseja realmente excluir permanentemente esse ficheiro?"}
        ref={modalDelete}
        onConfirm={deleteFile}
      />

    </>
  );
}

export default Pops;
export { PopsContext };