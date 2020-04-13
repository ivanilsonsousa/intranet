import React, { useState } from 'react'

import './styles.css'

function Search(props) {
  const [ open, setOpen ] = useState(false)

  return (
    <div className={`searchBox ${open ? 'click' : ''} ${props.className}`} >
      <input className="searchInput"type="text" name="" placeholder="Pesquisar..." onChange={props.onChange ? (e) => props.onChange(e.target.value) : ()=>{}} />
      <button className="searchButton" onClick={() => setOpen(!open)}>
        <i className={`fa fa-${open ? 'times' : 'search'}`} />
      </button>
  </div>
  )
}

export default Search;