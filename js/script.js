/**
 * Website Personal Portfolio Muhamad Ariffadhlullah
 * Script utama yang menangani interaksi dan animasi
 * Semua interaksi UI termasuk preloader, animasi scroll, dark mode, dan form handling
 */

document.addEventListener('DOMContentLoaded', function() {
    // Deklarasi variabel yang akan digunakan di berbagai fungsi
    const navLinksItems = document.querySelectorAll('.nav-link');
    const navLinksContainer = document.querySelector('.nav-links');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    /**
     * Preloader
     * Menghilangkan preloader setelah halaman selesai dimuat
     * Menggunakan setTimeout untuk memberikan efek fade out yang halus
     */
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500); // Menunggu animasi fade out selesai
            }, 500); // Delay sedikit sebelum memulai fade out
        }
    });

    /**
     * Animasi Reveal Section
     * Menampilkan elemen section dengan animasi saat pengguna melakukan scroll
     * Menambahkan class 'active' pada section yang terlihat di viewport
     */
    const revealElements = () => {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Saat section mendekati viewport (100px dari batas viewport)
            if (sectionTop < windowHeight - 100) {
                section.classList.add('active');
            }
        });
    };

    // Jalankan revealElements saat halaman pertama kali dimuat
    revealElements();
    
    // Panggil revealElements saat pengguna melakukan scroll
    window.addEventListener('scroll', revealElements);
    
    /**
     * Update Copyright Year
     * Menambahkan tahun saat ini ke footer copyright
     */
    const yearSpan = document.querySelector('.year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    /**
     * Smooth Scrolling
     * Menambahkan fitur smooth scrolling untuk link navigasi
     * Memastikan pengguna dapat mengklik link dan halaman akan scroll dengan halus
     */
    navLinksItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Offset 70px agar tidak tertutup navbar
                    behavior: 'smooth'
                });
            }
        });
    });
    
    /**
     * Mini Profile Toggle
     * Menampilkan/menyembunyikan mini profile saat header tidak terlihat
     * Berguna untuk navigasi saat pengguna melakukan scroll ke bawah
     */
    const header = document.querySelector('.header');
    const miniProfile = document.querySelector('.mini-profile');
    
    const toggleMiniProfile = () => {
        const headerBottom = header.getBoundingClientRect().bottom;
        
        // Jika header tidak terlihat (sudah di scroll melewati batas atas), tampilkan mini profile
        if (headerBottom <= 0) {
            miniProfile.classList.add('visible');
        } else {
            miniProfile.classList.remove('visible');
        }
    };
    
    // Periksa posisi header saat halaman dimuat
    toggleMiniProfile();
    
    // Periksa posisi header saat pengguna scroll
    window.addEventListener('scroll', toggleMiniProfile);
    
    /**
     * Scroll to Top
     * Scroll ke atas saat mini profile diklik
     */
    miniProfile.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    /**
     * Dark Mode Toggle
     * Mengelola tema gelap/terang
     * Menyimpan preferensi tema pengguna di localStorage
     */
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Cek tema yang disimpan di localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        // Default ke dark mode jika tidak ada preferensi tersimpan
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    }
    
    // Toggle tema saat tombol diklik
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
    
    /**
     * Skills Progress Bar Animation
     * Animasi progress bar pada bagian skills
     * Bar akan terisi secara progresif saat section skills terlihat
     */
    const animateProgressBars = () => {
        const skillProgressBars = document.querySelectorAll('.skill-progress-bar');
        skillProgressBars.forEach(bar => {
            const width = bar.style.width;
            // Reset width terlebih dahulu
            bar.style.width = '0';
            // Kemudian animasikan ke nilai aslinya
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    };
    
    // Gunakan Intersection Observer untuk memicu animasi progress bar
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    // Berhenti mengobservasi setelah terpicu
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 }); // Trigger ketika 30% section terlihat
        
        observer.observe(skillsSection);
    }
    
    /**
     * Contact Form Handling
     * Penanganan submit form kontak
     * Melakukan validasi sederhana dan menampilkan pesan sukses
     */
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ambil nilai form
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validasi sederhana
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Mohon isi semua kolom formulir.');
                return;
            }
            
            // Simpan data form (untuk implementasi pengiriman data ke server nantinya)
            const formData = {
                name,
                email,
                message
            };
            
            console.log('Form data:', formData);
            
            // Reset form
            contactForm.reset();
            
            // Tampilkan pesan sukses
            alert('Pesan berhasil dikirim! Terima kasih telah menghubungi.');
        });
    }
    
    /**
     * Project Card Hover Effect
     * Menambahkan efek hover pada project card
     * Card akan terangkat saat mouse di atasnya
     */
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
    
    /**
     * Active Navigation Link
     * Menandai link navigasi yang aktif saat scroll
     * Menambahkan class 'active' pada link yang sesuai dengan section yang sedang dilihat
     */
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            // Jika scroll position sudah melewati section dengan offset 100px
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
    
    /**
     * Navbar Scroll Effect
     * Efek shadow dan padding pada navbar saat scroll
     * Navbar akan terlihat lebih menonjol saat halaman di-scroll
     */
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
    
    /**
     * Decorative Elements Animation
     * Animasi elemen dekoratif saat halaman dimuat
     * Menciptakan efek muncul pada bentuk-bentuk latar belakang
     */
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
    
    // Jalankan animasi bentuk latar belakang
    animateDecorativeElements();
    
    /**
     * Section Title Typing Effect
     * Animasi typing effect pada judul section
     * Menambahkan class 'typing-visible' saat section terlihat
     */
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
        
    addTypingEffectToTitles();
    
    /**
     * Timeline Items Animation
     * Animasi bertahap untuk timeline items
     * Item akan muncul satu per satu saat section terlihat
     */
    const animateTimelineItems = () => {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 200); // Delay staggered berdasarkan index
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        timelineItems.forEach(item => {
            observer.observe(item);
        });
    };
    
    animateTimelineItems();
    
    /**
     * Skill Items Interaction
     * Menambahkan efek hover pada skill items
     * Item lain akan meredup saat mouse di atas salah satu skill
     */
    const enhanceSkillItemsInteraction = () => {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            item.addEventListener('mouseover', function() {
                const siblings = Array.from(this.parentNode.children).filter(child => child !== this);
                
                // Redupkan dan perkecil siblings
                siblings.forEach(sibling => {
                    sibling.style.opacity = '0.5';
                    sibling.style.transform = 'scale(0.95)';
                });
                
                // Besarkan item yang di-hover
                this.style.transform = 'scale(1.1)';
                this.style.zIndex = '2';
            });
            
            item.addEventListener('mouseout', function() {
                const siblings = Array.from(this.parentNode.children);
                
                // Kembalikan semua ke normal
                siblings.forEach(sibling => {
                    sibling.style.opacity = '1';
                    sibling.style.transform = 'scale(1)';
                });
                
                this.style.zIndex = '1';
            });
        });
    };
    
    enhanceSkillItemsInteraction();
    
    /**
     * Button Glow Effect
     * Menambahkan efek glow pada tombol saat hover
     * Tombol akan bersinar dengan warna accent
     */
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

    /**
     * Mobile Menu Toggle
     * Mengelola menu hamburger untuk tampilan mobile
     */
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Tutup menu saat link di klik
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Tutup menu saat klik di luar menu
        document.addEventListener('click', function(e) {
            if (navLinksContainer.classList.contains('active') && 
                !navLinksContainer.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    /**
     * Mobile Menu Touch Swipe
     * Menambahkan kemampuan swipe untuk menutup menu di perangkat mobile
     */
    if (navLinksContainer) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        navLinksContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        navLinksContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            // Swipe dari kanan ke kiri untuk menutup menu
            if (touchStartX - touchEndX > 50 && navLinksContainer.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    }
});