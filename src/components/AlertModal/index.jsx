import React from 'react'
import { Modal } from 'react-bootstrap';

import './styles.css'

function AlertModal(props) {

  function onClose() {
    props.onDisable(false)
  }

  return (
    <Modal size="md" show onHide={() => onClose()} animation >
      <Modal.Header closeButton>
      <Modal.Title>{ props.noIcon ? '' : <i className={ props.message ? "fas fa-exclamation-circle mr-2" : "far fa-question-circle mr-2" }></i> }{ props.title }</Modal.Title>
      </Modal.Header>
      { props.children  ?
        <Modal.Body>
          { props.children }
        </Modal.Body>
        :
        <></>
      }
      <Modal.Footer>
        <button className="btn btn-modal btn-cancel" onClick={() => onClose()}>
          { props.message ? 'Fechar' : 'Não' }
        </button>
        {
          props.message ?
          <></>
          :
          <button className="btn btn-modal btn-confirme" onClick={() => props.func()}>
            Sim
          </button>
        }
      </Modal.Footer>
    </Modal>
  )
}

export default AlertModal;