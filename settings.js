document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const editProfileBtn = document.getElementById('editProfileBtn');
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    const saveLocationBtn = document.getElementById('saveLocationBtn');
    const profileModal = document.getElementById('profileModal');
    const passwordModal = document.getElementById('passwordModal');
    const deleteModal = document.getElementById('deleteModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const profileForm = document.getElementById('profileForm');
    const passwordForm = document.getElementById('passwordForm');
    const profileAvatar = document.getElementById('profileAvatar');
    const avatarPreview = document.getElementById('avatarPreview');
    const themeOptions = document.querySelectorAll('.theme-option');
    const themeToggle = document.getElementById('themeToggle');


    // Open modals
    editProfileBtn.addEventListener('click', () => profileModal.style.display = 'flex');
    changePasswordBtn.addEventListener('click', () => passwordModal.style.display = 'flex');
    deleteAccountBtn.addEventListener('click', () => deleteModal.style.display = 'flex');


    // Close modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });


    cancelDeleteBtn.addEventListener('click', () => deleteModal.style.display = 'none');


    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });


    // Save location
    saveLocationBtn.addEventListener('click', function() {
        const location = document.getElementById('locationInput').value;
        if (location.trim() === '') return;
       
        // In a real app, this would save to the server
        alert(`Location saved: ${location}`);
    });


    // Profile form submission
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('profileName').value;
        const email = document.getElementById('profileEmail').value;
       
        // In a real app, this would update the profile
        alert(`Profile updated: ${name}, ${email}`);
        profileModal.style.display = 'none';
    });


    // Password form submission
    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
       
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
       
        // In a real app, this would update the password
        alert('Password updated successfully');
        passwordModal.style.display = 'none';
        this.reset();
    });


    // Delete account confirmation
    confirmDeleteBtn.addEventListener('click', function() {
        // In a real app, this would delete the account
        alert('Account deletion would be processed here');
        deleteModal.style.display = 'none';
    });


    // Avatar preview
    profileAvatar.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                avatarPreview.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });


    // Theme selection
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
           
            // Remove active class from all options
            themeOptions.forEach(opt => opt.classList.remove('active'));
           
            // Add active class to clicked option
            this.classList.add('active');
           
            // Set theme
            if (theme === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
                localStorage.removeItem('theme');
            } else {
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('theme', theme);
            }
           
            // Update theme toggle icon
            updateThemeToggleIcon();
        });
    });


    // Update theme toggle icon based on current theme
    function updateThemeToggleIcon() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }


    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeOptions.forEach(opt => {
            opt.classList.toggle('active', opt.getAttribute('data-theme') === savedTheme);
        });
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeOptions.forEach(opt => {
            opt.classList.toggle('active', opt.getAttribute('data-theme') === 'system');
        });
    }
   
    updateThemeToggleIcon();
});


// Add these to your existing common.js


// Scroll to bottom of chat box
function scrollToBottom(element) {
    if (element) {
        element.scrollTop = element.scrollHeight;
    }
}


// Initialize scrolling for all pages
function initScroll() {
    // Chat page scrolling
    const chatBox = document.getElementById('chatBox');
    if (chatBox) {
        scrollToBottom(chatBox);
       
        // Scroll to bottom when new message is added
        const observer = new MutationObserver(() => {
            scrollToBottom(chatBox);
        });
        observer.observe(chatBox, { childList: true });
    }
   
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}


// Call initScroll when DOM is loaded
document.addEventListener('DOMContentLoaded', initScroll);

