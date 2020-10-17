const router = require('express').Router();
const { getData } = require('../services/API');

router.route('/').get(async (req, res) => {
    const searchTerm = 'puppy';

    res.json(await getData('image', 5, searchTerm));
});

module.exports = router;
