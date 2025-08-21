// Main Application Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initTheme();
    initSeason();
    initNavigation();
    initWeatherWidget();
    initChat();
    initModals();
    initAuth();
    initOfflineDetection();
    
    // Check for service worker support
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('ServiceWorker registration successful');
            }).catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
});

// Theme Management
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    
    // Set initial theme
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.body.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Season Management
function initSeason() {
    const seasonToggle = document.getElementById('seasonToggle');
    const seasonDropdown = document.getElementById('seasonDropdown');
    const currentSeason = document.getElementById('currentSeason');
    
    // Set initial season based on current month
    const month = new Date().getMonth();
    let season = 'spring';
    
    if (month >= 2 && month <= 4) season = 'spring';
    else if (month >= 5 && month <= 7) season = 'summer';
    else if (month >= 8 && month <= 10) season = 'autumn';
    else season = 'winter';
    
    // Apply saved season or default
    const savedSeason = localStorage.getItem('season') || season;
    document.body.setAttribute('data-season', savedSeason);
    currentSeason.textContent = savedSeason.charAt(0).toUpperCase() + savedSeason.slice(1);
    
    // Toggle season dropdown
    seasonToggle.addEventListener('click', () => {
        seasonDropdown.style.display = seasonDropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    // Handle season selection
    document.querySelectorAll('#seasonDropdown button').forEach(button => {
        button.addEventListener('click', () => {
            const selectedSeason = button.getAttribute('data-season');
            document.body.setAttribute('data-season', selectedSeason);
            localStorage.setItem('season', selectedSeason);
            currentSeason.textContent = selectedSeason.charAt(0).toUpperCase() + selectedSeason.slice(1);
            seasonDropdown.style.display = 'none';
            
            // Update UI elements based on season
            updateSeasonalUI(selectedSeason);
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!seasonToggle.contains(e.target) && !seasonDropdown.contains(e.target)) {
            seasonDropdown.style.display = 'none';
        }
    });
}

function updateSeasonalUI(season) {
    // Update any seasonal UI elements here
    console.log(`Season changed to ${season}`);
}

// Navigation Management
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sideNav = document.getElementById('sideNav');
    
    // Toggle side navigation
    navToggle.addEventListener('click', () => {
        sideNav.classList.toggle('open');
    });
    
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
        sideNav.classList.toggle('open');
    });
    
    // Close nav when clicking on a link (for mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                sideNav.classList.remove('open');
            }
        });
    });
    
    // Chat history toggle
    const historyToggle = document.getElementById('historyToggle');
    const chatHistorySidebar = document.getElementById('chatHistorySidebar');
    const closeHistory = document.getElementById('closeHistory');
    
    historyToggle.addEventListener('click', () => {
        chatHistorySidebar.classList.toggle('open');
    });
    
    closeHistory.addEventListener('click', () => {
        chatHistorySidebar.classList.remove('open');
    });
}

// Weather Widget
function initWeatherWidget() {
    const weatherBtn = document.getElementById('weatherBtn');
    const weatherWidget = document.getElementById('weatherWidget');
    const closeWeather = document.getElementById('closeWeather');
    const refreshWeather = document.getElementById('refreshWeather');
    
    // Toggle weather widget
    weatherBtn.addEventListener('click', () => {
        weatherWidget.style.display = weatherWidget.style.display === 'block' ? 'none' : 'block';
        if (weatherWidget.style.display === 'block') {
            // Load weather data when widget is shown
            loadWeatherData();
        }
    });
    
    closeWeather.addEventListener('click', () => {
        weatherWidget.style.display = 'none';
    });
    
    refreshWeather.addEventListener('click', () => {
        loadWeatherData();
    });
    
    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!weatherBtn.contains(e.target) && !weatherWidget.contains(e.target)) {
            weatherWidget.style.display = 'none';
        }
    });
}

