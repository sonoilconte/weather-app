import React from 'react';
import Search from './components/Search';
import WeatherDayList from './components/WeatherDayList';

class App extends React.Component {

	constructor() {
		super();
		this.state = {
			searchTerm: '',
			statusMessage: '',
			weatherDays: [],
		}
	}

	onSearchTermChange = (event) => {
		this.setState({ searchTerm: event.target.value });
	}

	onSearchTermSubmit = async (event) => {
		event.preventDefault();
		let statusMessage;
		let days, city, state, country;
		try {
			const response  = await fetch(`/api?location=${this.state.searchTerm}`);
			({
				days,
				city,
				state,
				country,
			} = await response.json());

			statusMessage = (days && days.length)
				? `Showing results for ${city}, ${state}, ${country}`
				: 'No results found';
			
		} catch (err) {
			console.error(err);
			statusMessage = 'Sorry, something went wrong!'
			days = [];
		}
		this.setState({
			weatherDays: days,
			statusMessage,
		});
	}

	render() {
		return (
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-6">
						<h1 className='display-4'>Weather Forecast</h1>
					</div>
				</div>
				<Search
					searchTerm={this.searchTerm}
					onSearchTermChange={this.onSearchTermChange}
					onSearchTermSubmit={this.onSearchTermSubmit}
				/>
				<WeatherDayList
					statusMessage={this.state.statusMessage}
					weatherDays={this.state.weatherDays}
				/>
		  </div>
		);
	}	
}

export default App;
