import React from 'react'
import Header from '../../../components/Header'

import posts_icon from '../../../assets/post.svg'

function Posts() {

  return(
    <>
      <Header/>
      <div className="container">
        <div className="container-fluid d-flex align-items-baseline w-100">
          <div className="d-flex align-items-end pl-2 pt-5"> <img src={posts_icon} style={{ width: "45px" }} alt="Posts" /> 
          <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">Posts</h3></div>
        <button type="button" className="btn btn-info align-self-end ml-auto" >Adicionar Post <i className="fas fa-plus"></i></button>
        </div>
        <hr className="my"></hr>
        <div className="container" >

        </div>
      </div>
    </>
  )

}

export default Posts;