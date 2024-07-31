document.addEventListener('DOMContentLoaded', function() {
    var typingCourses = document.getElementById('typingCourses');

    typingCourses.addEventListener('mouseenter', () => {
        typingCourses.style.caretColor = 'transparent';
    })

    typingCourses.addEventListener('click', () => {
        typingCourses.style.caretColor = 'auto';
        document.getElementById('typingCourses').placeholder = '';
    })

    typingCourses.addEventListener('mouseout', () => {
       typingCourses.style.caretColor = 'transparent';
       document.getElementById('typingCourses').placeholder = 'Search for courses...';
    })

});

document.addEventListener('DOMContentLoaded', function() {
    var typingRating = document.getElementById('typingRating');

    typingRating.addEventListener('mouseenter', () => {
        typingRating.style.caretColor = 'transparent';
    })

    typingRating.addEventListener('click', () => {
        typingRating.style.caretColor = 'auto';
        document.getElementById('typingRating').placeholder = '';
    })

    typingRating.addEventListener('mouseout', () => {
       typingRating.style.caretColor = 'transparent';
       document.getElementById('typingRating').placeholder = 'Rate a course';
    })

});

async function searchForCourse() {
    
}

function redirectToSCHOOL() {
    window.location.href = "index.html"; 
}

function redirectToCOURSE() {
    window.location.href = "findcourse.html"; 
}

function redirectToYOU() {
    window.location.href = "you.html"; 
}


