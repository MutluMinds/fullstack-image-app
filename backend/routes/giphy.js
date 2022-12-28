const router = require("express").Router();
const { apiSources } = require("../api/sources");
const { getTrendingData, getSearchedImages } = require("../services/API");

router.route("/").get(async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const { data } = await getTrendingData(apiSources.giphy.id, limit, offset);
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
    const { data } = await getSearchedImages(apiSources.giphy.id, limit, searchTerm, offset);
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

module.exports = router;
