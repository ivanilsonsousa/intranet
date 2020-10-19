import React from 'react';

import { cutLegend } from '../../scripts/utils'
import close_icon from '../../assets/cancelar.svg';
import "./styles.css";

function ModalVideo({ open, setOpen, video }) {

  return (
    open && <div className={`wrapper-modal-video`}>
    <div className="modal-video">
      <div className="wrapper-close">
        <button 
        className="modal-video-close-btn" 
        aria-label="Close the modal by clicking here"
        onClick={() => setOpen(false)}
        >
          <img
            src={close_icon}
            style={{ width: "30px" }}
            alt="DashBoard"
          />
        </button>
      </div>
      <video
        className="container p-0" 
        controls 
        autoPlay
        src={video.file_url} 
      />
      <div className="wrapper-video-details text-light" title={video.description} >
        <strong>{video.title}</strong> - { cutLegend(video.description, 20, false) }
      </div>
    </div>
  </div>
  );
}

export default ModalVideo;
