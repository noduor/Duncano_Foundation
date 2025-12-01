<<<<<<< HEAD
// Contact Page JavaScript - Fixed Dropdown Issues
class ContactForm {
    constructor() {
        this.contactForm = document.querySelector('.contact-form');
        this.programSection = document.getElementById('program-section');
        this.contactItems = document.querySelectorAll('.contact-item');
        this.allInputs = document.querySelectorAll('input, textarea');
        
        this.init();
    }

    init() {
        this.initCustomDropdown();
        this.initFormValidation();
        this.initContactAnimations();
        this.initInputAnimations();
        this.addShakeAnimationStyle();
    }

    // Custom Dropdown Functionality
    initCustomDropdown() {
        const customSelect = document.querySelector('.custom-select');
        if (!customSelect) return;

        const selectSelected = document.getElementById('category-selected');
        const selectOptions = document.getElementById('category-options');
        const hiddenInput = document.getElementById('category');
        const options = selectOptions.querySelectorAll('.select-option');

        // Ensure dropdown has highest z-index when opening
        const ensureDropdownOnTop = () => {
            selectOptions.style.zIndex = '9999';
            customSelect.style.zIndex = '1000';
        };

        // Toggle dropdown
        selectSelected.addEventListener('click', (e) => {
            e.stopPropagation();
            ensureDropdownOnTop();
            this.toggleDropdown(selectSelected, selectOptions);
        });

        // Handle option selection
        options.forEach(option => {
            option.addEventListener('click', () => {
                this.handleOptionSelection(option, selectSelected, selectOptions, hiddenInput, customSelect);
            });

            // Hover effects
            option.addEventListener('mouseenter', () => {
                option.style.transform = 'translateX(5px)';
            });
            
            option.addEventListener('mouseleave', () => {
                if (!option.classList.contains('selected')) {
                    option.style.transform = 'translateX(0)';
                }
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!customSelect.contains(e.target)) {
                selectOptions.classList.remove('show');
                selectSelected.classList.remove('active');
            }
        });

        // Close dropdown on scroll
        window.addEventListener('scroll', () => {
            if (selectOptions.classList.contains('show')) {
                selectOptions.classList.remove('show');
                selectSelected.classList.remove('active');
            }
        });

        // Prevent form container from creating stacking context that traps dropdown
        const formContainer = document.querySelector('.form-container');
        if (formContainer) {
            formContainer.style.zIndex = 'auto';
        }

        // Keyboard navigation
        this.initKeyboardNavigation(selectSelected, selectOptions, options);
    }

    initKeyboardNavigation(selectSelected, selectOptions, options) {
        selectSelected.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                if (!selectOptions.classList.contains('show')) {
                    selectOptions.classList.add('show');
                    selectSelected.classList.add('active');
                }
            }
        });

        selectOptions.addEventListener('keydown', (e) => {
            const currentSelected = selectOptions.querySelector('.select-option.selected');
            const optionsArray = Array.from(options);
            let currentIndex = currentSelected ? optionsArray.indexOf(currentSelected) : -1;

            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    currentIndex = (currentIndex + 1) % optionsArray.length;
                    optionsArray[currentIndex].click();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    currentIndex = (currentIndex - 1 + optionsArray.length) % optionsArray.length;
                    optionsArray[currentIndex].click();
                    break;
                case 'Escape':
                    selectOptions.classList.remove('show');
                    selectSelected.classList.remove('active');
                    selectSelected.focus();
                    break;
                case 'Enter':
                    if (currentSelected) {
                        currentSelected.click();
                    }
                    break;
            }
        });
    }

    toggleDropdown(selectSelected, selectOptions) {
        const isActive = selectOptions.classList.contains('show');
        
        // Close all other dropdowns
        document.querySelectorAll('.select-options.show').forEach(dropdown => {
            if (dropdown !== selectOptions) {
                dropdown.classList.remove('show');
                const prevElement = dropdown.previousElementSibling;
                if (prevElement && prevElement.classList.contains('select-selected')) {
                    prevElement.classList.remove('active');
                }
            }
        });
        
        // Toggle current dropdown
        selectOptions.classList.toggle('show');
        selectSelected.classList.toggle('active');
        
        // Ensure dropdown stays on top
        if (selectOptions.classList.contains('show')) {
            selectOptions.style.zIndex = '9999';
        }
        
        // Add animation
        if (!isActive) {
            selectSelected.style.transform = 'translateY(-2px) scale(1.02)';
            setTimeout(() => {
                selectSelected.style.transform = 'translateY(-2px) scale(1)';
            }, 200);
        }
    }

    handleOptionSelection(option, selectSelected, selectOptions, hiddenInput, customSelect) {
        const value = option.getAttribute('data-value');
        const text = option.querySelector('span').textContent;
        
        // Update UI
        selectSelected.innerHTML = `<span>${text}</span><i class="fas fa-chevron-down"></i>`;
        hiddenInput.value = value;
        
        // Update selection state
        selectOptions.querySelectorAll('.select-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        option.classList.add('selected');
        
        // Close dropdown
        selectOptions.classList.remove('show');
        selectSelected.classList.remove('active');
        
        // Show success state
        this.showSuccessState(customSelect, selectSelected);
        
        // Handle program section visibility
        this.toggleProgramSection(value);
    }

    showSuccessState(customSelect, selectSelected) {
        customSelect.classList.remove('error');
        customSelect.classList.add('success');
        selectSelected.style.borderColor = '#28a745';
        selectSelected.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
        
        setTimeout(() => {
            selectSelected.style.borderColor = '';
            selectSelected.style.boxShadow = '';
            customSelect.classList.remove('success');
        }, 2000);
    }

    toggleProgramSection(categoryValue) {
        if (!this.programSection) return;

        if (categoryValue === 'program' || categoryValue === 'partnership') {
            this.programSection.style.display = 'block';
            setTimeout(() => {
                this.programSection.classList.add('show');
            }, 10);
        } else {
            this.programSection.classList.remove('show');
            setTimeout(() => {
                this.programSection.style.display = 'none';
            }, 300);
        }
    }

    // Form Validation
    initFormValidation() {
        if (!this.contactForm) return;

        this.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });
    }

    handleFormSubmission() {
        const isValid = this.validateForm();
        
        if (isValid) {
            this.submitForm();
        } else {
            this.showValidationErrors();
        }
    }

    validateForm() {
        let isValid = true;
        
        // Validate required fields
        const requiredFields = this.contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                this.animateFieldError(field);
            } else {
                field.classList.remove('error');
            }
        });

        // Validate custom dropdown
        const categoryInput = document.getElementById('category');
        const customSelect = document.querySelector('.custom-select');
        const selectSelected = document.getElementById('category-selected');
        
        if (categoryInput && !categoryInput.value) {
            isValid = false;
            if (customSelect) customSelect.classList.add('error');
            if (selectSelected) this.animateFieldError(selectSelected);
        } else {
            if (customSelect) customSelect.classList.remove('error');
        }

        return isValid;
    }

    animateFieldError(field) {
        field.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            field.style.animation = '';
        }, 500);
    }

    submitForm() {
        const submitBtn = this.contactForm.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        
        // Show loading state
        this.showLoadingState(submitBtn);
        
        // Disable all form elements
        this.disableFormElements(true);
        
        // Simulate API call
        setTimeout(() => {
            this.showSuccessMessage();
            this.resetForm();
            this.disableFormElements(false);
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }, 2000);
    }

    showLoadingState(submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';
        submitBtn.disabled = true;
        
        // Add loading animation to form elements
        this.allInputs.forEach(input => {
            input.style.opacity = '0.7';
            input.style.transition = 'all 0.3s ease';
        });
    }

    disableFormElements(disabled) {
        const formElements = this.contactForm.elements;
        Array.from(formElements).forEach(element => {
            if (element.type !== 'submit') {
                element.disabled = disabled;
            }
        });
    }

    showSuccessMessage() {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for your message! We will get back to you within 24 hours.</p>
        `;
        
        // Style success message
        Object.assign(successMessage.style, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(0.8)',
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            textAlign: 'center',
            zIndex: '10000',
            opacity: '0',
            transition: 'all 0.5s ease'
        });
        
        document.body.appendChild(successMessage);
        
        // Animate in
        setTimeout(() => {
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(() => {
                if (document.body.contains(successMessage)) {
                    document.body.removeChild(successMessage);
                }
            }, 500);
        }, 3000);
    }

    resetForm() {
        this.contactForm.reset();
        
        // Reset custom dropdown
        const selectSelected = document.getElementById('category-selected');
        const options = document.querySelectorAll('.select-option');
        const hiddenInput = document.getElementById('category');
        
        if (selectSelected) {
            selectSelected.innerHTML = '<span>Select category</span><i class="fas fa-chevron-down"></i>';
        }
        
        if (options) {
            options.forEach(opt => opt.classList.remove('selected'));
        }
        
        if (hiddenInput) {
            hiddenInput.value = '';
        }
        
        // Hide program section
        if (this.programSection) {
            this.programSection.style.display = 'none';
            this.programSection.classList.remove('show');
        }
        
        // Reset input styles
        this.allInputs.forEach(input => {
            input.style.opacity = '1';
            input.style.borderColor = '';
            input.style.boxShadow = '';
        });
    }

    showValidationErrors() {
        // Reset loading state if validation fails
        this.allInputs.forEach(input => {
            input.style.opacity = '1';
        });
        
        const submitBtn = this.contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }

    // Animations
    initContactAnimations() {
        this.contactItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    initInputAnimations() {
        this.allInputs.forEach(input => {
            // Focus effects
            input.addEventListener('focus', () => {
                input.style.borderColor = 'var(--primary-color)';
                input.style.boxShadow = '0 0 0 3px rgba(10, 33, 71, 0.1)';
                input.style.transform = 'translateY(-2px)';
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.style.borderColor = '';
                    input.style.boxShadow = '';
                    input.style.transform = 'translateY(0)';
                }
            });

            // Hover effects
            input.addEventListener('mouseenter', () => {
                if (!input.matches(':focus')) {
                    input.style.transform = 'translateY(-1px)';
                    input.style.boxShadow = '0 4px 15px rgba(10, 33, 71, 0.1)';
                }
            });

            input.addEventListener('mouseleave', () => {
                if (!input.matches(':focus')) {
                    input.style.transform = 'translateY(0)';
                    input.style.boxShadow = '';
                }
            });
        });
    }

    addShakeAnimationStyle() {
        // Add shake animation style if not already present
        if (!document.querySelector('#shake-animation-style')) {
            const style = document.createElement('style');
            style.id = 'shake-animation-style';
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                
                .success-message i {
                    font-size: 3rem;
                    color: #28a745;
                    margin-bottom: 1rem;
                }
                
                .success-message h3 {
                    color: var(--primary-color);
                    margin-bottom: 0.5rem;
                }
                
                .success-message p {
                    color: var(--text-color);
                    margin: 0;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
=======
// Contact Page JavaScript - Fixed Dropdown Issues
class ContactForm {
    constructor() {
        this.contactForm = document.querySelector('.contact-form');
        this.programSection = document.getElementById('program-section');
        this.contactItems = document.querySelectorAll('.contact-item');
        this.allInputs = document.querySelectorAll('input, textarea');
        
        this.init();
    }

    init() {
        this.initCustomDropdown();
        this.initFormValidation();
        this.initContactAnimations();
        this.initInputAnimations();
        this.addShakeAnimationStyle();
    }

    // Custom Dropdown Functionality
    initCustomDropdown() {
        const customSelect = document.querySelector('.custom-select');
        if (!customSelect) return;

        const selectSelected = document.getElementById('category-selected');
        const selectOptions = document.getElementById('category-options');
        const hiddenInput = document.getElementById('category');
        const options = selectOptions.querySelectorAll('.select-option');

        // Ensure dropdown has highest z-index when opening
        const ensureDropdownOnTop = () => {
            selectOptions.style.zIndex = '9999';
            customSelect.style.zIndex = '1000';
        };

        // Toggle dropdown
        selectSelected.addEventListener('click', (e) => {
            e.stopPropagation();
            ensureDropdownOnTop();
            this.toggleDropdown(selectSelected, selectOptions);
        });

        // Handle option selection
        options.forEach(option => {
            option.addEventListener('click', () => {
                this.handleOptionSelection(option, selectSelected, selectOptions, hiddenInput, customSelect);
            });

            // Hover effects
            option.addEventListener('mouseenter', () => {
                option.style.transform = 'translateX(5px)';
            });
            
            option.addEventListener('mouseleave', () => {
                if (!option.classList.contains('selected')) {
                    option.style.transform = 'translateX(0)';
                }
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!customSelect.contains(e.target)) {
                selectOptions.classList.remove('show');
                selectSelected.classList.remove('active');
            }
        });

        // Close dropdown on scroll
        window.addEventListener('scroll', () => {
            if (selectOptions.classList.contains('show')) {
                selectOptions.classList.remove('show');
                selectSelected.classList.remove('active');
            }
        });

        // Prevent form container from creating stacking context that traps dropdown
        const formContainer = document.querySelector('.form-container');
        if (formContainer) {
            formContainer.style.zIndex = 'auto';
        }

        // Keyboard navigation
        this.initKeyboardNavigation(selectSelected, selectOptions, options);
    }

    initKeyboardNavigation(selectSelected, selectOptions, options) {
        selectSelected.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                if (!selectOptions.classList.contains('show')) {
                    selectOptions.classList.add('show');
                    selectSelected.classList.add('active');
                }
            }
        });

        selectOptions.addEventListener('keydown', (e) => {
            const currentSelected = selectOptions.querySelector('.select-option.selected');
            const optionsArray = Array.from(options);
            let currentIndex = currentSelected ? optionsArray.indexOf(currentSelected) : -1;

            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    currentIndex = (currentIndex + 1) % optionsArray.length;
                    optionsArray[currentIndex].click();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    currentIndex = (currentIndex - 1 + optionsArray.length) % optionsArray.length;
                    optionsArray[currentIndex].click();
                    break;
                case 'Escape':
                    selectOptions.classList.remove('show');
                    selectSelected.classList.remove('active');
                    selectSelected.focus();
                    break;
                case 'Enter':
                    if (currentSelected) {
                        currentSelected.click();
                    }
                    break;
            }
        });
    }

    toggleDropdown(selectSelected, selectOptions) {
        const isActive = selectOptions.classList.contains('show');
        
        // Close all other dropdowns
        document.querySelectorAll('.select-options.show').forEach(dropdown => {
            if (dropdown !== selectOptions) {
                dropdown.classList.remove('show');
                const prevElement = dropdown.previousElementSibling;
                if (prevElement && prevElement.classList.contains('select-selected')) {
                    prevElement.classList.remove('active');
                }
            }
        });
        
        // Toggle current dropdown
        selectOptions.classList.toggle('show');
        selectSelected.classList.toggle('active');
        
        // Ensure dropdown stays on top
        if (selectOptions.classList.contains('show')) {
            selectOptions.style.zIndex = '9999';
        }
        
        // Add animation
        if (!isActive) {
            selectSelected.style.transform = 'translateY(-2px) scale(1.02)';
            setTimeout(() => {
                selectSelected.style.transform = 'translateY(-2px) scale(1)';
            }, 200);
        }
    }

    handleOptionSelection(option, selectSelected, selectOptions, hiddenInput, customSelect) {
        const value = option.getAttribute('data-value');
        const text = option.querySelector('span').textContent;
        
        // Update UI
        selectSelected.innerHTML = `<span>${text}</span><i class="fas fa-chevron-down"></i>`;
        hiddenInput.value = value;
        
        // Update selection state
        selectOptions.querySelectorAll('.select-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        option.classList.add('selected');
        
        // Close dropdown
        selectOptions.classList.remove('show');
        selectSelected.classList.remove('active');
        
        // Show success state
        this.showSuccessState(customSelect, selectSelected);
        
        // Handle program section visibility
        this.toggleProgramSection(value);
    }

    showSuccessState(customSelect, selectSelected) {
        customSelect.classList.remove('error');
        customSelect.classList.add('success');
        selectSelected.style.borderColor = '#28a745';
        selectSelected.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
        
        setTimeout(() => {
            selectSelected.style.borderColor = '';
            selectSelected.style.boxShadow = '';
            customSelect.classList.remove('success');
        }, 2000);
    }

    toggleProgramSection(categoryValue) {
        if (!this.programSection) return;

        if (categoryValue === 'program' || categoryValue === 'partnership') {
            this.programSection.style.display = 'block';
            setTimeout(() => {
                this.programSection.classList.add('show');
            }, 10);
        } else {
            this.programSection.classList.remove('show');
            setTimeout(() => {
                this.programSection.style.display = 'none';
            }, 300);
        }
    }

    // Form Validation
    initFormValidation() {
        if (!this.contactForm) return;

        this.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });
    }

    handleFormSubmission() {
        const isValid = this.validateForm();
        
        if (isValid) {
            this.submitForm();
        } else {
            this.showValidationErrors();
        }
    }

    validateForm() {
        let isValid = true;
        
        // Validate required fields
        const requiredFields = this.contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                this.animateFieldError(field);
            } else {
                field.classList.remove('error');
            }
        });

        // Validate custom dropdown
        const categoryInput = document.getElementById('category');
        const customSelect = document.querySelector('.custom-select');
        const selectSelected = document.getElementById('category-selected');
        
        if (categoryInput && !categoryInput.value) {
            isValid = false;
            if (customSelect) customSelect.classList.add('error');
            if (selectSelected) this.animateFieldError(selectSelected);
        } else {
            if (customSelect) customSelect.classList.remove('error');
        }

        return isValid;
    }

    animateFieldError(field) {
        field.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            field.style.animation = '';
        }, 500);
    }

    submitForm() {
        const submitBtn = this.contactForm.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        
        // Show loading state
        this.showLoadingState(submitBtn);
        
        // Disable all form elements
        this.disableFormElements(true);
        
        // Simulate API call
        setTimeout(() => {
            this.showSuccessMessage();
            this.resetForm();
            this.disableFormElements(false);
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }, 2000);
    }

    showLoadingState(submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';
        submitBtn.disabled = true;
        
        // Add loading animation to form elements
        this.allInputs.forEach(input => {
            input.style.opacity = '0.7';
            input.style.transition = 'all 0.3s ease';
        });
    }

    disableFormElements(disabled) {
        const formElements = this.contactForm.elements;
        Array.from(formElements).forEach(element => {
            if (element.type !== 'submit') {
                element.disabled = disabled;
            }
        });
    }

    showSuccessMessage() {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for your message! We will get back to you within 24 hours.</p>
        `;
        
        // Style success message
        Object.assign(successMessage.style, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(0.8)',
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            textAlign: 'center',
            zIndex: '10000',
            opacity: '0',
            transition: 'all 0.5s ease'
        });
        
        document.body.appendChild(successMessage);
        
        // Animate in
        setTimeout(() => {
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(() => {
                if (document.body.contains(successMessage)) {
                    document.body.removeChild(successMessage);
                }
            }, 500);
        }, 3000);
    }

    resetForm() {
        this.contactForm.reset();
        
        // Reset custom dropdown
        const selectSelected = document.getElementById('category-selected');
        const options = document.querySelectorAll('.select-option');
        const hiddenInput = document.getElementById('category');
        
        if (selectSelected) {
            selectSelected.innerHTML = '<span>Select category</span><i class="fas fa-chevron-down"></i>';
        }
        
        if (options) {
            options.forEach(opt => opt.classList.remove('selected'));
        }
        
        if (hiddenInput) {
            hiddenInput.value = '';
        }
        
        // Hide program section
        if (this.programSection) {
            this.programSection.style.display = 'none';
            this.programSection.classList.remove('show');
        }
        
        // Reset input styles
        this.allInputs.forEach(input => {
            input.style.opacity = '1';
            input.style.borderColor = '';
            input.style.boxShadow = '';
        });
    }

    showValidationErrors() {
        // Reset loading state if validation fails
        this.allInputs.forEach(input => {
            input.style.opacity = '1';
        });
        
        const submitBtn = this.contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }

    // Animations
    initContactAnimations() {
        this.contactItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    initInputAnimations() {
        this.allInputs.forEach(input => {
            // Focus effects
            input.addEventListener('focus', () => {
                input.style.borderColor = 'var(--primary-color)';
                input.style.boxShadow = '0 0 0 3px rgba(10, 33, 71, 0.1)';
                input.style.transform = 'translateY(-2px)';
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.style.borderColor = '';
                    input.style.boxShadow = '';
                    input.style.transform = 'translateY(0)';
                }
            });

            // Hover effects
            input.addEventListener('mouseenter', () => {
                if (!input.matches(':focus')) {
                    input.style.transform = 'translateY(-1px)';
                    input.style.boxShadow = '0 4px 15px rgba(10, 33, 71, 0.1)';
                }
            });

            input.addEventListener('mouseleave', () => {
                if (!input.matches(':focus')) {
                    input.style.transform = 'translateY(0)';
                    input.style.boxShadow = '';
                }
            });
        });
    }

    addShakeAnimationStyle() {
        // Add shake animation style if not already present
        if (!document.querySelector('#shake-animation-style')) {
            const style = document.createElement('style');
            style.id = 'shake-animation-style';
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                
                .success-message i {
                    font-size: 3rem;
                    color: #28a745;
                    margin-bottom: 1rem;
                }
                
                .success-message h3 {
                    color: var(--primary-color);
                    margin-bottom: 0.5rem;
                }
                
                .success-message p {
                    color: var(--text-color);
                    margin: 0;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
>>>>>>> 05778128609823daee46d7603ea59f62080a8058
});