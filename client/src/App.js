import React from 'react';
import Search from './components/Search';
import WeatherDayList from './components/WeatherDayList';
import axios from 'axios';

class App extends React.Component {

	constructor() {
		super();
		this.state = {
			searchTerm: '',
			weatherDays: [
				{
					date: '2022-10-14',
					high: '70',
					low: '70',
				},
				{
					date: '2022-10-15',
					high: '71',
					low: '60',
				},
				{
					date: '2022-10-16',
					high: '72',
					low: '62',
				}
			]
		}
	}

	onSearchTermChange = (event) => {
		console.log(event.target.value);
		this.setState({ searchTerm: event.target.value });
	}

	onSearchTermSubmit = async (event) => {
		event.preventDefault();
		// console.log('sanity');
		console.log({ event })
		const { data: { days } } = await axios.get(`/api?location=${this.state.searchTerm}`);
		this.setState({ weatherDays: days });
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
				<WeatherDayList weatherDays={this.state.weatherDays} />
		  </div>
		);
	}	
}

export default App;
