import React from 'react';
import Search from './components/Search';
import WeatherDayList from './components/WeatherDayList';

class App extends React.Component {

	constructor() {
		super();
		this.state = {
			searchTerm: '',
			weatherDays: ['x', 'y', 'z', 'q']
		}
	}

	onSearchTermChange = (event) => {
		console.log(event.target.value);
		this.setState({ searchTerm: event.target.value });
	}

	render() {
		return (
		  <div className="App">
				<h1>Weather Forecast</h1>
				<Search searchTerm={this.searchTerm} onSearchTermChange={this.onSearchTermChange} />
				<WeatherDayList weatherDays={this.state.weatherDays} />
		  </div>
		);
	}	
}

export default App;
