// Test if JavaScript is loading
console.log('Script.js is loading...');

// DOM Elements - will be initialized in DOMContentLoaded
let hamburger, navMenu, consultationForm;

// Mobile Navigation Toggle
function toggleMobileMenu() {
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
}

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up form...');
    
    // Initialize DOM elements
    hamburger = document.querySelector('.hamburger');
    navMenu = document.querySelector('.nav-menu');
    consultationForm = document.getElementById('consultationForm');
    
    // Set up mobile menu if elements exist
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    const form = document.getElementById('consultationForm');
    const successMessage = document.getElementById('successMessage');
    
    console.log('Form element:', form);
    console.log('Success message element:', successMessage);
    
    if (form) {
        console.log('Form found, adding event listener...');
        
        // Remove any existing event listeners and add ours with high priority
        form.addEventListener('submit', function(e) {
            console.log('Form submitted!');
            // Don't prevent default - let form submit to hidden iframe
            // e.preventDefault(); // REMOVED - let form submit naturally
            console.log('Form will submit to hidden iframe');
            
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            console.log('Submit button:', submitButton);
            console.log('Original button text:', originalButtonText);
            
            // Show loading state
            submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitButton.disabled = true;
            console.log('Loading state set');
            
            // Log form data for debugging
            const formData = new FormData(form);
            console.log('FormData created');
            for (let [key, value] of formData.entries()) {
                console.log(`Form field ${key}: ${value}`);
            }
            
            console.log('Form will submit to iframe:', form.target);
            
            // Show popup immediately - don't wait for iframe submission
            setTimeout(() => {
                console.log('Showing success popup after brief loading');
                showSuccessPopup();
                resetForm();
            }, 800); // Show after brief loading state
            
            // Form submits naturally to hidden iframe in background
            // No fetch needed - the form handles submission
        }, true); // Use capture phase to ensure our handler runs first
        
        // Success popup function
        function showSuccessPopup() {
            console.log('Showing success popup immediately');
            
            // Create popup overlay with immediate visibility
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            // Create popup content with immediate visibility
            const popup = document.createElement('div');
            popup.style.cssText = `
                background: white;
                padding: 40px;
                border-radius: 16px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                text-align: center;
                max-width: 400px;
                margin: 20px;
            `;
            
            popup.innerHTML = `
                <div style="color: #10B981; font-size: 4rem; margin-bottom: 20px;">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3 style="font-size: 1.8rem; color: #222; margin-bottom: 16px; font-weight: 600;">
                    Submission Successful!
                </h3>
                <p style="font-size: 1.1rem; color: #6B7280; line-height: 1.6; margin-bottom: 30px;">
                    Thank you for your interest! Tony will be contacting you shortly to discuss your smart home consultation.
                </p>
                <button onclick="this.closest('.popup-overlay').remove()" style="
                    background: #FF385C;
                    color: white;
                    padding: 12px 24px;
                    border: none;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.2s ease;
                " onmouseover="this.style.background='#E31C5F'" onmouseout="this.style.background='#FF385C'">
                    Close
                </button>
            `;
            
            overlay.className = 'popup-overlay';
            overlay.appendChild(popup);
            document.body.appendChild(overlay);
            
            console.log('Popup added to DOM - should be visible now');
            
            // Auto close after 6 seconds
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.remove();
                    console.log('Popup auto-closed after 6 seconds');
                }
            }, 6000);
        }
        
        // Form reset function
        function resetForm() {
            console.log('Resetting form');
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = '<span>Get My Free Consultation</span><i class="fas fa-arrow-right"></i>';
            
            form.reset();
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
            console.log('Form reset complete');
        }
        
        console.log('Event listener added successfully');
    } else {
        console.error('Form not found!');
    }
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
    });
});

// Conflicting form handlers removed to prevent delays

// Enhanced Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.12)';
        navbar.style.backdropFilter = 'blur(12px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.08)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Device Card Interactions
