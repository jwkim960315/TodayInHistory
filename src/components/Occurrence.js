// CSS
import '../css/Occurrence.css';

import React from 'react';

const Occurrence = ({ occurrence, date }) => {
    if (!date) {
        date = occurrence.year;
    } else if (!occurrence.year) {
        date = date;
    } else {
        date = `${date}, ${occurrence.year}`;
    }

    return (<div className="col-sm-6">
				<div className="card">
				  <div className="card-header">
				    {date}
				  </div>
				  <div className="card-body">
				    <p className="card-text">{occurrence.text}</p>
				    <a href={occurrence.links[0].link}>{occurrence.links[0].title}</a>
				  </div>
				</div>
			</div>);
};

export default Occurrence;