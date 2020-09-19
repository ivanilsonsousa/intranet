import React from "react";
import { Modal } from "react-bootstrap";

import "./styles.css";

function ModalCustom(props) {
  return (
    <>
      <Modal
        size="md"
        show={props.show}
        onHide={() => props.onDisable(false)}
        animation
        backdrop={props.backdrop || true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {props.noIcon || (
              <i
                className={
                  props.message
                    ? "fas fa-exclamation-circle mr-2"
                    : "far fa-question-circle mr-2"
                }
              />
            )}
            {props.title}
          </Modal.Title>
        </Modal.Header>
        {props.children && <Modal.Body>{props.children}</Modal.Body>}
        <Modal.Footer>
          {props.message || (
            <button
              className="btn btn-modal btn-confirme"
              onClick={() => props.func()}
            >
              Confirmar
            </button>
          )}
          <button
            className="btn btn-modal btn-cancel"
            onClick={() => props.onDisable(false)}
          >
            {props.message ? "Fechar" : "Cancelar"}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCustom;
