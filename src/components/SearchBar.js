import React from 'react';

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.onInputChange = this.onInputChange.bind(this);

		this.state = {
			date: ''
		}
	}


	onInputChange(e) {
		this.setState({ date: e.target.value });
	}

	render() {
		return (
			<form onSubmit={e => this.props.onSearchSubmit(e,this.state.date)}>
				<div className="input-group mb-3">
				  <input 
				  	type="text" 
				  	className="form-control" 
				  	placeholder="Please type in a date" 
				  	aria-label="date" 
				  	aria-describedby="button-addon2" 
				  	onChange={e => this.onInputChange(e)}
				  	value={this.state.input}
				  />
				  <div className="input-group-append">
				    <button className="btn btn-outline-primary" type="submit" id="button-addon2">Search</button>
				  </div>
				</div>
			</form>
		);
	}
};

export default SearchBar;