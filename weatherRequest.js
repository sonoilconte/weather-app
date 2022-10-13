const geoencodingAPI = require('./apis/geoencodingAPI');

const getCoordinates = async (location) => {
	try {
		throw new Error('foo stuff')
		const params = new URLSearchParams({ name: location });
		params.append('format', 'json');
		const { data } = await geoencodingAPI.get('/search', { params });

		if (data.results && data.results.length) {
			console.log(data.results[0]);
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
		throw new Error(errorMsg);
	}
}
	
const weatherRequest = async (req, res) => {
	// console.log('weather req', req);
	const location = req.query.location;
	let latitude, longitude;
	try {
		const coordinatesResult = await getCoordinates(location);
		if (coordinatesResult) {
			[latitude, longitude] = coordinatesResult
			console.log(latitude, longitude);
		} else {
			res.json({ data: null });
			return;
		}
	} catch (err) {
		res.status(500).json({ message: 'server error' });
		return;
	}
	res.json({ foo: 1 });
};

module.exports = {
	weatherRequest,
}