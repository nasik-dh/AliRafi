// common.js - Shared functionality across all pages


// DOM Elements
const navToggle = document.getElementById('navToggle');
const themeToggle = document.getElementById('themeToggle');
const logoutBtn = document.getElementById('logoutBtn');
const body = document.body;


// Toggle mobile navigation
if (navToggle) {
    navToggle.addEventListener('click', () => {
        document.querySelector('.side-nav').classList.toggle('collapsed');
        document.querySelector('.main-content').classList.toggle('expanded');
    });
}


// Theme functionality
function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.classList.remove('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    localStorage.setItem('theme', theme);
}


// Initialize theme from localStorage or prefer-color-scheme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
   
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
            applyTheme(currentTheme);
        });
    }
}


// Logout functionality
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        // In a real app, this would call your authentication service
        console.log('User logged out');
        // Redirect to login page
        window.location.href = 'login.html';
    });
}


// Modal handling
function setupModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
   
    // Close modal when clicking X
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });
   
    // Close modal when clicking outside content
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}


// Initialize common functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupModals();
   
    // Handle theme options if they exist on this page
    const themeOptions = document.querySelectorAll('.theme-option');
    if (themeOptions) {
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                themeOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                const theme = option.dataset.theme;
               
                if (theme === 'system') {
                    // Use system preference
                    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    applyTheme(systemPrefersDark ? 'dark' : 'light');
                    // Listen for system theme changes
                    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                        applyTheme(e.matches ? 'dark' : 'light');
                    });
                } else {
                    applyTheme(theme);
                }
            });
        });
    }
});


// Responsive adjustments
window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        document.querySelector('.side-nav').classList.add('collapsed');
        document.querySelector('.main-content').classList.add('expanded');
    } else {
        document.querySelector('.side-nav').classList.remove('collapsed');
        document.querySelector('.main-content').classList.remove('expanded');
    }
});


// Initialize responsive state
if (window.innerWidth < 768) {
    document.querySelector('.side-nav').classList.add('collapsed');
    document.querySelector('.main-content').classList.add('expanded');
}


// Add scroll-to-top button
function addScrollToTopButton() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scrollToTopBtn';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.title = 'Scroll to top';
    document.body.appendChild(scrollToTopBtn);
   
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
   
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
}


// Call in DOMContentLoaded
document.addEventListener('DOMContentLoaded', addScrollToTopButton);

