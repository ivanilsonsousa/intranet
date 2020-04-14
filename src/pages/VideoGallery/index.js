import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
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
  const [ clock, setClock ] = useState([])
  const [ videos, setVideos ] = useState([])
  const history = useHistory()

  const [ like, setLike ] = useState(0)
  const [ unlike, setUnLike ] = useState(0)

  let seconds = 0 
  let paused = false
  // let viewVideo = false
  let videoPlayingCount 

  useEffect(() => {
    api.get(`/videos?query=${query}`)
      .then(res =>  {
        setVideos(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [query])

  function addView(id) {
    api.put(`/videos-add-view/${id}`)
    .then(response => {
      const { status } = response.data 

      console.log(status)
    })
    .catch((err) => { 
      console.log(err)
    })
  }

  function pause() { 
    paused = true
  }

  function finishClocks(clocks) {
    clocks.forEach(clock => clearInterval(clock))
  }

  function countView(idVideo) {
    if (idVideo === videoPlayingCount) {
      paused = false  
      console.log("entrou aqui")
      return
    } 
    // else if (viewVideo) {
    //   viewVideo = false
    //   return
    // }

    videoPlayingCount = videoPlay._id

    console.log("iniciou...")

    paused = false
    seconds = 0
    

    finishClocks(clock)
    
    let inter = setInterval(() => {

      if (history.location.pathname !== '/videos')
        paused = true
      
      if (!paused) {
        seconds++
      }
      
      if (seconds === 5) {
        seconds = 0
        console.log("+1 view ", videoPlay._id)
        addView(videoPlay._id)
        clearInterval(inter)
        // viewVideo = true
        sessionStorage.setItem("lastname", "Smith");
      }
      
    }, 1000);
    
    setClock([inter])
  }

  function handleLike() {
    setLike(like + 1)
  }
  
  function handleUnLike() {
    setUnLike(unlike + 1)
  }

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
              <ReactPlayer url={videoPlay.file_url} controls width="100%" height="auto" onPlay={() => countView(videoPlay._id)} onPause={() => pause()} playing />
              <h5 className="mt-2">{videoPlay.title}</h5>
              <div className="d-flex align-items-center justify-content-between">
                <span className="mr-100">{videoPlay.views} visualizações</span>
                <div className="content-like no-touch">
                  <div>
                    <i className="far fa-thumbs-up fa-2x" onClick={() => handleLike()} /><b> {like}</b>
                  </div>
                  <div>
                    <i className="ml-2 far fa-thumbs-down fa-2x" onClick={() => handleUnLike()} /><b> {unlike}</b>
                  </div>
                </div>
              </div>
              <hr/>
              <h4>Descrição</h4>
              <p className="paragraph">
                {videoPlay.description}<br/>
                {videoPlay._id}
              </p>
            </div>
            <div className="col col-md-5 mb-4">
              <VideoList data={videos} setVideoPlay={setVideoPlay} videoPlay={videoPlay} setQuery={setQuery} />
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default VideoGallery;