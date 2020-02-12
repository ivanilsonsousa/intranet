import React, { useState } from 'react'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import AlertModal from '../AlertModal'
import 'react-contexify/dist/ReactContexify.min.css';

import './styles.css'

function MenuContext(props) {
  const [modalRename, setModalRename] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [fileName, setFileName] = useState(props.filename)


  function deleteFile() {
    alert("Apagar File"+fileName)
  }

  function deleteFolder() {
    alert("Apagar")
  }

  function handleFileName() {

  }

  function handleClick(e, data) {
    alert('mano')
  }

  return(
    <div style={{ width: `${props.width}%`}} >
        <ContextMenuTrigger id={props.id}>
          { props.children }
        </ContextMenuTrigger>

        <ContextMenu id={props.id} className="context-menu" >
          <MenuItem data={{foo: 'bar'}} onClick={() => setModalRename(true)} className="menu-item" >
            <i className="fas fa-pencil-alt mr-2" /> Renomear Ficheiro
          </MenuItem>
          <MenuItem data={{foo: 'bar'}} onClick={() => setModalDelete(true)} className="menu-item" >
            <i className="fas fa-trash mr-2" /> Apagar Ficheiro
          </MenuItem>
        </ContextMenu>

        <AlertModal title="Deseja realmente apagar esse ficheiro?" show={modalDelete} onDisable={setModalDelete } func={() => deleteFile()} />
        
        <AlertModal title={"Renomear Ficheiro"} noIcon show={modalRename} func={() => alert(fileName)} onDisable={ setModalRename } >
          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              id="exampleInputPassword1" 
              value={props.filename}
              placeholder="Renomear Ficheiro" 
              onChange={e => setFileName(e.target.value)} 
            />
          </div>
        </AlertModal>
    </div>
  )
}

export default MenuContext;