import React from 'react'
import Header from '../../components/Header'
import Search from '../../components/Search'


function Pops() {

  return(
    <>
      <Header/>
      <div>Teste Pops</div>
      <div className="container-fluid content-body d-flex company pt-5">
        <Search className="ml-auto" />
      </div>
    </>
  )

}

export default Pops;