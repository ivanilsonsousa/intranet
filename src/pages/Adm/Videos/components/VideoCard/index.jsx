import React from 'react';

import './styles.css';

import play from '../../assets/botao-play.svg';

function VideoCard({ video, refs, onClickPlay, onClickEdit, onClickDelete }) {

    return (
        <div className="news-card" ref={refs} >
            <img className="play-button" src={play} style={{ width: "50px" }} alt="Users" />
            <img src={video.thumb_url} alt={video.title} className="news-card__image"/>
            <div className="news-card__text-wrapper">
            <h6 className="news-card__title">{video.title}</h6>
            <div className="news-card__post-date">{video.dateAt}</div>
            <div className="news-card__details-wrapper">
                <div className="wrapper-button-details">
                    <button className="news-card__read-more" onClick={() => onClickPlay(video)} ><i className="far fa-play-circle" /></button>
                    <button className="news-card__read-more" onClick={() => onClickEdit(video)} ><i className="far fa-edit" /></button>
                    <button className="news-card__read-more" onClick={() => onClickDelete(video)} ><i className="far fa-trash-alt" /></button>
                </div>
            </div>
            </div>
        </div>
    );
}

export default VideoCard;