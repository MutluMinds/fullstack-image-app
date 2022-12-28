const router = require("express").Router();
const blurhash = require("blurhash");
const { apiSources } = require("../api/sources");
const axios = require("axios");

router.route("/").get(async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const { data } = await getTrendingUnsplashImages(limit, offset);
    const dataWithSrc = data.map((img) => ({
      ...img,
      src: img.urls.regular,
      placeholderSrc: blurhash.decode(img.blur_hash)
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
    const { results } = await getSearchedUnsplashImages(limit, searchTerm, offset);
    const dataWithSrc = results.map((img) => ({
      ...img,
      src: img.urls.regular,
      placeholderSrc: blurhash.decode(img.blur_hash)
    }));
    res.json(dataWithSrc);
  } catch (error) {
    res.status(404);
    console.log(error);
  }
});

async function getTrendingUnsplashImages (limit, offset) {
  const { trendingLink, key, limitString, offsetString } = apiSources.unsplash;
  const query = `&${limitString}=${limit}&${offsetString}=${offset}`;
  const url = `${trendingLink}${key}${query}`;
  try {
    const response = await axios({
      method: "GET",
      url,
      timeout: 1000 * 5
    });
    return response;
  } catch (error) {
    console.log(error);
  };
}

async function getSearchedUnsplashImages (limit, searchTerm, offset) {
  const { link, key, limitString, offsetString } = apiSources.unsplash;
  const searchQuery = `&query='${searchTerm}'`;
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
