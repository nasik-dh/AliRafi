document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    const demoContainer = document.querySelector('.demo-container');
    
    // Simulate loading
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        demoContainer.classList.add('loaded');
    }, 1500);
    
    // Video modal functionality
    const playBtn = document.getElementById('playBtn');
    const videoModal = document.getElementById('videoModal');
    const closeBtn = document.querySelector('.close-btn');
    const demoVideo = document.getElementById('demoVideo');
    
    // Open modal when play button is clicked
    playBtn.addEventListener('click', function() {
        videoModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        // Start video (would be more robust with YouTube API)
        demoVideo.src += "&autoplay=1";
    });
    
    // Close modal when close button is clicked
    closeBtn.addEventListener('click', function() {
        videoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Pause the video when modal is closed
        demoVideo.src = demoVideo.src.replace("&autoplay=1", "");
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === videoModal) {
            videoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            // Pause the video when modal is closed
            demoVideo.src = demoVideo.src.replace("&autoplay=1", "");
        }
    });
    
    // Dark mode toggle
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    }
    
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animate seasonal progress bars
    const seasonProgresses = document.querySelectorAll('.season-progress');
    
    seasonProgresses.forEach(progress => {
        const percent = progress.getAttribute('data-percent');
        progress.style.setProperty('--progress-width', `${percent}%`);
        
        // Animate on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progress.querySelector('::after').style.width = `${percent}%`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(progress);
    });
    
    // View more button for seasonal calendar
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    
    viewMoreBtn.addEventListener('click', function() {
        alert('This would show the full seasonal calendar in a real implementation.');
    });
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        alert(`Thank you for subscribing with ${emailInput.value}!`);
        this.reset();
    });
    
    // Recipe card hover effect
    const recipeCard = document.querySelector('.recipe-card');
    
    recipeCard.addEventListener('mouseenter', function() {
        gsap.to(this, {
            y: -5,
            duration: 0.3,
            boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
            ease: "power2.out"
        });
    });
    
    recipeCard.addEventListener('mouseleave', function() {
        gsap.to(this, {
            y: 0,
            duration: 0.3,
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            ease: "power2.out"
        });
    });
    
    // Seasonal theme switching
    function setSeasonalTheme() {
        const seasons = ['spring', 'summer', 'autumn', 'winter'];
        const currentMonth = new Date().getMonth();
        let season;
        
        if (currentMonth >= 2 && currentMonth <= 4) season = 'spring';
        else if (currentMonth >= 5 && currentMonth <= 7) season = 'summer';
        else if (currentMonth >= 8 && currentMonth <= 10) season = 'autumn';
        else season = 'winter';
        
        document.body.className = season;
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
        }
        
        // Update colors based on season
        document.documentElement.style.setProperty('--primary', `var(--${season}-primary)`);
        document.documentElement.style.setProperty('--secondary', `var(--${season}-secondary)`);
        document.documentElement.style.setProperty('--accent', `var(--${season}-accent)`);
    }
    
    // Initialize seasonal theme
    setSeasonalTheme();
    
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -5,
                duration: 0.3,
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                ease: "power2.out"
            });
        });
    });
});
