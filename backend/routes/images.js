const router = require('express').Router();
const axios = require('axios');

const pixabayApiKey = process.env.PIXABAY_API_KEY;

router.route('/').get(async (req, res) => {
    const perPage = 5;
    const searchTerm = 'cheeseburger';
    const url = `https://pixabay.com/api/?key=${pixabayApiKey}&q=${searchTerm}&per_page=${perPage}`;

    try {
        const response = await axios.get(url);
        res.json(response.data.data);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
