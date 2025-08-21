document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const signinForm = document.getElementById('signinForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const submitBtn = document.getElementById('submitBtn');
    
    // Social login buttons
    const googleSignIn = document.getElementById('googleSignIn');
    const appleSignIn = document.getElementById('appleSignIn');
    
    // Seasonal tip
    const seasonTip = document.getElementById('seasonTip');
    
    // Seasonal tips data
    const seasonalTips = [
        "Eating seasonally can improve your health by providing nutrients at their peak.",
        "Seasonal produce is often cheaper and tastes better than out-of-season alternatives.",
        "Buying seasonal food supports local farmers and reduces transportation emissions.",
        "Seasonal eating helps maintain biodiversity by supporting varied crop production.",
        "Food in season contains more antioxidants as it's harvested at peak ripeness."
    ];
    
    // Set a random seasonal tip
    if (seasonTip) {
        const randomTip = seasonalTips[Math.floor(Math.random() * seasonalTips.length)];
        seasonTip.textContent = randomTip;
    }
    
    // Email validation
    emailInput.addEventListener('input', function() {
        const email = emailInput.value.trim();
        if (!email || !isValidEmail(email)) {
            emailError.style.display = 'block';
        } else {
            emailError.style.display = 'none';
        }
    });
    
    // Password validation
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        if (password.length < 8) {
            passwordError.style.display = 'block';
        } else {
            passwordError.style.display = 'none';
        }
    });
    
    // Form submission
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            
            // Validate inputs
            let isValid = true;
            
            if (!email || !isValidEmail(email)) {
                emailError.style.display = 'block';
                isValid = false;
            } else {
                emailError.style.display = 'none';
            }
            
            if (password.length < 8) {
                passwordError.style.display = 'block';
                isValid = false;
            } else {
                passwordError.style.display = 'none';
            }
            
            if (isValid) {
                // Simulate form submission
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
                submitBtn.disabled = true;
                
                // In a real app, you would send this data to your server
                console.log('Signing in with:', { email, password });
                
                // Simulate API call
                setTimeout(() => {
                    alert('Sign in successful! (This is a demo)');
                    submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
    
    // Social login handlers
    if (googleSignIn) {
        googleSignIn.addEventListener('click', function() {
            console.log('Google sign-in clicked');
            // Implement Google OAuth here
            alert('Google sign-in would be implemented here');
        });
    }
    
    if (appleSignIn) {
        appleSignIn.addEventListener('click', function() {
            console.log('Apple sign-in clicked');
            // Implement Apple OAuth here
            alert('Apple sign-in would be implemented here');
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});