// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initScrollEffects();
    initBackToTop();
    initServiceModals();
    initFormValidation();
    initScrollProgress();
    initFormTabs();
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container') && navMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Scroll Animations
function initScrollEffects() {
    const fadeElements = document.querySelectorAll('.service-card, .value-card, .team-member, .benefit-card, .mission-statement');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'flex';
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.style.display = 'none';
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Service Modals
function initServiceModals() {
    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.querySelector('.close-modal');

    if (!modal) return;

    const serviceData = {
        'home-automation': {
            title: 'Home Automation',
            content: `
                <div class="service-details">
                    <h3>Smart Home Solutions</h3>
                    <p>Transform your home into a smart, efficient, and secure living space with our cutting-edge automation systems.</p>
                    
                    <div class="service-features">
                        <h4>What We Offer:</h4>
                        <ul>
                            <li>Smart lighting control systems</li>
                            <li>Automated security and surveillance</li>
                            <li>Climate control and energy management</li>
                            <li>Voice-controlled home automation</li>
                            <li>Remote access and monitoring</li>
                        </ul>
                    </div>
                    
                    <p><strong>Starting from: GHS 2,500</strong></p>
                    <button class="cta-button" onclick="closeModalAndScrollToContact()">Get a Quote</button>
                </div>
            `
        },
        'solar': {
            title: 'Solar Power Systems',
            content: `
                <div class="service-details">
                    <h3>Renewable Energy Solutions</h3>
                    <p>Harness the power of the sun with our custom-designed solar energy systems for homes and businesses.</p>
                    
                    <div class="service-features">
                        <h4>Our Services:</h4>
                        <ul>
                            <li>Custom solar system design and installation</li>
                            <li>Grid-tied and off-grid solutions</li>
                            <li>Solar water heating systems</li>
                            <li>Battery storage solutions</li>
                            <li>Maintenance and support services</li>
                        </ul>
                    </div>
                    
                    <p><strong>Starting from: GHS 8,000</strong></p>
                    <button class="cta-button" onclick="closeModalAndScrollToContact()">Get a Quote</button>
                </div>
            `
        },
        'electrical': {
            title: 'Domestic Electrical Services',
            content: `
                <div class="service-details">
                    <h3>Professional Electrical Services</h3>
                    <p>Complete electrical solutions for your home or office by certified electricians.</p>
                    
                    <div class="service-features">
                        <h4>Our Services:</h4>
                        <ul>
                            <li>Electrical wiring and installations</li>
                            <li>Circuit breaker and fuse box upgrades</li>
                            <li>Lighting installation and repair</li>
                            <li>Electrical safety inspections</li>
                            <li>Emergency electrical repairs</li>
                        </ul>
                    </div>
                    
                    <p><strong>Starting from: GHS 500</strong></p>
                    <button class="cta-button" onclick="closeModalAndScrollToContact()">Get a Quote</button>
                </div>
            `
        },
        'cyber-security': {
            title: 'Cyber Security',
            content: `
                <div class="service-details">
                    <h3>Digital Protection Solutions</h3>
                    <p>Comprehensive cybersecurity solutions to protect your digital assets and privacy.</p>
                    
                    <div class="service-features">
                        <h4>Our Services:</h4>
                        <ul>
                            <li>Network security assessment</li>
                            <li>Firewall installation and configuration</li>
                            <li>Data encryption services</li>
                            <li>Security awareness training</li>
                            <li>24/7 security monitoring</li>
                        </ul>
                    </div>
                    
                    <p><strong>Starting from: GHS 1,200</strong></p>
                    <button class="cta-button" onclick="closeModalAndScrollToContact()">Get a Quote</button>
                </div>
            `
        },
        'device-repair': {
            title: 'Device Repair',
            content: `
                <div class="service-details">
                    <h3>Expert Device Repair Services</h3>
                    <p>Fast and reliable repair services for all your electronic devices.</p>
                    
                    <div class="service-features">
                        <h4>We Repair:</h4>
                        <ul>
                            <li>Smartphones and tablets</li>
                            <li>Laptops and computers</li>
                            <li>Smart home devices</li>
                            <li>Gaming consoles</li>
                            <li>Other electronic devices</li>
                        </ul>
                    </div>
                    
                    <p><strong>Starting from: GHS 150</strong></p>
                    <button class="cta-button" onclick="closeModalAndScrollToContact()">Get a Quote</button>
                </div>
            `
        },
        'university': {
            title: 'University Solutions',
            content: `
                <div class="service-details">
                    <h3>Education Technology Solutions</h3>
                    <p>Advanced technological solutions designed specifically for educational institutions.</p>
                    
                    <div class="service-features">
                        <h4>Our Solutions:</h4>
                        <ul>
                            <li>Secure online voting systems</li>
                            <li>Robust testing and examination portals</li>
                            <li>Student management systems</li>
                            <li>E-learning platform development</li>
                            <li>Campus network infrastructure</li>
                        </ul>
                    </div>
                    
                    <p><strong>Contact us for custom pricing</strong></p>
                    <button class="cta-button" onclick="closeModalAndScrollToContact()">Get a Quote</button>
                </div>
            `
        }
    };

    document.querySelectorAll('.service-btn').forEach(button => {
        button.addEventListener('click', () => {
            const service = button.dataset.service;
            if (serviceData[service]) {
                modalTitle.textContent = serviceData[service].title;
                modalContent.innerHTML = serviceData[service].content;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModalFunc();
        }
    });
}

function closeModalFunc() {
    const modal = document.getElementById('serviceModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function closeModalAndScrollToContact() {
    closeModalFunc();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const headerOffset = 80;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Form Validation
function initFormValidation() {
    const form = document.getElementById('professional-form');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn?.querySelector('.btn-text');
    const loadingSpinner = submitBtn?.querySelector('.loading-spinner');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (validateProfessionalForm()) {
            // Show loading state
            if (btnText) btnText.style.display = 'none';
            if (loadingSpinner) loadingSpinner.style.display = 'flex';
            if (submitBtn) submitBtn.disabled = true;

            // Simulate form submission
            try {
                await simulateFormSubmission();
                
                // Show success message
                showNotification('Application submitted successfully! We will contact you soon.', 'success');
                form.reset();
                
            } catch (error) {
                showNotification('There was an error submitting your application. Please try again.', 'error');
            } finally {
                // Reset button state
                if (btnText) btnText.style.display = 'block';
                if (loadingSpinner) loadingSpinner.style.display = 'none';
                if (submitBtn) submitBtn.disabled = false;
            }
        }
    });

    // Real-time validation
    form.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearError(input));
    });
}

