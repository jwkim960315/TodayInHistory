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
            occurrencesInThisPage: [],
            date: null,
            selectedTab: 'Events',
            types: [],
            currentPage: 1,
            totalNumberOfFacts: null,
            numberOfFactsPerPageLimit: 4,
            numberOfPagesPerSectionLimit: 5,
            displayingOccurrences: null,
            previousButtonDisabled: true,
            nextButtonDisabled: false,
            paginationObj: {}
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

            // console.log(response.data);

            let occurrencesData = response.data.data[this.state.selectedTab];

            const paginationObj = pagination(
                this.state.totalNumberOfFacts,
                this.state.numberOfFactsPerPageLimit,
                this.state.numberOfPagesPerSectionLimit,
                this.state.currentPage
            );

            const currentStartingPageIndex = 0;

            const currentEndingPageIndex = paginationObj.endingPageInThisSection - 1;

            this.setState({
                occurrences: response.data,
                occurrencesInThisPage: occurrencesData.slice(currentStartingPageIndex, currentEndingPageIndex),
                types: Object.keys(response.data.data),
                date: response.data.date,
                totalNumberOfFacts: occurrencesData.length,
                paginationObj
            });
        } catch (error) {
            this.setState({
                occurrences: { errorMessage: error.message },
                types: null
            });
        }


    }

    onTabSelect(e) {
        let occurrencesData = this.state.occurrences.data[e.target.innerHTML];

        const paginationObj = pagination(
            this.state.totalNumberOfFacts,
            this.state.numberOfFactsPerPageLimit,
            this.state.numberOfPagesPerSectionLimit,
            1
        );

        this.setState({
            selectedTab: e.target.innerHTML,
            currentPage: 1,
            totalNumberOfFacts: occurrencesData.length,
            paginationObj
        });
    }

    onPageSelect(e) {

        let selectedPage = e.target.innerText;
        let htmlEntity = selectedPage.slice(0, 1);
        let innerText = selectedPage;


        console.log(this.state.totalNumberOfFacts);


        const occurrencesData = this.state.occurrences.data[this.state.selectedTab];


        if (htmlEntity === '«') {
            console.log('Previous has been selected');



            console.log('startingPageInPreviousSection: ', this.state.paginationObj.startingPageInPreviousSection);

            // Check if there is a previous section
            if (!this.state.paginationObj.startingPageInPreviousSection) {
                this.setState({
                    previousButtonDisabled: true
                });
                return;
            }

            console.log('HERE!')

            const previousStartingPageIndex = this.state.paginationObj.startingPageInPreviousSection - 1;

            const previousEndingPageIndex = this.state.paginationObj.endingPageInPreviousSection - 1;

            this.setState({
                currentPage: pagination.startingPageInPreviousSection,
                paginationObj: pagination(
                    this.state.totalNumberOfFacts,
                    this.state.numberOfFactsPerPageLimit,
                    this.state.numberOfPagesPerSectionLimit,
                    this.state.paginationObj.startingPageInPreviousSection
                )
            });



        } else if (htmlEntity === '»') {
            console.log('Next has been selected');



            // Check if there is a next section
            if (!this.state.paginationObj.startingPageInNextSection) {
                this.setState({
                    nextButtonDisabled: true
                });
                return;
            }

            const nextStartingPageIndex = this.state.paginationObj.startingPageInNextSection - 1;

            const nextEndingPageIndex = this.state.paginationObj.endingPageInNextSection - 1;

            console.log('HERE!');

            this.setState({
                currentPage: pagination.startingPageInNextSection,
                paginationObj: pagination(
                    this.state.totalNumberOfFacts,
                    this.state.numberOfFactsPerPageLimit,
                    this.state.numberOfPagesPerSectionLimit,
                    this.state.paginationObj.startingPageInNextSection
                )
            });

            console.log(this.state.paginationObj);

        } else {
            this.setState({
                paginationObj: pagination(
                    this.state.totalNumberOfFacts,
                    this.state.numberOfFactsPerPageLimit,
                    this.state.numberOfPagesPerSectionLimit,
                    parseInt(innerText)
                )
            })
        }

        // console.log(this.state.currentPage);
        // console.log('Total Number of Facts: ', this.state.totalNumberOfFacts);
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
                    onPageSelect={this.onPageSelect} 
                    paginationObj={this.state.paginationObj}
                    numberOfFactsPerPageLimit={this.state.numberOfFactsPerPageLimit}
                    numberOfPagesPerSectionLimit={this.state.numberOfPagesPerSectionLimit}
                />
            </div>

        );
    }
};


export default App;