import React, { useState, useEffect } from 'react'
import Header from '../../../components/Header'
import AlertModal from '../../../components/AlertModal'
import Switch from '../../../components/Switch'

import trash from '../../../assets/bin.svg'
import edit from '../../../assets/edit.svg'
import posts_icon from '../../../assets/origami.svg'
import api from '../../../services/api'

import './style.css'

import { getDate } from '../../../scripts/utils'

function Notices() {
  const [ posts, setPosts ] = useState([])
  const [ query, setQuery ] = useState('')
  const [ postId, setPostId ] = useState(null)
  const [ postEdit, setPostEdit ] = useState({ })
  const [ modalPost, setModalPost ] = useState(false)
  const [ modalMessage, setModalMessage ] = useState(false)
  const [ modalEdit, setModalEdit ] = useState(false)
  const [ update, setUpdate ] = useState([])
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ type, setType ] = useState('primary')
  const [ modalDelete, setModalDelete ] = useState(false)

  useEffect(() => {
    api.get(`/posts?query=${query}`)
      .then(res =>  {
        setPosts(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [update, query])

  function setDeletePost(id) {
    setPostId(id)
    setModalDelete(true)
  }

  function setEditPost(post) {
    setPostEdit(post)
    setModalEdit(true)
  }

  function handleSubmit() {
    if (!title || !type || !description) {
      setModalMessage(true)
      return
    }

    api.post(`/posts`, { title, description, type })
      .then(res =>  {
        setUpdate(res.data)
        setModalPost(false)
        setType('primary')
        setTitle('')
        setDescription('')
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleSubmitEdit() {
    const { _id, title, description, type } = postEdit

    if (!_id || !type || !description || !title) {
      setModalMessage(true)
      return
    }

    api.put(`/posts/${_id}`, { title, description, type })
      .then(res =>  {
        setUpdate(res.data)
        setModalEdit(false)
        setType('primary')
        setTitle('')
        setDescription('')
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleDeletePost() {
    api.delete(`posts/${postId}`).then(res => {
      setModalDelete(false)
      setUpdate(res.data)
    }).catch(res => {
      console.log(res)
    })
  }

  async function handleCheck(id, value) {
    return await api.put(`/posts/${id}`, { active: value })
  }

  return(
    <>
      <Header/>
      <div className="container">
        <div className="container-fluid d-flex align-items-baseline w-100">
          <div className="d-flex align-items-end pl-2 pt-5"> <img src={posts_icon} style={{ width: "50px" }} alt="Posts" /> 
          <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">Comunicados</h3></div>
        <form className="ml-auto form-search">
          <input type="search" className="search" onChange={e => setQuery(e.target.value)} />
          <i className="fa fa-search"></i>
        </form>
        <button type="button" className="btn btn-info align-self-end mb-1" onClick={() => setModalPost(true)} >Adicionar <i className="fas fa-plus"></i></button>
        </div>
        <hr className="my"></hr>
        <div className="container pt-5" >
        {posts.map(post => {
          return (
            <div className={`post ${post.type}`} key={post._id} >
              <div className="d-flex space-between w-100" >
                <div className="w-100" >
                  <h5>{post.title}</h5>
                  <span>{post.description}</span>
                </div>
                <div className="pr-5 d-flex align-items-center">
                  {getDate(post.createAt)}
                </div>
              </div>
              <img src={edit} alt="icone" style={{ height: "25px", cursor: "pointer", marginRight: "10px" }} onClick={() => setEditPost(post) }/>
              <img src={trash} alt="icone" style={{ height: "25px", cursor: "pointer", marginRight: "10px" }} onClick={() => setDeletePost(post._id)}/>
              <Switch checked={post.active} id={post._id} onChange={handleCheck} />
            </div>
          )
        })}
        </div>
      </div>
      <AlertModal title={"Novo Comunicado"} noIcon show={modalPost} func={handleSubmit} onDisable={setModalPost} >
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Título</label>
          <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Descrição</label>
          <input type="text" className="form-control" onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="menu-select">Tipo (Cor)</label>
          <select className="form-control" id="menu-select" onChange={e => setType(e.target.value)}>
            <option value="primary">Primário</option>
            <option value="secundary">Secundário</option>
            <option value="info">Informação</option>
          </select>
        </div>
      </AlertModal>
      
      <AlertModal title={"Editar Comunicado"} noIcon show={modalEdit} func={handleSubmitEdit} onDisable={setModalEdit} >
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Título</label>
          <input type="text" className="form-control" defaultValue={postEdit.title} onChange={e => setPostEdit({ ...postEdit, title: e.target.value }) } />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Descrição</label>
          <input type="text" className="form-control" defaultValue={postEdit.description} onChange={e => setPostEdit({ ...postEdit, description: e.target.value }) } />
        </div>
        <div className="form-group">
          <label htmlFor="menu-select">Tipo (Cor)</label>
          <select className="form-control" id="menu-select" defaultValue={postEdit.type} onChange={e => setPostEdit({ ...postEdit, type: e.target.value }) } >
            <option value="primary">Primário</option>
            <option value="secundary">Secundário</option>
            <option value="info">Informação</option>
          </select>
        </div>
      </AlertModal>

      <AlertModal title="Deseja realmente apagar esse comunicado?" show={modalDelete} onDisable={setModalDelete} func={() => handleDeletePost()} />

      <AlertModal title={"Preencha todos os campos"} message show={modalMessage} onDisable={setModalMessage} />
    </>
  )

}

export default Notices;