function validateProfessionalForm() {
    let isValid = true;
    const form = document.getElementById('professional-form');
    if (!form) return false;
    
    form.querySelectorAll('input[required], textarea[required], select[required]').forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    // Validate file upload if file is selected
    const resumeInput = document.getElementById('resume');
    if (resumeInput && resumeInput.files.length > 0) {
        const file = resumeInput.files[0];
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        
        if (file.size > maxSize) {
            showError(resumeInput, 'File size must be less than 5MB');
            isValid = false;
        } else if (!allowedTypes.includes(file.type)) {
            showError(resumeInput, 'Please upload a PDF or Word document');
            isValid = false;
        }
    }

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        showError(field, 'This field is required');
        return false;
    }

    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, 'Please enter a valid email address');
            return false;
        }
    }

    if (field.type === 'tel' && value) {
        const phoneRegex = /^[+]?[0-9\s\-()]{10,}$/;
        if (!phoneRegex.test(value)) {
            showError(field, 'Please enter a valid phone number');
            return false;
        }
    }

    clearError(field);
    return true;
}

function showError(field, message) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.add('error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearError(field) {
    const formGroup = field.closest('.form-group');
    if (formGroup) {
        formGroup.classList.remove('error');
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }
}

function simulateFormSubmission() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 90% success rate
            Math.random() > 0.1 ? resolve() : reject();
        }, 2000);
    });
}

// Form Tabs functionality
function initFormTabs() {
    const professionalForm = document.getElementById('professional-form');
    const stemForm = document.getElementById('stem-form');
    
    if (professionalForm && stemForm) {
        // Set up event listeners for STEM form
        stemForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (validateStemForm()) {
                const submitBtn = stemForm.querySelector('button[type="submit"]');
                const btnText = submitBtn.querySelector('.btn-text');
                const loadingSpinner = submitBtn.querySelector('.loading-spinner');
                
                // Show loading state
                btnText.style.display = 'none';
                loadingSpinner.style.display = 'flex';
                submitBtn.disabled = true;

                try {
                    await simulateFormSubmission();
                    showNotification('STEM application submitted successfully! We will contact you soon.', 'success');
                    stemForm.reset();
                } catch (error) {
                    showNotification('There was an error submitting your application. Please try again.', 'error');
                } finally {
                    btnText.style.display = 'block';
                    loadingSpinner.style.display = 'none';
                    submitBtn.disabled = false;
                }
            }
        });
    }
}

