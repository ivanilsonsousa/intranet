import React from 'react'
import OptionLink from '../OptionLink'
import './styles.css'

import folder_open from '../../assets/folder-open.svg'
import empty from '../../assets/empty.svg'

function Directory(props) {
  const { data } = props

  return data.length ? 
        <div className="row mb-3">
          {data.map((dir, index) => <OptionLink key={index} image={folder_open} legend={dir.title} folder parent={dir._id} func={props.func} /> )}
        </div>
        :
        <div className="container d-flex flex-column h-100 align-items-center justify-content-center pt-5 no-touch">
          <img src={empty} alt="Pasta Vazia" style={{ height: "55px"}}/>
          <span className="mt-3">Essa pasta está vazia.</span>
        </div> 
}

export default Directory;