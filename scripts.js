document.addEventListener('DOMContentLoaded', function() {
    const copyButton = document.getElementById('copyIp');
    const notification = document.getElementById('copyNotification');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const serverIp = document.querySelector('.server-ip');

    // Copy IP functionality
    function copyIp() {
        navigator.clipboard.writeText('play.asteriamc.xyz').then(function() {
            notification.style.opacity = '1';
            setTimeout(function() {
                notification.style.opacity = '0';
            }, 2000);
        });
    }

    copyButton.addEventListener('click', copyIp);
    serverIp.addEventListener('click', copyIp);

    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navMenu.classList.remove('show');
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll reveal effect
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });

    // Animated counter for stats
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(function() {
            start += increment;
            element.textContent = Math.floor(start);
            if (start >= target) {
                clearInterval(timer);
                element.textContent = target;
            }
        }, 16);
    }

    const statsSection = document.querySelector('.stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateStats = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting && !animated) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target, 2000);
            });
            animated = true;
        }
    });

    animateStats.observe(statsSection);

    // Particle background effect
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 5000);
    }

    setInterval(createParticle, 200);
});