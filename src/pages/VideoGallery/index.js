import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import VideoList from '../../components/VideoList'

import api from '../../services/api'

import video_icon from '../../assets/cinema.svg'
import './styles.css'

function VideoGallery() {
  const [ query, setQuery ] = useState('')
  const [ video, setVideo ] = useState('')
  const [ videos, setVideos ] = useState([])

  useEffect(() => {
    api.get(`/videos?query=${query}`)
      .then(res =>  {
        setVideos(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [query])

  return(
    <>
      <Header/>
      <div className="container-fluid">
        <div className="container-fluid d-flex align-items-baseline">
          <div className="d-flex align-items-end pl-2 pt-5"> <img src={video_icon} style={{ width: "45px" }} alt="DashBoard" /> 
          <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">Vídeos</h3></div>
        </div>
        <hr/>
        <div className="container pb-5 mx-sm-auto" >
          <div className="row">
            <div className="col col-12 col-md-7 mb-4">
              <ReactPlayer url={video} controls width="100%" onStart={() => console.log("iniciou...")} />
              <h5 className="mt-2">Ed Sheeran - 'Photograph' (Capital Live Session)</h5>
              <div className="d-flex align-items-center justify-content-between">
                <span className="mr-100">19.864.253 visualizações</span>
                <div className="content-like">
                  <i className="far fa-thumbs-up fa-2x" /><b> 32</b>
                  <i className="ml-2 far fa-thumbs-down fa-2x" /><b> 14</b>
                </div>
              </div>
              <hr/>
              <h4>Descrição</h4>
              <h6>Ed Sheeran came by the Capital FM live studio to sing us a few of his new tracks. This is a stripped-back, acoustic version of his new track 'Photograph'.</h6>
            </div>
            <div className="col col-md-5 mb-4">
              <VideoList data={videos} setVideo={setVideo} />
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default VideoGallery;