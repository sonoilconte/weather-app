import React from 'react';

const dateOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };

class WeatherDay extends React.Component {
	render() {
		const {
			date,
			high,
			low,
		} = this.props.day;
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
}

export default WeatherDay;