function loadWeatherData() {
    // This would be replaced with actual weather API call
    const weatherLocation = document.getElementById('weatherLocation');
    const weatherTemp = document.getElementById('weatherTemp');
    const weatherIcon = document.getElementById('weatherIcon');
    const weatherDesc = document.getElementById('weatherDesc');
    const weatherWind = document.getElementById('weatherWind');
    const weatherHumidity = document.getElementById('weatherHumidity');
    const weatherLow = document.getElementById('weatherLow');
    const weatherHigh = document.getElementById('weatherHigh');
    const weatherForecast = document.getElementById('weatherForecast');
    
    // Show loading state
    weatherLocation.textContent = 'Detecting location...';
    weatherTemp.textContent = '--°';
    weatherIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    weatherDesc.textContent = 'Loading weather data...';
    weatherWind.textContent = '-- km/h';
    weatherHumidity.textContent = '--%';
    weatherLow.textContent = '--°';
    weatherHigh.textContent = '--°';
    
    // Simulate API call with timeout
    setTimeout(() => {
        // Mock data - in a real app, you would use a weather API
        weatherLocation.textContent = 'New York, NY';
        weatherTemp.textContent = '22°';
        weatherIcon.innerHTML = '<i class="fas fa-sun"></i>';
        weatherDesc.textContent = 'Sunny';
        weatherWind.textContent = '12 km/h';
        weatherHumidity.textContent = '45%';
        weatherLow.textContent = '18°';
        weatherHigh.textContent = '25°';
        
        // Generate forecast
        weatherForecast.innerHTML = '';
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const icons = ['sun', 'cloud-sun', 'cloud', 'cloud-rain', 'bolt'];
        
        for (let i = 0; i < 5; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const day = days[date.getDay()];
            const icon = icons[Math.floor(Math.random() * icons.length)];
            const temp = Math.floor(Math.random() * 10) + 18;
            
            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            forecastItem.innerHTML = `
                <div class="forecast-day">${day}</div>
                <div class="forecast-icon"><i class="fas fa-${icon}"></i></div>
                <div class="forecast-temp">${temp}°</div>
            `;
            weatherForecast.appendChild(forecastItem);
        }
    }, 1500);
}

