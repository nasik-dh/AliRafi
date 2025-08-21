// Authentication Service
class AuthService {
    constructor() {
        this.currentUser = null;
        this.initFirebase();
    }
    
    initFirebase() {
        // Initialize Firebase (replace with your config)
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_AUTH_DOMAIN",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_STORAGE_BUCKET",
            messagingSenderId: "YOUR_SENDER_ID",
            appId: "YOUR_APP_ID"
        };
        
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        
        this.auth = firebase.auth();
        this.googleProvider = new firebase.auth.GoogleAuthProvider();
        this.appleProvider = new firebase.auth.OAuthProvider('apple.com');
    }
    
    async login(email, password) {
        try {
            const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
            this.currentUser = userCredential.user;
            return true;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }
    
    async register(name, email, password) {
        try {
            const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
            await userCredential.user.updateProfile({ displayName: name });
            this.currentUser = userCredential.user;
            return true;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }
    
    async loginWithGoogle() {
        try {
            const result = await this.auth.signInWithPopup(this.googleProvider);
            this.currentUser = result.user;
            return true;
        } catch (error) {
            console.error('Google login error:', error);
            throw error;
        }
    }
    
    async loginWithApple() {
        try {
            const result = await this.auth.signInWithPopup(this.appleProvider);
            this.currentUser = result.user;
            return true;
        } catch (error) {
            console.error('Apple login error:', error);
            throw error;
        }
    }
    
    async logout() {
        try {
            await this.auth.signOut();
            this.currentUser = null;
            return true;
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }
    
    onAuthStateChanged(callback) {
        this.auth.onAuthStateChanged(user => {
            this.currentUser = user;
            callback(user);
        });
    }
}

// Initialize auth service
const authService = new AuthService();

// Update UI based on auth state
authService.onAuthStateChanged(user => {
    const authBtn = document.getElementById('authBtn');
    const displayUsername = document.getElementById('displayUsername');
    const displayEmail = document.getElementById('displayEmail');
    const userAvatar = document.getElementById('userAvatar');
    
    if (user) {
        // User is signed in
        displayUsername.textContent = user.displayName || 'User';
        displayEmail.textContent = user.email;
        
        if (user.photoURL) {
            userAvatar.innerHTML = `<img src="${user.photoURL}" alt="User avatar">`;
        } else {
            const initials = user.displayName ? 
                user.displayName.split(' ').map(n => n[0]).join('') : 
                user.email[0].toUpperCase();
            userAvatar.innerHTML = `<span>${initials}</span>`;
        }
        
        authBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
        authBtn.title = 'Sign out';
    } else {
        // User is signed out
        displayUsername.textContent = 'Guest';
        displayEmail.textContent = 'Sign in for full features';
        userAvatar.innerHTML = '<img src="assets/default-avatar.jpg" alt="User avatar">';
        
        authBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i>';
        authBtn.title = 'Sign in';
    }
});

// Handle auth button click
document.getElementById('authBtn').addEventListener('click', () => {
    if (authService.currentUser) {
        authService.logout().then(() => {
            showNotification('Logged out successfully', 'success');
        }).catch(error => {
            showNotification('Logout failed: ' + error.message, 'error');
        });
    } else {
        document.getElementById('authModal').classList.add('active');
    }
});

// Handle login form submission
document.getElementById('loginBtn').addEventListener('click', async () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        await authService.login(email, password);
        document.getElementById('authModal').classList.remove('active');
        showNotification('Login successful', 'success');
    } catch (error) {
        showNotification('Login failed: ' + error.message, 'error');
    }
});

// Handle registration form submission
document.getElementById('registerBtn').addEventListener('click', async () => {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirm = document.getElementById('registerConfirm').value;
    
    if (password !== confirm) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    try {
        await authService.register(name, email, password);
        document.getElementById('authModal').classList.remove('active');
        showNotification('Registration successful', 'success');
    } catch (error) {
        showNotification('Registration failed: ' + error.message, 'error');
    }
});

// Handle social logins
document.querySelector('.google-auth').addEventListener('click', async () => {
    try {
        await authService.loginWithGoogle();
        document.getElementById('authModal').classList.remove('active');
        showNotification('Google login successful', 'success');
    } catch (error) {
        showNotification('Google login failed: ' + error.message, 'error');
    }
});

document.querySelector('.apple-auth').addEventListener('click', async () => {
    try {
        await authService.loginWithApple();
        document.getElementById('authModal').classList.remove('active');
        showNotification('Apple login successful', 'success');
    } catch (error) {
        showNotification('Apple login failed: ' + error.message, 'error');
    }
});