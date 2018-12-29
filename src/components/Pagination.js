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
            <li key={pageNum} className={`page-item ${currentPageActive}`} onClick={this.props.onPageSelect}>
                <button className="page-link">
                    {pageNum}
                </button>
            </li>
        );
    }

    paginationDataHandlerJSX(selectedTab, paginationObj, currentPage) {
        let jsxContainer = [];

        for (let i = paginationObj.startingPageInThisSection; i <= paginationObj.endingPageInThisSection; i++) {
            if (i === paginationObj.startingPageInThisSection) {
                const previousButtonDisabled = (!paginationObj.startingPageInPreviousSection) ? 'disabled' : '';
                const previousTabIndex = (!paginationObj.startingPageInNextSection) ? -1 : '';

                jsxContainer.push(
                    <li key="previous" className={`page-item ${previousButtonDisabled}`} onClick={this.props.onPageSelect}>
                      <button className="page-link" aria-label="Previous" tabIndex={`${previousTabIndex}`}>
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                      </button>
                    </li>
                );
            }

            jsxContainer.push(this.pageJSX(i, currentPage));

            if (i === paginationObj.endingPageInThisSection) {
                const nextButtonDisabled = (!paginationObj.startingPageInNextSection) ? 'disabled' : '';
                const nextTabIndex = (!paginationObj.startingPageInNextSection) ? -1 : '';

                jsxContainer.push(
                    <li key="next" className={`page-item ${nextButtonDisabled}`} onClick={this.props.onPageSelect}>
                      <button className="page-link" aria-label="Next" tabIndex={`${nextTabIndex}`}>
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                      </button> 
                    </li>
                );

            }




        }
        return jsxContainer;
    }

    paginationRenderHelper(occurrencesOnThisPage, selectedTab, paginationObj, currentPage) {
        if (!occurrencesOnThisPage || Object.keys(occurrencesOnThisPage)[0] === 'errorMessage' || Object.keys(occurrencesOnThisPage)[0] === 'noData') {
            return <div></div>;
        }

        return (
            <nav className="page-navigation" aria-label="page-navigation">
              <ul className="pagination justify-content-center">
                {this.paginationDataHandlerJSX(selectedTab,paginationObj,currentPage)}
              </ul>
            </nav>
        );
    }

    render() {
        return (
            this.paginationRenderHelper(
                this.props.occurrencesOnThisPage,
                this.props.selectedTab,
                this.props.paginationObj,
                this.props.currentPage
            )
        );
    }
}

export default Pagination;