function showForm(formType) {
    // Hide all forms
    document.querySelectorAll('.career-form').forEach(form => {
        form.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected form and activate button
    document.getElementById(`${formType}-form`).classList.add('active');
    event.target.classList.add('active');
    
    // Scroll to form
    document.querySelector('.application-form').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function showStemApplication() {
    showForm('stem');
}

function validateStemForm() {
    let isValid = true;
    const form = document.getElementById('stem-form');
    if (!form) return false;
    
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showError(field, 'This field is required');
            isValid = false;
        } else {
            clearError(field);
        }
    });
    
    // Validate age
    const ageField = document.getElementById('student-age');
    if (ageField.value) {
        const age = parseInt(ageField.value);
        if (age < 15 || age > 18) {
            showError(ageField, 'Age must be between 15 and 18 years');
            isValid = false;
        }
    }
    
    return isValid;
}

// Notifications
function showNotification(message, type) {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem',
        borderRadius: '8px',
        color: 'white',
        zIndex: '2000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: '300px',
        animation: 'slideIn 0.3s ease',
        background: type === 'success' ? '#4CAF50' : '#f44336',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
    });
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollPosition = window.scrollY;
        const scrollPercentage = (scrollPosition / documentHeight) * 100;
        
        progressBar.style.width = scrollPercentage + '%';
    });
    // Sponsorship functionality
function initSponsorship() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('custom-amount');
    const paystackButton = document.getElementById('paystack-button');
    
    let selectedAmount = 100; // Default amount
    
    // Amount button selection
    amountButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Update selected amount
            selectedAmount = parseInt(button.dataset.amount);
            
            // Clear custom amount input
            customAmountInput.value = '';
        });
    });
    
    // Custom amount input
    customAmountInput.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 10) {
            selectedAmount = value;
            
            // Remove active class from amount buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
        }
    });
    
    // Paystack payment handler
    paystackButton.addEventListener('click', () => {
        if (selectedAmount < 10) {
            showNotification('Please enter a minimum amount of GHS 10', 'error');
            return;
        }
        
        processPayment(selectedAmount);
    });
}

function processPayment(amount) {
    // Replace with your actual Paystack public key and payment details
    const paystackPublicKey = 'pk_your_public_key_here'; // Your Paystack public key
    
    const handler = PaystackPop.setup({
        key: paystackPublicKey,
        email: 'donor@example.com', // You might want to collect this
        amount: amount * 100, // Convert to kobo (Paystack expects amount in kobo)
        currency: 'GHS',
        ref: 'QELEC_SPONSOR_' + Math.floor((Math.random() * 1000000000) + 1),
        metadata: {
            custom_fields: [
                {
                    display_name: "Sponsorship Type",
                    variable_name: "sponsorship_type",
                    value: "General Donation"
                }
            ]
        },
        callback: function(response) {
            // Payment successful
            showNotification('Thank you for your sponsorship! Payment was successful.', 'success');
            trackDonation(amount, response.reference);
        },
        onClose: function() {
            showNotification('Payment window closed. If you meant to sponsor us, please try again.', 'error');
        }
    });
    
    handler.openIframe();
}

function trackDonation(amount, reference) {
    // Here you would typically send this data to your backend
    console.log(`Donation tracked: GHS ${amount}, Reference: ${reference}`);
    
    // You can send this to Google Analytics, your database, etc.
    // Example:
    // fetch('/api/track-donation', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ amount, reference })
    // });
}

// Add to initializeApp function
function initializeApp() {
    // ... existing code ...
    initSponsorship();
}

// Make functions globally available
window.processPayment = processPayment;
}

// Make functions globally available
window.showForm = showForm;
window.showStemApplication = showStemApplication;
window.closeModalAndScrollToContact = closeModalAndScrollToContact;

window.showNotification = showNotification;
