import React from 'react';
import PropTypes from 'prop-types';
import WeatherDay from './WeatherDay';

function WeatherDayList({ statusMessage, weatherDays }) {
    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="status-message">{statusMessage}</div>
                {
                    weatherDays.map(
                        (day, index) => (
                            <WeatherDay
                                // eslint-disable-next-line react/no-array-index-key
                                key={index}
                                date={day.date}
                                high={day.high}
                                low={day.low}
                            />
                        ),
                    )
                }
            </div>
        </div>
    );
}

WeatherDayList.propTypes = {
    statusMessage: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    weatherDays: PropTypes.array.isRequired,
};

export default WeatherDayList;
