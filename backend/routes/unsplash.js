const router = require("express").Router();
const blurhash = require("blurhash");
const { apiSources } = require("../api/sources");
const { getTrendingData, getSearchedImages } = require("../services/API");

router.route("/").get(async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const { data } = await getTrendingData(apiSources.unsplash.id, limit, offset);
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
    const { results } = await getSearchedImages(apiSources.unsplash.id, limit, searchTerm, offset);
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

module.exports = router;
