document.addEventListener('DOMContentLoaded', function() {
    const schoolName = localStorage.getItem('selectedSchool');
    if (schoolName) {
        document.getElementById('school-name').innerText = schoolName;
    }

    ReactDOM.render(<App />, document.getElementById('react-root'));
});

function redirectToYOU() {
    window.location.href = "you.html"; 
}

function redirectToSCHOOL() {
    window.location.href = "index.html"; 
}

function redirectToCOURSE() {
    window.location.href = "findcourse.html"; 
}