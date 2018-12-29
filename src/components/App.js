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

// Helper Functions
import pagination from '../helperFunctions/App.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onTabSelect = this.onTabSelect.bind(this);
        this.onPageSelect = this.onPageSelect.bind(this);

        this.state = {
            occurrences: {},
            occurrencesOnThisPage: [],
            date: null,
            selectedTab: 'Events',
            types: [],
            currentPage: 1,
            totalNumberOfFacts: null,
            numberOfFactsPerPageLimit: 4,
            numberOfPagesPerSectionLimit: 5,
            previousButtonDisabled: true,
            nextButtonDisabled: false,
            paginationObj: {},
            paginatedOccurrencesList: []
        }
    }

    async onSearchSubmit(e, date) {
        e.preventDefault();
        try {
            todayInHistory.interceptors.request.use(config => {
                this.setState({
                    occurrencesOnThisPage: null,
                    types: null
                })
                return config;
            }, err => {
                this.setState({
                    occurrencesOnThisPage: { errorMessage: err.message },
                    types: null
                });

                return Promise.reject(err);
            });

            const response = await todayInHistory.get(`/${date}`);

            let occurrencesData = response.data.data['Events'];

            const paginationObj = pagination(
                this.state.totalNumberOfFacts,
                this.state.numberOfFactsPerPageLimit,
                this.state.numberOfPagesPerSectionLimit,
                1
            );

            let tempList = [];
            let paginatedOccurrencesList = [];

            for (let i = 0; i < occurrencesData.length; i++) {
                if (i === 0 || i % 4 !== 0) {
                    tempList.push(occurrencesData[i]);
                } else {
                    paginatedOccurrencesList.push(tempList);
                    tempList = [occurrencesData[i]];
                }
            }
            paginatedOccurrencesList.push(tempList);

            this.setState({
                occurrences: response.data,
                currentPage: 1,
                types: Object.keys(response.data.data),
                date: response.data.date,
                selectedTab: 'Events',
                totalNumberOfFacts: occurrencesData.length,
                paginationObj,
                paginatedOccurrencesList,
                occurrencesOnThisPage: paginatedOccurrencesList[0]
            });
        } catch (error) {
            let errorMessage = 'Unknown Error';
            const errorCode = error.message.slice(error.message.length - 3);

            if (errorCode === '404' || errorCode === '500') {
                errorMessage = 'Invalid input. Please type in a correct date!';
            }

            this.setState({
                occurrencesOnThisPage: { errorMessage },
                types: null
            });
        }


    }

    onTabSelect(e) {
        let occurrencesData = this.state.occurrences.data[e.target.innerHTML];

        let tempList = [];
        let paginatedOccurrencesList = [];

        for (let i = 0; i < occurrencesData.length; i++) {

            if (i === 0 || i % 4 !== 0) {
                tempList.push(occurrencesData[i]);
            } else {
                paginatedOccurrencesList.push(tempList);
                tempList = [occurrencesData[i]];
            }
        }
        paginatedOccurrencesList.push(tempList);

        const paginationObj = pagination(
            this.state.totalNumberOfFacts,
            this.state.numberOfFactsPerPageLimit,
            this.state.numberOfPagesPerSectionLimit,
            1
        );

        // Check if there is any data
        const occurrencesOnThisPage = (!paginatedOccurrencesList[0].length) ? { noData: '' } : paginatedOccurrencesList[0];

        this.setState({
            currentPage: 1,
            selectedTab: e.target.innerHTML,
            totalNumberOfFacts: occurrencesData.length,
            paginationObj,
            paginatedOccurrencesList,
            occurrencesOnThisPage
        });
    }

    onPageSelect(e) {

        let selectedPage = e.target.innerText;
        let htmlEntity = selectedPage.slice(0, 1);
        let innerText = selectedPage;

        if (htmlEntity === '«') {
            // Check if there is a previous section
            if (!this.state.paginationObj.startingPageInPreviousSection) {
                this.setState({
                    previousButtonDisabled: true
                });
                return;
            }

            const occurrencesOnThisPage = this.state.paginatedOccurrencesList[this.state.paginationObj.startingPageInPreviousSection - 1];

            this.setState({
                currentPage: this.state.paginationObj.startingPageInPreviousSection,
                paginationObj: pagination(
                    this.state.totalNumberOfFacts,
                    this.state.numberOfFactsPerPageLimit,
                    this.state.numberOfPagesPerSectionLimit,
                    this.state.paginationObj.startingPageInPreviousSection
                ),
                occurrencesOnThisPage
            });
        } else if (htmlEntity === '»') {
            // Check if there is a next section
            if (!this.state.paginationObj.startingPageInNextSection) {
                this.setState({
                    nextButtonDisabled: true
                });
                return;
            }

            const occurrencesOnThisPage = this.state.paginatedOccurrencesList[this.state.paginationObj.startingPageInNextSection - 1];

            this.setState({
                currentPage: this.state.paginationObj.startingPageInNextSection,
                paginationObj: pagination(
                    this.state.totalNumberOfFacts,
                    this.state.numberOfFactsPerPageLimit,
                    this.state.numberOfPagesPerSectionLimit,
                    this.state.paginationObj.startingPageInNextSection
                ),
                occurrencesOnThisPage
            });
        } else {
            const occurrencesOnThisPage = this.state.paginatedOccurrencesList[parseInt(innerText) - 1];

            this.setState({
                paginationObj: pagination(
                    this.state.totalNumberOfFacts,
                    this.state.numberOfFactsPerPageLimit,
                    this.state.numberOfPagesPerSectionLimit,
                    parseInt(innerText)
                ),
                occurrencesOnThisPage,
                currentPage: parseInt(innerText)
            })
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
                            selectedTab={this.state.selectedTab}
                            date={this.state.date}
                            occurrencesOnThisPage={this.state.occurrencesOnThisPage}
                        />
                    </div>
                </div>
                <Pagination
                    selectedTab={this.state.selectedTab}
                    onPageSelect={this.onPageSelect} 
                    paginationObj={this.state.paginationObj}
                    numberOfFactsPerPageLimit={this.state.numberOfFactsPerPageLimit}
                    numberOfPagesPerSectionLimit={this.state.numberOfPagesPerSectionLimit}
                    currentPage={this.state.currentPage}
                    occurrencesOnThisPage={this.state.occurrencesOnThisPage}
                />
            </div>
        );
    }
};


export default App;