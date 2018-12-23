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
			selectedTab: 'Events',
			types: []
		}
	}

	onTabSelect(e) {
		console.log(e.target.innerHTML);
		this.setState({ selectedTab: e.target.innerHTML });
	}

	async onSearchSubmit(e,date) {
		e.preventDefault();
		try {
			todayInHistory.interceptors.request.use(config => {
				this.setState({ 
					occurrences: null,
					types: null
				})
				return config;
			}, err => {
				this.setState({
					occurrences: { errorMessage: err.message },
					types: null
				});

				return Promise.reject(err);
			});

			const response = await todayInHistory.get(`/${date}`);
			this.setState({ 
				occurrences: response.data,
				types: Object.keys(response.data.data)
			});
		} catch(error) {
			this.setState({
				occurrences: { errorMessage: error.message },
				types: null
			});
		}

		
	}

	render() {
		return (
			<div className="container">
				<h1 className="title">Today In History</h1>
				<SearchBar onSearchSubmit={this.onSearchSubmit} />
				<OccurrencesTab 
					onTabSelect={this.onTabSelect} 
					types={this.state.types}
				/>
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