function initDeviceCards() {
    const deviceCards = document.querySelectorAll('.device-card');
    
    // Cycle through active states
    let currentActive = 0;
    const cycleInterval = 3000;
    
    function rotateActive() {
        deviceCards.forEach(card => card.classList.remove('active'));
        deviceCards[currentActive].classList.add('active');
        currentActive = (currentActive + 1) % deviceCards.length;
    }
    
    // Start cycling
    const cycleTimer = setInterval(rotateActive, cycleInterval);
    
    // Pause on hover
    const mockup = document.querySelector('.smart-home-mockup');
    if (mockup) {
        mockup.addEventListener('mouseenter', () => clearInterval(cycleTimer));
        mockup.addEventListener('mouseleave', () => {
            setInterval(rotateActive, cycleInterval);
        });
    }
    
    // Manual click interaction
    deviceCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            deviceCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            currentActive = index;
        });
    });
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .step, .credential');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
}

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent;
                const isNumber = /^\d+\+?$/.test(target);
                
                if (isNumber) {
                    const finalNumber = parseInt(target.replace('+', ''));
                    const hasPlus = target.includes('+');
                    let current = 0;
                    const increment = finalNumber / 30;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= finalNumber) {
                            counter.textContent = finalNumber + (hasPlus ? '+' : '');
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current) + (hasPlus ? '+' : '');
                        }
                    }, 50);
                }
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Enhanced Service Card Interactions
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
        
        // Click to expand effect
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Click-to-call functionality
function initClickToCall() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (!isMobile && window.innerWidth > 768) {
                e.preventDefault();
                showNotification('📞 Call Tony at (555) 123-4567\n\nNote: Update this with your actual phone number', 'info');
            }
        });
    });
}

// Form field animations
function initFormAnimations() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
        
        // Floating label effect for filled inputs
        input.addEventListener('input', function() {
            const label = this.parentElement.querySelector('label');
            if (label) {
                if (this.value) {
                    label.style.color = '#FF385C';
                    label.style.fontWeight = '600';
                } else {
                    label.style.color = '#374151';
                    label.style.fontWeight = '500';
                }
            }
        });
    });
}

// Page Loading Animation
function initPageLoading() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

// Simple gallery flip functionality - Basic version
function simpleFlipCard(element) {
    console.log('Simple flip called on:', element);
    element.classList.toggle('flipped');
    console.log('Flipped class toggled. Classes now:', element.className);
}

// Very simple gallery initialization
function simpleInitGallery() {
    console.log('Simple gallery init starting...');
    
    const cards = document.querySelectorAll('.gallery-item');
    console.log('Found cards:', cards.length);
    
    cards.forEach((card, index) => {
        console.log(`Adding click to card ${index}`);
        card.addEventListener('click', function() {
            console.log(`Card ${index} clicked!`);
            simpleFlipCard(this);
        });
        card.style.cursor = 'pointer';
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Starting simple init...');
    
    // Initialize other functionality
    initDeviceCards();
    initScrollAnimations();
    animateCounters();
    initServiceCards();
    initClickToCall();
    initFormAnimations();
    initPageLoading();
    
    // Initialize gallery with extra delay to ensure everything is ready
    setTimeout(() => {
        simpleInitGallery();
    }, 1000);
    
    // Add subtle parallax effect to hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual && scrolled < window.innerHeight) {
            heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
    
    console.log('All initialization complete');
});

// Test functions accessible from console
window.testSimpleFlip = function() {
    const card = document.querySelector('.gallery-item');
    if (card) {
        console.log('Testing simple flip...');
        simpleFlipCard(card);
    } else {
        console.log('No cards found for test');
    }
};

window.forceFlip = function() {
    const card = document.querySelector('.gallery-item');
    if (card) {
        console.log('Force adding flipped class...');
        card.classList.add('flipped');
    }
};

// Test function to check popup immediately
window.testPopup = function() {
    console.log('Testing popup...');
    
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const popup = document.createElement('div');
    popup.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        text-align: center;
        max-width: 400px;
        margin: 20px;
    `;
    
    popup.innerHTML = `
        <div style="color: #10B981; font-size: 4rem; margin-bottom: 20px;">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3 style="font-size: 1.8rem; color: #222; margin-bottom: 16px; font-weight: 600;">
            TEST POPUP
        </h3>
        <p style="font-size: 1.1rem; color: #6B7280; line-height: 1.6; margin-bottom: 30px;">
            This is a test popup to verify styling works correctly.
        </p>
        <button onclick="this.closest('.popup-overlay').remove()" style="
            background: #FF385C;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
        ">
            Close Test
        </button>
    `;
    
    overlay.className = 'popup-overlay';
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    
    console.log('Test popup should be visible now');
}; 