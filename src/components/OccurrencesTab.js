import React from 'react';

class OccurrencesTab extends React.Component {
	constructor(props) {
		super(props);

	}


	render() {
		return (
			<a 
				className="btn btn-primary" 
				data-toggle="collapse" 
				href="#onlyOneContainer" 
				role="button" 
				aria-expanded="false" 
				aria-controls="onlyOneContainer"
				onClick={e => this.props.onTabSelect(e)}
			>
				Events
			</a>
		);
	}
};

export default OccurrencesTab;