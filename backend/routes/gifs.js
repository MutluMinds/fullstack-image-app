const router = require('express').Router();
const { getTrendingData } = require('../services/API');

router.route('/').get(async (req, res) => {
    res.json(await getTrendingData('gifs', 10));
});

// router.route('/').post(async (req, res) => {
//     const searchTerm = req.body.searchTerm;
//     res.json(await getSearchedImages('gif', 15, searchTerm));
// });

module.exports = router;
