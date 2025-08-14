document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    
    logoutBtn.addEventListener('click', function() {
        // Show confirmation dialog
        const confirmed = confirm('Are you sure you want to log out?');
        
        if (confirmed) {
            // In a real app, you would call your authentication service here
            console.log('User logged out');
            
            // For demonstration, just redirect to a login page
            window.location.href = 'login.html';
        }
    });
});