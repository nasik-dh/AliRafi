document.addEventListener('DOMContentLoaded', function() {
    // Video modal functionality
    const playBtn = document.getElementById('playBtn');
    const videoModal = document.getElementById('videoModal');
    const closeBtn = document.querySelector('.close-btn');
    const demoVideo = document.getElementById('demoVideo');
    
    // Open modal when play button is clicked
    playBtn.addEventListener('click', function() {
        videoModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
    
    // Close modal when close button is clicked
    closeBtn.addEventListener('click', function() {
        videoModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
        
        // Pause the video when modal is closed
        demoVideo.src += '&autoplay=0';
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === videoModal) {
            videoModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
            
            // Pause the video when modal is closed
            demoVideo.src += '&autoplay=0';
        }
    });
    
    // Seasonal animations
    const bgElements = document.querySelectorAll('.bg-element');
    
    function animateElements() {
        bgElements.forEach((element, index) => {
            gsap.to(element, {
                y: (index % 2 === 0) ? 20 : -20,
                duration: 3 + Math.random() * 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
            
            gsap.to(element, {
                rotation: (index % 2 === 0) ? 10 : -10,
                duration: 4 + Math.random() * 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });
    }
    
    // Initialize animations
    animateElements();
    
    // Language selector functionality
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            // In a real app, this would change the language
            console.log('Language changed to:', this.value);
            // For demo purposes, we'll just show an alert
            alert(`Language changed to ${this.options[this.selectedIndex].text}`);
        });
    }
    
    // Seasonal theme switching (for demo purposes)
    function setSeasonalTheme() {
        const seasons = ['spring', 'summer', 'autumn', 'winter'];
        const currentMonth = new Date().getMonth();
        let season;
        
        if (currentMonth >= 2 && currentMonth <= 4) season = 'spring';
        else if (currentMonth >= 5 && currentMonth <= 7) season = 'summer';
        else if (currentMonth >= 8 && currentMonth <= 10) season = 'autumn';
        else season = 'winter';
        
        document.body.className = season;
        
        // Update colors based on season
        document.documentElement.style.setProperty('--primary', `var(--${season}-primary)`);
        document.documentElement.style.setProperty('--secondary', `var(--${season}-secondary)`);
        document.documentElement.style.setProperty('--accent', `var(--${season}-accent)`);
        
        // Update season icon
        const seasonIcon = document.querySelector('.season-icon i');
        if (seasonIcon) {
            const icons = {
                spring: 'fa-seedling',
                summer: 'fa-sun',
                autumn: 'fa-leaf',
                winter: 'fa-snowflake'
            };
            seasonIcon.className = 'fas ' + icons[season];
        }
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