import React from 'react';

class Search extends React.Component {
	render() {
		return (
			<div className="row justify-content-center">
				<div className='col-md-6'>
					<form onSubmit={this.props.onSearchTermSubmit}>
						<input
							placeholder='Enter a city or zip code'
							onChange={this.props.onSearchTermChange}
							data-testid="searchField"
						/>
						<input
							type='submit'
							className="btn btn-primary"
							data-testid="submitBtn"
						/>
					</form>
				</div>
			</div>
		); 
	}
}

export default Search;