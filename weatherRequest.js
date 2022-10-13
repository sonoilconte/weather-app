const axios = require('axios');
const GEOENCODING_URL = process.env.GEOENCODING_URL;


const getCoordinates = async (city) => {
	try {
		const { data } = await axios.get(`${GEOENCODING_URL}?name=${city}&format=json`);
		return data;
	} catch (err) {
		const errorMsg = 'Error making geolocation request'; 
		console.log(errorMsg, err);
		throw new Error(errorMsg);
	}
}
	
const weatherRequest = async (req, res) => {
	console.log('weather req', req);
	const city = req.query.city;
	const data = await getCoordinates(city);
	res.json({ data });
};

module.exports = {
	weatherRequest,
}