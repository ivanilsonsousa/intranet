import React, { useState, useEffect } from 'react'
import { ClipLoader as Spinner } from 'react-spinners'

import Header from '../../components/Header'
import AlertModal from '../../components/AlertModal'
import Directory from '../../components/Directory'
import api from '../../services/api'

import './styles.css'

import folder_icon from '../../assets/folder-black.svg'
import upload from '../../assets/upload.svg'
import folder_open from '../../assets/folder-open.svg'
import pdf from '../../assets/pdf.svg'
import word from '../../assets/word.svg'
import excel from '../../assets/excel.svg'
import power_point from '../../assets/power-point.svg'

function Documents() {
  const [parent, setParent] = useState('root')
  const [folder, setFolder] = useState('')
  const [dir, setDir] = useState([])
  const [load, setLoad] = useState(true)
  const [modalNewFolder, setModalNewFolder] = useState(false)
  const [modalNewFile, setModalNewFile] = useState(false)

  function doubleClick(parent) {
    setParent(parent)
  }

  function teste(texto) {
    alert(texto)
  }
  
  function makeFolder() {
    api.post('/folders', { folder, parent, title: folder })
    .then((data) => {
      alert("Pasta criada")
      console.log(data)
    })
    .catch(() => {
      alert("Deu erro ao criar a Pasta")
    })
  }

  useEffect(() => {
    api.get(`/documents/${parent}`)
            .then(res =>  {
              setDir(res.data) 
              setLoad(false) 
            })
            .catch(err => { 
              setLoad(false) 
              setDir([])
            })
  }, [parent]);

  return(
    <>
      <Header/>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Library</a></li>
          <li className="breadcrumb-item active" aria-current="page">Data</li>
        </ol>
      </nav>
      <div className="container">
        <div className="container-fluid d-flex align-items-baseline w-100">
          <div className="d-flex align-items-end pl-2 pt-5"> <img src={folder_icon} style={{ width: "45px" }}/> 
          <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">Documentos</h3></div>
          <button type="button" className="btn btn-secondary align-self-end ml-auto" onClick={() => setModalNewFolder(true)} >Nova Pasta <i className="fas fa-folder-plus"></i></button>
          <button type="button" className="btn btn-success align-self-end ml-2" onClick={() => setModalNewFile(true)} >Novo Arquivo <i className="fas fa-cloud-upload-alt"></i></button>
        </div>
        <hr className="my"></hr>
      </div>
      <div className="container">
          {
            load ? 
            <div className="container d-flex flex-column h-100 align-items-center justify-content-center pt-5">
              <Spinner sizeUnit="px" size={35} color="#4d6d6d" />
            </div>
            : 
            <Directory data={dir} func={doubleClick} />
          }
      </div>
      {/* <AlertModal title={"Você tem certeza?"} show message func={() => teste("Meu deus")} /> */}
      {
        modalNewFolder ?
        <AlertModal title={"Nova Pasta"} noIcon show={modalNewFolder} func={() => makeFolder()} onDisable={ setModalNewFolder } >
          <div class="form-group">
            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Nova Pasta" onChange={(e) => setFolder(e.target.value)} />
          </div>
        </AlertModal> 
        :
        <></>
      }
      
      {
        modalNewFile ?
        <AlertModal title={"Novo Arquivo"} noIcon show={modalNewFile} func={() => teste("Nome do Arquivo")} onDisable={ setModalNewFile } >
          <div class="form-group">
            <input type="text" className="form-control" placeholder="Descrição do arquivo" />
            <label htmlFor="upload" className="label-upload" title="Fazer upload de arquivo">
              <input type="file" name="Document" id="upload"/>
              <img src={upload} style={{ width: "45px" }}/> 
              <span className="mt-2">Clique aqui para adiconar um arquivo</span>
            </label>
          </div>
        </AlertModal> 
        :
        <></>
      }
      
    </>
  )

}

export default Documents;