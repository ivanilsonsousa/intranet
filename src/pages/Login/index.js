import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../components/Header'

import stacasa from '../../assets/stacasa.svg'
import './styles.css'

import api from '../../services/api'

function Login() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [showPass, setShowPass] = useState(true)
  const history = useHistory()
  
  useEffect(() => {
    const session = localStorage.getItem('_id')

    console.log(history)

    if(session && history.action === 'PUSH')
      history.push('/dashboard')
    else if (history.action === 'POP') {
      history.push('/')
    }
  }, [])

  function handleSubmitLogin(e) {
    e.preventDefault()

    api.post('/login', { user, password })
    .then(response => {
      const { _id, message } = response.data 
      console.log(message)
      if(_id) {
        localStorage.setItem('_id', _id)
        history.push('/dashboard')
      } else {
        setMessage(message)
        setTimeout(() => {
          console.log("mano do ceu")
          setShowMessage(false)
        }, 3000)
        setShowMessage(true)
      }
    })
    .catch((err) => { 
      console.log(err)
    })

  }

  return(
    <>
      <Header/>
      <form onSubmit={(e) => handleSubmitLogin(e)} >
      <div className="container-fluid content-login d-flex justify-content-center">
        <div className="box-login bg-light">
          <img src={stacasa} className="mb-2" alt="icone" style={{ height: "55px" }}/><br/>
          <span>Use sua conta para acessar o <b>Painel de configurações</b></span>
          <div className="form-login mt-3">
            <i className="fas fa-user mb-2" />
            <input type="text" name="user" placeholder="Digite seu usuário" onChange={e => setUser(e.target.value)} />
          </div>
          <div className="form-login mb-4 content-pass">
            <i className="fas fa-key mb-2" />
            <input type={showPass ? 'password' : 'text'} name="key" placeholder="Digite sua senha" onChange={e => setPassword(e.target.value)} />
            <span className="span-show no-touch" onClick={() => setShowPass(!showPass)} >{showPass ? 'MOSTRAR' : 'OCULTAR'}</span>
          </div>
          <button type="submit" className={`mb-2 ${ user && password ? '' : 'btn-disabled'}`} disabled={ user && password ? false : true } >Entrar</button>
          {showMessage && <span className={`login-error ${showMessage ? 'fadeIn':''}`} ><strong>{message}</strong></span>}
        </div>
      </div>
      </form>
    </>
  )

}

export default Login;