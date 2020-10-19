const axios = require('axios');

export const getImages = async (imageType) => {
    const response = await axios.get(`http://localhost:5000/${imageType}`);
    const propertyName = imageType === 'gifs' ? 'data' : 'hits';

    return response.data[propertyName];
}

export const getSearchedImages = async (imageType, searchTerm) => {
    const response = await axios.post(`http://localhost:5000/${imageType}`, { searchTerm });
    const propertyName = imageType === 'gifs' ? 'data' : 'hits';

    return response.data[propertyName];
}
