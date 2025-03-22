// Add smooth scrolling for navigation and interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Hide preloader when page is fully loaded
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        }
    });

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
    
    // Show/hide mini profile when header is out of view
    const header = document.querySelector('.header');
    const miniProfile = document.querySelector('.mini-profile');
    
    const toggleMiniProfile = () => {
        // Get the bottom position of the header
        const headerBottom = header.getBoundingClientRect().bottom;
        
        // If header is out of view (header bottom is less than 0), show mini profile
        if (headerBottom <= 0) {
            miniProfile.classList.add('visible');
        } else {
            miniProfile.classList.remove('visible');
        }
    };
    
    // Check on initial load
    toggleMiniProfile();
    
    // Check on scroll
    window.addEventListener('scroll', toggleMiniProfile);
    
    // Mini profile click to scroll to top
    miniProfile.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
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
    
    // Add 3D tilt effect to project cards
    const addTiltEffectToCards = () => {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;
                
                const mouseX = e.clientX - cardCenterX;
                const mouseY = e.clientY - cardCenterY;
                
                const rotateY = mouseX / 15;
                const rotateX = -mouseY / 15;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    };
    
    // Enable the tilt effect only on larger screens
    if (window.innerWidth > 768) {
        addTiltEffectToCards();
    }
    
    // Add dynamic background effects
    const addDynamicBackgroundEffects = () => {
        const header = document.querySelector('.header');
        const moveDistance = 30;
        
        window.addEventListener('scroll', () => {
            const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            const moveY = scrollPercentage * moveDistance;
            
            if (header) {
                header.style.backgroundPosition = `center ${-moveY}px`;
            }
        });
    };
    
    addDynamicBackgroundEffects();
    
    // Add typing animation for section titles
    const addTypingEffectToTitles = () => {
        const sectionTitles = document.querySelectorAll('.section-title');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('typing-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        sectionTitles.forEach(title => {
            observer.observe(title);
        });
    };
    
    addTypingEffectToTitles();
    
    // Add staggered animation for timeline items
    const animateTimelineItems = () => {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        timelineItems.forEach(item => {
            observer.observe(item);
        });
    };
    
    animateTimelineItems();
    
    // Add enhanced mouseover effect for skill items
    const enhanceSkillItemsInteraction = () => {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            item.addEventListener('mouseover', function() {
                const siblings = Array.from(this.parentNode.children).filter(child => child !== this);
                
                siblings.forEach(sibling => {
                    sibling.style.opacity = '0.5';
                    sibling.style.transform = 'scale(0.95)';
                });
                
                this.style.transform = 'scale(1.1)';
                this.style.zIndex = '2';
            });
            
            item.addEventListener('mouseout', function() {
                const siblings = Array.from(this.parentNode.children);
                
                siblings.forEach(sibling => {
                    sibling.style.opacity = '1';
                    sibling.style.transform = 'scale(1)';
                });
                
                this.style.zIndex = '1';
            });
        });
    };
    
    enhanceSkillItemsInteraction();
    
    // Add glowing effect to buttons on hover
    const addGlowEffect = () => {
        const buttons = document.querySelectorAll('.btn-submit, .project-links a');
        
        buttons.forEach(button => {
            button.addEventListener('mouseover', function() {
                this.style.boxShadow = `0 0 15px ${getComputedStyle(document.documentElement).getPropertyValue('--accent-color')}`;
            });
            
            button.addEventListener('mouseout', function() {
                this.style.boxShadow = '';
            });
        });
    };
    
    addGlowEffect();
});