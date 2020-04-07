import React, { useState } from 'react'
import search_icon from '../../assets/search.svg'
import './styles.css'

function VideoItem(props) {
  const [ playing, setPlaying ] = useState('')

  function handleClick() {
    setPlaying(true)
    props.setVideo(props.file)
  }

  return (
    <div onClick={() => handleClick()} className={`video-item ${playing ? 'playing' : ''}`}>
      <i className="fas fa-play d-flex align-items-center justify-content-center pr-2" />
      <div className="video-thumbnail">
        <img src={props.thumbnail} alt="Tumbnail"/>
      </div>
      <div className="video-details">
      <h5>{props.title}</h5>
      <span>{props.company}</span>
      </div>
    </div>
  )
}

function VideoList(props) {
  const [query, setQuery] = useState('')
  const videos = props.data

  function handleSearch(e) {
    e.preventDefault()
    console.log(query)
  }

  return(
    <div className="content-list">
      <div className="header-list">
        <h4>Lista de vídeos</h4>
        <span className="block">3/100</span>
        <div className="md-form active-search">
          <form onSubmit={e => handleSearch(e)}>
            <input 
              placeholder="Pesquise por vídeos" 
              className="form-control" 
              aria-label="Search"
              onChange={e => setQuery(e.target.value)}
              type="text" 
            />
            <img src={search_icon} style={{ width: "20px" }}/>
          </form>
        </div>
      </div>
      <div className="video-list">
        {videos.map((video, index) => <VideoItem key={index} title={video.title} company={video.company} file={video.file_url} thumbnail="http://localhost:3333/files/ttht/CARLOS-1585998407520.jpg" setVideo={props.setVideo} />)}
      </div>
    </div>     
  )

}

export default VideoList;

export { VideoItem };