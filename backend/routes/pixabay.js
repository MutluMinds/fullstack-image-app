const router = require("express").Router();
const { apiSources } = require("../api/sources");
const axios = require("axios");

router.route("/").get(async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const { hits } = await getTrendingPixabayImages(limit, offset);

    const dataWithSrc = hits.map((img) => ({
      ...img,
      src: img?.webformatURL || img?.largeImageURL || "",
      placeholderSrc: img?.previewURL || ""
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
    const { hits } = await getSearchedPixabayImages(limit, searchTerm, offset);
    const dataWithSrc = hits.map((img) => ({
      ...img,
      src: img?.webformatURL || img?.largeImageURL || "",
      placeholderSrc: img?.previewURL || ""
    }));

    res.json(dataWithSrc);
  } catch (error) {
    res.status(404);
    console.log(error);
  }
});

async function getTrendingPixabayImages (limit, offset) {
  const { trendingLink, key, limitString, offsetString } = apiSources.pixabay;
  const query = `&${limitString}=${limit}&${offsetString}=${offset}`;
  const url = `${trendingLink}${key}&editors_choice=true${query}`;
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
}

async function getSearchedPixabayImages (limit, searchTerm, offset) {
  const { link, key, limitString, offsetString } = apiSources.pixabay;
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
