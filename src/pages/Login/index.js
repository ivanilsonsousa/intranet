import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../components/Header'

import stacasa from '../../assets/stacasa.svg'
import './styles.css'

function Login() {
  const [showPass, setShowPass] = useState(true)
  
  const history = useHistory()
  
  const handleSubmitLogin = (e) => {
    e.preventDefault()
    history.push('/dashboard')
  }

  return(
    <>
      <Header/>
      <form onSubmit={(e) => handleSubmitLogin(e)} >
      <div className="container-fluid content-login d-flex justify-content-center">
        <div className="box-login bg-light">
          <img src={stacasa} className="mb-2" alt="icone" style={{ height: "55px"}}/><br/>
          <span>Use sua conta para acessar o <b>Painel de configurações</b></span>
          <div className="form-login mt-3">
            <i className="fas fa-user mb-2" />
            <input type="text" name="user" placeholder="Digite seu usuário" />
          </div>
          <div className="form-login mb-4 content-pass">
            <i className="fas fa-key mb-2" />
            <input type={showPass ? 'password' : 'text'} name="key" placeholder="Digite sua senha" />
            <span className="span-show no-touch" onClick={() => setShowPass(!showPass)} >{showPass ? 'MOSTRAR' : 'OCULTAR'}</span>
          </div>
          <button type="submit">Entrar</button>
        </div>
      </div>
      </form>
    </>
  )

}

export default Login;