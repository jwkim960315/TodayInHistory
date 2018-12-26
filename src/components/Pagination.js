import React from 'react';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.paginationDataHandlerJSX = this.paginationDataHandlerJSX.bind(this);
        this.paginationRenderHelper = this.paginationRenderHelper.bind(this);
        this.pageJSX = this.pageJSX.bind(this);

        this.state = {
            selectedPage: 1
        }

    }



    pageJSX(pageNum) {
        return (
            <li key={pageNum} className="page-item" onClick={e => this.props.onPageSelect(e)}>
            	<button className="page-link">
            		{pageNum}
            	</button>
            </li>
        );
    }

    paginationDataHandlerJSX(occurrences, selectedTab, paginationObj, numOfFactsPerPage, numOfPagesPerSection) {

        let jsxContainer = [];
        // console.log(paginationObj);
        for (let i = paginationObj.startingPageInThisSection; i <= paginationObj.endingPageInThisSection; i++) {
            if (i === paginationObj.startingPageInThisSection) {
                jsxContainer.push(
                    <li key="previous" className="page-item" onClick={e => this.props.onPageSelect(e)}>
				      <button className="page-link" aria-label="Previous">
				        <span aria-hidden="true">&laquo;</span>
				        <span className="sr-only">Previous</span>
				      </button>
				    </li>
                );
                jsxContainer.push(this.pageJSX(i));

            } else if (i === paginationObj.endingPageInThisSection) {
                jsxContainer.push(this.pageJSX(i));
                jsxContainer.push(
                    <li key="next" className="page-item" onClick={e => this.props.onPageSelect(e)}>
				      <button className="page-link" aria-label="Next">
				        <span aria-hidden="true">&raquo;</span>
				        <span className="sr-only">Next</span>
				      </button> 
				    </li>
                );

            } else {
                jsxContainer.push(this.pageJSX(i));
            }
        }

        return jsxContainer;


    }

    paginationRenderHelper(occurrences, selectedTab, paginationObj, numberOfFactsPerPageLimit, numberOfPagesPerSectionLimit) {
        console.log(occurrences);
        if (!occurrences || Object.keys(occurrences)[0] === 'errorMessage' || !Object.keys(occurrences).length) {
            return <div></div>;
        } else if (!Object.keys(occurrences.data[selectedTab]).length) {
            return <div>There is no Data!</div>;
        }

        occurrences = occurrences.data[selectedTab];

        return (
            <nav aria-label="page-navigation">
			  <ul className="pagination justify-content-center">
			    {this.paginationDataHandlerJSX(occurrences,selectedTab,paginationObj,numberOfFactsPerPageLimit,numberOfPagesPerSectionLimit)}
			  </ul>
			</nav>
        );
    }

    render() {


        return (
            this.paginationRenderHelper(
                this.props.occurrences,
                this.props.selectedTab,
                this.props.paginationObj,
                this.props.numberOfFactsPerPageLimit,
                this.props.numberOfPagesPerSectionLimit
            )
        );
    }
}

export default Pagination;