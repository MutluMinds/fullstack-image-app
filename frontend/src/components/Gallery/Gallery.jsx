import React, { useState } from "react";

import LikeUI from "../ImageLikeUI/LikeUI";

import Modal from "react-bootstrap/Modal";

const Gallery = ({ images }) => {
  const [show, setShow] = useState(false);
  const [imageOnModal, setImageOnModal] = useState();

  // here i am assuming that the "image" argument of Gallery component is in following format
  // const images = [
  //   {
  //     id: 0,

  //     src: { Pic },
  //     title: "Wave of water",
  //     likes: 0,
  //   },
  //   { id: 1, src: { Pic }, title: "Wave of Avatar", likes: 0 },
  // ];

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
                    tabIndex={idx}
                  >

                    {/* here i used separate component called "LikeUI" */}

                    <LikeUI images={img} handleShow={handleShow} />

                  </div>
                );
              })}
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            dialogClassName="modal-dialog"
            centered
          >
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
