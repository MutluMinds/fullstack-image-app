const router = require('express').Router();
const { getTrendingData } = require('../services/API');

router.route('/').get(async (req, res) => {
    res.json(await getTrendingData('images', 10));
});

module.exports = router;
