document.addEventListener('DOMContentLoaded', function() {
    // Toggle side navigation on mobile
    const navToggle = document.getElementById('navToggle');
    const sideNav = document.querySelector('.side-nav');
    
    navToggle.addEventListener('click', function() {
        sideNav.classList.toggle('open');
    });
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        
        // Save preference to localStorage
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    
    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // Category switching
    const categories = document.querySelectorAll('.category');
    const tipSections = document.querySelectorAll('.tips-section');
    
    categories.forEach(category => {
        category.addEventListener('click', function() {
            // Remove active class from all categories
            categories.forEach(c => c.classList.remove('active'));
            // Add active class to clicked category
            this.classList.add('active');
            
            // Get the category to show
            const categoryToShow = this.getAttribute('data-category');
            
            // Hide all tip sections
            tipSections.forEach(section => section.classList.remove('active'));
            // Show the selected section
            document.querySelector(`.${categoryToShow}-section`).classList.add('active');
        });
    });
    
    // Season and month selectors
    const seasonSelect = document.getElementById('seasonSelect');
    const monthSelect = document.getElementById('monthSelect');
    const seasonDisplay = document.querySelector('.season-display');
    
    function updateSeasonDisplay() {
        const season = seasonSelect.options[seasonSelect.selectedIndex].text;
        const month = monthSelect.options[monthSelect.selectedIndex].text;
        seasonDisplay.textContent = `${season} - ${month}`;
    }
    
    seasonSelect.addEventListener('change', updateSeasonDisplay);
    monthSelect.addEventListener('change', updateSeasonDisplay);
    
    // Initialize season display
    updateSeasonDisplay();
    
    // Save produce items
    const saveButtons = document.querySelectorAll('.save-btn');
    
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('saved');
            this.innerHTML = this.classList.contains('saved') ? '<i class="fas fa-bookmark"></i>' : '<i class="far fa-bookmark"></i>';
            
            const produceItem = this.getAttribute('data-item');
            let savedItems = JSON.parse(localStorage.getItem('savedProduce')) || [];
            
            if (this.classList.contains('saved')) {
                // Add to saved items if not already there
                if (!savedItems.includes(produceItem)) {
                    savedItems.push(produceItem);
                }
            } else {
                // Remove from saved items
                savedItems = savedItems.filter(item => item !== produceItem);
            }
            
            localStorage.setItem('savedProduce', JSON.stringify(savedItems));
        });
    });
    
    // Check saved state on page load
    window.addEventListener('load', function() {
        const savedItems = JSON.parse(localStorage.getItem('savedProduce')) || [];
        
        saveButtons.forEach(button => {
            const produceItem = button.getAttribute('data-item');
            if (savedItems.includes(produceItem)) {
                button.classList.add('saved');
                button.innerHTML = '<i class="fas fa-bookmark"></i>';
            }
        });
    });
    
    // Find recipes buttons
    const findRecipesButtons = document.querySelectorAll('.find-recipes-btn');
    
    findRecipesButtons.forEach(button => {
        button.addEventListener('click', function() {
            const produce = this.getAttribute('data-produce');
            // In a real app, this would navigate to a recipes page filtered by this produce
            alert(`Finding recipes for ${produce}`);
            
            // For demo purposes, switch to recipes tab
            document.querySelector('.category[data-category="recipes"]').click();
        });
    });
    
    // Notifications panel
    const notificationsBtn = document.getElementById('notificationsBtn');
    const notificationPanel = document.getElementById('notificationPanel');
    const closeNotifications = document.querySelector('.close-notifications');
    
    notificationsBtn.addEventListener('click', function() {
        notificationPanel.classList.toggle('open');
    });
    
    closeNotifications.addEventListener('click', function() {
        notificationPanel.classList.remove('open');
    });
    
    // Mark notifications as read when panel is opened
    notificationsBtn.addEventListener('click', function() {
        const unreadNotifications = document.querySelectorAll('.notification-item.unread');
        unreadNotifications.forEach(notification => {
            notification.classList.remove('unread');
        });
        
        // Update badge count
        document.querySelector('.notification-badge').textContent = '0';
    });
    
    // Current location button
    const currentLocationBtn = document.getElementById('currentLocationBtn');
    
    currentLocationBtn.addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    // In a real app, you would use the location to determine local seasonal data
                    alert('Location detected! Updating seasonal tips for your area.');
                    
                    // For demo, set to autumn
                    seasonSelect.value = 'autumn';
                    monthSelect.value = 'september';
                    updateSeasonDisplay();
                },
                function(error) {
                    alert('Unable to get your location. Please enable location services.');
                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    });
    
    // Recipe filter functionality
    const recipeFilters = document.querySelectorAll('.filter-select');
    
    recipeFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            // In a real app, this would filter the recipes
            console.log(`Filter changed: ${this.value}`);
        });
    });
});