import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";

const Gallery = ({ images }) => {
  const [show, setShow] = useState(false);
  const [imageOnModal, setImageOnModal] = useState();

  const handleClose = () => setShow(false);
  const handleShow = (img) => {
    setImageOnModal(img);
    setShow(true);
  };

  return (
    <>
      {images && images.length ? (
        <>
          <div className="search_gallery">
            {images
              .filter((img) => img.src)
              .map((img, idx) => {
                return (
                  <div
                    className="image-wrapper"
                    key={`${img.id}-${idx}`}
                    onMouseDown={() => handleShow(img)}
                    role="button"
                    tabIndex={idx}>
                    <img
                      className="search_gallery--image"
                      src={img.src}
                      alt={img.title}
                    />
                  </div>
                );
              })}
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            dialogClassName="modal-dialog"
            centered>
            <Modal.Body className="show-grid">
              <div className="modal-image">
                <img
                  src={imageOnModal?.src}
                  alt={
                    imageOnModal?.title || "No title available for this image."
                  }
                />
              </div>
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <div className="search_gallery--no-image">
          <span className="search_gallery--no-image-text">
            Sorry couldn't find any image.
          </span>
        </div>
      )}
    </>
  );
};

export default Gallery;
