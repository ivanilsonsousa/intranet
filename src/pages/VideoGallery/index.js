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
  const [ videoPlay, setVideoPlay ] = useState({})
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
              <ReactPlayer url={videoPlay.file_url} controls width="100%" onStart={() => console.log("iniciou...")} playing />
              <h5 className="mt-2">{videoPlay.title}</h5>
              <div className="d-flex align-items-center justify-content-between">
                <span className="mr-100">{videoPlay.views} visualizações</span>
                <div className="content-like">
                  <i className="far fa-thumbs-up fa-2x" /><b> {videoPlay.likes}</b>
                  <i className="ml-2 far fa-thumbs-down fa-2x" /><b> {videoPlay.unlikes}</b>
                </div>
              </div>
              <hr/>
              <h4>Descrição</h4>
              <p className="paragraph">
                {videoPlay.description}
              </p>
            </div>
            <div className="col col-md-5 mb-4">
              <VideoList data={videos} setVideoPlay={setVideoPlay} setQuery={setQuery} />
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default VideoGallery;