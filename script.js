document.addEventListener('DOMContentLoaded', function() {
    // Detect current season
    function getCurrentSeason() {
        const month = new Date().getMonth() + 1;
        if (month >= 3 && month <= 5) return 'spring';
        if (month >= 6 && month <= 8) return 'summer';
        if (month >= 9 && month <= 11) return 'autumn';
        return 'winter';
    }


    // Set initial season
    const currentSeason = getCurrentSeason();
    document.body.className = currentSeason;


    // Update season icon based on current season
    function updateSeasonIcon() {
        const seasonIcon = document.querySelector('.season-icon i');
        switch(currentSeason) {
            case 'spring':
                seasonIcon.className = 'fas fa-seedling';
                break;
            case 'summer':
                seasonIcon.className = 'fas fa-sun';
                break;
            case 'autumn':
                seasonIcon.className = 'fas fa-leaf';
                break;
            case 'winter':
                seasonIcon.className = 'fas fa-snowflake';
                break;
        }
    }


    updateSeasonIcon();


    // Language selector functionality
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.addEventListener('change', function() {
        // In a real app, this would change the language of the content
        console.log('Language changed to:', this.value);
    });


    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
       
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
           
            if (elementPosition < screenPosition) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }


    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load


    // Seasonal particle animation
    function createParticles() {
        const bgElements = document.querySelector('.bg-elements');
        const seasons = {
            spring: ['🌸', '🌱', '🌷', '🍃'],
            summer: ['🌞', '🌻', '🍉', '🏖️'],
            autumn: ['🍁', '🍂', '🎃', '🌰'],
            winter: ['❄️', '⛄', '🎄', '🧣']
        };
       
        // Create 10 particles for the current season
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.textContent = seasons[currentSeason][Math.floor(Math.random() * seasons[currentSeason].length)];
           
            // Random position and size
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.fontSize = `${Math.random() * 20 + 10}px`;
            particle.style.opacity = Math.random() * 0.5 + 0.3;
           
            // Animation
            const duration = Math.random() * 15 + 10;
            particle.style.animation = `float ${duration}s infinite linear`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
           
            bgElements.appendChild(particle);
        }
    }


    createParticles();


    // Seasonal color transitions
    function applySeasonalColors() {
        const root = document.documentElement;
       
        switch(currentSeason) {
            case 'spring':
                root.style.setProperty('--primary-color', 'var(--spring-primary)');
                root.style.setProperty('--secondary-color', 'var(--spring-secondary)');
                break;
            case 'summer':
                root.style.setProperty('--primary-color', 'var(--summer-primary)');
                root.style.setProperty('--secondary-color', 'var(--summer-secondary)');
                break;
            case 'autumn':
                root.style.setProperty('--primary-color', 'var(--autumn-primary)');
                root.style.setProperty('--secondary-color', 'var(--autumn-secondary)');
                break;
            case 'winter':
                root.style.setProperty('--primary-color', 'var(--winter-primary)');
                root.style.setProperty('--secondary-color', 'var(--winter-secondary)');
                break;
        }
    }


    applySeasonalColors();


    // GSAP animations
    gsap.from('.seasonal-card', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });


    gsap.from('.season-icon', {
        duration: 0.8,
        scale: 0,
        rotation: 180,
        ease: 'back.out(1.7)',
        delay: 0.3
    });


    gsap.from('.feature-card', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.15,
        delay: 1,
        ease: 'power2.out'
    });


    // Seasonal background animation
    const seasonalBg = document.querySelector('.seasonal-bg');
    gsap.to(seasonalBg, {
        duration: 30,
        backgroundPosition: '50% 30%',
        repeat: -1,
        yoyo: true,
        ease: 'none'
    });


    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.season-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
           
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
           
            this.appendChild(ripple);
           
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });


    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.4);
            animation: rippleEffect 1s linear;
            pointer-events: none;
        }
       
        @keyframes rippleEffect {
            0% {
                width: 10px;
                height: 10px;
                opacity: 1;
            }
            100% {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

    