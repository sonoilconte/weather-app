import React from 'react';

class Search extends React.Component {
	render() {
		return (
			<div>
				<form onSubmit={this.props.onSearchTermSubmit}>
					<input
						placeholder='Enter a city or zip code'
						onChange={this.props.onSearchTermChange}
					/>
					<input type='submit' />
				</form>
			</div>
		);
	}
}

export default Search;