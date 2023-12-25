import { LIMIT } from "../static/constants";
import Axios from "axios";

const hostName = `${
  import.meta.env?.VITE_APP_API_URL || "http://localhost:5000"
}`;

const fetchImages = async (apiType, limit, offset) => {
  const { data } = await Axios.get(
    `${hostName}/${apiType}?limit=${limit}&offset=${offset}`
  );

  return data;
};

const fetchSearchedImages = async (
  apiType,
  searchTerm,
  limit,
  offset
) => {
  const { data } = await Axios.get(
    `${hostName}/${apiType}/search?searchTerm=${searchTerm}&limit=${limit}&offset=${offset}`
  );

  return data;
};

export const getImages = async (apiType, offsetToFetch, searchTerm) => {
  try {
    if (searchTerm) {
      const formattedSearchTerm = searchTerm.replace(/[^a-zA-Z ]/g, "");

      return (await fetchSearchedImages(
        apiType,
        formattedSearchTerm,
        LIMIT,
        offsetToFetch
      ));
    } else {
      return (await fetchImages(apiType, LIMIT, offsetToFetch));
    }
  } catch (error) {
    console.error(error);
  }
};

