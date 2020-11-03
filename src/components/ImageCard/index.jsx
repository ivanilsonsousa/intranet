import React, { memo } from "react";

import "./styles.css";

function ImageCard({ image, refs, onClickEdit, onClickDelete }) {
  return (
    <div className="news-card" ref={refs}>
      <img
        src={image.file_url}
        alt={image.title}
        className="news-card__image"
      />
      <div className="news-card__text-wrapper">
        <h6 className="news-card__title">{image.title}</h6>
        <div className="news-card__post-date">{image.dateAt}</div>
        <div className="news-card__details-wrapper">
          <div className="wrapper-button-details">
            <button
              className="news-card__read-more"
              onClick={() => onClickEdit(image)}
            >
              <i className="far fa-edit" />
            </button>
            <button
              className="news-card__read-more"
              onClick={() => onClickDelete(image)}
            >
              <i className="far fa-trash-alt" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ImageCard);
