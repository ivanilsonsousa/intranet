import React from 'react'

import './styles.css'

function BreadCrumb(props) {
  let { data } = props

  // data = localStorage.getItem('stackParent') ? localStorage.getItem('stackParent') : data

  function updateStack(index) {
    const parent = data[index].parent

    props.setParent(parent)
    props.setStackParent(data.slice(0, ++index))
  }

  return (
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {
            data.map((element, index, array) => {
              const { legend } = element
              const isEndArray = Object.keys(array).length - 1 === index

              return <li key={index} className={`breadcrumb-item ${isEndArray ? 'active' : ''}`} > { isEndArray ? legend : <a href="" onClick={() => updateStack(index)} >{ legend }</a> } </li>
            })
          }
        </ol>
      </nav>
  )
}

export default BreadCrumb;