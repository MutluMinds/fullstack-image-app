const router = require('express').Router();
const axios = require('axios');

const giphyApiKey = process.env.GIPHY_API_KEY;

router.route('/').get(async (req, res) => {
    const limit = 5;
    const searchTerm = 'cheeseburger';
    const url = `http://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&=limit=${limit}&q=${searchTerm}`;

    try {
        const response = await axios.get(url);
        res.json(response.data.data);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
