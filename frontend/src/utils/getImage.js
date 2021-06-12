const axios = require('axios');
const hostName = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://fullstack-image-app-2b6j2jrqk.vercel.app'

export const getImages = async (imageType, limit, offset) => {
    const response = await axios.get(`${hostName}/${imageType}?limit=${limit}&offset=${offset}`);
    const propertyName = imageType === 'gifs' ? 'data' : 'hits';

    return response.data[propertyName];
}

export const getSearchedImages = async (imageType, searchTerm) => {
    const response = await axios.get(`${hostName}/${imageType}/search?searchTerm=${searchTerm}`);
    const propertyName = imageType === 'gifs' ? 'data' : 'hits';

    return response.data[propertyName];
}
