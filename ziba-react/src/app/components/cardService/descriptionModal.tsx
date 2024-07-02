import React, { useState } from "react"
import { Modal } from "react-bootstrap";

interface descriptionProps {
    service: string,
    desc: string,
    show: boolean,
    handleClose: () => void,
}

export const DescriptionModal: React.FC<descriptionProps> = ( {service, desc, show, handleClose} ) => {
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{service}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{desc}</Modal.Body>
      </Modal>
    )
}