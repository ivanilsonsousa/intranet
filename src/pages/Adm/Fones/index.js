import React, { useState, useEffect } from 'react'
import Header from '../../../components/Header'
import AlertModal from '../../../components/Modal'
import Switch from '../../../components/Switch'

import trash from '../../../assets/bin.svg'
import edit from '../../../assets/edit.svg'
import fone from '../../../assets/phone.svg'
import api from '../../../services/api'

import './style.css'

function Phones() {
  const [ phones, setPhones ] = useState([])
  const [ query, setQuery ] = useState('')
  const [ phoneId, setPhoneId ] = useState(null)
  const [ foneEdit, setFoneEdit ] = useState({})
  const [ modalPost, setModalPost ] = useState(false)
  const [ modalMessage, setModalMessage ] = useState(false)
  const [ modalEdit, setModalEdit ] = useState(false)
  const [ update, setUpdate ] = useState([])
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ modalDelete, setModalDelete ] = useState(false)

  useEffect(() => {
    api.get(`/phones?query=${query}`)
      .then(res =>  {
        setPhones(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [update, query])

  function setDeletePost(id) {
    setPhoneId(id)
    setModalDelete(true)
  }

  function setEditPost(phone) {
    setFoneEdit(phone)
    setModalEdit(true)
  }

  function handleSubmit() {
    if (!title || !description) {
      setModalMessage(true)
      return
    }

    api.post(`/phones`, { title, description })
      .then(res =>  {
        setUpdate(res.data)
        setModalPost(false)
        setTitle('')
        setDescription('')
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleSubmitEdit() {
    const { _id, title, description } = foneEdit

    if (!_id || !description || !title) {
      setModalMessage(true)
      return
    }

    api.put(`/phones/${_id}`, { title, description })
      .then(res =>  {
        setUpdate(res.data)
        setModalEdit(false)
        setTitle('')
        setDescription('')
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleDeletePost() {
    api.delete(`phones/${phoneId}`).then(res => {
      setModalDelete(false)
      setUpdate(res.data)
    }).catch(res => {
      console.log(res)
    })
  }

  async function handleCheck(id, value) {
    return await api.put(`/phones/${id}`, { active: value })
  }

  return(
    <>
      <Header/>
      <div className="container">
        <div className="container-fluid d-flex align-items-baseline w-100">
          <div className="d-flex align-items-end pl-2 pt-5"> <img src={fone} style={{ width: "50px" }} alt="Posts" /> 
          <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">Lista de Ramais</h3></div>
        <form className="ml-auto form-search">
          <input type="search" className="search" onChange={e => setQuery(e.target.value)} />
          <i className="fa fa-search"></i>
        </form>
        <button type="button" className="btn btn-info align-self-end mb-1" onClick={() => setModalPost(true)} >Adicionar <i className="fas fa-plus"></i></button>
        </div>
        <hr className="my"></hr>
        <div className="container pt-5" >
        {phones.map(phone => {
          return (
            <div className={`post secundary`} key={phone._id} >
              <div className="d-flex space-between w-100" >
                <div className="w-100" >
                  <h5 className="title-phone"><i className="fas fa-phone-alt mr-2"/><i>{phone.title}</i></h5>
                  <span className="description-phone ml-4"><strong> {phone.description}</strong></span>
                </div>
              </div>
              <img src={edit} alt="icone" style={{ height: "25px", cursor: "pointer", marginRight: "10px" }} onClick={() => setEditPost(phone) }/>
              <img src={trash} alt="icone" style={{ height: "25px", cursor: "pointer", marginRight: "10px" }} onClick={() => setDeletePost(phone._id)}/>
              <Switch checked={phone.active} id={phone._id} onChange={handleCheck} />
            </div>
          )
        })}
        </div>
      </div>

      <AlertModal title={"Novo Ramal"} noIcon show={modalPost} func={handleSubmit} onDisable={setModalPost} >
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Descrição</label>
          <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Lista de numeros (Separe por vírgulas)</label>
          <input type="text" className="form-control" onChange={e => setDescription(e.target.value)} />
        </div>
      </AlertModal>
      
      <AlertModal title={"Editar Ramal"} noIcon show={modalEdit} func={handleSubmitEdit} onDisable={setModalEdit} >
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Descrição</label>
          <input type="text" className="form-control" defaultValue={foneEdit.title} onChange={e => setFoneEdit({ ...foneEdit, title: e.target.value }) } />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Lista de numeros (Separe por vírgulas)</label>
          <input type="text" className="form-control" defaultValue={foneEdit.description} onChange={e => setFoneEdit({ ...foneEdit, description: e.target.value }) } />
        </div>
      </AlertModal>

      <AlertModal title="Deseja realmente apagar esse ramal?" show={modalDelete} onDisable={setModalDelete} func={() => handleDeletePost()} />

      <AlertModal title={"Preencha todos os campos"} message show={modalMessage} onDisable={setModalMessage} />
    </>
  )

}

export default Phones;