<<<<<<< HEAD
// Enhanced Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const categorySelect = document.getElementById('category');
    const programSection = document.getElementById('program-section');
    const allSelects = document.querySelectorAll('select');
    const allInputs = document.querySelectorAll('input, textarea');

    // Enhanced category selection with animation
    categorySelect.addEventListener('change', function() {
        // Add animation to select
        this.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);

        // Show/hide program section with animation
        if (this.value === 'program' || this.value === 'partnership') {
            programSection.classList.add('show');
            setTimeout(() => {
                programSection.style.display = 'block';
            }, 50);
        } else {
            programSection.classList.remove('show');
            setTimeout(() => {
                programSection.style.display = 'none';
            }, 500);
        }
    });

    // Enhanced select hover effects
    allSelects.forEach(select => {
        select.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });

        select.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });

        select.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });

    // Enhanced input animations
    allInputs.forEach(input => {
        // Add floating label effect
        if (input.type !== 'checkbox' && input.type !== 'radio') {
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (label) {
                input.addEventListener('focus', function() {
                    label.style.color = 'var(--primary-color)';
                    label.style.transform = 'translateY(-2px)';
                });

                input.addEventListener('blur', function() {
                    if (!this.value) {
                        label.style.color = '';
                        label.style.transform = '';
                    }
                });
            }
        }

        // Add input validation effects
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.style.borderColor = '#28a745';
                this.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
            } else {
                this.style.borderColor = '#dc3545';
                this.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
            }
        });

        // Hover effects
        input.addEventListener('mouseenter', function() {
            if (!this.matches(':focus')) {
                this.style.transform = 'translateY(-1px)';
            }
        });

        input.addEventListener('mouseleave', function() {
            if (!this.matches(':focus')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Enhanced form submission with animations
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading animation to all fields
        const formElements = this.elements;
        Array.from(formElements).forEach(element => {
            if (element.type !== 'submit') {
                element.style.transition = 'all 0.3s ease';
                element.style.opacity = '0.7';
            }
        });

        // Basic validation with visual feedback
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                
                // Shake animation for invalid fields
                field.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    field.style.animation = '';
                }, 500);
            } else {
                field.classList.remove('error');
                field.style.borderColor = '#28a745';
                field.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
            }
        });

        if (isValid) {
            // Enhanced loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.8';

            // Success animation for all fields
            Array.from(formElements).forEach((element, index) => {
                if (element.type !== 'submit') {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(-5px)';
                        element.style.boxShadow = '0 5px 15px rgba(40, 167, 69, 0.3)';
                        
                        setTimeout(() => {
                            element.style.transform = 'translateY(0)';
                            element.style.boxShadow = '';
                        }, 300);
                    }, index * 100);
                }
            });

            // Simulate API call
            setTimeout(() => {
                // Success message with animation
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for your message! We will get back to you within 24 hours.</p>
                `;
                successMessage.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0.8);
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    text-align: center;
                    z-index: 1000;
                    opacity: 0;
                    transition: all 0.5s ease;
                `;
                
                document.body.appendChild(successMessage);
                
                // Animate success message in
                setTimeout(() => {
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'translate(-50%, -50%) scale(1)';
                }, 100);

                // Reset form and remove success message
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    successMessage.style.transform = 'translate(-50%, -50%) scale(0.8)';
                    
                    setTimeout(() => {
                        document.body.removeChild(successMessage);
                        contactForm.reset();
                        programSection.style.display = 'none';
                        programSection.classList.remove('show');
                        
                        submitBtn.innerHTML = originalHTML;
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = '1';

                        // Reset all fields
                        Array.from(formElements).forEach(element => {
                            element.style.opacity = '1';
                            element.style.borderColor = '';
                            element.style.boxShadow = '';
                        });
                    }, 500);
                }, 3000);
            }, 2000);
        } else {
            // Reset loading state if validation fails
            Array.from(formElements).forEach(element => {
                element.style.opacity = '1';
            });
            
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.disabled = false;
        }
    });

    // Add shake animation for errors
    const style = document.createElement('style');
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
    `;s
    document.head.appendChild(style);

    // Enhanced contact items animation
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
=======
// Enhanced Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const categorySelect = document.getElementById('category');
    const programSection = document.getElementById('program-section');
    const allSelects = document.querySelectorAll('select');
    const allInputs = document.querySelectorAll('input, textarea');

    // Enhanced category selection with animation
    categorySelect.addEventListener('change', function() {
        // Add animation to select
        this.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);

        // Show/hide program section with animation
        if (this.value === 'program' || this.value === 'partnership') {
            programSection.classList.add('show');
            setTimeout(() => {
                programSection.style.display = 'block';
            }, 50);
        } else {
            programSection.classList.remove('show');
            setTimeout(() => {
                programSection.style.display = 'none';
            }, 500);
        }
    });

    // Enhanced select hover effects
    allSelects.forEach(select => {
        select.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });

        select.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });

        select.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });

    // Enhanced input animations
    allInputs.forEach(input => {
        // Add floating label effect
        if (input.type !== 'checkbox' && input.type !== 'radio') {
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (label) {
                input.addEventListener('focus', function() {
                    label.style.color = 'var(--primary-color)';
                    label.style.transform = 'translateY(-2px)';
                });

                input.addEventListener('blur', function() {
                    if (!this.value) {
                        label.style.color = '';
                        label.style.transform = '';
                    }
                });
            }
        }

        // Add input validation effects
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.style.borderColor = '#28a745';
                this.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
            } else {
                this.style.borderColor = '#dc3545';
                this.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
            }
        });

        // Hover effects
        input.addEventListener('mouseenter', function() {
            if (!this.matches(':focus')) {
                this.style.transform = 'translateY(-1px)';
            }
        });

        input.addEventListener('mouseleave', function() {
            if (!this.matches(':focus')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Enhanced form submission with animations
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading animation to all fields
        const formElements = this.elements;
        Array.from(formElements).forEach(element => {
            if (element.type !== 'submit') {
                element.style.transition = 'all 0.3s ease';
                element.style.opacity = '0.7';
            }
        });

        // Basic validation with visual feedback
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                
                // Shake animation for invalid fields
                field.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    field.style.animation = '';
                }, 500);
            } else {
                field.classList.remove('error');
                field.style.borderColor = '#28a745';
                field.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
            }
        });

        if (isValid) {
            // Enhanced loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.8';

            // Success animation for all fields
            Array.from(formElements).forEach((element, index) => {
                if (element.type !== 'submit') {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(-5px)';
                        element.style.boxShadow = '0 5px 15px rgba(40, 167, 69, 0.3)';
                        
                        setTimeout(() => {
                            element.style.transform = 'translateY(0)';
                            element.style.boxShadow = '';
                        }, 300);
                    }, index * 100);
                }
            });

            // Simulate API call
            setTimeout(() => {
                // Success message with animation
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for your message! We will get back to you within 24 hours.</p>
                `;
                successMessage.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0.8);
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    text-align: center;
                    z-index: 1000;
                    opacity: 0;
                    transition: all 0.5s ease;
                `;
                
                document.body.appendChild(successMessage);
                
                // Animate success message in
                setTimeout(() => {
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'translate(-50%, -50%) scale(1)';
                }, 100);

                // Reset form and remove success message
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    successMessage.style.transform = 'translate(-50%, -50%) scale(0.8)';
                    
                    setTimeout(() => {
                        document.body.removeChild(successMessage);
                        contactForm.reset();
                        programSection.style.display = 'none';
                        programSection.classList.remove('show');
                        
                        submitBtn.innerHTML = originalHTML;
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = '1';

                        // Reset all fields
                        Array.from(formElements).forEach(element => {
                            element.style.opacity = '1';
                            element.style.borderColor = '';
                            element.style.boxShadow = '';
                        });
                    }, 500);
                }, 3000);
            }, 2000);
        } else {
            // Reset loading state if validation fails
            Array.from(formElements).forEach(element => {
                element.style.opacity = '1';
            });
            
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.disabled = false;
        }
    });

    // Add shake animation for errors
    const style = document.createElement('style');
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
    `;s
    document.head.appendChild(style);

    // Enhanced contact items animation
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
>>>>>>> 05778128609823daee46d7603ea59f62080a8058
});