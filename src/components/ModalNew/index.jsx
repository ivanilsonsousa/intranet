import React, { useImperativeHandle, useState, forwardRef } from "react";
import { Modal } from "react-bootstrap";

import "./styles.css";

function ModalCustom(
  { title, backdrop, noIcon, message, children, onConfirm },
  ref
) {
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  useImperativeHandle(ref, () => {
    return {
      openModal,
      closeModal,
    };
  });

  return (
      <Modal
        size="md"
        show={open}
        onHide={() => setOpen(false)}
        animation
        backdrop={backdrop || true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {noIcon || (
              <i
                className={
                  message
                    ? "fas fa-exclamation-circle mr-2"
                    : "far fa-question-circle mr-2"
                }
              />
            )}
            {title}
          </Modal.Title>
        </Modal.Header>
        {children && <Modal.Body>{children}</Modal.Body>}
        <Modal.Footer>
          {message || (
            <button
              className="btn btn-modal btn-confirme"
              onClick={onConfirm || {}}
            >
              Confirmar
            </button>
          )}
          <button
            className="btn btn-modal btn-cancel"
            onClick={() => setOpen(false)}
          >
            {message ? "Fechar" : "Cancelar"}
          </button>
        </Modal.Footer>
      </Modal>
  );
}

export default forwardRef(ModalCustom);
