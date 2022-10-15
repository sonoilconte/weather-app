import React from 'react';
import WeatherDay from './WeatherDay';

class WeatherDayList extends React.Component {
	render() {
		return (
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="status-message">{this.props.statusMessage}</div>
					{this.props.weatherDays.map((day, index) => <WeatherDay key={index} day={day} />)}
				</div>
			</div>
		);
	}
}

export default WeatherDayList;