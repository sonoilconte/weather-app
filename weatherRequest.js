const geoencodingAPI = require('./apis/geoencodingAPI');
const weatherAPI = require('./apis/weatherAPI');
const formatWeatherData = require('./formatWeatherData');

// We throw an ApiError when we want to send some non-200 http code to the client
// and include a message
class ApiError extends Error {
    constructor(code, message) {
        super(code, message);
        this.code = code;
        this.message = message;
    }
}

const getLocationData = async (location) => {
    try {
        const params = {
            name: location,
            format: 'json',
        };
        const { data } = await geoencodingAPI.get('/search', { params });

        if (data.results && data.results.length) {
            // For this basic version of the app, just taking the 0th city returned by the API
            console.log(data.results[0]);

            const {
                latitude,
                longitude,
                name, // city name
                admin1, // state
                country,
            } = data.results[0];
            return {
                latitude,
                longitude,
                city: name,
                state: admin1,
                country,
            };
        }
        console.log('No location data found', data);
        return null;
    } catch (err) {
        const errorMsg = 'Error making geolocation request';
        console.error(errorMsg, err);
        throw new ApiError(500, errorMsg);
    }
};

const getWeatherData = async (lat, long) => {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(long);

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
    return formatWeatherData(data);
};

const weatherRequest = async (req, res) => {
    const { location } = req.query;
    let locationData;
    let latitude;
    let longitude;
    let city;
    let state;
    let country;

    try {
        locationData = await getLocationData(location);
    } catch (err) {
        res.status(err.code).json({ message: err.message });
        return;
    }

    if (locationData) {
        ({
            latitude, longitude, city, state, country,
        } = locationData);
    } else {
        res.json({ days: [] });
        return;
    }

    try {
        const days = await getWeatherData(latitude, longitude);
        res.json({
            city,
            state,
            country,
            days,
        });
    } catch (err) {
        console.error('Error requesting weather data', err);
        res.status(err.code).json({ message: err.message });
    }
};

module.exports = {
    weatherRequest,
};
