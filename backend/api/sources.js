const apiSources = {
  giphy: {
    id: "giphy",
    key: process.env.GIPHY_API_KEY,
    link: "http://api.giphy.com/v1/gifs/search?api_key=",
    trendingLink: "http://api.giphy.com/v1/gifs/trending?api_key=",
    limitString: "limit",
    offsetString: "offset"
  },
  pixabay: {
    id: "pixabay",
    key: process.env.PIXABAY_API_KEY,
    link: "https://pixabay.com/api/?key=",
    trendingLink: "https://pixabay.com/api/?key=",
    limitString: "per_page",
    offsetString: "page"
  },
  unsplash: {
    id: "unsplash",
    key: process.env.UNSPLASH_API_KEY,
    link: "https://api.unsplash.com/search/photos/?client_id=",
    trendingLink: "https://api.unsplash.com/photos/?client_id=",
    limitString: "per_page",
    offsetString: "page"
  }
};

module.exports = { apiSources };
