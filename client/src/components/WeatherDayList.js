import React from 'react';

class WeatherDayList extends React.Component {

	formatList = (weatherDays) => {
		return weatherDays.map((day, index) => <div key={index}>{`${index} ${day}`}</div>);
	}

	render() {
		return (
			<div>
				{this.formatList(this.props.weatherDays)}
				{/* {this.props.weatherDays} */}
			</div>
		);
	}
}

export default WeatherDayList;