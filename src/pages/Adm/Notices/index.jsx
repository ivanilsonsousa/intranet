import React, { useState, useEffect, useRef } from "react";
import Header from "../../../components/Header";
import Modal from "../../../components/ModalNew";
import Switch from "../../../components/Switch";
import NotFound from "../../../components/NotFound";
import Search from "../../../components/Search";
import { ClipLoader as Spinner } from "react-spinners";

import trash from "../../../assets/bin.svg";
import edit from "../../../assets/edit.svg";
import posts_icon from "../../../assets/origami.svg";
import api from "../../../services/api";

import "./style.css";

import { getDate } from "../../../scripts/utils";

function Notices() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [postId, setPostId] = useState(null);
  const [postEdit, setPostEdit] = useState({});

  const modalPost = useRef(null);
  const modalMessage = useRef(null);
  const modalEdit = useRef(null);
  const modalDelete = useRef(null);

  const [update, setUpdate] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("primary");
  const [loading, setLoading] = useState(true);

  const token = () => `Bearer ${localStorage.getItem("token")}`;

  useEffect(() => {
    setLoading(true);

    api
      .get(`/posts?query=${query}`, { headers: { Authorization: token() } })
      .then((res) => {
        setPosts(res.data);
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

  function setEditPost(post) {
    setPostEdit(post);
    modalEdit.current.openModal();
  }

  function handleSubmit() {
    if (!title || !type || !description) {
      modalMessage.current.openModal();
      return;
    }

    api
      .post(
        `/posts`,
        { title, description, type },
        { headers: { Authorization: token() } }
      )
      .then((res) => {
        setUpdate(res.data);
        modalPost.current.closeModal();
        setType("primary");
        setTitle("");
        setDescription("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmitEdit() {
    const { _id, title, description, type } = postEdit;

    if (!_id || !type || !description || !title) {
      modalMessage.current.openModal();
      return;
    }

    api
      .put(
        `/posts/${_id}`,
        { title, description, type },
        { headers: { Authorization: token() } }
      )
      .then((res) => {
        setUpdate(res.data);
        modalEdit.current.closeModal();
        setType("primary");
        setTitle("");
        setDescription("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeletePost() {
    api
      .delete(`posts/${postId}`, { headers: { Authorization: token() } })
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
      `/posts/${id}`,
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
            <img src={posts_icon} style={{ width: "50px" }} alt="Posts" />
            <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">
              Comunicados
            </h3>
          </div>
          <Search className="ml-auto mr-2" onChange={setQuery} />
          <button
            type="button"
            className="btn align-self-end btn-rounded"
            onClick={() => modalPost.current.openModal()}
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
          ) : posts.length ? (
            posts.map((post) => {
              return (
                <div className={`post ${post.type}`} key={post._id}>
                  <div className="d-flex space-between w-100">
                    <div className="w-100">
                      <h5>{post.title}</h5>
                      <span>{post.description}</span>
                    </div>
                    <div className="pr-5 d-flex align-items-center">
                      {getDate(post.createAt)}
                    </div>
                  </div>
                  <img
                    src={edit}
                    alt="icone"
                    style={{
                      height: "25px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                    onClick={() => setEditPost(post)}
                  />
                  <img
                    src={trash}
                    alt="icone"
                    style={{
                      height: "25px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                    onClick={() => setDeletePost(post._id)}
                  />
                  <Switch
                    checked={post.active}
                    id={post._id}
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
        title={"Novo Comunicado"}
        noIcon
        ref={modalPost}
        onConfirm={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Título</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Descrição</label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="menu-select">Tipo (Cor)</label>
          <select
            className="form-control"
            id="menu-select"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="primary">Primário</option>
            <option value="secundary">Secundário</option>
            <option value="info">Informação</option>
          </select>
        </div>
      </Modal>

      <Modal
        title={"Editar Comunicado"}
        noIcon
        ref={modalEdit}
        onConfirm={handleSubmitEdit}
      >
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Título</label>
          <input
            type="text"
            className="form-control"
            defaultValue={postEdit.title}
            onChange={(e) =>
              setPostEdit({ ...postEdit, title: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Descrição</label>
          <textarea
            className="form-control"
            defaultValue={postEdit.description}
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={(e) =>
              setPostEdit({ ...postEdit, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="menu-select">Tipo (Cor)</label>
          <select
            className="form-control"
            id="menu-select"
            defaultValue={postEdit.type}
            onChange={(e) => setPostEdit({ ...postEdit, type: e.target.value })}
          >
            <option value="primary">Primário</option>
            <option value="secundary">Secundário</option>
            <option value="info">Informação</option>
          </select>
        </div>
      </Modal>

      <Modal
        title="Deseja realmente apagar esse comunicado?"
        ref={modalDelete}
        onConfirm={handleDeletePost}
      />

      <Modal title={"Preencha todos os campos"} message ref={modalMessage} />
    </>
  );
}

export default Notices;
