const axios = require('./axiosConfig');
//https://stackabuse.com/using-mocks-for-testing-in-javascript-with-jes/
const getPhotosByAlbumId = async (id) => {
    const result = await axios.request({
        method: 'get',
        url: `/${id}/photos?_limit=3`
    });
    const { data } = result;
    return data;
};

module.exports = getPhotosByAlbumId;