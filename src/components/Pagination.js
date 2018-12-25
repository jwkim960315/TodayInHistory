import React from 'react';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.onPagebuttonClick = this.onPagebuttonClick.bind(this);
        this.paginationDataHandlerJSX = this.paginationDataHandlerJSX.bind(this);
        this.paginationRenderHelper = this.paginationRenderHelper.bind(this);
        this.pageJSX = this.pageJSX.bind(this);

        this.state = {
            selectedPage: 1
        }

        this.paginationRef = React.createRef();

    }

    onPagebuttonClick(e) {
        console.log(e.target.innerHTML);
    }

    pageJSX(pageNum) {
        return (
            <li ref={this.paginationRef} className="page-item" onClick={e => this.props.onPageSelect(e,this.paginationRef)}>
            	<button className="page-link">
            		{pageNum+1}
            	</button>
            </li>
        );
    }

    paginationDataHandlerJSX(occurrences, selectedTab, numOfFactsPerPage, numOfPagesPerSection) {
        const totalNumPages = Math.ceil(occurrences.length / numOfFactsPerPage);
        const totalNumSections = Math.ceil(totalNumPages / numOfPagesPerSection);

        let jsxContainer = [];

        for (let i = 0; i < numOfPagesPerSection; i++) {
            if (i % numOfPagesPerSection === 0) {
                jsxContainer.push(
                    <li ref={this.paginationRef} className="page-item" onClick={e => this.props.onPageSelect(e,this.paginationRef)}>
				      <button className="page-link" aria-label="Previous">
				        <span aria-hidden="true">&laquo;</span>
				        <span className="sr-only">Previous</span>
				      </button>
				    </li>
                );
                jsxContainer.push(this.pageJSX(i));
            } else if (i % numOfPagesPerSection === numOfPagesPerSection - 1) {
                jsxContainer.push(this.pageJSX(i));
                jsxContainer.push(
                    <li ref={this.paginationRef} className="page-item" onClick={e => this.props.onPageSelect(e,this.paginationRef)}>
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

    paginationRenderHelper(occurrences, selectedTab) {
        if (!occurrences || Object.keys(occurrences)[0] === 'errorMessage' || !Object.keys(occurrences).length) {
            return <div></div>;
        } else if (!Object.keys(occurrences.data[selectedTab]).length) {
            return <div>There is no Data!</div>;
        }

        occurrences = occurrences.data[selectedTab];

        return (
            <nav aria-label="page-navigation">
			  <ul className="pagination justify-content-center">
			    {this.paginationDataHandlerJSX(occurrences,selectedTab,4,5)}
			  </ul>
			</nav>
        );
    }

    render() {


        return this.paginationRenderHelper(this.props.occurrences, this.props.selectedTab)
    }
}

export default Pagination;