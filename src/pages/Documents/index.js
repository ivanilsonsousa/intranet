import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import OptionLink from '../../components/OptionLink'
import api from '../../services/api'

import './styles.css'

import folder from '../../assets/folder-black.svg'
import folder_open from '../../assets/folder-open.svg'
import pdf from '../../assets/pdf.svg'
import word from '../../assets/word.svg'
import excel from '../../assets/excel.svg'
import power_point from '../../assets/power-point.svg'
import photo from '../../assets/photo.svg'

function Documents() {
  const [parent, setParent] = useState('root')

  function doubleClick(parent) {
    setParent(parent)
  }

  useEffect(() => {
    api.get(`/documents/${parent}`)
            .then(res =>  console.log(res.data) )
            .catch(err => console.log("erro") )

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
          <div className="d-flex align-items-end pl-2 pt-5"> <img src={folder} style={{ width: "45px" }}/> 
          <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">Documentos</h3></div>
          <button type="button" className="btn btn-secondary align-self-end ml-auto">Nova Pasta <i className="fas fa-folder-plus"></i></button>
          <button type="button" className="btn btn-success align-self-end ml-2">Novo Arquivo <i className="fas fa-cloud-upload-alt"></i></button>
        </div>
        <hr className="my"></hr>
      </div>
      <div className="container">
        <div className="row mb-3">
          <OptionLink image={folder_open} legend="Galeria de Fotos" folder parent="teste" func={doubleClick} />
          <OptionLink image={folder_open} legend="Vídeos" folder parent="fsdfg1f5aaaaaaaa5d" func={doubleClick} />
          <OptionLink image={pdf} legend="Teste" folder parent="shf4g1f5aaaaasswf45d" func={doubleClick} />
          <OptionLink image={word} legend="Lista de Ramais" folder parent="54g1f478745d5f45d" func={doubleClick} />
          <OptionLink image={excel} legend="Lista de Ramais" folder parent="54g1f478745d5f45d" func={doubleClick} />
          <OptionLink image={power_point} legend="Lista de Ramais" folder parent="54g1f478745d5f45d" func={doubleClick} />
          <OptionLink image={photo} legend="Confra" folder parent="54g1f478745d5f45d" func={doubleClick} />
        </div>
      </div>
    </>
  )

}

export default Documents;