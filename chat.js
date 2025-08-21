document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const seasonIndicator = document.getElementById('current-season');
    const body = document.body;
    
    // Determine current season
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // January is 0
    let currentSeason = '';
    
    if (month >= 3 && month <= 5) {
        currentSeason = 'spring';
    } else if (month >= 6 && month <= 8) {
        currentSeason = 'summer';
    } else if (month >= 9 && month <= 11) {
        currentSeason = 'fall';
    } else {
        currentSeason = 'winter';
    }
    
    // Apply season theme
    body.classList.add(currentSeason);
    seasonIndicator.textContent = currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1);
    
    // Seasonal responses
    const seasonalResponses = {
        spring: {
            greetings: ["Spring is here! The flowers are blooming and the days are getting longer.", 
                        "What a lovely spring day! Have you seen the cherry blossoms yet?"],
            activities: ["It's a great time for gardening or a picnic in the park!", 
                         "Why not try some spring cleaning or visit a botanical garden?"],
            weather: ["Spring weather can be unpredictable - sunny one moment, rainy the next!", 
                      "The temperatures are mild, perfect for outdoor activities!"]
        },
        summer: {
            greetings: ["Summer is in full swing! Don't forget your sunscreen!", 
                        "Hot enough for you? Stay hydrated in this summer heat!"],
            activities: ["Perfect time for a beach day or a barbecue with friends!", 
                         "Consider going camping or having a water balloon fight to cool off!"],
            weather: ["Expect hot days and warm nights - typical summer weather!", 
                      "Watch out for those summer thunderstorms that pop up in the afternoon!"]
        },
        fall: {
            greetings: ["The leaves are changing - my favorite time of year!", 
                        "Crisp autumn air and pumpkin spice everything - love it!"],
            activities: ["Apple picking and hayrides are classic fall activities!", 
                         "It's the perfect season for hiking to see the fall foliage!"],
            weather: ["Cool, crisp days and chilly nights - sweater weather!", 
                      "The weather is perfect for enjoying a hot drink outdoors!"]
        },
        winter: {
            greetings: ["Brrr! Winter has arrived - stay warm out there!", 
                        "The world looks so beautiful covered in snow, don't you think?"],
            activities: ["Time for skiing, snowboarding, or building a snowman!", 
                         "Nothing beats curling up with a good book by the fire on cold winter days."],
            weather: ["Bundle up - it's cold out there with possible snow showers!", 
                      "Short days and long nights - winter is here in full force!"]
        }
    };
    
    // General responses
    const generalResponses = [
        "That's interesting! Tell me more.",
        "I see. How does that make you feel?",
        "Fascinating! I'll have to think about that.",
        "Thanks for sharing that with me.",
        "I appreciate your perspective on that.",
        "Let me ponder that for a moment...",
        "That reminds me of something seasonal...",
        "What a thoughtful thing to say!"
    ];
    
    // Add message to chat
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Generate bot response
    function generateResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Check for season-specific keywords
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            const greetings = seasonalResponses[currentSeason].greetings;
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
        else if (lowerMessage.includes('activity') || lowerMessage.includes('do') || lowerMessage.includes('fun')) {
            const activities = seasonalResponses[currentSeason].activities;
            return activities[Math.floor(Math.random() * activities.length)];
        }
        else if (lowerMessage.includes('weather') || lowerMessage.includes('temperature')) {
            const weather = seasonalResponses[currentSeason].weather;
            return weather[Math.floor(Math.random() * weather.length)];
        }
        else if (lowerMessage.includes('season') || lowerMessage.includes(currentSeason)) {
            return `You mentioned ${currentSeason}! ${seasonalResponses[currentSeason].greetings[0]}`;
        }
        else {
            // Default random response
            return generalResponses[Math.floor(Math.random() * generalResponses.length)];
        }
    }
    
    // Handle user input
    function handleUserInput() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            
            // Simulate thinking delay
            setTimeout(() => {
                const response = generateResponse(message);
                addMessage(response, false);
            }, 800);
        }
    }
    
    // Event listeners
    sendButton.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
    
    // Initial welcome message
    setTimeout(() => {
        const welcomeResponses = seasonalResponses[currentSeason].greetings;
        addMessage(welcomeResponses[Math.floor(Math.random() * welcomeResponses.length)], false);
    }, 1000);
});