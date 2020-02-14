import React from 'react'
import Header from '../../components/Header'

import stacasa from '../../assets/stacasa.svg'
import './styles.css'

function Login() {

  return(
    <>
      <Header/>
      <div className="container-fluid content-login d-flex align-items-center justify-content-center">
        <div className="box-login bg-light">
          <img src={stacasa} className="mb-2" alt="icone" style={{ height: "55px"}}/><br/>
          <span>Use sua conta para acessar o <b>Painel de configurações</b></span>
          <div className="form-login mt-3">
            <i className="fas fa-user mb-2"></i>
            <input type="text" name="user"/>
          </div>
          <div className="form-login mb-4">
            <i class="fas fa-key mb-2"></i>
            <input type="password" name="key"/>
          </div>
          <button type="submit">Entrar</button>
        </div>
      </div>
    </>
  )

}

export default Login;