import React from 'react';

class Search extends React.Component {
	render() {
		return (
			<div>
				<form>
					<input
						placeholder='Enter a city or zip code'
						onChange={this.props.onSearchTermChange}
					/>
				</form>
			</div>
		);
	}
}

export default Search;