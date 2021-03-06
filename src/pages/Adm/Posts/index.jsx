import React, { useState, useEffect, useMemo, useRef } from "react";
import Header from "../../../components/Header";
import Modal from "../../../components/ModalNew";
import Switch from "../../../components/Switch";
import NotFound from "../../../components/NotFound";
import Search from "../../../components/Search";
import { ClipLoader as Spinner } from "react-spinners";

import trash from "../../../assets/bin.svg";
import notice_icon from "../../../assets/post.svg";

import photo from "../../../assets/camera.svg";
import api from "../../../services/api";

import "./style.css";

import { getDate } from "../../../scripts/utils";

function Posts() {
  const modalNewPhotoPost = useRef(null);
  const modalMessage = useRef(null);
  const modalDelete = useRef(null);

  const [query, setQuery] = useState("");
  const [photoPosts, setPhotoPosts] = useState([]);
  const [postId, setPostId] = useState(null);
  const [update, setUpdate] = useState([]);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = () => `Bearer ${localStorage.getItem("token")}`;

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  useEffect(() => {
    setLoading(true);

    api
      .get(`/posts-caroussel?query=${query}`, {
        headers: { Authorization: token() },
      })
      .then((res) => {
        setPhotoPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update, query]);

  function setDeletePost(id) {
    setPostId(id);
    modalDelete.current.openModal();
  }

  function setInsertPost() {
    setTitle("");
    setThumbnail(null);
    modalNewPhotoPost.current.openModal();
  }

  function handleUpload() {
    if (!title || !thumbnail) {
      modalMessage.current.openModal();
      return;
    }

    const data = new FormData();
    data.append("title", title);
    data.append("file", thumbnail);

    api
      .post("/posts-caroussel", data, { headers: { Authorization: token() } })
      .then((response) => {
        modalNewPhotoPost.current.closeModal();
        setUpdate(response.data);
      })
      .catch((err) => {
        alert(err);
        setThumbnail(null);
      });
  }

  function handleDeletePost() {
    api
      .delete(`posts-caroussel/${postId}`, {
        headers: { Authorization: token() },
      })
      .then((res) => {
        modalDelete.current.closeModal();
        setUpdate(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  async function handleCheck(id, value) {
    return await api.put(
      `/posts-caroussel/${id}`,
      { active: value },
      { headers: { Authorization: token() } }
    );
  }

  return (
    <>
      <Header flag="TI" />
      <div className="container">
        <div className="container-fluid d-flex align-items-baseline w-100">
          <div className="d-flex align-items-end pl-2 pt-5">
            {" "}
            <img src={notice_icon} style={{ width: "50px" }} alt="Posts" />
            <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">
              Posts
            </h3>
          </div>
          <Search className="ml-auto mr-2" onChange={setQuery} />
          <button
            type="button"
            className="btn align-self-end btn-rounded"
            onClick={() => setInsertPost()}
          >
            Adicionar <i className="fas fa-plus"></i>
          </button>
        </div>
        <hr className="my"></hr>
        <div className="container pt-5">
          {loading ? (
            <div className="d-flex align-items-center justify-content-center">
              <Spinner sizeUnit="px" size={35} color="#4d6d6d" />
            </div>
          ) : photoPosts.length ? (
            photoPosts.map((photoPost) => {
              return (
                <div className="post info" key={photoPost._id}>
                  <div className="d-flex space-around align-items-center w-100">
                    <div className="img-post">
                      <img src={photoPost.file_url} alt="" />
                    </div>
                    <h5>{photoPost.title}</h5>
                  </div>
                  <div className="pr-5 d-flex align-items-center">
                    {getDate(photoPost.createAt)}
                  </div>
                  <img
                    src={trash}
                    alt="icone"
                    style={{
                      height: "25px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                    onClick={() => setDeletePost(photoPost._id)}
                  />
                  <Switch
                    checked={photoPost.active}
                    id={photoPost._id}
                    onChange={handleCheck}
                  />
                </div>
              );
            })
          ) : (
            <NotFound />
          )}
        </div>
      </div>

      <Modal
        title={"Novo Post com Imagem"}
        noIcon
        ref={modalNewPhotoPost}
        onConfirm={() => handleUpload()}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Título"
            onChange={(e) => setTitle(e.target.value)}
          />

          <label
            id="thumbnail"
            style={{ backgroundImage: `url(${preview})` }}
            className={thumbnail ? "has-thumbnail" : ""}
          >
            <input
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
              accept="image/*"
            />
            <img src={photo} style={{ width: "45px" }} alt="Select img" />
          </label>
        </div>
      </Modal>

      <Modal
        title="Deseja realmente apagar esse post?"
        ref={modalDelete}
        onConfirm={() => handleDeletePost()}
      />

      <Modal title={"Preencha todos os campos"} message ref={modalMessage} />
    </>
  );
}

export default Posts;
