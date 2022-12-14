import React, { useState } from "react";
import { IMAGE_TYPE_GIFS } from "../../static/constants";

import Modal from "react-bootstrap/Modal";

const Gallery = ({ images, imageType }) => {
  const [show, setShow] = useState(false);
  const [imageOnModal, setImageOnModal] = useState();

  const handleClose = () => setShow(false);
  const handleShow = (img) => {
    setImageOnModal(img);
    setShow(true);
  };

  const getImgSrc = (type, img) =>
    type === IMAGE_TYPE_GIFS
      ? img?.images?.downsized?.url || img?.images?.original?.url
      : img && img.webformatURL;

  return (
    <>
      {images && images.length ? (
        <>
          <div className="search_gallery">
            {images
              .filter((img) => getImgSrc(imageType, img))
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
                      src={getImgSrc(imageType, img)}
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
                  src={getImgSrc(imageType, imageOnModal)}
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
