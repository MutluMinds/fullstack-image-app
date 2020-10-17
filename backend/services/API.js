const axios = require('axios');
const { apiSources } = require('../api/sources');

/**
 * Handles axios request and returns
 * specific amount of data according to searchTerm.
*/
async function getData (imageType, limit, searchTerm) {
    const { link, key, limitString } = imageType === 'gif'
        ? apiSources.giphy
        : apiSources.pixabay;

    const searchQuery = `&q=${searchTerm}`;
    const limitQuery = `&${limitString}=${limit}`;

    const url = `${link}${key}${searchQuery}${limitQuery}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getData };
