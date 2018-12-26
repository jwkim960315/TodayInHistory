const pagination = (totalNumberOfFacts,
    numOfFactsPerPageLimit,
    numOfPagesPerSectionLimit,
    currentPage
) => {
    const currentSection = Math.ceil(currentPage / numOfPagesPerSectionLimit);

    const totalNumberOfPages = Math.ceil(totalNumberOfFacts / numOfFactsPerPageLimit);

    const totalNumberOfSections = Math.ceil(totalNumberOfPages / numOfPagesPerSectionLimit);

    const startingPageInThisSection = (currentPage % numOfPagesPerSectionLimit === 0) ? currentPage - numOfPagesPerSectionLimit + 1 : currentPage - currentPage % numOfPagesPerSectionLimit + 1;

    const endingPageInThisSection = (currentSection === totalNumberOfSections) ? totalNumberOfPages : startingPageInThisSection + numOfPagesPerSectionLimit - 1;

    const numberOfPagesInThisSection = endingPageInThisSection - startingPageInThisSection + 1;

    const startingPageInNextSection = (currentSection === totalNumberOfSections) ? null : startingPageInThisSection + numOfPagesPerSectionLimit;

    const endingPageInNextSection = (currentSection === totalNumberOfSections) ? null : ((currentSection + 1 === totalNumberOfSections) ? totalNumberOfPages : startingPageInNextSection + numOfPagesPerSectionLimit - 1);

    const startingPageInPreviousSection = (currentSection === 1) ? null : startingPageInThisSection - numOfPagesPerSectionLimit;

    const endingPageInPreviousSection = (currentSection === 1) ? null : startingPageInThisSection - 1;

    // console.log('\nTotal Number of Pages: ', totalNumberOfPages);
// console.log('\nCurrent Page: ', currentPage);
// console.log('Current Section: ', currentSection);
// console.log('\nStarting Page in Previous Section: ', startingPageInPreviousSection);
// console.log('Ending Page in Previous Section: ', endingPageInPreviousSection);
// console.log('\nStarting Page in This Section: ', startingPageInThisSection);
// console.log('Ending Page in This Section: ', endingPageInThisSection);
// console.log('\nStarting Page in Next Section: ', startingPageInNextSection);
// console.log('Ending Page in Next Section: ', endingPageInNextSection);


    return ({
        startingPageInPreviousSection,
        endingPageInPreviousSection,
        startingPageInThisSection,
        endingPageInThisSection,
        numberOfPagesInThisSection,
        startingPageInNextSection,
        endingPageInNextSection
    });

};


//TEST
// pagination(153, 4, 5, 38);

export default pagination;