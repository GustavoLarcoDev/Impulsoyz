// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    gsap.to(preloader, {
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
            preloader.style.display = 'none';
            // Iniciar animaciones del hero después del preloader
            gsap.from('.hero-content', {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'power4.out'
            });
        }
    });
});

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
    
    gsap.to(cursorFollower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3
    });
});

// Hover effect for links and buttons
const links = document.querySelectorAll('a, button');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorFollower.classList.add('cursor-hover');
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorFollower.classList.remove('cursor-hover');
    });
});

// Initialize AOS
AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    mirror: true,
    offset: 50
});

// Initialize Swiper
const portfolioSwiper = new Swiper('.portfolio-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});

// Initialize Swiper for hexagon sliders
document.addEventListener('DOMContentLoaded', function() {
    // Initialize each hex-slider
    const hexSliders = document.querySelectorAll('.hex-slider');
    hexSliders.forEach(slider => {
        new Swiper(slider, {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 1000,
        });
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero animation
gsap.timeline()
    .from('.hero-content h1', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out'
    })
    .from('.hero-content p', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.8')
    .from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.6');

// Stats animation
const stats = document.querySelectorAll('.stat .number');
stats.forEach(stat => {
    let value = stat.textContent;
    value = value.replace(/\D/g, '');
    const end = parseInt(value);
    
    gsap.to(stat, {
        scrollTrigger: {
            trigger: stat,
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        innerText: end,
        duration: 2,
        snap: { innerText: 1 },
        ease: 'power1.out'
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scrolled');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scrolled')) {
        navbar.classList.add('scrolled');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scrolled')) {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    if(navLinks.classList.contains('active')) {
        gsap.from('.nav-links li', {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power2.out'
        });
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: target,
                offsetY: 80
            },
            ease: 'power2.out'
        });
        
        // Close mobile menu if open
        if(navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Form validation and submission
const contactForm = document.getElementById('contact-form');
const formGroups = document.querySelectorAll('.form-group');

formGroups.forEach(group => {
    const input = group.querySelector('input, textarea, select');
    const label = group.querySelector('label');
    
    if (input && label) {
        if (input.value) {
            label.classList.add('active');
        }
        
        input.addEventListener('focus', () => {
            label.classList.add('active');
            gsap.to(label, {
                y: -20,
                scale: 0.8,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                label.classList.remove('active');
                gsap.to(label, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    }
});

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    gsap.to(submitButton, {
        scale: 0.95,
        duration: 0.1
    });
    
    try {
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Simular envío
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        Swal.fire({
            title: '¡Mensaje Enviado!',
            text: 'Nos pondremos en contacto contigo pronto.',
            icon: 'success',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            customClass: {
                popup: 'animated bounceIn'
            }
        });
        
        contactForm.reset();
        formGroups.forEach(group => {
            const label = group.querySelector('label');
            if (label) {
                label.classList.remove('active');
                gsap.to(label, {
                    y: 0,
                    scale: 1,
                    duration: 0.3
                });
            }
        });
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al enviar el mensaje. Por favor, intenta de nuevo.',
            icon: 'error'
        });
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        gsap.to(submitButton, {
            scale: 1,
            duration: 0.1
        });
    }
});

// Intersection Observer for video playback optimization
const videos = document.querySelectorAll('video');
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.play();
        } else {
            entry.target.pause();
        }
    });
}, { threshold: 0.5 });

videos.forEach(video => videoObserver.observe(video));

// Hover effect for service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Animación de servicios
gsap.from('.service-card', {
    scrollTrigger: {
        trigger: '.services',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
    },
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out'
});

// Animación de videos
const videoContainers = document.querySelectorAll('.team-video-grid > div');
videoContainers.forEach((container, index) => {
    gsap.from(container, {
        scrollTrigger: {
            trigger: container,
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        delay: index * 0.2,
        ease: 'power2.out'
    });
});

// Efecto parallax suave en el hero
gsap.to('.hero-video video', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

// Mejorar el cursor personalizado
const hoverElements = document.querySelectorAll('a, button, .service-card, .stat');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorFollower.classList.add('cursor-hover');
        gsap.to(element, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorFollower.classList.remove('cursor-hover');
        gsap.to(element, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    // Navbar mobile toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navbar = document.querySelector('#navbar');

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', (e) => {
            navbar.classList.toggle('navbar-mobile');
            mobileNavToggle.classList.toggle('bx-menu');
            mobileNavToggle.classList.toggle('bx-x');
        });
    }

    // Scroll to offset section
    const scrollto = (el) => {
        let header = document.querySelector('#header');
        let offset = header.offsetHeight;

        let elementPos = document.querySelector(el).offsetTop;
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        });
    };

    // Scroll with offset on page load with hash links
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (document.querySelector(window.location.hash)) {
                scrollto(window.location.hash);
            }
        }
    });

    // Header scroll class
    const selectHeader = document.querySelector('#header');
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled');
            } else {
                selectHeader.classList.remove('header-scrolled');
            }
        };
        window.addEventListener('load', headerScrolled);
        document.addEventListener('scroll', headerScrolled);
    }

    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        mirror: false
    });
});
