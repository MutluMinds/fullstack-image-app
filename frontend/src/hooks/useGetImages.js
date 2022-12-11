import { useState } from "react";
import {
  LIMIT,
  IMAGE_TYPE_GIFS,
  DEFAULT_GIPHY_OFFSET,
  DEFAULT_PIXABAY_OFFSET,
} from "../static/constants";
import { getImages, getSearchedImages } from "../utils/getImage";

const useGetImages = (imageType) => {
  const [images, setImages] = useState([]);
  const [offset, setOffset] = useState(DEFAULT_GIPHY_OFFSET);
  const [isLoading, setIsLoading] = useState(false);

  const getNewOffset = (prevOffset) =>
    imageType === IMAGE_TYPE_GIFS ? prevOffset + LIMIT + 1 : offset + 1;

  const getDefaultOffset = (imageType) =>
    imageType === IMAGE_TYPE_GIFS
      ? DEFAULT_GIPHY_OFFSET
      : DEFAULT_PIXABAY_OFFSET;

  async function fetchImages(searchTerm) {
    setIsLoading(true);

    const offsetToFetch = getDefaultOffset(imageType);
    const newOffset = getNewOffset(offsetToFetch);

    let receivedImages;

    try {
      if (searchTerm) {
        const formattedSearchTerm = searchTerm.replace(/[^a-zA-Z ]/g, "");

        receivedImages = await getSearchedImages(
          imageType,
          formattedSearchTerm,
          LIMIT,
          offsetToFetch
        );
      } else {
        receivedImages = await getImages(imageType, LIMIT, offsetToFetch);
      }

      setImages(receivedImages);
      setOffset(newOffset);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }

  return {
    images,
    setImages,
    isLoading,
    fetchImages,
    offset,
    setOffset,
  };
};

export default useGetImages;
