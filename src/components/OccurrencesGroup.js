import React from 'react';

// Components
import Occurrence from './Occurrence';

const occurrencesJSXCreator = (twoOccurrencesArr, date) => {

    return twoOccurrencesArr.map((occurrenceArr, i) => {
        return (<Occurrence key={i} 
            className="occurrence"
            occurrence={occurrenceArr}
            date={date}
        />)
    });
}

const OccurrencesGroup = props => {
    return (
        <div className="row">
            {occurrencesJSXCreator(props.twoOccurrencesArr, props.date)}
        </div>
    );
};

export default OccurrencesGroup;