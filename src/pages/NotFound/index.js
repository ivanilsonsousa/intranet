import React from 'react'
import { Link } from 'react-router-dom'

import notfound from '../../assets/404.svg'

function Pops() {

  return(
    <>
      <div className="container-fluid d-flex flex-column align-items-center justify-content-center content-body d-flex company pt-5">
        <img src={notfound} className="mb-5" alt="icone" style={{ height: "150px" }}/>
        <h4>Página não encontrada</h4>
        <Link to="/" ><b>Ir para home</b></Link>
      </div>
    </>
  )

}

export default Pops;