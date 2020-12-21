const router = require('express').Router();
const { getTrendingData, getSearchedImages } = require('../services/API');

router.route('/').get(async (req, res) => {
    try {
        res.json(await getTrendingData('gifs', 15));
    } catch (error) {
        res.status(404);
        console.log(error);
    }
});

router.route('/search').get(async (req, res) => {
    const searchTerm = req.query.searchTerm;

    try {
        res.json(await getSearchedImages('gif', 15, searchTerm));
    } catch (error) {
        res.status(404);
        console.log(error);
    }
});

module.exports = router;
