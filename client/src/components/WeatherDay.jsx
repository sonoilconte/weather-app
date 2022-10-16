/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';

const dateOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

function WeatherDay({
    date,
    high,
    low,
}) {
    const formattedDate = new Date(date).toLocaleDateString('en-US', dateOptions);
    return (
        <div className="card">
            <div className="card-body">
                <div className="card-title">{formattedDate}</div>
                <div className="card-text">High: {high}&deg;F</div>
                <div className="card-text">Low: {low}&deg;F</div>
            </div>
        </div>
    );
}

WeatherDay.propTypes = {
    date: PropTypes.string.isRequired,
    high: PropTypes.number.isRequired,
    low: PropTypes.number.isRequired,
};

export default WeatherDay;
