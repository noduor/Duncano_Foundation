// ============================================
// GLOBAL MOBILE NAVIGATION & FLIP CARDS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // 1. HAMBURGER MENU FUNCTIONALITY
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    const menuOverlay = document.createElement('div');
    
    // Create overlay
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        navList.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navList.contains(e.target) && !mobileMenuToggle.contains(e.target) && navList.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close menu function
    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        navList.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767) {
            closeMobileMenu();
        }
    });
    
    // 2. FLIP CARDS FUNCTIONALITY (Initiative Cards & FAQ Cards)
    const flipCards = document.querySelectorAll('.initiative-card, .faq-card');
    
    flipCards.forEach(card => {
        // For touch devices, toggle flip on tap
        if ('ontouchstart' in window) {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                this.classList.toggle('active');
            });
        } else {
            // For desktop, keep hover effect
            card.addEventListener('mouseenter', function() {
                this.classList.add('active');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('active');
            });
        }
        
        // Add keyboard support
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Click to flip card');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('active');
            }
        });
    });
    
    // 3. POLICY PAGES - RESPONSIVE TABLES
    const policyTables = document.querySelectorAll('.policy-table');
    
    if (policyTables.length > 0) {
        policyTables.forEach(table => {
            if (window.innerWidth <= 767) {
                makeTableResponsive(table);
            }
        });
        
        function makeTableResponsive(table) {
            const headers = [];
            const wrapper = document.createElement('div');
            wrapper.className = 'policy-table-wrapper';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
            
            // Get headers
            const thElements = table.querySelectorAll('thead th');
            thElements.forEach(th => {
                headers.push(th.textContent.trim());
            });
            
            // Add scroll indicator
            const scrollIndicator = document.createElement('span');
            scrollIndicator.className = 'scroll-indicator';
            scrollIndicator.textContent = '↔ Scroll to view full table';
            wrapper.appendChild(scrollIndicator);
            
            // Stack layout for small screens
            if (window.innerWidth <= 480) {
                convertToStackedLayout(table, headers);
            }
        }
        
        function convertToStackedLayout(table, headers) {
            table.classList.add('stacked');
            const tbody = table.querySelector('tbody');
            const rows = tbody.querySelectorAll('tr');
            
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                cells.forEach((cell, index) => {
                    if (headers[index]) {
                        cell.setAttribute('data-label', headers[index]);
                    }
                });
            });
            
            const thead = table.querySelector('thead');
            if (thead) thead.style.display = 'none';
        }
        
        window.addEventListener('resize', function() {
            policyTables.forEach(table => {
                const wrapper = table.closest('.policy-table-wrapper');
                if (wrapper && window.innerWidth > 480) {
                    table.classList.remove('stacked');
                    const thead = table.querySelector('thead');
                    if (thead) thead.style.display = '';
                }
            });
        });
    }
    
    // 4. DONATION PAGE FUNCTIONALITY
    const donationForm = document.querySelector('.donation-form');
    if (donationForm) {
        const amountButtons = document.querySelectorAll('.amount-btn');
        const customAmountInput = document.querySelector('.custom-amount');
        const paymentOptions = document.querySelectorAll('.payment-option');
        
        // Amount selection
        amountButtons.forEach(button => {
            button.addEventListener('click', function() {
                amountButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                if (customAmountInput && this.dataset.amount !== 'custom') {
                    customAmountInput.value = this.dataset.amount || this.textContent.replace(/[^0-9.]/g, '');
                    customAmountInput.disabled = true;
                } else if (customAmountInput && this.dataset.amount === 'custom') {
                    customAmountInput.disabled = false;
                    customAmountInput.focus();
                }
            });
        });
        
        // Custom amount handling
        if (customAmountInput) {
            customAmountInput.addEventListener('focus', function() {
                amountButtons.forEach(btn => {
                    if (btn.dataset.amount !== 'custom') {
                        btn.classList.remove('active');
                    }
                });
                const customBtn = document.querySelector('[data-amount="custom"]');
                if (customBtn) customBtn.classList.add('active');
            });
        }
        
        // Payment method selection
        paymentOptions.forEach(option => {
            option.addEventListener('click', function() {
                paymentOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
        
        // Form submission
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate
            const selectedAmount = document.querySelector('.amount-btn.active');
            const selectedPayment = document.querySelector('.payment-option.selected');
            
            if (!selectedAmount) {
                alert('Please select a donation amount');
                return;
            }
            
            if (!selectedPayment) {
                alert('Please select a payment method');
                return;
            }
            
            // Show loading
            const submitBtn = donationForm.querySelector('.btn-large');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            
            // Simulate processing
            setTimeout(() => {
                alert('Thank you for your donation!');
                donationForm.reset();
                amountButtons.forEach(btn => btn.classList.remove('active'));
                paymentOptions.forEach(opt => opt.classList.remove('selected'));
                if (customAmountInput) customAmountInput.disabled = false;
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // 5. CONTACT PAGE FUNCTIONALITY
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const programSelect = contactForm.querySelector('select[name="program"]');
        const programSection = document.getElementById('program-section');
        
        // Program selection
        if (programSelect && programSection) {
            programSelect.addEventListener('change', function() {
                if (this.value === 'other') {
                    programSection.classList.add('show');
                } else {
                    programSection.classList.remove('show');
                }
            });
        }
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                        const error = document.createElement('span');
                        error.className = 'error-message';
                        error.textContent = 'This field is required';
                        error.style.cssText = 'color: #dc3545; font-size: 0.8rem; display: block; margin-top: 0.25rem;';
                        field.parentNode.appendChild(error);
                    }
                } else {
                    field.classList.remove('error');
                    const error = field.parentNode.querySelector('.error-message');
                    if (error) error.remove();
                }
            });
            
            if (isValid) {
                // Show loading
                const submitBtn = contactForm.querySelector('.btn-large');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
                submitBtn.disabled = true;
                
                // Add spinner style
                if (!document.querySelector('#spinner-style')) {
                    const style = document.createElement('style');
                    style.id = 'spinner-style';
                    style.textContent = `
                        .loading-spinner {
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            border: 2px solid rgba(255,255,255,0.3);
                            border-radius: 50%;
                            border-top-color: white;
                            animation: spin 1s linear infinite;
                            margin-right: 8px;
                        }
                        @keyframes spin {
                            to { transform: rotate(360deg); }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                // Simulate sending
                setTimeout(() => {
                    alert('Message sent successfully! We will get back to you soon.');
                    contactForm.reset();
                    if (programSection) programSection.classList.remove('show');
                    
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
    
    // 6. ABOUT PAGE FUNCTIONALITY
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length > 0) {
        // Animate stats when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statCards.forEach(card => observer.observe(card));
        
        function animateCounter(card) {
            const numberElement = card.querySelector('.stat-number');
            if (!numberElement) return;
            
            const originalText = numberElement.textContent;
            const targetNumber = parseInt(originalText.replace(/[^0-9]/g, ''));
            if (isNaN(targetNumber)) return;
            
            let current = 0;
            const increment = targetNumber / 50;
            const duration = 2000;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetNumber) {
                    current = targetNumber;
                    clearInterval(timer);
                }
                numberElement.textContent = Math.floor(current) + originalText.replace(/[0-9]/g, '');
            }, duration / (targetNumber / increment));
        }
    }
    
    // 7. TOUCH FEEDBACK FOR MOBILE
    if ('ontouchstart' in window) {
        // Add touch feedback to buttons and cards
        const touchElements = document.querySelectorAll('.btn, .card, .initiative-card, .faq-card, .team-card, .contact-item');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.opacity = '0.8';
            }, { passive: true });
            
            element.addEventListener('touchend', function() {
                this.style.opacity = '';
            }, { passive: true });
        });
        
        // Prevent zoom on input focus (iOS)
        document.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('focus', function() {
                setTimeout(() => {
                    const y = this.getBoundingClientRect().top + window.pageYOffset - 100;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }, 100);
            });
        });
    }
    
    // 8. COPY TO CLIPBOARD FUNCTIONALITY
    const copyElements = document.querySelectorAll('.contact-text a[href^="mailto:"], .contact-text a[href^="tel:"]');
    
    copyElements.forEach(element => {
        element.style.cursor = 'pointer';
        
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const textToCopy = this.getAttribute('href').replace('mailto:', '').replace('tel:', '');
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast('Copied to clipboard!');
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showToast('Copied to clipboard!');
            }
        });
    });
    
    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary-color);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 9999;
            font-size: 0.9rem;
            animation: fadeInOut 2s ease-in-out;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 2000);
    }
});

// 9. HANDLE WINDOW RESIZE FOR ALL FUNCTIONALITY
window.addEventListener('resize', function() {
    // Update table responsiveness
    const policyTables = document.querySelectorAll('.policy-table');
    policyTables.forEach(table => {
        const wrapper = table.closest('.policy-table-wrapper');
        if (wrapper) {
            if (window.innerWidth <= 480) {
                const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
                const tbody = table.querySelector('tbody');
                const rows = tbody.querySelectorAll('tr');
                
                rows.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    cells.forEach((cell, index) => {
                        if (headers[index]) {
                            cell.setAttribute('data-label', headers[index]);
                        }
                    });
                });
                table.classList.add('stacked');
            } else {
                table.classList.remove('stacked');
                const thead = table.querySelector('thead');
                if (thead) thead.style.display = '';
            }
        }
    });
});

// FIXED MOBILE NAVIGATION SCRIPT
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const navList = document.querySelector('.nav-list');
    const body = document.body;
    
    console.log('Mobile toggle found:', mobileMenuToggle);
    console.log('Nav found:', nav);
    console.log('Nav list found:', navList);
    
    // Create overlay if it doesn't exist
    let menuOverlay = document.querySelector('.menu-overlay');
    if (!menuOverlay) {
        menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        document.body.appendChild(menuOverlay);
    }
    
    // Check if elements exist
    if (!mobileMenuToggle || !nav) {
        console.error('Mobile navigation elements not found!');
        return;
    }
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        
        console.log('Hamburger clicked!');
        
        // Toggle active classes
        this.classList.toggle('active');
        nav.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        console.log('Menu active:', nav.classList.contains('active'));
    });
    
    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', function() {
        console.log('Overlay clicked - closing menu');
        closeMobileMenu();
    });
    
    // Close menu when clicking a link
    if (navList) {
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                console.log('Nav link clicked - closing menu');
                closeMobileMenu();
            });
        });
    }
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            console.log('Escape pressed - closing menu');
            closeMobileMenu();
        }
    });
    
    // Close menu function
    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        nav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    }
    
    // Close menu when clicking outside (only on mobile)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 767 && 
            nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            console.log('Clicked outside - closing menu');
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767 && nav.classList.contains('active')) {
            console.log('Window resized to desktop - closing menu');
            closeMobileMenu();
        }
    });
    
    console.log('Mobile navigation script loaded successfully!');
});


document.addEventListener('DOMContentLoaded', function() {
    // Initialize moving underline
    initializeMovingUnderline();
    
    // Update underline on page navigation
    updateMovingUnderline();
});

function initializeMovingUnderline() {
    const navList = document.querySelector('.nav-list');
    if (!navList) return;
    
    // Create underline element if it doesn't exist
    let underline = navList.querySelector('.moving-underline');
    if (!underline) {
        underline = document.createElement('span');
        underline.className = 'moving-underline';
        navList.appendChild(underline);
    }
    
    // Set initial position
    const activeLink = navList.querySelector('a.active');
    if (activeLink && window.innerWidth > 767) {
        positionUnderline(activeLink);
    }
    
    // Add hover effect for desktop
    if (window.innerWidth > 767) {
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.color = 'red';
                    positionUnderline(this);
                }
            });
            
            link.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.color = '';
                    // Return underline to active link
                    const activeLink = navList.querySelector('a.active');
                    if (activeLink) {
                        positionUnderline(activeLink);
                    }
                }
            });
        });
    }
}

function updateMovingUnderline() {
    const navList = document.querySelector('.nav-list');
    if (!navList) return;
    
    // Get current active link
    const activeLink = navList.querySelector('a.active');
    if (activeLink && window.innerWidth > 767) {
        positionUnderline(activeLink);
    }
}

function positionUnderline(element) {
    const navList = document.querySelector('.nav-list');
    const underline = navList.querySelector('.moving-underline');
    
    if (!underline || !element || window.innerWidth <= 767) return;
    
    const linkRect = element.getBoundingClientRect();
    const navRect = navList.getBoundingClientRect();
    
    // Calculate position relative to nav list
    const left = linkRect.left - navRect.left;
    const width = linkRect.width;
    
    // Position the underline
    underline.style.cssText = `
        position: absolute;
        bottom: -5px;
        left: ${left}px;
        width: ${width}px;
        height: 3px;
        background: linear-gradient(90deg, green, #3aff33ff, green);
        border-radius: 2px;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1;
        box-shadow: 0 2px 8px rgba(16, 198, 0, 0.4);
    `;
}

// Handle window resize
window.addEventListener('resize', function() {
    const underline = document.querySelector('.moving-underline');
    if (underline) {
        if (window.innerWidth <= 767) {
            underline.style.display = 'none';
        } else {
            underline.style.display = 'block';
            updateMovingUnderline();
        }
    }
});

// Update underline when navigation changes (for single page apps)
function updateActiveLink(linkElement) {
    const navList = document.querySelector('.nav-list');
    if (!navList) return;
    
    // Remove active class from all links
    navList.querySelectorAll('a').forEach(link => {
        link.classList.remove('active');
        link.style.color = '';
    });
    
    // Add active class to clicked link
    linkElement.classList.add('active');
    
    // Update underline position
    if (window.innerWidth > 767) {
        positionUnderline(linkElement);
    }
}


