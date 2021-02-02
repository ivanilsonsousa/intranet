import React, { useState, useEffect, createContext, useContext } from "react";
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
  const [currentItemSelected, setCurrentItemSelected] = useState(() => {});

  function setItemSelect() {

  }

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
          <React.StrictMode>
            <PopsContext.Provider
              value={{ setItemSelect }}
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
