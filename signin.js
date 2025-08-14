        // API configuration
        const API_BASE_URL = 'http://localhost:3000/api';
        
        // Set seasonal tip
        const seasonTips = {
            spring: "Spring is the best time to plant most vegetables as the soil warms up.",
            summer: "Water your garden in the early morning to reduce evaporation during summer heat.",
            autumn: "Autumn leaves make excellent compost material - collect them now!",
            winter: "Winter is perfect for planning next year's garden on paper."
        };
        
        // Get current season
        function getCurrentSeason() {
            const month = new Date().getMonth() + 1;
            if (month >= 3 && month <= 5) return 'spring';
            if (month >= 6 && month <= 8) return 'summer';
            if (month >= 9 && month <= 11) return 'autumn';
            return 'winter';
        }
        
        // Initialize page
        function initializePage() {
            const currentSeason = getCurrentSeason();
            const seasonTipElement = document.getElementById('seasonTip');
            
            // Set seasonal tip and theme
            if (seasonTipElement) {
                seasonTipElement.textContent = seasonTips[currentSeason] || '';
            }
            
            // Apply seasonal theme
            document.body.classList.add(`season-${currentSeason}`);
            
            // Check if user is already logged in
            if (localStorage.getItem('seazonai-token')) {
                window.location.href = 'dashboard.html';
            }
        }
        
        // Validate email format
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        // Validate password
        function validatePassword(password) {
            return password.length >= 8;
        }
        
        // Show error message
        function showError(elementId, message) {
            const element = document.getElementById(elementId);
            element.textContent = message;
            element.style.display = 'block';
        }
        
        // Hide error message
        function hideError(elementId) {
            const element = document.getElementById(elementId);
            element.style.display = 'none';
        }
        
        // Handle form submission
        async function handleSignIn(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const submitBtn = document.getElementById('submitBtn');
            
            // Reset error messages
            hideError('emailError');
            hideError('passwordError');
            
            // Validate inputs
            let isValid = true;
            
            if (!email) {
                showError('emailError', 'Email is required');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError('emailError', 'Please enter a valid email');
                isValid = false;
            }
            
            if (!password) {
                showError('passwordError', 'Password is required');
                isValid = false;
            } else if (!validatePassword(password)) {
                showError('passwordError', 'Password must be at least 8 characters');
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Disable submit button to prevent multiple submissions
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
            
            try {
                const response = await fetch(`${API_BASE_URL}/auth/signin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.message || 'Sign in failed');
                }
                
                // Store token and user data
                localStorage.setItem('seazonai-token', data.token);
                localStorage.setItem('seazonai-user', JSON.stringify(data.user));
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } catch (error) {
                showError('passwordError', error.message);
                console.error('Sign in error:', error);
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
            }
        }
        
        // Initialize social login buttons
        function initializeSocialButtons() {
            document.getElementById('googleSignIn').addEventListener('click', async function() {
                try {
                    // In a real app, you would implement Google OAuth here
                    // This is a simulation for demo purposes
                    console.log('Google sign-in clicked');
                    
                    // Simulate successful Google sign-in
                    const response = await fetch(`${API_BASE_URL}/auth/google`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    const data = await response.json();
                    
                    if (!response.ok) {
                        throw new Error(data.message || 'Google sign in failed');
                    }
                    
                    // Store token and user data
                    localStorage.setItem('seazonai-token', data.token);
                    localStorage.setItem('seazonai-user', JSON.stringify(data.user));
                    
                    // Redirect to dashboard
                    window.location.href = 'dashboard.html';
                } catch (error) {
                    showError('passwordError', error.message);
                    console.error('Google sign in error:', error);
                }
            });
            
            document.getElementById('appleSignIn').addEventListener('click', async function() {
                try {
                    // In a real app, you would implement Apple OAuth here
                    console.log('Apple sign-in clicked');
                    
                    // Simulate successful Apple sign-in
                    const response = await fetch(`${API_BASE_URL}/auth/apple`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    const data = await response.json();
                    
                    if (!response.ok) {
                        throw new Error(data.message || 'Apple sign in failed');
                    }
                    
                    // Store token and user data
                    localStorage.setItem('seazonai-token', data.token);
                    localStorage.setItem('seazonai-user', JSON.stringify(data.user));
                    
                    // Redirect to dashboard
                    window.location.href = 'dashboard.html';
                } catch (error) {
                    showError('passwordError', error.message);
                    console.error('Apple sign in error:', error);
                }
            });
        }
        
        // Initialize the page when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            initializePage();
            document.getElementById('signinForm').addEventListener('submit', handleSignIn);
            initializeSocialButtons();
        });