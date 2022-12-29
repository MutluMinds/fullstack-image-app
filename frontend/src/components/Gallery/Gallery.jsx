import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import useLocalStorage from "../../hooks/useLocalStorage";
import GalleryItem from "./GalleryItem/GalleryItem";

const Gallery = ({ images, apiType }) => {
  const [show, setShow] = useState(false);
  const [imageOnModal, setImageOnModal] = useState();

  const { 
    storage: favImages,
    setStorage: setFavImages 
  }  = useLocalStorage(apiType, []);

  const handleClose = () => setShow(false);

  const handleShow = (img) => {
    setImageOnModal(img);
    setShow(true);
  };

  const handleLike = ({ id, src, placeholderSrc }) => {
    if (!favImages.find(favImg => favImg.id === id)) {
      setFavImages(prevImages => [...prevImages, {
        id,
        src,
        placeholderSrc
      }]);

      return;
    }

    setFavImages(favImages.filter(favImg => favImg.id !== id));
  };

  const handleCopy = ({src}) => {
     navigator.clipboard.writeText(src)  
  };

  const hasLike = (id) => favImages && favImages.find(favImg => favImg.id === id);

  return (
    <>
      {images && images.length ? (
        <>
          <div className="search_gallery">
            {images
              .filter((img) => img.src)
              .map(({ 
                id, 
                title, 
                src, 
                placeholderSrc 
              }, idx) => (
                <GalleryItem 
                  key={`${idx}-${id}`} 
                  item={{ id, title, src, placeholderSrc }} 
                  liked={hasLike(id)}
                  onLike={() => handleLike({ id, src, placeholderSrc })}
                  onExpand={() => handleShow({ src, title })}
                  onCopy={() => handleCopy({src})}
                />
              ))}
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
