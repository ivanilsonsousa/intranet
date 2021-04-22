import React, { useState, useRef, useCallback } from "react";
import Header from "../../../components/Header";
import ImageCard from "../../../components/ImageCard";
import Modal from "../../../components/ModalNew";
import Search from "../../../components/Search";
import { ClipLoader as Spinner } from "react-spinners";
import NotFound from "../../../components/NotFound";

import useSearch from "../../../context/hooks/useSearch";
import api from "../../../services/api";

import photo_icon from "../../../assets/photo.svg";
import "./styles.css";

const token = () => `Bearer ${localStorage.getItem("token")}`;

function Photos() {
  const modalEditPhoto = useRef(null);
  const modalDeletePhoto = useRef(null);

  const [update, setUpdate] = useState("");
  const [query, setQuery] = useState("");
  const [photEdit, setPhotoEdit] = useState({});

  const [pageNumber, setPageNumber] = useState(0);

  const { content, setContent, hasMore, loading, error } = useSearch(
    "photos",
    query,
    pageNumber,
    update
  );

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function removeItemContent(id) {
    const values = content.filter((e) => {
      if (e._id !== id) return e;
    });

    setContent(values);
  }

  function editItemContent(newRegister) {
    const { _id: id } = newRegister;

    const values = content.map((e) => (e._id !== id ? e : newRegister));

    setContent(values);
    modalEditPhoto.current.closeModal();
  }

  async function handlePostPhoto(file) {
    const data = new FormData();

    data.append("title", file.name);
    data.append("file", file);

    const response = await api.post("/photos", data);
  }

  function handleEditPhoto(photo) {
    setPhotoEdit(photo);
    modalEditPhoto.current.openModal();
  }

  async function handleDeletePhoto(photo) {
    setPhotoEdit(photo);
    modalDeletePhoto.current.openModal();
  }

  function handleOnSelectedImage(e) {
    const file = e.target.files[0];

    if (file) {
      handlePostPhoto(file);
    }
  }

  async function deletePhoto() {
    const response = await api.delete(`/photos/${photEdit._id}`);

    modalDeletePhoto.current.closeModal();
    removeItemContent(photEdit._id);
  }

  async function editPhoto() {
    const { data } = await api.put(`/photos/${photEdit._id}`, {
      title: photEdit.title,
    });

    editItemContent(data);
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="container-fluid d-flex align-items-baseline w-100">
          <div className="d-flex align-items-end pl-2 pt-5">
            {" "}
            <img src={photo_icon} style={{ width: "45px" }} alt="Photos" />
            <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">
              Fotos
            </h3>
          </div>
          <Search
            className="ml-auto mr-2"
            onChange={setQuery}
            afterChange={() => setPageNumber(0)}
          />
          <label
            htmlFor="upload"
            className="btn align-self-end m-0 btn-rounded label-file"
            title="Fazer upload de arquivo"
          >
            Adicionar Foto <i className="fas fa-plus"></i>
            <input
              type="file"
              accept="image/*"
              name="Document"
              id="upload"
              onChange={(e) => handleOnSelectedImage(e)}
            />
          </label>
        </div>
        <hr className="my"></hr>
        {loading && !hasMore ? (
          <div className="d-flex align-items-center justify-content-center">
            <Spinner sizeUnit="px" size={35} color="#4d6d6d" />
          </div>
        ) : content.length ? (
          <>
            <div className="my-4 container-photos">
              {content.map((image, index) => (
                <ImageCard
                  image={image}
                  index={index}
                  key={image._id}
                  refs={
                    content.length === index + 1 ? lastBookElementRef : null
                  }
                  onClickEdit={() => handleEditPhoto(image)}
                  onClickDelete={() => handleDeletePhoto(image)}
                />
              ))}
            </div>
            {hasMore && (
              <div className="d-flex align-items-center justify-content-center">
                <Spinner sizeUnit="px" size={35} color="#4d6d6d" />
              </div>
            )}
          </>
        ) : (
          <NotFound />
        )}
      </div>

      <Modal
        title={"Editar Foto"}
        noIcon
        ref={modalEditPhoto}
        onConfirm={editPhoto}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nome da foto"
            defaultValue={!photEdit.title ? photEdit.file : photEdit.title}
            onChange={(e) =>
              setPhotoEdit({ ...photEdit, title: e.target.value })
            }
          />
        </div>
      </Modal>

      <Modal
        title={"Deseja realmente apagar essa imagem?"}
        ref={modalDeletePhoto}
        onConfirm={() => deletePhoto()}
      />
    </>
  );
}

export default Photos;
