const axios = require('axios');
const { apiSources } = require('../api/sources');

const reqTimeout = 1000 * 5;

/**
 * Handles axios request and returns
 * specific amount of data according to searchTerm.
*/
async function getSearchedImages (imageType, limit, searchTerm) {
    const { link, key, limitString } = imageType === 'gif'
        ? apiSources.giphy
        : apiSources.pixabay;

    const searchQuery = `&q=${searchTerm}`;
    const limitQuery = `&${limitString}=${limit}`;
    const url = `${link}${key}${searchQuery}${limitQuery}`;

    try {
        const response = await axios({
            method: 'GET',
            url,
            timeout: reqTimeout
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Gets trending gifs/images with limit
*/
async function getTrendingData (imageType, limit, offset) {
    const isGifType = imageType === 'gifs';
    const { trendingLink, key, limitString, offsetString } = isGifType
        ? apiSources.giphy
        : apiSources.pixabay;
    const query = `&${limitString}=${limit}&${offsetString}=${offset}`;
    const url = isGifType
        ? `${trendingLink}${key}${query}`
        : `${trendingLink}${key}&editors_choice=true${query}`;

    try {
        const response = await axios({
            method: 'GET',
            url,
            timeout: 1000 * 5
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getSearchedImages, getTrendingData };
