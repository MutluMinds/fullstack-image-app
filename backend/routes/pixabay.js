const router = require("express").Router();
const { apiSources } = require("../api/sources");
const { getTrendingData, getSearchedImages } = require("../services/API");

router.route("/").get(async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const { hits } = await getTrendingData(apiSources.pixabay.id, limit, offset);

    const dataWithSrc = hits.map((img) => ({
      ...img,
      src: img?.webformatURL || img?.largeImageURL || "",
      placeholderSrc: img?.previewURL || ""
    }));
    const filterArr = Utils(dataWithSrc);
    res.json(filterArr);
  } catch (error) {
    res.status(404);
    console.log(error);
  }
});

router.route("/search").get(async (req, res) => {
  try {
    const { searchTerm, limit, offset } = req.query;
    const { hits } = await getSearchedImages(apiSources.pixabay.id, limit, searchTerm, offset);
    const dataWithSrc = hits.map((img) => ({
      ...img,
      src: img?.webformatURL || img?.largeImageURL || "",
      placeholderSrc: img?.previewURL || ""
    }));
    const filterArr = Utils(dataWithSrc);
    res.json(filterArr);
  } catch (error) {
    res.status(404);
    console.log(error);
  }
});
function Utils (dataWithSrc) {
  const seen = new Set();
  const filterArr = dataWithSrc.filter((el) => {
    const duplicate = seen.has(el.id);
    seen.add(el.id);
    return !duplicate;
  });
  return filterArr;
}
module.exports = router;
