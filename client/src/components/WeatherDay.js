import React from 'react';

class WeatherDay extends React.Component {
	render() {
		const {
			date,
			high,
			low,
		} = this.props.day;
		return (
			<div>
				<div>{date}</div>
				<div>High: {high}</div>
				<div>Low: {low}</div>
			</div>
		);
	}
}

export default WeatherDay;