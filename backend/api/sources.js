const apiSources = {
    giphy: {
        key: process.env.GIPHY_API_KEY, // Your Giphy API Key here
        link: 'http://api.giphy.com/v1/gifs/search?api_key=',
        trendingLink: 'http://api.giphy.com/v1/gifs/trending?api_key=',
        limitString: 'limit',
        offsetString: 'offset'
    },
    pixabay: {
        key: process.env.PIXABAY_API_KEY, // Your Pixabay API Key here
        link: 'https://pixabay.com/api/?key=',
        trendingLink: 'https://pixabay.com/api/?key=',
        limitString: 'per_page'
    }
};

module.exports = { apiSources };
