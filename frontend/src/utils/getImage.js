const axios = require('axios');

export const getImages = async (imageType) => {
    const response = await axios.get(`https://fullstack-image-app-kbdn1n8ge.vercel.app/${imageType}`);
    const propertyName = imageType === 'gifs' ? 'data' : 'hits';

    return response.data[propertyName];
}

export const getSearchedImages = async (imageType, searchTerm) => {
    const response = await axios.get(`https://fullstack-image-app-kbdn1n8ge.vercel.app/${imageType}/search?searchTerm=${searchTerm}`);
    const propertyName = imageType === 'gifs' ? 'data' : 'hits';

    return response.data[propertyName];
}
