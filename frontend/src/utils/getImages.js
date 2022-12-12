import { IMAGE_TYPE_GIFS, LIMIT } from "../static/constants";

const axios = require("axios");
const hostName = `${
  process?.env?.REACT_APP_API_URL || "http://localhost:5000"
}`;

const fetchImages = async (imageType, limit, offset) => {
  const response = await axios.get(
    `${hostName}/${imageType}?limit=${limit}&offset=${offset}`
  );
  const propertyName = imageType === IMAGE_TYPE_GIFS ? "data" : "hits";

  return response.data[propertyName];
};

const fetchSearchedImages = async (
  imageType,
  searchTerm,
  limit,
  offset
) => {
  const response = await axios.get(
    `${hostName}/${imageType}/search?searchTerm=${searchTerm}&limit=${limit}&offset=${offset}`
  );
  const propertyName = imageType === IMAGE_TYPE_GIFS ? "data" : "hits";

  return response.data[propertyName];
};

const getImages = async (imageType, offsetToFetch, searchTerm) => {
  try {
    if (searchTerm) {
      const formattedSearchTerm = searchTerm.replace(/[^a-zA-Z ]/g, "");

      return await fetchSearchedImages(
        imageType,
        formattedSearchTerm,
        LIMIT,
        offsetToFetch
      );
    } else {
      return await fetchImages(imageType, LIMIT, offsetToFetch);
    }
  } catch (error) {
    console.error(error);
  }
};

export default getImages;
