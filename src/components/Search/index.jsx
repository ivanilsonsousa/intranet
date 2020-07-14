import React, { useState, useRef } from 'react'

import './styles.css'

function Search(props) {
  const inputRef = useRef(null);
  const [ open, setOpen ] = useState(false);
  const { onChange, className } = props;
  let time = null;

  function handleChange(value) {
    clearTimeout(time);

    time = setTimeout(() => {
      onChange(value);
    }, 1000);
  }

  function handleClick() {
    inputRef.current.focus();
    setOpen(!open);
  }

  return (
    <div className={`searchBox ${open ? 'click' : ''} ${className}`} >
      <input 
        type="text" 
        ref={inputRef} 
        className="searchInput" 
        placeholder="Pesquisar..." 
        onChange={onChange ? (e) => handleChange(e.target.value) : ()=>{}} 
      />
      <button className="searchButton" onClick={() => handleClick()}>
        <i className={`fa fa-${open ? 'times' : 'search'}`} />
      </button>
  </div>
  )
}

export default Search;