import React, { useEffect, useState } from "react";
import { GALLERY_TABS } from "../GalleryTabs/GalleryTabs";
import { saveAs as onDownload} from "file-saver";

import Modal from "react-bootstrap/Modal";
import GalleryItem from "./GalleryItem/GalleryItem";

const Gallery = ({ activeTab, images, favImages, setFavImages }) => {
  const [show, setShow] = useState(false);
  const [imageOnModal, setImageOnModal] = useState();
  const [displayedImages, setDisplayedImages] = useState([]);

  useEffect(() => {
    switch (activeTab) {
    case GALLERY_TABS.gallery.id:
      setDisplayedImages(images);
      break;
    case GALLERY_TABS.favourites.id:
      setDisplayedImages(favImages);
      break;
    default:
      setDisplayedImages([]);
      break;
    }
  }, [activeTab, favImages, images]);

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
    navigator.clipboard.writeText(src);  
  };

  const hasLike = (id) => favImages && favImages.find(favImg => favImg.id === id);

  function uniqueArray(arr) {
    const seenIds = new Set();
    return arr.filter(obj => {
      if (seenIds.has(obj.id)) {
        return false;
      }
      seenIds.add(obj.id);
      return true;
    });
  }

  function modifiedArray(arr) {
    const copyArr = [...arr];
    const modifiedArr = uniqueArray(copyArr);

    if (activeTab === GALLERY_TABS.favourites.id) {
      modifiedArr.reverse();
    }

    return modifiedArr;
  }

  return (
    <>
      {displayedImages && displayedImages.length ? (
        <>
          <div className="search_gallery">
            {modifiedArray(displayedImages)
              .filter((img) => img.src)
              .map(({ 
                id, 
                title, 
                src, 
                placeholderSrc,
                downloadable 
              }, idx) => (
                <GalleryItem 
                  key={`${idx}-${id}`} 
                  item={{ id, title, src, placeholderSrc }} 
                  liked={hasLike(id)}
                  onLike={() => handleLike({ id, src, placeholderSrc })}
                  onExpand={() => handleShow({ src, title })}
                  onCopy={() => handleCopy({src})}
                  onDownload={() => onDownload( src, downloadable )}
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
