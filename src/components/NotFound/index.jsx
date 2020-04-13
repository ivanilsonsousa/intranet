import React from 'react'

import noResults from '../../assets/no-results.svg'

function NotFound(props) {

  return (
  <div className="container d-flex flex-column align-items-center pt-5 no-touch directory">
    <img src={noResults} alt="Sem resultados" style={{ height: "55px"}}/>
    <span className="mt-3">Nenhum resultado encontrado para essa busca!</span>
  </div> 
  )
}

export default NotFound;