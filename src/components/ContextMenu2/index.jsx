import React, { useState, useRef } from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import Modal from "../ModalNew";

import api from "../../services/api";

import "./styles.css";

function MenuContext(props) {
  const modalDelete = useRef(null);
  const modalRename = useRef(null);

  const [fileName, setFileName] = useState(props.filename);

  function handleDelete() {
    api
      .delete(`/${props.path}/${props.id}`)
      .then((res) => {
        modalDelete.current.closeModal();
        props.setDirUpdate(res);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }

  function handleRename() {
    api
      .put(`/${props.path}/${props.id}`, { title: fileName.trim() })
      .then((res) => {
        modalRename.current.closeModal();
        props.setDirUpdate(res);
      })
      .catch((err) => {
        console.log(err);
        alert(err.data);
      });
  }

  function openModalRename() {
    setFileName(props.item.title);
    modalRename.current.openModal();
  }

  return (
    <>
      <ContextMenuTrigger id={props.id}>{props.children}</ContextMenuTrigger>

      <ContextMenu id={props.id} className="context-menu">
        <MenuItem
          data={{ foo: "bar" }}
          onClick={() => openModalRename()}
          className="menu-item"
        >
          <i className="fas fa-pencil-alt mr-2" /> Renomear Ficheiro
        </MenuItem>
        <MenuItem
          data={{ foo: "bar" }}
          onClick={() => modalDelete.current.openModal()}
          className="menu-item"
        >
          <i className="fas fa-trash mr-2" /> Apagar Ficheiro
        </MenuItem>
      </ContextMenu>

      <Modal
        title="Deseja realmente apagar esse ficheiro?"
        ref={modalDelete}
        onConfirm={handleDelete}
      />

      <Modal
        title={"Renomear Ficheiro"}
        noIcon
        ref={modalRename}
        onConfirm={handleRename}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            defaultValue={fileName}
            placeholder="Renomear Ficheiro"
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
}

export default MenuContext;
