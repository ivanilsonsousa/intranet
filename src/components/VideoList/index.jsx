import React, { useState, useEffect } from "react";
import search_icon from "../../assets/search.svg";
import "./styles.css";

import { cutLegend } from "../../scripts/utils";

function VideoItem(props) {
  const [playing, setPlaying] = useState(props.playing);
  const { selectedVideo, setVideo } = props.func;
  const { video, thumbnail, setRefreshLike } = props;

  function handleClick() {
    setPlaying(true);
    props.setVideoPlay(video);
    setVideo(video._id);
  }

  useEffect(() => {
    if (props.playing && selectedVideo === "#") return;

    if (selectedVideo !== video._id) setPlaying(false);
    else {
      setRefreshLike(video._id);
      setPlaying(true);
    }
  }, [selectedVideo, video._id, props.playing, setRefreshLike]);

  return (
    <div
      onClick={() => handleClick()}
      className={`video-item ${playing ? "playing" : ""}`}
    >
      <i className="fas fa-play d-flex align-items-center justify-content-center pr-2" />
      <div className="video-thumbnail">
        <img src={thumbnail} alt="Tumbnail" />
      </div>
      <div className="video-details">
        <h5 title={video.title}>{cutLegend(video.title)}</h5>
        <span>{video.company}</span>
      </div>
    </div>
  );
}

function VideoList(props) {
  const [query, setQuery] = useState("");
  const [selectedVideo, setVideo] = useState("#");
  const { setVideoPlay } = props;
  const videos = props.data;

  function handleSearch(e) {
    e.preventDefault();
    props.setQuery(query);
  }

  useEffect(() => {
    if (!props.videoPlay._id && videos[0]) setVideoPlay(videos[0]);
  }, [videos, setVideoPlay, props.videoPlay._id]);

  return (
    <div className="content-list">
      <div className="header-list">
        <h4>Lista de vídeos</h4>
        <span className="block">3/100</span>
        <div className="md-form active-search">
          <form onSubmit={(e) => handleSearch(e)}>
            <input
              placeholder="Pesquise por vídeos"
              className="form-control"
              aria-label="Search"
              onChange={(e) => setQuery(e.target.value)}
              type="text"
            />
            <img
              src={search_icon}
              style={{ width: "20px" }}
              alt="Icon Search"
            />
          </form>
        </div>
      </div>
      <div className="video-list">
        {videos.map((video, index) => (
          <VideoItem
            key={video._id}
            playing={index === 0 ? true : false}
            video={video}
            func={{ selectedVideo, setVideo }}
            setRefreshLike={props.setRefreshLike}
            thumbnail="http://localhost:3333/files/photos-caroussel/thumb.jpg"
            setVideoPlay={props.setVideoPlay}
          />
        ))}
      </div>
    </div>
  );
}

export default VideoList;

export { VideoItem };
