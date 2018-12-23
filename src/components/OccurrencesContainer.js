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
		if (!occurrencesObj) {
			return <div>Data Loading...</div>;
		} else if (Object.keys(occurrencesObj)[0] === 'errorMessage') {
			return <div>{occurrencesObj.errorMessage}</div>;
		}

		else if (!Object.keys(occurrencesObj).length) {
			return <div></div>; 
		}
		
		const occurrences = occurrencesObj.data[selectedTab];
		// console.log(occurrences);
		


		return occurrences.map((occurrence,i) => {
			return (<Occurrence 
						className="occurrence"
						occurrence={occurrence} 
						date={occurrencesObj.date} 
	    	   	   	/>);
		});
	};

	render() {
		return (
			<div className="tab-content occurrences-container" id="nav-tabContent">
				<div className={`tab-pane fade show active`} id="events" role="tabpanel" aria-labelledby="events-tab">
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