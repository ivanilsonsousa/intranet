import React from "react";
import { Link } from "react-router-dom"
import Header from "../../components/Header";
import { Container, Content, HeaderDescription } from "../../components/Layout";
import Footer from "../../components/Footer";

import './styles.css';

import video_icon from "../../assets/cinema.svg";

const DIR = process.env.REACT_APP_DIR;

function PlaylistOption(props) {

  return (
    <div className="wrapper-playlist">
      <div className="thumbnail-playlist">
        <img src="https://i.ytimg.com/vi/SP6zu6lylIo/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDMxP3Ouj8Yzsk9LFc_k-K1gQqPUw" alt="Invenvicel" />
        <div className="img-shadow"><i className="fas fa-play mr-2" /> REPRODUZIR TODOS</div>
        <div className="info">
          16
          <i class="fas fa-list-ul" />
        </div>
      </div>
      <span className="video-title" >Tudo sobre Invencível - Série Adulta de Super-Heróis Prime Video</span>
    </div>
  )
}

function Videos() {

  return (
    <div className="playlist-body">
      {Array.from(Array(1000).keys()).map( n => <Link to={`/${DIR}/videos`} ><PlaylistOption /> </Link> )}
    </div>
  )
}

function Playlists () {

  return (
    <>
      <Header />
      <Container>
        <HeaderDescription icon={video_icon} title="Playlists" iconTam="45" />
        <Content>
          <Videos />
        </Content>
      </Container>    
      <Footer />    
    </>
  );
}

export default Playlists;