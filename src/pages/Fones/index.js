import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import fone from '../../assets/phone.svg'
import api from '../../services/api'

function Phones() {
  const [ phones, setPhones ] = useState([])
  const [ query, setQuery ] = useState('')

  useEffect(() => {
    api.get(`/phones?query=${query}`)
      .then(res =>  {
        setPhones(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [query])

  return(
    <>
      <Header/>
      <div className="container content-body">
        <div className="container-fluid d-flex align-items-baseline w-100">
          <div className="d-flex align-items-end pl-2 pt-5"> <img src={fone} style={{ width: "50px" }} alt="Posts" /> 
          <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">Lista de Ramais</h3></div>
        <form className="ml-auto form-search">
          <input type="search" className="search" onChange={e => setQuery(e.target.value)} placeholder="Pesquisar..." />
          <i className="fa fa-search"></i>
        </form>
        </div>
        <hr className="my"></hr>
        <div className="container py-5" >
        {phones.map(phone => {
          return (
            <div className={`post secundary`} key={phone._id} >
              <div className="d-flex space-between w-100" >
                <div className="w-100" >
                  <h5 className="title-phone"><i className="fas fa-phone-alt mr-2"/><i>{phone.title}</i></h5>
                  <span className="description-phone ml-4"><strong> {phone.description}</strong></span>
                </div>
              </div>
            </div>
          )
        })}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Phones;