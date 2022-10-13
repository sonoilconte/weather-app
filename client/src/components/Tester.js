import React from 'react';

class Tester extends React.Component {

	componentDidMount() {
		fetch('/foo')
			.then(res => res.text())
			.then(text => {
				console.log('text from the call is ', text);
			})
			.catch(err => console.log('error making request', err));
	}

	render() {
		return <div>Tester Component</div>;
	}
}

export default Tester;