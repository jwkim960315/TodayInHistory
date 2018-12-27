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

            let tempOccurrencesInThisPage = [];
            let paginatedOccurrencesList = [];

            console.log(occurrencesData.length);

            for (let i = 0; i < occurrencesData.length; i++) {

                if (i === 0 || i % 4 !== 0) {
                    console.log(i);
                    tempOccurrencesInThisPage.push(occurrencesData[i]);
                } else {
                    console.log(i);
                    paginatedOccurrencesList.push(tempOccurrencesInThisPage);
                    tempOccurrencesInThisPage = [occurrencesData[i]];
                }

                if (i === occurrencesData.length - 1) {
                    paginatedOccurrencesList.push(tempOccurrencesInThisPage);
                }
            }

            console.log(paginatedOccurrencesList);


            this.setState({
                occurrences: response.data,
                types: Object.keys(response.data.data),
                date: response.data.date,
                totalNumberOfFacts: occurrencesData.length,
                paginationObj,
                paginatedOccurrencesList,
                occurrencesInThisPage: paginatedOccurrencesList[0]
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

        let tempOccurrencesInThisPage = [];
        let paginatedOccurrencesList = [];

        for (let i = 0; i < occurrencesData.length; i++) {

            if (i === 0 || i % 4 !== 0) {
                console.log(i);
                tempOccurrencesInThisPage.push(occurrencesData[i]);
            } else {
                console.log(i);
                paginatedOccurrencesList.push(tempOccurrencesInThisPage);
                tempOccurrencesInThisPage = [occurrencesData[i]];
            }

            if (i === occurrencesData.length - 1) {
                paginatedOccurrencesList.push(tempOccurrencesInThisPage);
            }
        }

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
            paginationObj,
            paginatedOccurrencesList,
            occurrencesInThisPage: paginatedOccurrencesList[0]
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





            // Check if there is a previous section
            if (!this.state.paginationObj.startingPageInPreviousSection) {
                this.setState({
                    previousButtonDisabled: true
                });
                return;
            }





            // console.log('startingPageInPreviousSection after clicking previous: ', paginationObj.startingPageInPreviousSection);


            const occurrencesInThisPage = this.state.paginatedOccurrencesList[this.state.paginationObj.startingPageInPreviousSection - 1];

            console.log('OccurrencesInThisPage after clicking previous: ', this.state.occurrencesInThisPage);

            this.setState({
                currentPage: this.state.paginationObj.startingPageInPreviousSection,
                paginationObj: pagination(
                    this.state.totalNumberOfFacts,
                    this.state.numberOfFactsPerPageLimit,
                    this.state.numberOfPagesPerSectionLimit,
                    this.state.paginationObj.startingPageInPreviousSection
                ),
                occurrencesInThisPage
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



            // console.log(paginationObj);

            // console.log('startingPageInPreviousSection after clicking next: ', paginationObj.startingPageInNextSection);

            const occurrencesInThisPage = this.state.paginatedOccurrencesList[this.state.paginationObj.startingPageInNextSection - 1];

            console.log('OccurrencesInThisPage after clicking next: ', this.state.occurrencesInThisPage);

            this.setState({
                currentPage: this.state.paginationObj.startingPageInNextSection,
                paginationObj: pagination(
                    this.state.totalNumberOfFacts,
                    this.state.numberOfFactsPerPageLimit,
                    this.state.numberOfPagesPerSectionLimit,
                    this.state.paginationObj.startingPageInNextSection
                ),
                occurrencesInThisPage
            });



        } else {

            const occurrencesInThisPage = this.state.paginatedOccurrencesList[parseInt(innerText) - 1];

            console.log('OccurrencesInThisPage after clicking a page: ', this.state.occurrencesInThisPage);

            this.setState({
                paginationObj: pagination(
                    this.state.totalNumberOfFacts,
                    this.state.numberOfFactsPerPageLimit,
                    this.state.numberOfPagesPerSectionLimit,
                    parseInt(innerText)
                ),
                occurrencesInThisPage,
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
                            occurrences={this.state.occurrences}
                            selectedTab={this.state.selectedTab}
                            date={this.state.date}
                            occurrencesInThisPage={this.state.occurrencesInThisPage}
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
                    currentPage={this.state.currentPage}
                />
            </div>

        );
    }
};


export default App;