const apiSources = {
    giphy: {
        key: 'gTRJN6wC3Jh4PXbDZdisknRrVnv8xWST',
        link: 'http://api.giphy.com/v1/gifs/search?api_key=',
        trendingLink: 'http://api.giphy.com/v1/gifs/trending?api_key=',
        limitString: 'limit'
    },
    pixabay: {
        key: '18743317-528f2b58f97457880e48dbd06',
        link: 'https://pixabay.com/api/?key=',
        trendingLink: 'https://pixabay.com/api/?key=',
        limitString: 'per_page'
    }
};

module.exports = { apiSources };
