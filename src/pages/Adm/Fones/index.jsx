import React, { useState, useEffect, useRef } from "react";
import Header from "../../../components/Header";

import Modal from "../../../components/ModalNew";

import Switch from "../../../components/Switch";
import NotFound from "../../../components/NotFound";
import Search from "../../../components/Search";
import { ClipLoader as Spinner } from "react-spinners";

import trash from "../../../assets/bin.svg";
import edit from "../../../assets/edit.svg";
import fone from "../../../assets/phone.svg";
import api from "../../../services/api";

import "./style.css";

function Phones() {
  const modalMessage = useRef(null);
  const modalPost = useRef(null);
  const modalDelete = useRef(null);
  const modalEdit = useRef(null);

  const [phones, setPhones] = useState([]);
  const [query, setQuery] = useState("");
  const [phoneId, setPhoneId] = useState(null);
  const [foneEdit, setFoneEdit] = useState({});
  const [update, setUpdate] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const token = () => `Bearer ${localStorage.getItem("token")}`;

  useEffect(() => {
    setLoading(true);

    console.log(query);

    api
      .get(`/phones?query=${query}`, {
        headers: { Authorization: token() },
      })
      .then((res) => {
        setPhones(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update, query]);

  function setDeletePhone(id) {
    setPhoneId(id);
    modalDelete.current.openModal();
  }

  function setEditPhone(phone) {
    setFoneEdit(phone);
    modalEdit.current.openModal();
  }

  function handleSubmit() {
    if (!title || !description) {
      modalMessage.current.openModal();
      return;
    }

    api
      .post(
        `/phones`,
        { title, description },
        { headers: { Authorization: token() } }
      )
      .then((res) => {
        setUpdate(res.data);
        modalPost.current.closeModal();
        setTitle("");
        setDescription("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmitEdit() {
    const { _id, title, description } = foneEdit;

    if (!_id || !description || !title) {
      modalMessage.current.openModal();
      return;
    }

    api
      .put(
        `/phones/${_id}`,
        { title, description },
        { headers: { Authorization: token() } }
      )
      .then((res) => {
        setUpdate(res.data);
        modalEdit.current.closeModal();
        setTitle("");
        setDescription("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeletePhone() {
    api
      .delete(`phones/${phoneId}`, { headers: { Authorization: token() } })
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
      `/phones/${id}`,
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
            <img src={fone} style={{ width: "50px" }} alt="Posts" />
            <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">
              Lista de Ramais
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
          ) : phones.length ? (
            phones.map((phone) => {
              return (
                <div className="post secundary" key={phone._id}>
                  <div className="d-flex space-between w-100">
                    <div className="w-100">
                      <h5 className="title-phone">
                        <i className="fas fa-phone-alt mr-2" />
                        <i>{phone.title}</i>
                      </h5>
                      <span className="description-phone ml-4">
                        <strong> {phone.description}</strong>
                      </span>
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
                    onClick={() => setEditPhone(phone)}
                  />
                  <img
                    src={trash}
                    alt="icone"
                    style={{
                      height: "25px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                    onClick={() => setDeletePhone(phone._id)}
                  />
                  <Switch
                    checked={phone.active}
                    id={phone._id}
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
        title={"Novo Ramal"}
        noIcon
        onConfirm={handleSubmit}
        ref={modalPost}
      >
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Descrição</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">
            Lista de numeros (Separe por vírgulas)
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </Modal>

      <Modal
        title={"Editar Ramal"}
        noIcon
        onConfirm={handleSubmitEdit}
        ref={modalEdit}
      >
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Descrição</label>
          <input
            type="text"
            className="form-control"
            defaultValue={foneEdit.title}
            onChange={(e) =>
              setFoneEdit({ ...foneEdit, title: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">
            Lista de numeros (Separe por vírgulas)
          </label>
          <input
            type="text"
            className="form-control"
            defaultValue={foneEdit.description}
            onChange={(e) =>
              setFoneEdit({ ...foneEdit, description: e.target.value })
            }
          />
        </div>
      </Modal>

      <Modal
        title="Deseja realmente apagar esse ramal?"
        ref={modalDelete}
        onConfirm={handleDeletePhone}
      />

      <Modal title={"Preencha todos os campos"} message ref={modalMessage} />
    </>
  );
}

export default Phones;
