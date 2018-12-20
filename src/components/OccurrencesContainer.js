// CSS
import '../css/OccurrencesContainer.css';

import React from 'react';

// Components
import Occurrence from './Occurrence';


class OccurrencesContainer extends React.Component {
	constructor(props) {
		super(props);
		this.occurrencesJSXCreator = this.occurrencesJSXCreator.bind(this);
	}

	occurrencesJSXCreator(occurrencesObj,selectedTab) {
		if (!Object.keys(occurrencesObj).length) {
			return <div>There is no data yet</div>; 
		} else if (!selectedTab) {
			return <div>Tab has not been selected</div>;
		};
		
		const occurrences = occurrencesObj.data[selectedTab];
		// console.log(occurrences);
		


		return occurrences.map(occurrence => (<Occurrence 
												occurrence={occurrence} 
												date={occurrencesObj.date} 
												className="occurrence"
									   />));
	};

	render() {
		return (
			<div className="collapse multi-collapse" id="onlyOneContainer">
		      <div className="card card-body occurrences-container">
		        {this.occurrencesJSXCreator(this.props.occurrences,this.props.selectedTab)}
		      </div>
		    </div>
		);
	}
}



// results param will be a list of results per category
// const occurrencesJSXCreator = (occurrencesObj,selectedTab) => {
// 	if (!Object.keys(occurrencesObj).length) {
// 		return <div>There is no data yet</div>; 
// 	} else if (!selectedTab) {
// 		return <div>Tab has not been selected</div>;
// 	};
	
// 	const occurrences = occurrencesObj[selectedTab];
// 	console.log(occurrences);
	


// 	return occurrences.map(occurrence => (<Occurrence 
// 											occurrence={occurrence} 
// 											date={occurrencesObj.date} 
// 											className="occurrence"
// 								   />));


// };

// const OccurrencesContainer = props => {
// 	return (
// 		<div className="collapse multi-collapse" id="onlyOneContainer">
// 	      <div className="card card-body occurrences-container">
// 	        {occurrencesJSXCreator(props.occurrences,props.selectedTab)}
// 	      </div>
// 	    </div>
// 	);
// };

export default OccurrencesContainer;