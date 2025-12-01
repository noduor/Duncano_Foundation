<<<<<<< HEAD
// Programs Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const programTabs = document.querySelectorAll('.program-tab');
    const programDetails = document.querySelectorAll('.program-details');

    // Tab switching functionality
    programTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const programId = this.getAttribute('data-program');
            
            // Remove active class from all tabs and details
            programTabs.forEach(t => t.classList.remove('active'));
            programDetails.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding details
            this.classList.add('active');
            document.getElementById(programId).classList.add('active');
            
            // Scroll to top of program content
window.scrollTo({
    top: 0,
    behavior: 'smooth'
});
        });
    });

    // Check if there's a hash in URL and activate corresponding tab
    if (window.location.hash) {
        const programId = window.location.hash.substring(1).toUpperCase();
        const targetTab = document.querySelector(`[data-program="${programId}"]`);
        if (targetTab) {
            targetTab.click();
        }
    }
});
=======
// Programs Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const programTabs = document.querySelectorAll('.program-tab');
    const programDetails = document.querySelectorAll('.program-details');

    // Tab switching functionality
    programTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const programId = this.getAttribute('data-program');
            
            // Remove active class from all tabs and details
            programTabs.forEach(t => t.classList.remove('active'));
            programDetails.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding details
            this.classList.add('active');
            document.getElementById(programId).classList.add('active');
            
            // Scroll to top of program content
window.scrollTo({
    top: 0,
    behavior: 'smooth'
});
        });
    });

    // Check if there's a hash in URL and activate corresponding tab
    if (window.location.hash) {
        const programId = window.location.hash.substring(1).toUpperCase();
        const targetTab = document.querySelector(`[data-program="${programId}"]`);
        if (targetTab) {
            targetTab.click();
        }
    }
});
>>>>>>> 05778128609823daee46d7603ea59f62080a8058
