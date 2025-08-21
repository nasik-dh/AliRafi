        // DOM Elements
        const sideNav = document.getElementById('sideNav');
        const navToggle = document.getElementById('navToggle');
        const themeToggle = document.getElementById('themeToggle');
        const seasonToggle = document.getElementById('seasonToggle');
        const weatherBtn = document.getElementById('weatherBtn');
        const weatherWidget = document.getElementById('weatherWidget');
        const userInput = document.getElementById('userInput');
        const sendButton = document.getElementById('sendButton');
        const chatBox = document.getElementById('chatBox');
        const typingIndicator = document.getElementById('typingIndicator');
        const quickButtons = document.querySelectorAll('.quick-btn');
        const newChatBtn = document.getElementById('newChatBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const seasonEffects = document.getElementById('seasonEffects');
        const seasonText = document.getElementById('seasonText');

        // Season data
        const seasons = ['spring', 'summer', 'autumn', 'winter'];
        const seasonNames = ['Spring', 'Summer', 'Autumn', 'Winter'];
        let currentSeasonIndex = 0;

        // Theme management
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
        document.body.setAttribute('data-theme', currentTheme);
        updateThemeIcon();

        // Season from local storage or current month
        const currentMonth = new Date().getMonth();
        const savedSeason = localStorage.getItem('season');
        
        if (savedSeason) {
            currentSeasonIndex = seasons.indexOf(savedSeason);
            document.body.setAttribute('data-season', savedSeason);
            seasonText.textContent = seasonNames[currentSeasonIndex];
        } else {
            // Set season based on current month
            if (currentMonth >= 2 && currentMonth <= 4) { // Spring: March-May
                currentSeasonIndex = 0;
            } else if (currentMonth >= 5 && currentMonth <= 7) { // Summer: June-August
                currentSeasonIndex = 1;
            } else if (currentMonth >= 8 && currentMonth <= 10) { // Autumn: September-November
                currentSeasonIndex = 2;
            } else { // Winter: December-February
                currentSeasonIndex = 3;
            }
            document.body.setAttribute('data-season', seasons[currentSeasonIndex]);
            seasonText.textContent = seasonNames[currentSeasonIndex];
            localStorage.setItem('season', seasons[currentSeasonIndex]);
        }

        // Initialize seasonal effects
        createSeasonalEffects();

        // Event Listeners
        navToggle.addEventListener('click', () => {
            sideNav.classList.toggle('active');
        });

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon();
        });

        seasonToggle.addEventListener('click', () => {
            currentSeasonIndex = (currentSeasonIndex + 1) % seasons.length;
            const newSeason = seasons[currentSeasonIndex];
            document.body.setAttribute('data-season', newSeason);
            seasonText.textContent = seasonNames[currentSeasonIndex];
            localStorage.setItem('season', newSeason);
            
            // Update seasonal effects
            clearSeasonalEffects();
            createSeasonalEffects();
        });

        weatherBtn.addEventListener('click', () => {
            weatherWidget.style.display = weatherWidget.style.display === 'block' ? 'none' : 'block';
            if (weatherWidget.style.display === 'block') {
                getWeather();
            }
        });

        function toggleWeather() {
            weatherWidget.style.display = 'none';
        }

        sendButton.addEventListener('click', sendMessage);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        quickButtons.forEach(button => {
            button.addEventListener('click', () => {
                userInput.value = button.getAttribute('data-prompt');
                sendMessage();
            });
        });

        newChatBtn.addEventListener('click', () => {
            // Clear chat except welcome message
            const welcomeMessage = document.querySelector('.welcome-message');
            chatBox.innerHTML = '';
            chatBox.appendChild(welcomeMessage);
        });

        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to sign out?')) {
                // Simulate logout
                alert('You have been signed out.');
                // In a real app, you would redirect to login page
            }
        });

        // Voice recognition
        let recognition = null;
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.continuous = false;
            recognition.lang = 'en-US';
            
            document.getElementById('voiceButton').addEventListener('click', () => {
                if (recognition) {
                    recognition.start();
                    document.getElementById('voiceButton').innerHTML = '<i class="fas fa-microphone-slash"></i>';
                }
            });
            
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                userInput.value = transcript;
                document.getElementById('voiceButton').innerHTML = '<i class="fas fa-microphone"></i>';
            };
            
            recognition.onerror = () => {
                document.getElementById('voiceButton').innerHTML = '<i class="fas fa-microphone"></i>';
            };
        } else {
            document.getElementById('voiceButton').style.display = 'none';
        }

        // Functions
        function updateThemeIcon() {
            const theme = document.body.getAttribute('data-theme');
            themeToggle.innerHTML = theme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        }

        function getWeather() {
            // In a real app, you would use a weather API
            // This is a simulation with random data
            const locations = ['New York', 'London', 'Tokyo', 'Sydney', 'Paris'];
            const weatherConditions = ['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Partly Cloudy'];
            const randomLocation = locations[Math.floor(Math.random() * locations.length)];
            const randomTemp = Math.floor(Math.random() * 30) + 5; // 5-35°C
            const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
            const randomWind = Math.floor(Math.random() * 30) + 5; // 5-35 km/h
            const randomHumidity = Math.floor(Math.random() * 50) + 30; // 30-80%
            
            document.getElementById('weatherLocation').textContent = randomLocation;
            document.getElementById('weatherTemp').textContent = `${randomTemp}°C`;
            document.getElementById('weatherDesc').textContent = randomCondition;
            document.getElementById('weatherWind').textContent = `${randomWind} km/h`;
            document.getElementById('weatherHumidity').textContent = `${randomHumidity}%`;
        }

        function sendMessage() {
            const message = userInput.value.trim();
            if (!message) return;
            
            // Add user message to chat
            addMessage(message, 'user');
            userInput.value = '';
            
            // Show typing indicator
            typingIndicator.style.display = 'flex';
            
            // Simulate AI response after a delay
            setTimeout(() => {
                typingIndicator.style.display = 'none';
                const aiResponse = generateAIResponse(message);
                addMessage(aiResponse, 'ai');
                
                // Scroll to bottom
                chatBox.scrollTop = chatBox.scrollHeight;
            }, 1500);
        }

        function addMessage(content, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', sender);
            
            const avatar = document.createElement('div');
            avatar.classList.add('avatar');
            
            if (sender === 'user') {
                avatar.innerHTML = '<span>AJ</span>';
            } else {
                avatar.innerHTML = '<i class="fas fa-leaf"></i>';
                avatar.classList.add('ai-avatar');
            }
            
            const messageContent = document.createElement('div');
            messageContent.classList.add('message-content');
            messageContent.textContent = content;
            
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(messageContent);
            
            chatBox.appendChild(messageDiv);
            
            // Scroll to bottom
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        function generateAIResponse(message) {
            // Simple response logic - in a real app, you would use an AI API
            const lowerMessage = message.toLowerCase();
            const responses = {
                'season': `During ${seasonNames[currentSeasonIndex]}, I recommend enjoying seasonal produce like ${getSeasonalProduce()}.`,
                'recipe': `Here's a great ${seasonNames[currentSeasonIndex]} recipe: ${getSeasonalRecipe()}.`,
                'garden': `In ${seasonNames[currentSeasonIndex]}, you should consider planting ${getGardeningTips()}.`,
                'activity': `For ${seasonNames[currentSeasonIndex]} activities, why not try ${getSeasonalActivity()}?`,
                'default': `I understand you're asking about "${message}". As your ${seasonNames[currentSeasonIndex]} assistant, I can help with seasonal recipes, gardening tips, and activities. Would you like more specific information?`
            };
            
            if (lowerMessage.includes('season') || lowerMessage.includes('produce')) {
                return responses['season'];
            } else if (lowerMessage.includes('recipe') || lowerMessage.includes('food') || lowerMessage.includes('cook')) {
                return responses['recipe'];
            } else if (lowerMessage.includes('garden') || lowerMessage.includes('plant')) {
                return responses['garden'];
            } else if (lowerMessage.includes('activity') || lowerMessage.includes('do') || lowerMessage.includes('weekend')) {
                return responses['activity'];
            } else {
                return responses['default'];
            }
        }

        function getSeasonalProduce() {
            const produce = {
                'spring': 'asparagus, strawberries, and peas',
                'summer': 'tomatoes, corn, and berries',
                'autumn': 'apples, pumpkins, and squash',
                'winter': 'citrus fruits, kale, and root vegetables'
            };
            return produce[seasons[currentSeasonIndex]];
        }

        function getSeasonalRecipe() {
            const recipes = {
                'spring': 'asparagus and lemon pasta with fresh herbs',
                'summer': 'grilled vegetable skewers with basil pesto',
                'autumn': 'roasted butternut squash soup with sage',
                'winter': 'hearty vegetable stew with crusty bread'
            };
            return recipes[seasons[currentSeasonIndex]];
        }

        function getGardeningTips() {
            const tips = {
                'spring': 'tomatoes, peppers, and basil as the weather warms',
                'summer': 'quick-growing greens like arugula and beans for a late harvest',
                'autumn': 'garlic and onions for next year, plus cool-weather crops like spinach',
                'winter': 'planning your garden and starting seeds indoors'
            };
            return tips[seasons[currentSeasonIndex]];
        }

        function getSeasonalActivity() {
            const activities = {
                'spring': 'visiting a local farmers market or taking a nature walk to see spring blooms',
                'summer': 'outdoor picnics or visiting a pick-your-own berry farm',
                'autumn': 'apple picking or hiking to enjoy the fall foliage',
                'winter': 'building a snowman or visiting a holiday market'
            };
            return activities[seasons[currentSeasonIndex]];
        }

        function createSeasonalEffects() {
            const season = seasons[currentSeasonIndex];
            let effectElement;
            
            switch(season) {
                case 'spring':
                    createFallingElements('petal', 15, '#ffb7c5');
                    break;
                case 'summer':
                    // Create sun rays in corners
                    for (let i = 0; i < 4; i++) {
                        effectElement = document.createElement('div');
                        effectElement.classList.add('sun-ray');
                        effectElement.style.width = '200px';
                        effectElement.style.height = '200px';
                        effectElement.style.top = i < 2 ? '0' : 'auto';
                        effectElement.style.bottom = i >= 2 ? '0' : 'auto';
                        effectElement.style.left = i % 2 === 0 ? '0' : 'auto';
                        effectElement.style.right = i % 2 !== 0 ? '0' : 'auto';
                        seasonEffects.appendChild(effectElement);
                    }
                    break;
                case 'autumn':
                    createFallingElements('leaf', 15, '#b4532a');
                    break;
                case 'winter':
                    createFallingElements('snowflake', 20, '#b3e5fc', true);
                    break;
            }
        }

        function createFallingElements(className, count, color, isText = false) {
            for (let i = 0; i < count; i++) {
                const element = document.createElement('div');
                element.classList.add(className, 'season-effect');
                
                if (isText) {
                    element.innerHTML = '❄';
                    element.style.fontSize = `${Math.random() * 10 + 10}px`;
                } else {
                    element.style.backgroundColor = color;
                    element.style.width = `${Math.random() * 10 + 5}px`;
                    element.style.height = `${Math.random() * 10 + 5}px`;
                }
                
                element.style.left = `${Math.random() * 100}vw`;
                element.style.animationDuration = `${Math.random() * 5 + 5}s`;
                element.style.opacity = Math.random() * 0.5 + 0.3;
                
                seasonEffects.appendChild(element);
                
                // Remove element after animation completes and create a new one
                setTimeout(() => {
                    element.remove();
                    createFallingElements(className, 1, color, isText);
                }, parseFloat(element.style.animationDuration) * 1000);
            }
        }

        function clearSeasonalEffects() {
            seasonEffects.innerHTML = '';
        }

        // Initialize weather if shown by default
        if (weatherWidget.style.display === 'block') {
            getWeather();
        }

        // Close side nav when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 992 && 
                !sideNav.contains(e.target) && 
                !navToggle.contains(e.target) && 
                sideNav.classList.contains('active')) {
                sideNav.classList.remove('active');
            }
        });
