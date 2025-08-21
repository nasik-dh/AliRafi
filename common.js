// common.js - Shared functionality across all pages
// Version 2.0 with enhanced features

// DOM Elements
const navToggle = document.getElementById('navToggle');
const themeToggle = document.getElementById('themeToggle');
const logoutBtn = document.getElementById('logoutBtn');
const body = document.body;

// Configuration
const config = {
    defaultTheme: 'system', // system, light, or dark
    enableAnalytics: false,
    sessionTimeout: 30 * 60 * 1000, // 30 minutes in milliseconds
    apiBaseUrl: 'https://api.yourservice.com/v1'
};

// State management
const appState = {
    isMobile: window.innerWidth < 768,
    isOnline: navigator.onLine,
    lastActivity: new Date().getTime()
};

// Toggle mobile navigation with animation
if (navToggle) {
    navToggle.addEventListener('click', () => {
        const sideNav = document.querySelector('.side-nav');
        const mainContent = document.querySelector('.main-content');
        
        sideNav.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
        
        // Add animation class
        sideNav.classList.add('animate');
        setTimeout(() => sideNav.classList.remove('animate'), 300);
    });
}

// Enhanced theme functionality
function applyTheme(theme) {
    const html = document.documentElement;
    
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        body.classList.add('dark-theme');
        html.setAttribute('data-theme', 'dark');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.classList.remove('dark-theme');
        html.setAttribute('data-theme', 'light');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    localStorage.setItem('theme', theme);
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
}

// Initialize theme with system preference detection
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || config.defaultTheme;
    applyTheme(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
            applyTheme(currentTheme);
        });
    }
    
    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem('theme') === 'system') {
            applyTheme('system');
        }
    });
}

// Session management
function initSession() {
    // Track user activity
    document.addEventListener('click', updateLastActivity);
    document.addEventListener('keypress', updateLastActivity);
    document.addEventListener('mousemove', updateLastActivity);
    
    // Check session timeout periodically
    setInterval(checkSessionTimeout, 60000); // Check every minute
    
    // Handle visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            checkSessionTimeout();
        }
    });
}

function updateLastActivity() {
    appState.lastActivity = new Date().getTime();
}

function checkSessionTimeout() {
    const currentTime = new Date().getTime();
    const inactiveTime = currentTime - appState.lastActivity;
    
    if (inactiveTime > config.sessionTimeout) {
        showSessionTimeoutWarning();
    }
}

function showSessionTimeoutWarning() {
    const modal = document.createElement('div');
    modal.className = 'modal session-timeout';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Session About to Expire</h3>
            <p>You've been inactive for a while. Do you want to continue your session?</p>
            <div class="modal-actions">
                <button id="continueSession">Continue</button>
                <button id="logoutNow">Logout</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    document.getElementById('continueSession').addEventListener('click', () => {
        updateLastActivity();
        modal.remove();
    });
    
    document.getElementById('logoutNow').addEventListener('click', () => {
        logoutUser();
    });
}

// Enhanced logout functionality
function logoutUser() {
    // Clear user data
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    
    // In a real app, this would call your authentication service
    if (config.enableAnalytics) {
        console.log('User logged out - analytics event sent');
    }
    
    // Redirect to login page
    window.location.href = 'login.html';
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', logoutUser);
}

// Modal handling with animations
function setupModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Close modal when clicking X
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            modal.classList.add('fade-out');
            setTimeout(() => {
                modal.style.display = 'none';
                modal.classList.remove('fade-out');
            }, 300);
        });
    });
    
    // Close modal when clicking outside content
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('fade-out');
                setTimeout(() => {
                    modal.style.display = 'none';
                    modal.classList.remove('fade-out');
                }, 300);
            }
        });
    });
}

// Dynamic modal creation
function createModal(options) {
    const { title, content, buttons, onClose } = options;
    const modalId = `modal-${Date.now()}`;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = modalId;
    
    let buttonsHTML = '';
    if (buttons && buttons.length) {
        buttonsHTML = buttons.map(btn => 
            `<button class="${btn.class || ''}" id="${btn.id || ''}">${btn.text}</button>`
        ).join('');
    }
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>${title || ''}</h3>
            <div class="modal-body">${content || ''}</div>
            <div class="modal-actions">${buttonsHTML}</div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    // Add fade-in animation
    setTimeout(() => {
        modal.classList.add('fade-in');
    }, 10);
    
    // Handle close events
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        if (onClose) onClose();
        modal.classList.remove('fade-in');
        modal.classList.add('fade-out');
        setTimeout(() => modal.remove(), 300);
    });
    
    // Add button event listeners
    if (buttons && buttons.length) {
        buttons.forEach(btn => {
            if (btn.onClick) {
                const buttonEl = modal.querySelector(`#${btn.id}`);
                if (buttonEl) {
                    buttonEl.addEventListener('click', () => {
                        btn.onClick();
                        if (btn.closeOnClick !== false) {
                            modal.classList.remove('fade-in');
                            modal.classList.add('fade-out');
                            setTimeout(() => modal.remove(), 300);
                        }
                    });
                }
            }
        });
    }
    
    return modalId;
}

// Network status detection
function initNetworkStatus() {
    window.addEventListener('online', () => {
        appState.isOnline = true;
        document.dispatchEvent(new CustomEvent('networkStatus', { detail: { online: true } }));
        showToast('You are back online', 'success');
    });
    
    window.addEventListener('offline', () => {
        appState.isOnline = false;
        document.dispatchEvent(new CustomEvent('networkStatus', { detail: { online: false } }));
        showToast('You are offline. Some features may not work.', 'warning');
    });
}

// Toast notifications
function showToast(message, type = 'info', duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Add show class with slight delay
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Auto-remove after duration
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
    
    // Allow manual dismissal
    toast.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
}

// Enhanced scroll-to-top button
function addScrollToTopButton() {
    if (document.getElementById('scrollToTopBtn')) return;
    
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scrollToTopBtn';
    scrollToTopBtn.className = 'hidden';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.title = 'Scroll to top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.remove('hidden');
        } else {
            scrollToTopBtn.classList.add('hidden');
        }
    });
}

// Responsive adjustments with debounce
function handleResize() {
    const wasMobile = appState.isMobile;
    appState.isMobile = window.innerWidth < 768;
    
    if (wasMobile !== appState.isMobile) {
        document.dispatchEvent(new CustomEvent('breakpointChange', { 
            detail: { isMobile: appState.isMobile }
        }));
    }
    
    const sideNav = document.querySelector('.side-nav');
    const mainContent = document.querySelector('.main-content');
    
    if (appState.isMobile) {
        sideNav?.classList.add('collapsed');
        mainContent?.classList.add('expanded');
    } else {
        sideNav?.classList.remove('collapsed');
        mainContent?.classList.remove('expanded');
    }
}

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Initialize all functionality
function initApp() {
    initTheme();
    setupModals();
    addScrollToTopButton();
    initNetworkStatus();
    initSession();
    
    // Handle theme options if they exist on this page
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            themeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            const theme = option.dataset.theme;
            applyTheme(theme);
        });
    });
    
    // Initialize responsive state
    handleResize();
    window.addEventListener('resize', debounce(handleResize, 200));
    
    // Add loading class to body until everything is ready
    document.body.classList.add('loading');
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 300);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Public API
export const Common = {
    showToast,
    createModal,
    logout: logoutUser,
    applyTheme,
    getState: () => ({ ...appState }),
    getConfig: () => ({ ...config })
};

// Make Common available globally if not using modules
if (!window.Common) {
    window.Common = Common;
}