import React, { useContext, useRef, useState, useMemo } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContextMenu from "../../components/ContextMenu2";
import Modal from "../../components/ModalNew";
import api from "../../services/api";

import { Context } from "../../Context/AuthContext";
import "./styles.css";

import camera from "../../assets/camera.svg";
import link_icon from "../../assets/link.svg";

const DIR = process.env.REACT_APP_DIR;

function Option({ item, path }) {
  const classes = "option-link text-center";

  return ( 
      <a
        className={classes}
        href={item.url}
        target="_blank"
        title={item.title}
        rel="noopener noreferrer"
      >
        <img src={item.url_icon} style={{ width: "150px" }} alt="logo" />
        <span className="mt-2">{item.title}</span>
      </a>
    );

}

const items = [{
                title: "SOULMV",
                url: "http://www.google.com",
                url_icon: "http://10.1.3.119:3333/documents/_logos/soulmv.svg",
              },
              {
                title: "MVPEP",
                url: "http://www.google.com",
                url_icon: "http://10.1.3.119:3333/documents/_logos/mvpep.svg",
              },
              {
                title: "MVSACR",
                url: "http://www.google.com",
                url_icon: "http://10.1.3.119:3333/documents/_logos/mvsacr.svg",
              },
              {
                title: "Gestão Estratégica e Qualidade Gestão Estratégica e Qualidade",
                url: "http://www.google.com",
                url_icon: "http://10.1.3.119:3333/documents/_logos/qualidade.svg",
              },
              {
                title: "Totem Senha",
                url: "http://www.google.com",
                url_icon: "http://10.1.3.119:3333/documents/_logos/totem-senha.svg",
              },
              {
                title: "Painel de Indicadores",
                url: "http://www.google.com",
                url_icon: "http://10.1.3.119:3333/documents/_logos/indicadores.svg",
              },
              {
                title: "Sigtap Web",
                url: "http://www.google.com",
                url_icon: "http://10.1.3.119:3333/documents/_logos/sigtap.svg",
              },
              {
                title: "UpToDate",
                url: "http://www.google.com",
                url_icon: "http://10.1.3.119:3333/documents/_logos/uptodate.svg",
              },
            
            ];
            
function Link() {  

  function handleNewLink() {
    console.log("link", link);
    console.log("thumbnail", thumbnail);

    const data = new FormData();

    data.append("name", link.name);
    data.append("link", link.link);
    data.append("file", thumbnail);

    api
      .post('/links', data)
      .then((response) => {
        // setDirUpdate(Date.now());
      })
      .catch((err) => {
        console.error(err);
      });
  }            

  const { authenticated } = useContext(Context);
  const [thumbnail, setThumbnail] = useState(null)
  const [link, setLink] = useState("");
  const modalNewLink = useRef(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null
  }, [thumbnail]);

  return (
    <>
      <Header flag="Links"/>
      <div className="container-fluid">
        <div className="container-fluid d-flex align-items-baseline w-100">
          <div className="d-flex align-items-end pl-2 pt-5">
            <img
              src={link_icon}
              style={{ width: "35px" }}
              alt="Icone do Link"
            />
            <h3 className=" ml-3 mb-0 display-3 title align-text-bottom">
              Links Rápidos
            </h3>
          </div>
          {authenticated && 
          <>
            <button
              type="button"
              className="btn btn-secondary align-self-end new-folder ml-auto"
              onClick={() => modalNewLink.current.openModal()}
            >
              Novo Link <i className="fas fa-link"></i>
            </button>
          </>} 
        </div>
      </div>
      <div className="container-fluid">
      <hr className="my" />
        <div className="wrapper-links">

          {items.map((item, index) => {
            return authenticated 
            ? 
              <ContextMenu
                id={index}
                key={item._id}
                path="links"
                item={item}
              >
                <Option 
                  item={item}
                  path="links"
                />
              </ContextMenu>
            : 
              <Option 
                key={item._id}
                item={item} 
                path="links"
              />
          })}

        </div>
      </div>
      <Footer />

      <Modal
        title={"Novo Link"}
        noIcon
        ref={modalNewLink}
        onConfirm={handleNewLink}
      >
        <div className="form-group">

          <label 
            id="thumbnail" 
            style={{ backgroundImage: `url(${preview})` }}
            className={thumbnail ? 'has-thumbnail' : ''}
          >
            <input type="file" onChange={e => setThumbnail(e.target.files[0])}/>
            <img src={camera} alt="Select img" style={{ width: "45px" }} />
          </label>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Descrição do link"
              onChange={(e) => setLink({ ...link, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Endereço do link"
              onChange={(e) => setLink({ ...link, link: e.target.value })}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Link;
