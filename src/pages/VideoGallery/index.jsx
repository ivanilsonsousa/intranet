import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ReactPlayer from "react-player";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import VideoList from "../../components/VideoList";

import api from "../../services/api";

import video_icon from "../../assets/cinema.svg";
import "./styles.css";

function VideoGallery() {
  const [query, setQuery] = useState("");
  const [videoPlay, setVideoPlay] = useState({});
  const [clock, setClock] = useState([]);
  const [videos, setVideos] = useState([]);
  const history = useHistory();

  const [countLike, setCountLike] = useState(0);
  const [countUnlike, setCountUnLike] = useState(0);

  const [like, setLike] = useState(false);
  const [unlike, setUnLike] = useState(false);

  let seconds = 0;
  let paused = false;
  let videoPlayingCount;

  useEffect(() => {
    api
      .get(`/videos?query=${query}`)
      .then((res) => {
        setVideos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query]);

  function refreshLikes(video) {
    setLike(false);
    setUnLike(false);
    console.log("ete");
    console.log(video);
    if (valuePropertyExists("likes", video)) {
      setLike(true);
    } else if (valuePropertyExists("unlikes", video)) setUnLike(true);
  }

  function addView(id) {
    api
      .put(`/videos-add-view/${id}`)
      .then((response) => {
        const { status } = response.data;

        console.log(status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function pause() {
    paused = true;
  }

  function finishClocks(clocks) {
    clocks.forEach((clock) => clearInterval(clock));
  }

  function countView(idVideo) {
    if (idVideo === videoPlayingCount) {
      paused = false;
      console.log("entrou aqui");
      return;
    }

    videoPlayingCount = videoPlay._id;

    console.log("iniciou...");

    paused = false;
    seconds = 0;

    finishClocks(clock);

    let inter = setInterval(() => {
      if (history.location.pathname !== "/videos") paused = true;

      if (!paused) {
        seconds++;
      }

      if (seconds === 5) {
        seconds = 0;
        console.log("+1 view ", videoPlay._id);
        addView(videoPlay._id);
        clearInterval(inter);
        // viewVideo = true
        // sessionStorage.setItem("lastname", "Smith");
      }
    }, 1000);

    setClock([inter]);
  }

  function addOrRemoveSessionStorage(property, value, remove = false) {
    let collection = new Set();

    if (sessionStorage.hasOwnProperty(property)) {
      collection = new Set(sessionStorage.getItem(property).split(";"));
    }

    collection.add(value);

    if (remove) {
      collection.delete(value);
    }

    sessionStorage.setItem(property, [...collection].join(";"));
  }

  function valuePropertyExists(property, value) {
    return (
      sessionStorage.hasOwnProperty(property) &&
      sessionStorage.getItem(property).split(";").includes(value)
    );
  }

  function handleLike(idVideo) {
    if (like) return;

    console.log(valuePropertyExists("unlikes", idVideo));

    if (valuePropertyExists("unlikes", idVideo))
      setCountUnLike(countUnlike - 1);

    setCountLike(countLike + 1);

    setLike(true);
    setUnLike(false);

    addOrRemoveSessionStorage("unlikes", idVideo, true);
    addOrRemoveSessionStorage("likes", idVideo);
  }

  function handleUnLike(idVideo) {
    if (unlike) return;

    console.log(valuePropertyExists("likes", idVideo));

    if (valuePropertyExists("likes", idVideo)) setCountLike(countLike - 1);

    setCountUnLike(countUnlike + 1);

    setLike(false);
    setUnLike(true);

    addOrRemoveSessionStorage("likes", idVideo, true);
    addOrRemoveSessionStorage("unlikes", idVideo);
  }

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="container-fluid d-flex align-items-baseline">
          <div className="d-flex align-items-end pl-2 pt-5">
            {" "}
            <img src={video_icon} style={{ width: "45px" }} alt="DashBoard" />
            <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">
              Vídeos
            </h3>
          </div>
        </div>
        <hr />
        <div className="container pb-5 mx-sm-auto">
          <div className="row">
            <div className="col col-12 col-md-7 mb-4">
              <ReactPlayer
                url={videoPlay.file_url}
                controls
                muted
                width="100%"
                height="auto"
                onPlay={() => countView(videoPlay._id)}
                onPause={() => pause()}
                playing
              />
              <h5 className="mt-2">{videoPlay.title}</h5>
              <div className="d-flex align-items-center justify-content-between">
                <span className="mr-100">{videoPlay.views} visualizações</span>
                <div className="content-like no-touch">
                  <div>
                    <i
                      className={`${like ? "fas" : "far"} fa-thumbs-up fa-2x`}
                      onClick={() => handleLike(videoPlay._id)}
                    />
                    <b> {countLike}</b>
                  </div>
                  <div>
                    <i
                      className={`${
                        unlike ? "fas" : "far"
                      } fa-thumbs-down fa-2x ml-2`}
                      onClick={() => handleUnLike(videoPlay._id)}
                    />
                    <b> {countUnlike}</b>
                  </div>
                </div>
              </div>
              <hr />
              <h4>Descrição</h4>
              <p className="paragraph">
                {videoPlay.description}
                <br />
                {videoPlay._id}
              </p>
            </div>
            <div className="col col-md-5 mb-4">
              <VideoList
                data={videos}
                setVideoPlay={setVideoPlay}
                videoPlay={videoPlay}
                setQuery={setQuery}
                setRefreshLike={refreshLikes}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default VideoGallery;
