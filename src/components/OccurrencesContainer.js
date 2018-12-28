// CSS
import '../css/OccurrencesContainer.css';

import React from 'react';

// Components
import OccurrencesGroup from './OccurrencesGroup';


class OccurrencesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.occurrencesGroupJSXCreator = this.occurrencesGroupJSXCreator.bind(this);
    }

    occurrencesGroupJSXCreator(occurrences, selectedTab, date, occurrencesOnThisPage) {
        try {
            if (!occurrences) {
                return (
                    <div className="spinner text-center">
                        <i className="fas fa-spinner fa-spin fa-10x"></i>
                    </div>
                );
            } else if (!Object.keys(occurrences).length) {
                return <div></div>;
            } else if (!occurrencesOnThisPage) {
                return <div className="error-message text-center">Nothing happened on this date!</div>;
            } else if (Object.keys(occurrences)[0] === 'errorMessage') {
                return <div className="error-message text-center">{occurrences.errorMessage}</div>;
            }

            const occurrencesContainer = [];
            let tempList = [];
            for (let i = 0; i < occurrencesOnThisPage.length; i++) {
                tempList.push(occurrencesOnThisPage[i]);
                if ((i % 2 === 1 && i !== 0) || i === this.props.occurrencesOnThisPage.length - 1) {
                    occurrencesContainer.push(<OccurrencesGroup key={i} twoOccurrencesArr={tempList} date={date} />);
                    tempList = [];
                }



            }
            return occurrencesContainer;
        } catch (err) {
            return <div className="error-message text-center">Invalid date. Please type in a correct date!</div>;
        }

    }

    render() {
        return (
            <div className="tab-content occurrences-container" id="nav-tabContent">
                <div className={`tab-pane fade show active`} id="events" role="tabpanel" aria-labelledby="events-tab">
                    {
                        this.occurrencesGroupJSXCreator(
                            this.props.occurrences,
                            this.props.selectedTab,
                            this.props.date,
                            this.props.occurrencesOnThisPage
                        )
                    }
                </div>
            </div>
        );
    }
}





export default OccurrencesContainer;