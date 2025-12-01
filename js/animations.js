// Enhanced animations for Duncano Foundation website

function initEnhancedAnimations() {
    // Add fade-in class to initiative cards for staggered animation
    const initiativeCards = document.querySelectorAll('.initiative-card');
    initiativeCards.forEach((card, index) => {
        card.classList.add('fade-in');
        
        // Add touch support for mobile devices
        card.addEventListener('touch', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('touchend', function() {
            this.classList.remove('hover');
        });
    });
    
    // Initialize intersection observer for fade-in animations
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        fadeObserver.observe(el);
    });
    
    // Add click functionality for flip cards on mobile
    if (window.innerWidth <= 768) {
        initiativeCards.forEach(card => {
            card.addEventListener('click', function() {
                this.classList.toggle('flipped');
            });
        });
    }
}

// Call the enhanced animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initEnhancedAnimations();
});