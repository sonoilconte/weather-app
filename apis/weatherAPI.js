const axios = require('axios');

module.exports = axios.create({
    baseURL: process.env.WEATHER_URL,
    timeout: 5000,
});
