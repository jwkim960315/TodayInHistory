import React from 'react';

const Occurrence = ({ occurrence, date }) => {
	return (
		<div className="">
			<div className="card">
			  <div className="card-header">
			    {`${date}, ${occurrence.year}`}
			  </div>
			  <div className="card-body">
			    <p className="card-text">{occurrence.text}</p>
			    <a href={occurrence.links[0].link}>{occurrence.links[0].title}</a>
			  </div>
			</div>
		</div>
	);
};

export default Occurrence;