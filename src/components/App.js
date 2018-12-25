// Axios Configurated
import todayInHistory from '../apis/todayInHistory';

// CSS
import '../css/App.css';

import React from 'react';

// Components
import SearchBar from './SearchBar';
import OccurrencesTab from './OccurrencesTab';
import OccurrencesContainer from './OccurrencesContainer';
import Pagination from './Pagination';



class App extends React.Component {
    constructor(props) {
        super(props);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onTabSelect = this.onTabSelect.bind(this);
        this.onPageSelect = this.onPageSelect.bind(this);

        this.state = {
            occurrences: {},
            date: null,
            selectedTab: 'Events',
            types: [],
            currentPage: 1,
            currentSection: 1,
            displayingOccurrences: null
        }
    }

    async onSearchSubmit(e, date) {
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

            console.log(response.data);

            let data = response.data.data[this.state.selected];



            this.setState({
                occurrences: response.data,
                types: Object.keys(response.data.data),
                date: response.data.date
            });
        } catch (error) {
            this.setState({
                occurrences: { errorMessage: error.message },
                types: null
            });
        }


    }

    onTabSelect(e) {
        this.setState({ selectedTab: e.target.innerHTML });
    }

    onPageSelect(e, paginationRef) {
        const selectedPage = paginationRef.current.innerText;
        const htmlEntity = selectedPage.slice(0, 1);
        const innerText = selectedPage.slice(1);
        if (htmlEntity === '«') {

        } else if (htmlEntity === '»') {
            console.log('Next has been selected');


        }

        console.log(this.state.currentPage);
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
                <Pagination 
                    occurrences={this.state.occurrences}
                    selectedTab={this.state.selectedTab}
                    onPageSelect={this.onPageSelect} />
            </div>

        );
    }
};


export default App;