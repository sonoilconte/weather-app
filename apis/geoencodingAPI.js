const axios = require('axios');

module.exports = axios.create({
	baseURL: process.env.GEOENCODING_URL,
	timeout: 5000,
});