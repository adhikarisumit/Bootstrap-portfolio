// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// Theme Toggler
const htmlElement = document.documentElement;
const themeToggler = document.getElementById("theme-toggler");
const themeIcon = document.getElementById("theme-icon");

themeToggler.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    htmlElement.setAttribute("data-bs-theme", newTheme);

    // Change the icon based on the theme
    if (newTheme === "dark") {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    } else {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    }

    // Save theme preference to localStorage
    localStorage.setItem('theme', newTheme);
});

// Load saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute("data-bs-theme", savedTheme);

// Set the icon based on the theme
if (savedTheme === "dark") {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
} else {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add("show");
    } else {
        scrollToTopBtn.classList.remove("show");
    }
});

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Google Form is now embedded directly - no JavaScript needed for form handling

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Add scrolled class styles to CSS
const style = document.createElement('style');
style.textContent = `
    .navbar.scrolled {
        background-color: rgba(33, 37, 41, 0.95) !important;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Typing effect for hero title - IMPROVED VERSION
function typeWriter(element, speed = 100) {
    // Store the original HTML content
    const originalHTML = element.innerHTML;
    
    // Extract text content for typing (without HTML tags)
    const textContent = element.textContent || element.innerText;
    
    // Clear the element and start typing
    element.innerHTML = '';
    
    let i = 0;
    let currentText = '';
    
    function type() {
        if (i < textContent.length) {
            currentText += textContent.charAt(i);
            // Add blinking cursor effect with CSS class
            element.innerHTML = currentText + '<span class="typing-cursor">|</span>';
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor and restore the original HTML after typing is complete
            setTimeout(() => {
                element.innerHTML = originalHTML;
            }, 800); // Slightly longer delay for better effect
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.title1 h1');
    if (heroTitle) {
        setTimeout(() => {
            typeWriter(heroTitle, 80); // Slightly slower for better readability
        }, 1500); // Longer delay for better page load experience
    }
});

// Intersection Observer for skill bars animation
const skillBars = document.querySelectorAll('.progress-bar');
if (skillBars.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 300);
                
                skillObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
}

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
        
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
});

// Add loaded class styles
const imageStyle = document.createElement('style');
imageStyle.textContent = `
    img {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    img.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(imageStyle);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.first-section');
    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Add some interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Initialize admin system
    initializeAdminSystem();
});

// Admin Authentication System
const ADMIN_PASSWORD = 'C242N012b';

// Initialize admin functionality
function initializeAdminSystem() {
    const adminEyeIcon = document.getElementById('adminEyeIcon');
    const adminModal = new bootstrap.Modal(document.getElementById('adminModal'));
    const authenticateBtn = document.getElementById('authenticateBtn');
    const adminPassword = document.getElementById('adminPassword');
    const passwordError = document.getElementById('passwordError');

    // Admin eye icon click - show password modal
    if (adminEyeIcon) {
        adminEyeIcon.addEventListener('click', () => {
            adminModal.show();
            adminPassword.value = '';
            passwordError.style.display = 'none';
            adminPassword.classList.remove('is-invalid');
            adminPassword.focus();
        });
    }

    // Authenticate button click
    if (authenticateBtn) {
        authenticateBtn.addEventListener('click', () => {
            if (adminPassword.value === ADMIN_PASSWORD) {
                adminModal.hide();
                // Redirect to Google Form responses
                window.open('https://docs.google.com/forms/d/e/1FAIpQLSeRv7m2w5hLLIhaeYbopZs6AqZBBqieH-FdmX3pMxE0GE2ugw/edit#responses', '_blank');
                // Show success message
                const successAlert = document.createElement('div');
                successAlert.className = 'alert alert-success alert-dismissible fade show mt-3';
                successAlert.innerHTML = `
                    <i class="fas fa-check-circle me-2"></i>
                    Access granted! Opening responses...
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                `;
                
                // Insert after the contact form
                const contactForm = document.querySelector('.contact-form');
                if (contactForm) {
                    contactForm.parentNode.insertBefore(successAlert, contactForm.nextSibling);
                    
                    // Auto-remove after 5 seconds
                    setTimeout(() => {
                        if (successAlert.parentNode) {
                            successAlert.remove();
                        }
                    }, 5000);
                }
            } else {
                passwordError.style.display = 'block';
                adminPassword.classList.add('is-invalid');
                adminPassword.focus();
            }
        });
    }

    // Enter key in password field
    if (adminPassword) {
        adminPassword.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                authenticateBtn.click();
            }
        });
    }
}


