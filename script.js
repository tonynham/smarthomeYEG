// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const consultationForm = document.getElementById('consultationForm');

// Mobile Navigation Toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

hamburger.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
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

// Enhanced Consultation Form Handling
consultationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(consultationForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const property = formData.get('property');
    const message = formData.get('message');
    
    // Enhanced validation
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    if (name.length < 2) {
        showNotification('Please enter a valid name.', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Create enhanced mailto content
    const subject = encodeURIComponent('Smart Home Consultation Request - ' + name);
    const body = encodeURIComponent(
        `Hello Tony,\n\n` +
        `I'm interested in a free smart home consultation for my ${property || 'property'} in Edmonton.\n\n` +
        `CONTACT DETAILS:\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone || 'Not provided'}\n` +
        `Property Type: ${property || 'Not specified'}\n\n` +
        `SMART HOME INTERESTS:\n` +
        `${message}\n\n` +
        `Please contact me to schedule my free consultation.\n\n` +
        `Best regards,\n${name}\n\n` +
        `--\nSent from Smart Home YEG website`
    );
    
    const mailtoLink = `mailto:tony@smarthomeyeg.com?subject=${subject}&body=${body}`;
    
    try {
        window.location.href = mailtoLink;
        showSuccessMessage();
        consultationForm.reset();
    } catch (error) {
        console.error('Error opening email client:', error);
        copyToClipboard(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nProperty: ${property}\nMessage: ${message}`);
        showNotification('Email client could not be opened. Your information has been copied to clipboard. Please email it to tony@smarthomeyeg.com', 'info');
    }
});

// Enhanced Success Message
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #10B981;
            color: white;
            padding: 32px;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(16, 185, 129, 0.3);
            z-index: 10000;
            text-align: center;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
        ">
            <i class="fas fa-check-circle" style="font-size: 48px; margin-bottom: 16px; color: white;"></i>
            <h3 style="margin-bottom: 12px; font-size: 20px; font-weight: 600;">Thank You!</h3>
            <p style="margin: 0; opacity: 0.9; line-height: 1.5;">Your consultation request is ready. Your email client should open shortly with a pre-filled message.</p>
        </div>
        <style>
            @keyframes slideIn {
                from { transform: translate(-50%, -60%) scale(0.9); opacity: 0; }
                to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
        </style>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => {
            if (successDiv.parentNode) {
                document.body.removeChild(successDiv);
            }
        }, 300);
    }, 4000);
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    const colors = {
        error: '#EF4444',
        success: '#10B981',
        info: '#3B82F6'
    };
    
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            max-width: 350px;
            animation: slideInRight 0.3s ease-out;
        ">
            <p style="margin: 0; font-size: 14px; line-height: 1.4;">${message}</p>
        </div>
        <style>
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        </style>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Copy to clipboard function
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

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

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    initDeviceCards();
    initScrollAnimations();
    animateCounters();
    initServiceCards();
    initClickToCall();
    initFormAnimations();
    initPageLoading();
    
    // Add subtle parallax effect to hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual && scrolled < window.innerHeight) {
            heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
}); 