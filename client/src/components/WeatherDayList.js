import React from 'react';
import WeatherDay from './WeatherDay';

class WeatherDayList extends React.Component {
	render() {
		return (
			<div>
				<div>{this.props.statusMessage}</div>
				{this.props.weatherDays.map((day, index) => <WeatherDay key={index} day={day} />)}
			</div>
		);
	}
}

export default WeatherDayList;