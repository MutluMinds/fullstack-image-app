const router = require('express').Router();
const { getTrendingData, getSearchedImages } = require('../services/API');

router.route('/').get(async (req, res) => {
    try {
        const { limit, offset } = req.query;

        res.json(await getTrendingData('gifs', limit, offset));
    } catch (error) {
        res.status(404);
        console.log(error);
    }
});

router.route('/search').get(async (req, res) => {
    const searchTerm = req.query.searchTerm;

    try {
        res.json(await getSearchedImages('gif', 25, searchTerm));
    } catch (error) {
        res.status(404);
        console.log(error);
    }
});

module.exports = router;
