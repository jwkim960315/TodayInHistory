// Axios Configurated
import todayInHistory from '../apis/todayInHistory';

// CSS
import '../css/App.css';

import React from 'react';

// Components
import SearchBar from './SearchBar';
import OccurrencesTab from './OccurrencesTab';
import OccurrencesContainer from './OccurrencesContainer';



class App extends React.Component {
	constructor(props) {
		super(props);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.onTabSelect = this.onTabSelect.bind(this);

		this.state = {
			occurrences: {},
			selectedTab: ''
		}
	}

	onTabSelect(e) {
		console.log(e.target.innerHTML);
		this.setState({ selectedTab: e.target.innerHTML });
	}

	async onSearchSubmit(e,date) {
		e.preventDefault();
		todayInHistory.interceptors.request.use(config => {
			// TODO: Display a message that says the program is processing the data
			return config;
		}, err => {
			// TODO: Display a message that says the program is having an issue
			return Promise.reject(err);
		});

		if (!Object.keys(date).length) {
			return "NO!";
		}

		const response = await todayInHistory.get(`/${date}`);
		console.log(response.data);
		this.setState({ occurrences: response.data });
	}

	render() {
		return (
			<div className="container">
				<h1 className="title">Today In History</h1>
				<SearchBar onSearchSubmit={this.onSearchSubmit} />
				<hr />
				<p>
					<OccurrencesTab onTabSelect={this.onTabSelect} />
				</p>
				<div className="row">
					<div className="col">
						<OccurrencesContainer 
							occurrences={this.state.occurrences}
							selectedTab={this.state.selectedTab}
						/>
					</div>
				</div>
			</div>
			
		);
	}
};


export default App;