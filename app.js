document.addEventListener('DOMContentLoaded', function() {
    var typingArea = document.getElementById('typingArea');

    typingArea.addEventListener('mouseenter', () => {
        typingArea.style.caretColor = 'transparent';
    })

    typingArea.addEventListener('click', () => {
        typingArea.style.caretColor = 'auto';
        document.getElementById('typingArea').placeholder = '';
    })

    typingArea.addEventListener('mouseout', () => {
       typingArea.style.caretColor = 'transparent';
       document.getElementById('typingArea').placeholder = 'Your school or university...';
    })

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
});

async function handleSearch(event) {
    event.preventDefault();
    const query = document.getElementById('typingArea').value;
    console.log(`Search initiated for: ${query}`);
    if (query) {
        window.location.hash = `discussion-board?school=${encodeURIComponent(query)}`;
    }
}

async function handleHashChange() {
    const hash = window.location.hash;
    const mainContent = document.getElementById('main-content');
    const discussionBoardContent = document.getElementById('discussion-board-content');

    if (hash.startsWith('#discussion-board')) {
        const params = new URLSearchParams(hash.split('?')[1]); // Remove "#discussion-board"
        const school = params.get('school');
        console.log('School parameter:', school);
        if (school) {
            mainContent.style.display = 'none';
            discussionBoardContent.style.display = 'block';

            const apiKey = 'Y5S8RKymVnBWi1Mr0gESLYtOCyBqpY5FweSf1I3B';
            const apiUrl = 'https://api.data.gov/ed/collegescorecard/v1/schools.json?fields=school.name,school.alias&api_key=Y5S8RKymVnBWi1Mr0gESLYtOCyBqpY5FweSf1I3B&per_page=100&school.state=NC';

            try {
                const allResults = await fetchAllPages(apiUrl, 2);
                console.log('All fetched results: ', allResults);
                //const data = await response.json();
                const filteredResults = filterResults(allResults, school);
                displayResults(filteredResults);
            } catch (error) {
                console.error('Error:', error);
                discussionBoardContent.innerHTML = `<p>Error fetching school data. Please try again later.</p>`;
            }
        }
    } else {
        mainContent.style.display = 'block';
        discussionBoardContent.style.display = 'none';
    }
}

async function fetchAllPages(apiUrl, totalPages) {
    let allResults = [];
    for (let page = 0; page < totalPages; page++) {
        try {
            const response = await fetch(`${apiUrl}&page=${page}`);
            if (!response.ok) {
                throw new Error(`Network response was not ok for page ${page}`);
            }
            const data = await response.json();
            console.log(`API Response for page ${page}:`, data);
            allResults = allResults.concat(data.results);
            // Break out of the loop if no more results are returned
            if (data.results.length < 100) {
                break;
            }
        } catch (error) {
            console.error(`Error fetching page ${page}:`, error);
            break;
        }
    }
    return allResults;
}

function filterResults(data, pattern) {
    const lowerCasePattern = pattern.toLowerCase();
    return data.filter(school =>
        school['school.name'].toLowerCase().includes(lowerCasePattern) ||
        (school['school.alias'] && school['school.alias'].toLowerCase().includes(lowerCasePattern))
    );
}

function displayResults(schools) {
    if (!schools) {
        discussionBoardContent.innerHTML = '<h3 class="noschool-header">No school matching search</h3>';
    }
    console.log('Displaying results for schools:', schools);
    const discussionBoardContent = document.getElementById('discussion-board-content');
    discussionBoardContent.innerHTML = `
        <h3 class="results-header">Schools that matched your search...</h3>
        <ul>
            ${schools.map(school => `<li onclick="selectSchool('${school['school.name']}')">${school['school.name']}</li>`).join('')}
        </ul>
    `;
}

function selectSchool(schoolName) {
    console.log(`School selected: ${schoolName}`);
    // Update the hash to reflect the selected school
    // window.location.hash = `#discussion-board?school=${encodeURIComponent(schoolName)}`;
    localStorage.setItem('selectedSchool', schoolName);
    window.location.href = "school.html";
    // Here you can add additional logic to fetch and display specific school information if needed
    // const selectedSchoolContent = document.getElementById('selected-school');
    // selectedSchoolContent.innerHTML = `<h2>${schoolName}</h2>`;
    // selectedSchoolContent.style.display = 'block';
}

function redirectToYOU() {
    window.location.href = "you.html"; 
}

function redirectToSCHOOL() {
    window.location.href = "index.html"; 
}

function redirectToCOURSE() {
    window.location.href = "findcourse.html"; 
}


