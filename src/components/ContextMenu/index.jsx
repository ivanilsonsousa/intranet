import React, { useState, useRef, useEffect } from 'react'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import AlertModal from '../Modal'

import api from '../../services/api'

import './styles.css'

function MenuContext(props) {
  const [modalRename, setModalRename] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [fileName, setFileName] = useState(props.filename)
  const inputEl = useRef(null)

  function handleDelete() {
    api.delete(`/documents/${props.id}`)
      .then(res =>  {
        setModalDelete(false)
        props.setDirUpdate(res)
      })
      .catch(err => {
        console.log(err.data)        
      })
  }

  function handleRename() {
    api.put(`/documents/${props.id}`, { title: fileName.trim() })
      .then(res =>  {
        setModalRename(false)
        props.setDirUpdate(res)
      })
      .catch(err => {
        console.log(err.data)      
        alert(err.data)  
      })
  }

  function openModalRename() {
    setFileName(props.filename)
    setModalRename(true)
  }

  useEffect(() => {
    if(modalRename) {
      inputEl.current.select()
      inputEl.current.focus()
    }
  }, [modalRename])

  return(
    <div style={{ width: `${props.width}%` }} >
        <ContextMenuTrigger id={props.id} >
          {props.children}
        </ContextMenuTrigger>

        <ContextMenu id={props.id} className="context-menu" >
          <MenuItem data={{foo: 'bar'}} onClick={() => openModalRename()} className="menu-item" >
            <i className="fas fa-pencil-alt mr-2" /> Renomear Ficheiro
          </MenuItem>
          <MenuItem data={{foo: 'bar'}} onClick={() => setModalDelete(true)} className="menu-item" >
            <i className="fas fa-trash mr-2" /> Apagar Ficheiro
          </MenuItem>
        </ContextMenu>

        <AlertModal title="Deseja realmente apagar esse ficheiro?" show={modalDelete} onDisable={setModalDelete} func={() => handleDelete()} />
        
        <AlertModal title={"Renomear Ficheiro"} noIcon show={modalRename} func={() => handleRename()} onDisable={setModalRename} >
          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              ref={inputEl}
              value={fileName}
              placeholder="Renomear Ficheiro" 
              onChange={e => setFileName(e.target.value)} 
            />
          </div>
        </AlertModal>
    </div>
  )
}

export default MenuContext;