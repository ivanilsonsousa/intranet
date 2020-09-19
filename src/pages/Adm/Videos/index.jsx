import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from '../../../components/Header';
import Modal from '../../../components/Modal';
import NotFound from '../../../components/NotFound';
import Search from '../../../components/Search';
import { ClipLoader as Spinner } from 'react-spinners';
import { Line } from 'rc-progress';

import useSearch from '../../../Context/hooks/useSearch'

import video from '../../../assets/cinema.svg';

import api from '../../../services/api';
import { cutLegend } from '../../../scripts/utils'

import './style.css';

import VideoCard from './components/VideoCard/'

function Videos() {
  const [fileVideo, setFileVideo] = useState(null);
  const [fileThumb, setFileThumb] = useState(null); 

  const [title, setTitle] = useState(''); 
  const [company, setCompany] = useState(''); 
  const [description, setDescription] = useState(''); 

  const [query, setQuery] = useState('');
  const [update, setUpdate] = useState([]);
  const [load, setLoad] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoEdit, setVideoEdit] = useState({});

  const token = () => `Bearer ${localStorage.getItem("token")}`;

  // inicio

  const [pageNumber, setPageNumber] = useState(0);

  const {
    content,
    hasMore,
    loading,
    error
  } = useSearch('videos', query, pageNumber, update);

  const observer = useRef();
  const lastBookElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
      
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    })
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // fim

  function resetFields() {
    setTitle('');
    setCompany('');
    setDescription('');
    setFileThumb(null);
    setFileVideo(null);
    setProgress(0);
  }

  function handlePostVideo() {
    if (!title || !company || !description || !fileVideo || !fileThumb) {
      setModalMessage(true);
      return;
    }

    const data = new FormData();

    data.append("title", title);
    data.append("company", company);
    data.append("description", description);
    data.append("file", fileVideo);
    data.append("thumb", fileThumb);

    api.post('/videos', data, { 
        headers: { Authorization: token() }, 
        onUploadProgress: up => {
        const upload = parseInt(Math.round((up.loaded * 100) / up.total));

        setProgress(upload);
      } })
      .then((res) => {
        setModal(false);
        setUpdate(res.data);
        setPageNumber(0);

        resetFields();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function deleteVideo(video) {
    console.log(video);
    setVideoEdit(video);
    setModalDelete(true);
  }

  function handleDeleteVideo() {
    console.log(videoEdit);
    api
      .delete(`/videos/${videoEdit._id}`, { headers: { Authorization: token() } })
      .then((res) => {
        const { status } = res.data;

        console.log(status);
        setModalDelete(false);
        setPageNumber(0);
        setUpdate(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Header flag="TI" />
      <div className="container-fluid">
        <div className="container-fluid d-flex align-items-baseline w-100">
          <div className="d-flex align-items-end pl-2 pt-5">
            <img src={video} style={{ width: "50px" }} alt="Posts" />
            <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">
              Vídeos
            </h3>
          </div>
          <Search className="ml-auto mr-2" onChange={setQuery} afterChange={() => setPageNumber(0)} />
          <button
            type="button"
            className="btn align-self-end btn-rounded"
            onClick={() => setModal(true)}
          >
            Adicionar <i className="fas fa-plus"></i>
          </button>
        </div>
        <hr className="my"></hr>
        
        {loading && !hasMore ? 
          <div className="d-flex align-items-center justify-content-center">
            <Spinner sizeUnit="px" size={35} color="#4d6d6d" />
          </div>
          :
          content.length ?
          <>
          <div className="my-4 content-wrapper">
            {content.map((book, index) => {
              if (content.length === index + 1) {
                return <VideoCard refs={lastBookElementRef} key={book._id} video={book} deleteVideo={deleteVideo} />
              } else {
                return <VideoCard key={book._id} video={book} deleteVideo={deleteVideo} />
              }
            })}
          </div>
          {hasMore && <div className="d-flex align-items-center justify-content-center">
            <Spinner sizeUnit="px" size={35} color="#4d6d6d" />
          </div> }
          </>
          :
          <NotFound />}

      </div>

      <Modal
      title={"Novo Vídeo"}
      noIcon
      show={modal}
      func={handlePostVideo}
      onDisable={setModal}
      backdrop="static"
      >
      <div className="form-row">
        <div className="col">
          <label>Título</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título do vídeo"
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="col">
          <label>Empresa</label>
          <select
            className="form-control"
            id="menu-select"
            onChange={e => setCompany(e.target.value)}
          >
            <option value="Sem Empresa" hidden >Selecione uma empresa</option>
            <option value="Santa Casa">Santa Casa</option>
            <option value="Dom Walfrido">Dom Walfrido</option>
            <option value="Hospital do Coração">Hospital do Coração</option>
            <option value="Dom Odelir">Dom Odelir</option>
          </select>
        </div>
      </div>
      <div className="form mt-1">
        <label>Thumbnail do vídeo</label>
        <label className="file-upload">
          <div
            className="upload-button-icon"
          >
            <i className="fas fa-file-import" />
            <input 
              className="file-upload__input" 
              type="file" 
              accept="image/*"
              onChange={e => setFileThumb(e.target.files[0])}
            />
          </div>
          <span className={`file-upload__label ${fileThumb?.name && 'select'}`}>
            {fileThumb?.name ? cutLegend(fileThumb.name) : 'Selecione um arquivo...'}
          </span>
        </label>
      </div>
      <div className="form mt-1">
        <label>Arquivo de vídeo</label>
        <label className="file-upload">
          <div
            className="upload-button-icon"
          >
            <i className="fas fa-file-import" />
            <input 
              className="file-upload__input" 
              type="file" 
              accept="video/*"
              onChange={e => {
                console.log(e.target.files[0]);
                setFileVideo(e.target.files[0]);
              }}
            />
          </div>
          <span className={`file-upload__label ${fileVideo?.name && 'select'}`}>
            {fileVideo?.name ? cutLegend(fileVideo.name) : 'Selecione um arquivo...'}
          </span>
        </label>
      </div>
      <div className="form-row">
        <div className="col">
          <label>Descrição</label>
          <textarea 
            className="form-control" 
            rows="3" 
            onChange={e => setDescription(e.target.value)}
            >
          </textarea>
        </div>
      </div>
      { !!progress && <Line percent={progress} strokeWidth="1" strokeColor="#a52a2a" /> }
    </Modal>
    
    <Modal
      title={"Preencha todos os campos"}
      message
      show={modalMessage}
      onDisable={setModalMessage}
    />

    <Modal
      title={"Você tem certeza que deseja excluir o vídeo?"}
      show={modalDelete}
      func={handleDeleteVideo}
      onDisable={setModalDelete}
    />

    </>
  );
}

export default Videos;
