import React, { useState, useEffect } from 'react'
import Header from '../../../components/Header'
import Modal from '../../../components/Modal'
import Switch from '../../../components/Switch'
import NotFound from '../../../components/NotFound'
import Search from '../../../components/Search'

import trash from '../../../assets/bin.svg'
import edit from '../../../assets/edit.svg'
import key from '../../../assets/key.svg'
import group from '../../../assets/group.svg'
import api from '../../../services/api'

import './style.css'

function Users() {
  const [ name, setName ] = useState('')
  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ veryfyDelete, setVerifyDelete ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ passwordRepeat, setPasswordRepeat ] = useState('')
  const [ userEdit, setEditUser ] = useState({})
  const [ update, setUpdate ] = useState([])

  const [ users, setUsers ] = useState([])
  const [ query, setQuery ] = useState('')
  const [ userId, setUserId ] = useState(null)
  const [ modalPost, setModalPost ] = useState(false)
  const [ modalMessage, setModalMessage ] = useState(false)
  const [ modalEdit, setModalEdit ] = useState(false)
  const [ modalDelete, setModalDelete ] = useState(false)
  const [ modalResetPass, setModalResetPass ] = useState(false)

  useEffect(() => {
    api.get(`/users?query=${query}`)
      .then(res =>  {
        setUsers(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [update, query])

  function setDeletePost(user) {
    setUserId(user._id)
    setEditUser(user)
    setModalDelete(true)
  }

  function setBeforeEditUser(user) {
    setEditUser(user)
    setModalEdit(true)
  }

  function setBeforeResetPassUser(user) {
    setEditUser(user)
    setModalResetPass(true)
  }

  function handleSubmit() {
    if (!name || !username || !email) {
      setModalMessage(true)
      return
    }

    api.post(`/users`, { name, username, email, password })
      .then(res =>  {
        setUpdate(res.data)
        setModalPost(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleSubmitEdit() {
    const { _id, name, username, email } = userEdit

    if (!_id || !name || !username || !email) {
      setModalMessage(true)
      return
    }

    api.put(`/users/${_id}`, { name, username, email })
      .then(res =>  {
        setUpdate(res.data)
        setModalEdit(false)
      })
      .catch(err => {
        console.log(err)
        try {
          const message = err.response.status === 409 ? "Esse usuário já existe" : "Erro ao criar o usúario"
          alert(message)
        } catch (err) {
          alert("Sem resposta do servidor...")
        }
      })
  }

  function handleResetPass() {
    if ((!password || !passwordRepeat) || (password !== passwordRepeat)) {
      setModalMessage(true)
      return
    }

    console.log(userEdit._id)

    api.put(`users-reset-pass/${userEdit._id}`, { password, passwordRepeat }).then(res => {
      setModalResetPass(false)
    }).catch(res => {
      console.log(res)
    })
  }

  function handleDeletePost() {
    if(veryfyDelete !== userEdit.username)
      return alert("çjiefgbpwrep")

    api.delete(`users/${userId}`).then(res => {
      setModalDelete(false)
      setUpdate(res.data)
    }).catch(res => {
      console.log(res)
    })
  }

  async function handleCheck(id, value) {
    console.log(id)
    return await api.put(`/users/${id}`, { active: value })
  }

  return(
    <>
      <Header flag="TI" />
      <div className="container">
        <div className="container-fluid d-flex align-items-baseline w-100">
          <div className="d-flex align-items-end pl-2 pt-5"> <img src={group} style={{ width: "50px" }} alt="Users" /> 
          <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">Usuários</h3></div>
          <Search className="ml-auto mr-2" onChange={setQuery} />
        <button type="button" className="btn btn-info align-self-end mb-1" onClick={() => setModalPost(true)} >Adicionar <i className="fas fa-plus"></i></button>
        </div>
        <hr className="my"></hr>
        <div className="container pt-5" >
        {
        users.length ?
        users.map(user => {
          return (
            <div className={`post info`} key={user._id} >
              <div className="d-flex space-between w-100" >
                <div className="w-100" >
                  <h5 className="title-user"><i className="fas fa-user" /><i> {user.name}</i></h5>

                  <h6><i className="fas fa-at ml-4" /><strong>{user.username}</strong> </h6>

                  <h6><i className="far fa-envelope ml-4" /><span> {user.email}</span></h6>
                </div>
              </div>
              <img src={edit} alt="icone" title="Editar dados" style={{ height: "25px", cursor: "pointer", marginRight: "10px" }} onClick={() => setBeforeEditUser(user) }/>
              <img src={trash} alt="icone" title="Apagar" style={{ height: "25px", cursor: "pointer", marginRight: "10px" }} onClick={() => setDeletePost(user)}/>
              <img src={key} alt="icone" style={{ height: "25px", cursor: "pointer", marginRight: "10px" }} onClick={() => setBeforeResetPassUser(user) }/>
              <Switch checked={user.active} id={user._id} onChange={handleCheck} />
            </div>
          )
        })
        :
        <NotFound />
        }
        </div>
      </div>

      <Modal title={"Novo Usuário"} noIcon show={modalPost} func={handleSubmit} onDisable={setModalPost} >
        <div className="form-row">
          <div className="col">
            <label>Nome</label>
            <input type="text" className="form-control" placeholder="Nome completo" onChange={e => setName(e.target.value)} />
          </div>
          <div className="col">
            <label>Usuário</label>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">@</div>
              </div>
              <input type="text" className="form-control text-lowercase" id="inlineFormInputGroup" placeholder="Username" onChange={e => setUsername(e.target.value)} />
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" placeholder="Seu email" onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="form-row">
        <div className="col">
          <label>Senha</label>
          <input type="password" className="form-control" placeholder="Sua senha" onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="col">
          <label>Repetir senha</label>
          <input type="password" className="form-control" placeholder="Repita sua senha" onChange={e => setPasswordRepeat(e.target.value)} />
        </div>
      </div>
      </Modal>
      
      <Modal title={"Editar Usuário"} noIcon show={modalEdit} func={handleSubmitEdit} onDisable={setModalEdit} >
        <div className="form-row">
          <div className="col">
            <label>Nome</label>
            <input type="text" className="form-control" defaultValue={userEdit.name} placeholder="Nome completo" onChange={e => setEditUser({ ...userEdit, name: e.target.value })} />
          </div>
          <div className="col">
            <label>Usuário</label>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">@</div>
              </div>
              <input type="text" className="form-control text-lowercase" defaultValue={userEdit.username} placeholder="Username" onChange={e => setEditUser({ ...userEdit, username: e.target.value })} />
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" defaultValue={userEdit.email} placeholder="Seu email" onChange={e => setEditUser({ ...userEdit, email: e.target.value })} />
        </div>
      </Modal>

      <Modal title="Você tem absoluta certeza?" show={modalDelete} onDisable={setModalDelete} func={() => handleDeletePost()} >
        <span>Essa ação não pode ser desfeita. Isso excluirá permanentemente o usuário.</span>
        <span> Digite <strong>{userEdit.username}</strong> para confirmar.</span>
        <input type="text" className="form-control text-lowercase mt-3" placeholder={userEdit.username} onChange={e => setVerifyDelete(e.target.value)} />
      </Modal>
      
      <Modal title={`Definir nova senha para ${userEdit.name}`} show={modalResetPass} onDisable={setModalResetPass} func={() => handleResetPass()} >
        <div className="form-row">
          <div className="col">
            <label>Senha</label>
            <input type="password" className="form-control" placeholder="Sua senha" onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="col">
            <label>Repetir senha</label>
            <input type="password" className="form-control" placeholder="Repita sua senha" onChange={e => setPasswordRepeat(e.target.value)} />
          </div>
        </div>
      </Modal>

      <Modal title={"Preencha todos os campos corretamente"} message show={modalMessage} onDisable={setModalMessage} />
    </>
  )

}

export default Users;