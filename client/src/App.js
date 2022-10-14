import React from 'react';
import Search from './components/Search';
import WeatherDayList from './components/WeatherDayList';
import axios from 'axios';

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
		console.log(event.target.value);
		this.setState({ searchTerm: event.target.value });
	}

	onSearchTermSubmit = async (event) => {
		event.preventDefault();
		let statusMessage;
		let days, city, state, country;
		try {
			({
				data: {
					days,
					city,
					state,
					country,
				}
			} = await axios.get(`/api?location=${this.state.searchTerm}`));
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
		  <div className="App">
				<h1>Weather Forecast</h1>
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
