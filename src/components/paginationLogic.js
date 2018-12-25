// Pagination Logic Brainstorm

const totalNumberOfFacts = 65;

const numberOfFactsPerPage = 4;

const numberOfPagesPerSection = 5;

const totalNumberOfPages = Math.ceil(totalNumberOfFacts / numberOfFactsPerPage);

const totalNumberOfSections = Math.ceil(totalNumberOfPages / numberOfPagesPerSection);

console.log('Total Number of Pages: ', totalNumberOfPages);
console.log('Total Number of Sections: ', totalNumberOfSections);

const currentPage = 16;

const currentSection = 4;

console.log('Current Page: ', currentPage);
console.log('Current Section: ', currentSection);

const startingPageInThisSection = (currentPage % numberOfPagesPerSection === 0) ? currentPage - numberOfPagesPerSection + 1 : currentPage - currentPage % numberOfPagesPerSection + 1;

const endingPageInThisSection = (currentSection === totalNumberOfSections) ? totalNumberOfPages : startingPageInThisSection + numberOfPagesPerSection - 1;

const numberOfPagesInThisSection = endingPageInThisSection - startingPageInThisSection;



console.log('\nStarting Page In This Section: ', startingPageInThisSection);
console.log('Ending Page In This Section: ', endingPageInThisSection);