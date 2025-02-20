// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    gsap.to(preloader, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
            preloader.style.display = 'none';
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
    duration: 800,
    easing: 'ease-out',
    once: true
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

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero animation
gsap.from('.hero-content', {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: 'power4.out'
});

// Stats animation
const stats = document.querySelectorAll('.stat .number');
stats.forEach(stat => {
    const value = parseInt(stat.textContent);
    gsap.to(stat, {
        scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
            once: true
        },
        innerText: value,
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
                offsetY: 70
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
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    try {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        Swal.fire({
            title: '¡Mensaje enviado!',
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
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al enviar el mensaje. Por favor, intenta de nuevo.',
            icon: 'error'
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
