import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

import "./styles.css";

function ModalPopup({ content }) {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (!content) return 

    const warning = sessionStorage.getItem('warning');

    if(warning !== content?._id)
      setModal(true);
  }, [content]);

  function handleCheckMessage(e) {
    if(e.target.checked)
      sessionStorage.setItem('warning', content._id);
    else
      sessionStorage.setItem('warning', '');
  }

  return (
  <Modal
    size="lg"
    show={modal}
    onHide={() => setModal(false)}
    centered
    animation
    className="modal-popup"
    >
    <Modal.Header closeButton>
      <Modal.Title>COMUNICADO</Modal.Title>
    </Modal.Header>
    <Modal.Body dangerouslySetInnerHTML={{__html: content?.content}} >
    </Modal.Body>
    <Modal.Footer className="footer-popup">
      <label htmlFor="ckdisablemsg" id="labelShow" className="mr-auto no-touch">
        <input type="checkbox" onClick={(e) => handleCheckMessage(e)} name="show" id="ckdisablemsg"/> Não mostrar essa mensagem novamente
      </label>
    </Modal.Footer>
  </Modal>
  );
}

export default ModalPopup;
