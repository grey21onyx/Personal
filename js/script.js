// Add smooth scrolling for navigation and interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Animation on scroll - reveal elements as they come into view
    const revealElements = () => {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.classList.add('active');
            }
        });
    };

    // Add active class to all sections initially visible
    revealElements();
    
    // Listen for scroll events
    window.addEventListener('scroll', revealElements);
    
    // Add current year to footer copyright
    const yearSpan = document.querySelector('.year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Theme toggle (dark/light mode) - default is dark mode
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Always start with dark mode unless explicitly set to light
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        // Ensure dark mode is set as default
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // Animate skill progress bars
    const animateProgressBars = () => {
        const skillProgressBars = document.querySelectorAll('.skill-progress-bar');
        skillProgressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    };
    
    // Observe skills section to trigger animations
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Mohon isi semua kolom formulir.');
                return;
            }
            
            // Here you would normally send the form data to a server
            // For now, we'll just show a success message
            const formData = {
                name,
                email,
                message
            };
            
            console.log('Form data:', formData);
            
            // Clear form
            contactForm.reset();
            
            // Show success message (you could replace this with a better UI)
            alert('Pesan berhasil dikirim! Terima kasih telah menghubungi.');
        });
    }
    
    // Add hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Add active state to navbar links on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '0.7rem 0';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
            navbar.style.padding = '1rem 0';
        }
    });
    
    // Animate decorative elements
    const animateDecorativeElements = () => {
        const bgShapes = document.querySelectorAll('.bg-shape');
        bgShapes.forEach((shape, index) => {
            const delay = index * 0.2;
            shape.style.opacity = '0';
            shape.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                shape.style.transition = 'opacity 1s ease, transform 1s ease';
                shape.style.opacity = body.classList.contains('dark-mode') ? '0.2' : '0.4';
                shape.style.transform = 'scale(1)';
            }, delay * 1000);
        });
    };
    
    // Run shape animations on load
    animateDecorativeElements();
    
    // Add parallax effect to background shapes
    window.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.bg-shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const factor = (index + 1) * 20;
            const xOffset = (x - 0.5) * factor;
            const yOffset = (y - 0.5) * factor;
            
            shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
});