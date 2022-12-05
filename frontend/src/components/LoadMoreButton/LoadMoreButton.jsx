import React, { useState } from "react";
import { getImages, getSearchedImages } from "../../utils/getImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading/Loading";
import { LIMIT, IMAGE_TYPE_GIFS } from "../../App";

const LoadMoreButton = ({
  imageType,
  inputValue,
  offset,
  setOffset,
  images,
  setImages,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const updateOffsetValue = () => {
    imageType === IMAGE_TYPE_GIFS
      ? setOffset(offset + LIMIT + 1)
      : setOffset(offset + 1);
  };

  const loadMoreImages = async () => {
    setIsLoading(true);

    try {
      const receivedImages = !inputValue
        ? await getImages(imageType, LIMIT, offset)
        : await getSearchedImages(
            imageType,
            inputValue.replace(/[^a-zA-Z ]/g, ""),
            LIMIT,
            offset
          );

      setImages([...images, ...receivedImages]);
      updateOffsetValue();

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="moreImages">
      {!isLoading ? (
        <button className="moreImagesButton" onClick={loadMoreImages}>
          <FontAwesomeIcon
            style={{ color: "white", fontSize: "32px" }}
            icon={faAngleDown}
          />
        </button>
      ) : (
        <Loading variant="small" />
      )}
    </div>
  );
};

export default LoadMoreButton;
