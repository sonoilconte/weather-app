const { parse } = require('dotenv');
const geoencodingAPI = require('./apis/geoencodingAPI');
const weatherAPI = require('./apis/weatherAPI');

// We throw an ApiError when we want to send some non-200 http code to the client
// and include a message
class ApiError extends Error {
	constructor(code, message) {
		super(code, message);
		this.code = code;
		this.message = message;
	}
}

const getCoordinates = async (location) => {
	try {
		const params = {
			name: location,
			format: 'json',
		}
		const { data } = await geoencodingAPI.get('/search', { params });

		if (data.results && data.results.length) {
			// For this basic version of the app, just taking the 0th city returned by the API
			const {
				latitude,
				longitude
			} = data.results[0];
			return [latitude, longitude];
		} else {
			console.log('No location data found', data);
			return null;
		}
	} catch (err) {
		const errorMsg = 'Error making geolocation request';
		console.error(errorMsg, err);
		throw new ApiError(500, errorMsg);
	}
};

const getWeatherData = async (latitude, longitude) => {
	
	latitude = parseFloat(latitude);
	longitude = parseFloat(longitude);

	const params = {
		latitude,
		longitude,
		daily: 'temperature_2m_max,temperature_2m_min',
		timezone: 'America/Los_Angeles',
		temperature_unit: 'fahrenheit',
	};

	let data;
	try {
		({ data } = await weatherAPI.get('/forecast', { params }));
	} catch (err) {
		const errorMsg = 'Error requesting weather forecast data';
		console.error(errorMsg, err);
		throw new ApiError(500, errorMsg);
	}

	console.log('Got weather data', data);

	const { daily } = data;
	const dates = daily.time;
	const highs = daily.temperature_2m_max;
	const lows = daily.temperature_2m_min;

	const days = [];
	for (let i = 0; i < 5; i += 1) {
		days.push({
			date: dates[i],
			high: highs[i],
			low: lows[i],
		});
	};

	return days;
};
	
const weatherRequest = async (req, res) => {
	// console.log('weather req', req);
	const location = req.query.location;
	let coordinatesResult;
	let latitude, longitude;

	try {
		coordinatesResult = await getCoordinates(location);
	} catch (err) {
		res.status(err.code).json({ message: err.message });
		return;
	}

	if (coordinatesResult) {	
		[latitude, longitude] = coordinatesResult;
		console.log(latitude, longitude);
	} else {
		res.json({ data: null });
		return;
	}

	try {
		const days = await getWeatherData(latitude, longitude);
		res.json({ days });
	} catch (err) {
		console.error('Error requesting weather data', err);
	}
};

module.exports = {
	weatherRequest,
}