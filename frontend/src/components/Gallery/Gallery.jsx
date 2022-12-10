import React, {useState} from "react";

import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import Modal from "react-bootstrap/Modal";

const SearchViewer = ({
  images,
  setImages,
  imageType,
  inputValue,
  offset,
  setOffset,
}) => {
  const [show, setShow] = useState(false);
  const [imageOnModal, setImageOnModal] = useState();

  const handleClose = () => setShow(false);
  const handleShow = (img) => {
    console.log(img);
    setImageOnModal(img);
    setShow(true);
  };

  const getImgSrc = (type, img) =>
    type === "gifs"
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
                  <div className="image-wrapper" key={`${img.id}-${idx}`} onClick={() => handleShow(img)}>
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

          <LoadMoreButton
            imageType={imageType}
            inputValue={inputValue}
            offset={offset}
            setOffset={setOffset}
            images={images}
            setImages={setImages}
          />
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

export default SearchViewer;
