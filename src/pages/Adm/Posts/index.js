import React, { useState, useEffect, useMemo } from 'react'
import Header from '../../../components/Header'
import AlertModal from '../../../components/Modal'
import Switch from '../../../components/Switch'

import trash from '../../../assets/bin.svg'
import notice_icon from '../../../assets/post.svg'

import photo from '../../../assets/camera.svg'
import api from '../../../services/api'

import './style.css'

import { getDate } from '../../../scripts/utils'

function Posts() {
  const [ query, setQuery ] = useState('')
  const [ photoPosts, setPhotoPosts ] = useState([])
  const [ postId, setPostId ] = useState(null)
  const [ modalNewPhotoPost, setModalNewPhotoPost ] = useState(false)
  const [ modalMessage, setModalMessage ] = useState(false)
  const [ update, setUpdate ] = useState([])
  const [ title, setTitle ] = useState('')
  const [ modalDelete, setModalDelete ] = useState(false)
  const [thumbnail, setThumbnail] = useState(null)

  const preview = useMemo(() => {
      return thumbnail ? URL.createObjectURL(thumbnail) : null
  }, [thumbnail])

  useEffect(() => {
    api.get(`/posts-caroussel?query=${query}`)
      .then(res =>  {
        setPhotoPosts(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [update, query])

  function setDeletePost(id) {
    setPostId(id)
    setModalDelete(true)
  }

  function setInsertPost() {
    setTitle('')
    setThumbnail(null)
    setModalNewPhotoPost(true)
  }

  function handleUpload() {
    if (!title || !thumbnail) {
      setModalMessage(true)
      return
    }

    const data = new FormData()
    data.append('title', title)
    data.append('file', thumbnail)

    api.post('/posts-caroussel', data)
    .then(response => {
      setModalNewPhotoPost(false)
      setUpdate(response.data)
    })
    .catch((err) => { 
      alert(err) 
      setThumbnail(null)
    })
  }

  function handleDeletePost() {
    api.delete(`posts-caroussel/${postId}`).then(res => {
      setModalDelete(false)
      setUpdate(res.data)
    }).catch(res => {
      console.log(res)
    })
  }

  async function handleCheck(id, value) {
    return await api.put(`/posts-caroussel/${id}`, { active: value })
  }

  return(
    <>
      <Header/>
      <div className="container">
        <div className="container-fluid d-flex align-items-baseline w-100">
          <div className="d-flex align-items-end pl-2 pt-5"> <img src={notice_icon} style={{ width: "50px" }} alt="Posts" /> 
          <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">Posts</h3></div>
        <form className="ml-auto form-search">
          <input type="search" className="search" onChange={e => setQuery(e.target.value)} />
          <i className="fa fa-search"></i>
        </form>
        <button type="button" className="btn btn-info align-self-end mb-1" onClick={() => setInsertPost()} >Adicionar <i className="fas fa-plus"></i></button>

        </div>
        <hr className="my"></hr>
        <div className="container pt-5" >

        {photoPosts.map(photoPost => {
          return (
            <div className="post info" key={photoPost._id} >
              <div className="d-flex space-around align-items-center w-100" >
                <div className="img-post" >
                  <img src={photoPost.file_url} alt=""/>
                </div>
                <h5>{photoPost.title}</h5>
              </div>
              <div className="pr-5 d-flex align-items-center">
                {getDate(photoPost.createAt)}
              </div>
              <img src={trash} alt="icone" style={{ height: "25px", cursor: "pointer", marginRight: "10px" }} onClick={() => setDeletePost(photoPost._id)}/>
              <Switch checked={photoPost.active} id={photoPost._id} onChange={handleCheck} />
            </div>
          )
        })}
        </div>
      </div>
      
      <AlertModal title={"Novo Post com Imagem"} noIcon show={modalNewPhotoPost} func={() => handleUpload()} onDisable={setModalNewPhotoPost} >
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Título" onChange={e => setTitle(e.target.value)} />
          
          <label 
              id="thumbnail" 
              style={{ backgroundImage: `url(${preview})` }}
              className={thumbnail ? 'has-thumbnail' : ''}
          >
              <input type="file" onChange={e => setThumbnail(e.target.files[0])}/>
              <img src={photo} style={{ width: "45px" }} alt="Select img"/>
          </label>

        </div>
      </AlertModal>

      <AlertModal title="Deseja realmente apagar esse post?" show={modalDelete} onDisable={setModalDelete} func={() => handleDeletePost()} />

      <AlertModal title={"Preencha todos os campos"} message show={modalMessage} onDisable={setModalMessage} />
    </>
  )
}

export default Posts;