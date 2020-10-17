const router = require('express').Router();
const { getData } = require('../services/API');

router.route('/').get(async (req, res) => {
    const searchTerm = 'cheeseburger';
    res.json(await getData('gif', 5, searchTerm));
});

module.exports = router;
