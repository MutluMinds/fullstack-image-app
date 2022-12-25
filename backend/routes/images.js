const router = require("express").Router();
const { getTrendingData, getSearchedImages } = require("../services/API");

router.route("/").get(async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const { hits } = await getTrendingData("images", limit, offset);

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
    const { hits } = await getSearchedImages("images", limit, searchTerm, offset);
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

module.exports = router;
