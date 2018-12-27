// CSS
import '../css/Pagination.css';

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



    pageJSX(pageNum, currentPageNum) {

        const currentPageActive = (pageNum === currentPageNum) ? 'active' : '';
        return (
            <li key={pageNum} className={`page-item ${currentPageActive}`} onClick={e => this.props.onPageSelect(e)}>
                <button className="page-link">
                    {pageNum}
                </button>
            </li>
        );
    }

    paginationDataHandlerJSX(occurrences, selectedTab, paginationObj, numOfFactsPerPage, numOfPagesPerSection) {

        let jsxContainer = [];
        console.log(paginationObj);
        for (let i = paginationObj.startingPageInThisSection; i <= paginationObj.endingPageInThisSection; i++) {

            if (i === paginationObj.startingPageInThisSection) {
                console.log('Pagination Index: ', i);
                console.log('First Index');

                const previousButtonDisabled = (!paginationObj.startingPageInPreviousSection) ? 'disabled' : '';
                const previousTabIndex = (!paginationObj.startingPageInNextSection) ? -1 : '';

                jsxContainer.push(
                    <li key="previous" className={`page-item ${previousButtonDisabled}`} onClick={e => this.props.onPageSelect(e)}>
                      <button className="page-link" aria-label="Previous" tabindex={`${previousTabIndex}`}>
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                      </button>
                    </li>
                );


            }

            jsxContainer.push(this.pageJSX(i, this.props.currentPage));

            if (i === paginationObj.endingPageInThisSection) {
                console.log('Pagination Index: ', i);
                console.log('Last Index');

                const nextButtonDisabled = (!paginationObj.startingPageInNextSection) ? 'disabled' : '';
                const nextTabIndex = (!paginationObj.startingPageInNextSection) ? -1 : '';

                jsxContainer.push(
                    <li key="next" className={`page-item ${nextButtonDisabled}`} onClick={e => this.props.onPageSelect(e)}>
                      <button className="page-link" aria-label="Next" tabindex={`${nextTabIndex}`}>
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                      </button> 
                    </li>
                );

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
            <nav className="page-navigation" aria-label="page-navigation">
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