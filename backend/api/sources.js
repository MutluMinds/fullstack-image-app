const apiSources = {
    giphy: {
        key: process.env.GIPHY_API_KEY,
        link: 'http://api.giphy.com/v1/gifs/search?api_key=',
        limitString: 'limit'
    },
    pixabay: {
        key: process.env.PIXABAY_API_KEY,
        link: 'https://pixabay.com/api/?key=',
        limitString: 'per_page'
    }
};

module.exports = { apiSources };
