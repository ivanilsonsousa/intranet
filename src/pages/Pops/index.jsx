import React, { useState, useEffect, createContext, useCallback, memo } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Search from "../../components/Search";
import Tree from "../../components/Tree";

import file from "../../assets/file-black.svg";

import api from "../../services/api";

const PopsContext = createContext();

function Pops() {
  const [query, setQuery] = useState("");
  const [pops, setPops] = useState([]);
  const [valueCurrent, setValueCurrent] = useState({});
  let setCurrentItemSelected = () => {};

  const setItemSelect = useCallback((func, item) => {
    if(func == setCurrentItemSelected) return;
   
    func(true);
    setCurrentItemSelected(false);
    setCurrentItemSelected = func;
    setValueCurrent(item)
  }, [setCurrentItemSelected]);

  useEffect(() => {

    api
      .get(`/pops-tree?query=${query}`)
      .then((res) => {
        setPops(res.data);
        // console.log("pops", pops);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query]);

  function handleNewFolder() {
    console.log(valueCurrent);
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="container-fluid d-flex align-items-baseline w-100">
          <div className="d-flex align-items-end pl-2 pt-5">
            {" "}
            <img src={file} style={{ width: "50px" }} alt="Posts" />
            <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">
            Procedimentos Operacionais Padrão
            </h3>
          </div>
          <Search className="ml-auto" onChange={setQuery} />
        </div>
        <hr className="my"></hr>
        <div className="container mx-3 mb-5 min-height-70">
          <div className="d-flex justify-content-end px-3">
            <div className="dropdown no-touch">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <b>Ações</b>
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <span className="dropdown-item" onClick={handleNewFolder} ><i className="fas fa-folder-plus"></i> Nova Pasta</span>
                <span className="dropdown-item"><i className="fas fa-edit"></i> Renomear</span>
                <span className="dropdown-item"><i className="fas fa-trash-alt"></i> Apagar</span>
              </div>
            </div>
          </div>
          <React.StrictMode>
            <PopsContext.Provider
              value={{ setItemSelect, setValueCurrent }}
            >
              <Tree response={pops}/>
            </PopsContext.Provider>
          </React.StrictMode>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Pops;
export { PopsContext };
