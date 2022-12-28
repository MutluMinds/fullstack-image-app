const router = require("express").Router();
const { apiSources } = require("../api/sources");
const axios = require("axios");

router.route("/").get(async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const { data } = await getTrendingGipgyImages(limit, offset);
    const dataWithSrc = data.map((img) => ({
      ...img,
      src: img?.images?.downsized?.url || "",
      placeholderSrc: img?.images?.fixed_height_small_still?.url || ""
    }));

    res.json(dataWithSrc);
  } catch (error) {
    res.status(404);
    console.log(error);
  }
});

router.route("/search").get(async (req, res) => {
  try {
    const { searchTerm, limit, offset } = req.query;
    const { data } = await getSearchedGiphyImages(limit, searchTerm, offset);
    const dataWithSrc = data.map((img) => ({
      ...img,
      src: img?.images?.downsized?.url || "",
      placeholderSrc: img?.images?.fixed_height_small_still?.url || ""
    }));

    res.json(dataWithSrc);
  } catch (error) {
    res.status(404);
    console.log(error);
  }
});

async function getTrendingGipgyImages (limit, offset) {
  const { trendingLink, key, limitString, offsetString } = apiSources.giphy;
  const query = `&${limitString}=${limit}&${offsetString}=${offset}`;
  const url = `${trendingLink}${key}${query}`;
  try {
    const response = await axios({
      method: "GET",
      url,
      timeout: 1000 * 5
    });
    return response.data;
  } catch (error) {
    console.log(error);
  };
};

async function getSearchedGiphyImages (limit, searchTerm, offset) {
  const { link, key, limitString, offsetString } = apiSources.giphy;
  const searchQuery = `&q=${searchTerm}`;
  const query = `&${limitString}=${limit}&${offsetString}=${offset}`;
  const url = `${link}${key}${searchQuery}${query}`;
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

module.exports = router;
