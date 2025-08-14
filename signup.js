        // Set seasonal theme
        function getCurrentSeason() {
            const month = new Date().getMonth() + 1;
            if (month >= 3 && month <= 5) return 'spring';
            if (month >= 6 && month <= 8) return 'summer';
            if (month >= 9 && month <= 11) return 'autumn';
            return 'winter';
        }
        
        // Set seasonal tip
        const seasonTips = {
            spring: "Plant peas and lettuce early in spring for best results!",
            summer: "Water your garden in the early morning to reduce evaporation.",
            autumn: "Collect fallen leaves to create nutrient-rich compost.",
            winter: "Plan next year's garden during the winter months."
        };
        
        // Password strength calculation
        function calculatePasswordStrength(password) {
            if (!password) return 0;
            
            let strength = 0;
            
            // Length check
            if (password.length >= 8) strength++;
            if (password.length >= 12) strength++;
            
            // Complexity checks
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;
            
            return Math.min(Math.floor(strength / 2), 3);
        }
        
        // Update password strength indicator
        function updateStrengthIndicator(strength) {
            const bars = document.querySelectorAll('.strength-bar');
            const text = document.querySelector('.strength-text');
            
            // Reset all bars
            bars.forEach(bar => {
                bar.style.backgroundColor = '#e0e0e0';
            });
            
            // Set colors based on strength
            if (strength === 0) {
                text.textContent = 'Too weak';
                text.style.color = 'var(--error-color)';
            } else if (strength === 1) {
                bars[0].style.backgroundColor = 'var(--error-color)';
                text.textContent = 'Weak';
                text.style.color = 'var(--error-color)';
            } else if (strength === 2) {
                bars[0].style.backgroundColor = 'var(--warning-color)';
                bars[1].style.backgroundColor = 'var(--warning-color)';
                text.textContent = 'Good';
                text.style.color = 'var(--warning-color)';
            } else {
                bars[0].style.backgroundColor = 'var(--success-color)';
                bars[1].style.backgroundColor = 'var(--success-color)';
                bars[2].style.backgroundColor = 'var(--success-color)';
                text.textContent = 'Strong';
                text.style.color = 'var(--success-color)';
            }
        }
        
        // Form validation
        function validateForm() {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validate passwords match
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return false;
            }
            
            // Validate password strength
            if (calculatePasswordStrength(password) < 2) {
                alert('Please choose a stronger password (minimum 8 characters with uppercase, number, or special character)');
                return false;
            }
            
            return true;
        }
        
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            const season = getCurrentSeason();
            document.body.className = `season-${season}`;
            document.getElementById('seasonTip').textContent = seasonTips[season];
            
            // Password strength indicator
            const passwordInput = document.getElementById('password');
            passwordInput.addEventListener('input', function() {
                const strength = calculatePasswordStrength(this.value);
                updateStrengthIndicator(strength);
            });
            
            // Toggle password visibility
            document.querySelector('.toggle-password').addEventListener('click', function() {
                const icon = this.querySelector('i');
                const passwordField = document.getElementById('password');
                
                if (passwordField.type === 'password') {
                    passwordField.type = 'text';
                    icon.classList.replace('fa-eye', 'fa-eye-slash');
                    this.setAttribute('aria-label', 'Hide password');
                } else {
                    passwordField.type = 'password';
                    icon.classList.replace('fa-eye-slash', 'fa-eye');
                    this.setAttribute('aria-label', 'Show password');
                }
            });
            
            // Form submission
            document.getElementById('signupForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (!validateForm()) return;
                
                // Get form values
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                // In a real app, you would send this to your backend
                console.log('Signing up:', { name, email, password });
                
                // Store user data and redirect (simulated)
                localStorage.setItem('seazonai-user', JSON.stringify({
                    name: name,
                    email: email,
                    season: getCurrentSeason()
                }));
                localStorage.setItem('seazonai-authenticated', 'true');
                
                // Redirect to main app
                window.location.href = '../index.html';
            });
            
            // Social login buttons
            document.querySelector('.google-btn').addEventListener('click', function() {
                alert('Google login would be implemented here');
            });
            
            document.querySelector('.apple-btn').addEventListener('click', function() {
                alert('Apple login would be implemented here');
            });
        });