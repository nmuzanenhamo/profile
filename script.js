// Typing Effect
const typingTexts = [
    "Data Analyst",
    "IT Manager", 
    "Software Developer",
    "Data Scientist",
    "System Administrator",
    "Cyber Security Specialist",
    "Cloud Computing Enthusiast"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentText = typingTexts[textIndex];
    const typingElement = document.getElementById('typing-text');
    
    if (!typingElement) return;
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeText, typingSpeed);
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Start typing effect
    typeText();
    
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form submission via Formspree
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Submit to Formspree (replace YOUR_FORM_ID with your actual Formspree form ID)
            showFormMessage('Sending your message...', 'success');
            
            fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    showFormMessage('Oops! Something went wrong. Please try emailing me directly.', 'error');
                }
            })
            .catch(() => {
                showFormMessage('Oops! Something went wrong. Please try emailing me directly.', 'error');
            });
        });
    }
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.card-hover, section > div > div');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Active navigation highlighting (desktop + mobile)
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Remove active class from all nav links (desktop + mobile)
                document.querySelectorAll('nav a[href^="#"]').forEach(link => {
                    link.classList.remove('text-purple-600', 'font-semibold');
                    link.classList.add('text-gray-700');
                });
                
                // Add active class to current section links
                document.querySelectorAll(`nav a[href="#${sectionId}"]`).forEach(link => {
                    link.classList.remove('text-gray-700');
                    link.classList.add('text-purple-600', 'font-semibold');
                });
            }
        });
        
        // Scroll-to-top button visibility
        const scrollBtn = document.getElementById('scroll-to-top');
        if (scrollBtn) {
            if (scrollY > 300) {
                scrollBtn.classList.remove('opacity-0', 'invisible');
                scrollBtn.classList.add('opacity-100', 'visible');
            } else {
                scrollBtn.classList.add('opacity-0', 'invisible');
                scrollBtn.classList.remove('opacity-100', 'visible');
            }
        }
    });
    
    // Scroll-to-top button click
    const scrollTopBtn = document.getElementById('scroll-to-top');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Dynamic footer year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.getElementById('home');
        const blobs = document.querySelectorAll('.blob');
        
        if (heroSection && scrolled < window.innerHeight) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
            
            // Animate blobs at different speeds
            blobs.forEach((blob, index) => {
                const blobRate = scrolled * (0.1 + (index * 0.05));
                blob.style.transform = `translateY(${blobRate}px)`;
            });
        }
    });
});

function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.classList.remove('hidden', 'text-green-600', 'text-red-600');
    
    if (type === 'success') {
        formMessage.classList.add('text-green-600');
    } else {
        formMessage.classList.add('text-red-600');
    }
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
}

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button, a[class*="rounded"]');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const rippleCSS = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button, a[class*="rounded"] {
        position: relative;
        overflow: hidden;
    }
`;

// Create and append ripple styles
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleCSS;
document.head.appendChild(styleSheet);
