const axios = require("axios");
const { apiSources } = require("../api/sources");

const reqTimeout = 1000 * 5;

/**
 * Handles axios request and returns
 * specific amount of data according to searchTerm.
 */
async function getSearchedImages (apiType, limit, searchTerm, offset) {
  const { link, key, limitString, offsetString } =
    apiType === apiSources.giphy.id ? apiSources.giphy : apiSources.pixabay;

  const searchQuery = `&q=${searchTerm}`;
  const query = `&${limitString}=${limit}&${offsetString}=${offset}`;
  const url = `${link}${key}${searchQuery}${query}`;

  try {
    const response = await axios({
      method: "GET",
      url,
      timeout: reqTimeout
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Gets trending gifs/images with limit
 */
async function getTrendingData (apiType, limit, offset) {
  const isGiphy = apiType === apiSources.giphy.id;
  const { trendingLink, key, limitString, offsetString } = isGiphy
    ? apiSources.giphy
    : apiSources.pixabay;
  const query = `&${limitString}=${limit}&${offsetString}=${offset}`;
  const url = isGiphy
    ? `${trendingLink}${key}${query}`
    : `${trendingLink}${key}&editors_choice=true${query}`;

  try {
    const response = await axios({
      method: "GET",
      url,
      timeout: 1000 * 5
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getSearchedImages, getTrendingData };
