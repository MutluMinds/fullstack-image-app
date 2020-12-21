const router = require('express').Router();
const { getTrendingData, getSearchedImages } = require('../services/API');

router.route('/').get(async (req, res) => {
    res.json(await getTrendingData('images', 15));
});

router.route('/search').get(async (req, res) => {
    const searchTerm = req.query.searchTerm;
    res.json(await getSearchedImages('images', 15, searchTerm));
});

module.exports = router;
