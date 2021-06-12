const router = require('express').Router();
const { getTrendingData, getSearchedImages } = require('../services/API');

router.route('/').get(async (req, res) => {
    try {
        const { limit, offset } = req.query;

        res.json(await getTrendingData('images', limit, offset));
    } catch (error) {
        res.status(404);
        console.log(error);
    }
});

router.route('/search').get(async (req, res) => {
    const { searchTerm, limit, offset } = req.query;

    try {
        res.json(await getSearchedImages('images', limit, searchTerm, offset));
    } catch (error) {
        res.status(404);
        console.log(error);
    }
});

module.exports = router;
