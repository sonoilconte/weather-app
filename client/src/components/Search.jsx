import React from 'react';
import PropTypes from 'prop-types';

function Search({ onSearchTermChange, onSearchTermSubmit }) {
    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <form onSubmit={onSearchTermSubmit}>
                    <input
                        placeholder="Enter a city or zip code"
                        onChange={onSearchTermChange}
                        data-testid="searchField"
                    />
                    <input
                        type="submit"
                        className="btn btn-primary"
                        data-testid="submitBtn"
                    />
                </form>
            </div>
        </div>
    );
}

Search.propTypes = {
    onSearchTermChange: PropTypes.func.isRequired,
    onSearchTermSubmit: PropTypes.func.isRequired,
};

export default Search;
