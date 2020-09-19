import React, { useState, useEffect, createContext, useContext } from "react";
import search_icon from "../../assets/search.svg";
import "./styles.css";

import { cutLegend } from "../../scripts/utils";

const VideoContext = createContext();

function VideoItem(props) {
  const { video, thumbnail, index } = props;
  const { setVideoPlay, refreshLikes, videoPlay, setIndex } = useContext(
    VideoContext
  );

  function handleClick() {
    setVideoPlay(video);
    refreshLikes(video);
    setIndex(index);
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
  const {
    setVideoPlay,
    data: videos,
    videoPlay,
    refreshLikes,
    setQuery,
  } = props;

  const [search, setSearch] = useState("");
  const [index, setIndex] = useState("1");
  const [quantityVideos, setQuantity] = useState(videos.length);

  function handleSearch(e) {
    e.preventDefault();
    setQuery(search);
  }

  const handleInicialize = () => {
    if (!videoPlay._id && videos[0]) setVideoPlay(videos[0]);
  };

  useEffect(() => {
    const idVideos = videos.map((video) => video._id);

    let indexVideo = idVideos.indexOf(videoPlay._id);

    indexVideo = !videoPlay._id ? 0 : indexVideo;

    setIndex(indexVideo == -1 ? "?" : indexVideo + 1);
  }, [videos]);

  useEffect(() => {
    handleInicialize();
    setQuantity(videos.length);
  }, [handleInicialize]);

  return (
    <div className="content-list">
      <div className="header-list">
        <h4>Lista de vídeos</h4>
        <span className="block">
          {index}/{quantityVideos}
        </span>
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
          <VideoContext.Provider
            key={video._id}
            value={{ setVideoPlay, videoPlay, refreshLikes, setIndex }}
          >
            <VideoItem
              playing={index === 0 ? true : false}
              video={video}
              index={index + 1}
              thumbnail={video.thumb_url}
            />
          </VideoContext.Provider>
        ))}
      </div>
    </div>
  );
}

export default VideoList;

export { VideoItem };
