import React, { useState, useEffect, createContext, useContext } from "react";
import search_icon from "../../assets/search.svg";
import "./styles.css";

import { cutLegend } from "../../scripts/utils";

const VideoContext = createContext();

function VideoItem(props) {
  const { video, thumbnail } = props;
  const { setVideoPlay, refreshLikes, videoPlay } = useContext(VideoContext);

  function handleClick() {
    setVideoPlay(video)
    refreshLikes(video)
  }

  return (
    <div
      onClick={() => handleClick()}
      className={`video-item ${video._id === videoPlay._id ? "playing" : ""}`}
    >
      <i className="fas fa-play d-flex align-items-center justify-content-center px-1" />
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
  const [search, setSearch] = useState("");
  const { setVideoPlay, data: videos, videoPlay, refreshLikes, setQuery } = props;

  function handleSearch(e) {
    e.preventDefault();
    setQuery(search);
  }

  const handleInicialize = () => {
    if (!videoPlay._id && videos[0]) setVideoPlay(videos[0]);
  }

  useEffect(() => {
    handleInicialize()
  }, [handleInicialize]);

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
              onChange={(e) => setSearch(e.target.value)}
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
          <VideoContext.Provider key={video._id} value={{ setVideoPlay, videoPlay, refreshLikes }} >
            <VideoItem
              playing={index === 0 ? true : false}
              video={video}
              thumbnail="http://10.1.3.119:3333/files/file/thumbI.png"
            />
          </VideoContext.Provider>
        ))}
      </div>
    </div>
  );
}

export default VideoList;

export { VideoItem };
