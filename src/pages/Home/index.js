import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Carousel from '../../components/Carousel'
import OptionLink from '../../components/OptionLink'
import Callout from '../../components/Callout'
import Footer from '../../components/Footer'

import { ClipLoader as Spinner } from 'react-spinners'

import art from '../../assets/art.svg'
import video from '../../assets/video-cameras.svg'
import soulmv from '../../assets/soulmv.svg'
import fone from '../../assets/fones.svg'
import file from '../../assets/file.svg'
import folder from '../../assets/folder.svg'
import computer from '../../assets/computer.svg'
import mv from '../../assets/mv-indicadores.svg'
import sigtap from '../../assets/sigtap.svg'
import upToDate from '../../assets/upToDate.svg'
import gmail from '../../assets/gmail.svg'

import { getDate } from '../../scripts/utils'
import api from '../../services/api'

function Home() {
  const width = '33.33333'
  const [posts, setPosts] = useState([])
  const [photoPosts, setPhotoPosts] = useState([])

  useEffect(() => {
    async function loadPosts() {
      const response =  await api.get('/posts/20')

      setPosts(response.data)
    }
    
    loadPosts()
  }, [])
  
  useEffect(() => {
    async function loadPhotoPosts() {
      const response =  await api.get('/posts-caroussel-list')

      setPhotoPosts(response.data)
    }

    loadPhotoPosts()
  }, [])

  return (
    <>
      <Header flag="Home" />
      <div className="container-lg content-body p-2 pt-4">
        <div className="container-md px-lg-5 mx-xl-5">
          <div className="row mb-4">
            <div className="col-sm-6">

              { photoPosts.length ?
                <Carousel photos={photoPosts}/>
              : <div className="container d-flex h-100 align-items-center justify-content-center">
                  <Spinner sizeUnit="px" size={35} color="#4d6d6d" /> 
                </div>
              }
    
            </div>
            <div className="col-sm-6">
              <h1 className="display-4 title-display">Utilidades</h1>
              
              <div className="row mb-3">
                <OptionLink image={art} legend="Galeria de Fotos" to="/gallery" />
                <OptionLink image={video} legend="Vídeos" to="/videos" />
                <OptionLink image={soulmv} legend="Soul MV" externalLink={process.env.REACT_APP_URL_SOULMV} />
                <OptionLink image={fone} legend="Lista de Ramais" to="/fones"/>
              </div>

              <div className="row">
                <OptionLink image={mv} legend="MV Indicadores" externalLink={process.env.REACT_APP_URL_MV_PAINEL} />
                <OptionLink image={sigtap} legend="SigTap Web" externalLink={process.env.REACT_APP_URL_SIGTAP} />
                <OptionLink image={upToDate} legend="UpToDate" externalLink={process.env.REACT_APP_URL_UPTODATE} />
                <OptionLink image={gmail} legend="Email" externalLink={process.env.REACT_APP_URL_EMAIL} />
              </div>

            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 ">
              <h1 className="display-4 title-display">Comunicados</h1>
              {posts.map(post => (
                <Callout key={post._id} className={`callout-${post.type}`} title={post.title} description={post.description} date={getDate(post.createAt)} />
              ))}
            </div>

            <div className="col-sm-6">
              <h1 className="display-4 title-display mb-4">Acesse</h1>

              <div className="row mb-3 d-flex">
                <OptionLink 
                  image={file} 
                  legend="POPs" 
                  width={width}
                  className="justify-content-center"
                  to="pops"
                  backgroundColor="DarkSlateGray"
                />
                <OptionLink 
                  image={folder} 
                  legend="Documentos" 
                  width={width}
                  className="justify-content-center"
                  to="documents"
                  backgroundColor="SteelBlue"
                />
                <OptionLink 
                  image={computer}
                  legend="WebSys"
                  width={width}
                  className="justify-content-center"
                  externalLink={process.env.REACT_APP_URL_WSP}
                  backgroundColor="DarkSlateBlue"
                />
              </div>
              
              <h1 className="display-4 title-display mb-4">Aniversariantes</h1>
              <div className="row">
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
              </div>
                

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home;