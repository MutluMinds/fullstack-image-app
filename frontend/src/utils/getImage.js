import { IMAGE_TYPE_GIFS } from "../static/constants";

const axios = require("axios");
const hostName = `${
  process?.env?.REACT_APP_API_URL || "http://localhost:5000"
}`;

export const getImages = async (imageType, limit, offset) => {
  const response = await axios.get(
    `${hostName}/${imageType}?limit=${limit}&offset=${offset}`
  );
  const propertyName = imageType === IMAGE_TYPE_GIFS ? "data" : "hits";

  return response.data[propertyName];
};

export const getSearchedImages = async (
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
