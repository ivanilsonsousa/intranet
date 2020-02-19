import React, { useState, useEffect } from 'react'
import { ClipLoader as Spinner } from 'react-spinners'

import Header from '../../components/Header'
import AlertModal from '../../components/AlertModal'
import Directory from '../../components/Directory'
import api from '../../services/api'

import './styles.css'

import folder_icon from '../../assets/folder-black.svg'
import upload from '../../assets/upload.svg'
import BreadCrumb from '../../components/BreadCrumb'

function Documents() {
  const [parent, setParent] = useState('root')
  const [folder, setFolder] = useState('')
  const [stackParent, setStackParent] = useState([{parent: 'root', legend: 'Documentos'}])
  const [file, setFile] = useState(null)
  const [titleFile, setTitleFile] = useState('')
  const [dirUpdate, setDirUpdate] = useState('')
  const [dir, setDir] = useState([])
  const [load, setLoad] = useState(true)
  const [modalNewFolder, setModalNewFolder] = useState(false)
  const [modalNewFile, setModalNewFile] = useState(false)
  const [modalMessage, setModalMessage] = useState(false)
  const [nameFileChoose, setNameFileChoose] = useState('')

  function cutLegend(legend) {
    if(legend.length < 35)
      return legend
  
    const ext = legend.split('.').pop()
    return `${legend.substr(0, 30)}...${ext}`
  }

  function setFileUpdate(file) {
    setFile(file)
    setNameFileChoose(cutLegend(file.name))
  }

  function updateStackParent(stackParent, data) {
    stackParent.forEach(e => {
      if (e.parent === data.parent)
        return
    })

    setStackParent([...stackParent, data])
  }

  function comeBack() {
    const stack = stackParent
    stack.pop()
    const size = Object.keys(stack).length
    const { parent } = stack[size-1]
    setParent(parent)
    setStackParent(stack)
  }

  function doubleClick(data) {
    const { parent } = data
    updateStackParent(stackParent, data)

    // localStorage.setItem('stackParent', stackParent)
    // console.log(JSON.parse(parent))
    setParent(parent)
  }

  function closeModal() {
    setFolder('')
    setFile('')
    setModalNewFolder(false)
    setModalNewFile(false)
  }
  
  function uploadFile() {
    if (!file || !titleFile) {
      setModalMessage(true)
      return
    }

    const data = new FormData()

    data.append('title', titleFile)
    data.append('parent', parent)
    data.append('file', file)

    api.post('/documents', data)
    .then(response => {
      setDirUpdate(response.data._id)
      setFile(null)
      closeModal()
    })
    .catch((err) => { 
      alert(err) 
      setFile(null) 
    })
  }

  function makeFolder() {
    if (!folder) {
      setModalMessage(true)
      return
    }

    api.post('/folders', { folder, parent, title: folder })
      .then(response => {
        setDirUpdate(response.data._id)
        closeModal()
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
  }, [parent, dirUpdate]);

  return(
    <>
      <Header/>
      {stackParent && <BreadCrumb data={stackParent} setStackParent={setStackParent} setParent={setParent}/>}
      <div className="container">
        <div className="container-fluid d-flex align-items-baseline w-100">
          <div className="d-flex align-items-end pl-2 pt-5"> <img src={folder_icon} style={{ width: "45px" }} alt="Icone de Pasta" /> 
          <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">Documentos</h3></div>
          {parent && <button type="button" className="btn btn-secondary align-self-end ml-auto mr-2" disabled={ parent === 'root' ? true : false } onClick={() => comeBack()} ><i className="fas fa-chevron-left"></i></button>}
          <button type="button" className="btn btn-secondary align-self-end" onClick={() => setModalNewFolder(true)} >Nova Pasta <i className="fas fa-folder-plus"></i></button>
          <button type="button" className="btn btn-success align-self-end ml-2" disabled={ parent === 'root' ? true : false } onClick={() => setModalNewFile(true)} >Novo Arquivo <i className="fas fa-cloud-upload-alt"></i></button>
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
            <Directory data={dir} func={doubleClick} setDirUpdate={setDirUpdate} />
          }
      </div>
      <AlertModal title={"Nova Pasta"} noIcon show={modalNewFolder} func={() => makeFolder()} onDisable={setModalNewFolder} >
        <div className="form-group">
          <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Nova Pasta" onChange={(e) => setFolder(e.target.value)} />
        </div>
      </AlertModal>
      
      <AlertModal title={"Novo Arquivo"} noIcon show={modalNewFile} func={() => uploadFile()} onDisable={setModalNewFile} >
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Descrição do arquivo" onChange={(e) => setTitleFile(e.target.value)} />
          <label htmlFor="upload" className="label-upload" title="Fazer upload de arquivo">
            <input type="file" name="Document" id="upload" onChange={e => setFileUpdate(e.target.files[0])}/>
            <img src={upload} style={{ width: "45px" }} alt="Icone de Upload" />
            {nameFileChoose ?
              <span className="text-success font-weight-bold">{ nameFileChoose }</span> 
              :
              <span className="mt-2">Clique aqui para adiconar um arquivo</span>}
          </label>
        </div>
      </AlertModal>

      <AlertModal title={"Preencha todos os campos"} message show={modalMessage} onDisable={ setModalMessage } />
    </>
  )

}

export default Documents;