// Chat Functionality
function initChat() {
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const quickBtns = document.querySelectorAll('.quick-btn');
    const newChatBtn = document.getElementById('newChatBtn');
    const typingIndicator = document.getElementById('typingIndicator');
    const characterCount = document.getElementById('characterCount');
    const suggestionsDropdown = document.getElementById('suggestionsDropdown');
    
    // Character count
    userInput.addEventListener('input', () => {
        const count = userInput.value.length;
        characterCount.textContent = `${count}/500`;
        
        // Show/hide suggestions based on input
        if (count > 0) {
            showSuggestions(userInput.value);
        } else {
            suggestionsDropdown.style.display = 'none';
        }
    });
    
    // Send message on Enter key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && userInput.value.trim() !== '') {
            sendMessage();
        }
    });
    
    // Send message on button click
    sendButton.addEventListener('click', () => {
        if (userInput.value.trim() !== '') {
            sendMessage();
        }
    });
    
    // Quick action buttons
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            userInput.value = btn.getAttribute('data-prompt');
            userInput.focus();
        });
    });
    
    // New chat button
    newChatBtn.addEventListener('click', () => {
        document.getElementById('newChatModal').classList.add('active');
    });
    
    // Suggestions dropdown
    document.addEventListener('click', (e) => {
        if (!userInput.contains(e.target) && !suggestionsDropdown.contains(e.target)) {
            suggestionsDropdown.style.display = 'none';
        }
    });
    
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addMessageToChat('user', message);
        userInput.value = '';
        characterCount.textContent = '0/500';
        suggestionsDropdown.style.display = 'none';
        
        // Show typing indicator
        typingIndicator.style.display = 'flex';
        
        // Simulate AI response after delay
        setTimeout(() => {
            typingIndicator.style.display = 'none';
            addMessageToChat('ai', getAIResponse(message));
            
            // Scroll to bottom of chat
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1500 + Math.random() * 2000);
    }
    
    function addMessageToChat(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="ai-avatar">
                ${sender === 'ai' ? '<img src="assets/ai-avatar.png" alt="AI Avatar">' : '<span>You</span>'}
            </div>
            <div class="message-bubble">
                ${message}
                <div class="message-time">${time}</div>
            </div>
        `;
        
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    function getAIResponse(message) {
        // In a real app, this would call an AI API
        const responses = {
            'hello': 'Hello there! How can I help you with seasonal tips today?',
            'what\'s in season': 'Based on your location and the current season, here are some items in season...',
            'recipe': 'I can suggest a delicious seasonal recipe. What type of dish are you looking for?',
            'garden': 'For this time of year, I recommend planting...',
            'weather': 'The current weather in your area is perfect for...',
            'default': 'I\'m your seasonal assistant. I can help with recipes, gardening tips, and seasonal activities. What would you like to know?'
        };
        
        message = message.toLowerCase();
        
        if (message.includes('hello') || message.includes('hi')) return responses['hello'];
        if (message.includes('season')) return responses['what\'s in season'];
        if (message.includes('recipe')) return responses['recipe'];
        if (message.includes('garden') || message.includes('plant')) return responses['garden'];
        if (message.includes('weather')) return responses['weather'];
        
        return responses['default'];
    }
    
    function showSuggestions(input) {
        // In a real app, this would use more sophisticated suggestion logic
        const suggestions = [
            'What\'s in season this month?',
            'Suggest a healthy recipe',
            'What should I plant in my garden now?',
            'Plan seasonal activities for this weekend',
            'How do I preserve seasonal fruits?'
        ].filter(s => s.toLowerCase().includes(input.toLowerCase()));
        
        suggestionsDropdown.innerHTML = '';
        
        if (suggestions.length > 0) {
            suggestions.forEach(suggestion => {
                const item = document.createElement('div');
                item.className = 'suggestion-item';
                item.textContent = suggestion;
                item.addEventListener('click', () => {
                    userInput.value = suggestion;
                    suggestionsDropdown.style.display = 'none';
                    userInput.focus();
                });
                suggestionsDropdown.appendChild(item);
            });
            suggestionsDropdown.style.display = 'block';
        } else {
            suggestionsDropdown.style.display = 'none';
        }
    }
}

// Modal Management
function initModals() {
    const authModal = document.getElementById('authModal');
    const authBtn = document.getElementById('authBtn');
    const closeAuthModal = document.getElementById('closeAuthModal');
    const authTabs = document.querySelectorAll('.auth-tab');
    
    const newChatModal = document.getElementById('newChatModal');
    const closeNewChatModal = document.getElementById('closeNewChatModal');
    const chatTemplates = document.querySelectorAll('.chat-template');
    const confirmNewChat = document.getElementById('confirmNewChat');
    
    // Auth modal
    authBtn.addEventListener('click', () => {
        authModal.classList.add('active');
    });
    
    closeAuthModal.addEventListener('click', () => {
        authModal.classList.remove('active');
    });
    
    // Auth tabs
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            document.getElementById('loginForm').style.display = tabName === 'login' ? 'block' : 'none';
            document.getElementById('registerForm').style.display = tabName === 'register' ? 'block' : 'none';
        });
    });
    
    // New chat modal
    closeNewChatModal.addEventListener('click', () => {
        newChatModal.classList.remove('active');
    });
    
    // Chat templates
    let selectedTemplate = 'blank';
    chatTemplates.forEach(template => {
        template.addEventListener('click', () => {
            chatTemplates.forEach(t => t.classList.remove('selected'));
            template.classList.add('selected');
            selectedTemplate = template.getAttribute('data-template');
        });
    });
    
    confirmNewChat.addEventListener('click', () => {
        newChatModal.classList.remove('active');
        // In a real app, this would start a new chat session
        showNotification('New chat started', 'success');
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.remove('active');
        }
        if (e.target === newChatModal) {
            newChatModal.classList.remove('active');
        }
    });
}

// Authentication
function initAuth() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const displayUsername = document.getElementById('displayUsername');
    const displayEmail = document.getElementById('displayEmail');
    const userAvatar = document.getElementById('userAvatar');
    
    // Mock login
    loginBtn.addEventListener('click', () => {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (!email || !password) {
            showNotification('Please enter both email and password', 'error');
            return;
        }
        
        // Mock authentication
        setTimeout(() => {
            document.getElementById('authModal').classList.remove('active');
            displayUsername.textContent = 'Alex Johnson';
            displayEmail.textContent = email;
            userAvatar.innerHTML = '<img src="assets/user-avatar.jpg" alt="User avatar">';
            showNotification('Login successful', 'success');
        }, 1000);
    });
    
    // Mock registration
    registerBtn.addEventListener('click', () => {
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirm = document.getElementById('registerConfirm').value;
        
        if (!name || !email || !password || !confirm) {
            showNotification('Please fill all fields', 'error');
            return;
        }
        
        if (password !== confirm) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        // Mock registration
        setTimeout(() => {
            document.getElementById('authModal').classList.remove('active');
            displayUsername.textContent = name;
            displayEmail.textContent = email;
            userAvatar.innerHTML = `<span>${name.split(' ').map(n => n[0]).join('')}</span>`;
            showNotification('Registration successful', 'success');
            
            // Switch to login tab
            document.querySelector('.auth-tab[data-tab="login"]').click();
        }, 1000);
    });
}

// Offline Detection
function initOfflineDetection() {
    const offlineWarning = document.getElementById('offline-warning');
    
    window.addEventListener('online', () => {
        offlineWarning.style.display = 'none';
        showNotification('You are back online', 'success');
    });
    
    window.addEventListener('offline', () => {
        offlineWarning.style.display = 'block';
    });
    
    // Initial check
    if (!navigator.onLine) {
        offlineWarning.style.display = 'block';
    }
}

// Notification System
function showNotification(message, type = 'success') {
    const toast = document.getElementById('notification-toast');
    toast.textContent = message;
    toast.className = `notification-toast ${type}`;
    
    // Add appropriate icon
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    toast.insertBefore(icon, toast.firstChild);
    
    toast.classList.add('show');
    
    // Hide after delay
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}