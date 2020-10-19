import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ClipLoader as Spinner } from 'react-spinners';
import NotFound from '../../../components/NotFound';
import Search from '../../../components/Search';
import Header from '../../../components/Header';
import Modal from '../../../components/Modal';
import { Line } from 'rc-progress';

import useSearch from '../../../Context/hooks/useSearch'

import video from '../../../assets/cinema.svg';

import api from '../../../services/api';
import { cutLegend } from '../../../scripts/utils'

import './style.css';

import ModalVideo from '../../../components/ModalVideo';
import VideoCard from './components/VideoCard/'

function Videos() {
  const [fileVideo, setFileVideo] = useState(null);
  const [fileThumb, setFileThumb] = useState(null); 
  const [fileThumbEdit, setFileThumbEdit] = useState(null); 

  const [title, setTitle] = useState(''); 
  const [company, setCompany] = useState(''); 
  const [description, setDescription] = useState(''); 

  const [query, setQuery] = useState('');
  const [update, setUpdate] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalVideo, setModalVideo] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoEdit, setVideoEdit] = useState({});

  const token = () => `Bearer ${localStorage.getItem("token")}`;

  // inicio

  const [pageNumber, setPageNumber] = useState(0);

  const {
    content,
    setContent,
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

  function removeItemContent(id) {
    setModalDelete(false);

    const values = content.filter(e => {
      if (e._id !== id) return e;
    })

    setContent(values);

  }

  function editItemContent(newRegister) {
    const { _id: id } = newRegister;

    const values = content.map(e => e._id !== id ? e : newRegister);
    
    setContent(values);
    setModalEdit(false);
  }

  function resetFields() {
    setTitle('');
    setCompany('');
    setDescription('');
    setFileThumb(null);
    setFileVideo(null);
    setProgress(0);
  }
  
  function resetFieldsEdit() {
    setVideoEdit({});
    setFileThumbEdit(null);
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

  function handleDeleteVideo() {
    console.log(videoEdit);
    api
      .delete(`/videos/${videoEdit._id}`, { headers: { Authorization: token() } })
      .then((res) => {
        removeItemContent(videoEdit._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handlePostVideoEdit() {
    const { _id, title, company, description } = videoEdit;
    console.log(videoEdit);

    if (!title || !company || !description) {
      setModalMessage(true);
      return;
    }

    const data = new FormData();

    data.append("id", _id);
    data.append("title", title);
    data.append("company", company);
    data.append("description", description);
    data.append("thumb", fileThumbEdit);

    api.put(`videos/${_id}`, data, { 
      headers: { Authorization: token() }, 
      onUploadProgress: up => {
      const upload = parseInt(Math.round((up.loaded * 100) / up.total));

      setProgress(upload);
    } })
    .then((res) => {
      const { data } = res;
      editItemContent(data);

      resetFieldsEdit();
    })
    .catch((err) => {
      console.error(err);
    });

  }

  function handleClickPlayVideo(video) {
    setVideoEdit(video);
    console.log(videoEdit);

    setModalVideo(true);
  }

  function handleClickEditVideo(video) {
    const { _id, title, company, description } = video;
    setVideoEdit({ _id, title, company, description });

    setModalEdit(true);
  }

  function handleClickDeleteVideo(video) {
    setVideoEdit(video);
    setModalDelete(true);
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
            Adicionar <i className="fas fa-plus" />
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
            {content.map((video, index) => 
              <VideoCard 
                video={video} 
                key={video._id} 
                refs={content.length === index + 1 ? lastBookElementRef : null} 
                onClickPlay={handleClickPlayVideo} 
                onClickEdit={handleClickEditVideo} 
                onClickDelete={handleClickDeleteVideo} 
              />
            )}
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
              onChange={e => setFileVideo(e.target.files[0])}
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
      title={"Editar Vídeo"}
      noIcon
      show={modalEdit}
      func={handlePostVideoEdit}
      onDisable={setModalEdit}
      backdrop="static"
      >
      <div className="form-row">
        <div className="col">
          <label>Título</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título do vídeo"
            defaultValue={videoEdit.title}
            onChange={e => setVideoEdit({ ...videoEdit, title: e.target.value })}
          />
        </div>
        <div className="col">
          <label>Empresa</label>
          <select
            className="form-control"
            id="menu-select"
            onChange={e => setVideoEdit({ ...videoEdit, company: e.target.value })}
            defaultValue={videoEdit.company}
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
              onChange={e => setFileThumbEdit(e.target.files[0])}
            />
          </div>
          <span className={`file-upload__label ${fileThumbEdit?.name && 'select'}`}>
            {fileThumbEdit?.name ? cutLegend(fileThumbEdit.name) : 'Selecione um arquivo...'}
          </span>
        </label>
      </div>
      <div className="form-row">
        <div className="col">
          <label>Descrição</label>
          <textarea 
            className="form-control" 
            rows="3" 
            defaultValue={videoEdit.description}
            onChange={e => setVideoEdit({ ...videoEdit, description: e.target.value })}
            >
          </textarea>
        </div>
      </div>
      { !!progress && fileThumbEdit && <Line percent={progress} strokeWidth="1" strokeColor="#a52a2a" /> }
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

    <ModalVideo open={modalVideo} setOpen={setModalVideo} video={videoEdit} />
    </>
  );
}

export default Videos;
