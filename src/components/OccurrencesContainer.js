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

    occurrencesGroupJSXCreator(occurrences, selectedTab) {
        // console.log(occurrences);
        if (!occurrences) {
            return <div>Data Loading...</div>;
        } else if (!Object.keys(occurrences).length) {
            return <div></div>;
        } else if (!Object.keys(occurrences.data[selectedTab]).length) {
            return <div>There is no data!</div>;
        } else if (Object.keys(occurrences)[0] === 'errorMessage') {
            return <div>{occurrences.errorMessage}</div>;
        }

        const date = occurrences.date;
        occurrences = occurrences.data[selectedTab];


        const occurrencesContainer = [];
        let tempList = [];
        for (let i = 0; i < occurrences.length; i++) {
            tempList.push(occurrences[i]);
            if ((i % 2 === 1 && i !== 0) || i === this.props.occurrences.length - 1) {
                occurrencesContainer.push(<OccurrencesGroup key={i} twoOccurrencesArr={tempList} date={date} />);
                tempList = [];
            }



        }
        return occurrencesContainer;
    }

    render() {
        return (
            <div className="tab-content occurrences-container" id="nav-tabContent">
                <div className={`tab-pane fade show active`} id="events" role="tabpanel" aria-labelledby="events-tab">
                    {this.occurrencesGroupJSXCreator(this.props.occurrences,this.props.selectedTab)}
                </div>
            </div>
        );
    }
}





export default OccurrencesContainer;