// Progressive Web App Features
class PWAHelper {
    static checkInstallPrompt() {
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later
            deferredPrompt = e;
            // Show custom install button/prompt
            this.showInstallPrompt();
        });
        
        window.addEventListener('appinstalled', () => {
            console.log('App installed');
            deferredPrompt = null;
        });
    }
    
    static showInstallPrompt() {
        // In a real app, you would show your own install button/prompt
        const installBtn = document.createElement('button');
        installBtn.textContent = 'Install Seazon AI';
        installBtn.className = 'primary-btn';
        installBtn.style.position = 'fixed';
        installBtn.style.bottom = '20px';
        installBtn.style.right = '20px';
        installBtn.style.zIndex = '1000';
        
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response to the install prompt: ${outcome}`);
                deferredPrompt = null;
                installBtn.remove();
            }
        });
        
        document.body.appendChild(installBtn);
    }
    
    static registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(registration => {
                    console.log('ServiceWorker registration successful');
                }).catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
            });
        }
    }
    
    static checkOfflineStatus() {
        const offlineWarning = document.getElementById('offline-warning');
        
        window.addEventListener('online', () => {
            offlineWarning.style.display = 'none';
            showNotification('You are back online', 'success');
        });
        
        window.addEventListener('offline', () => {
            offlineWarning.style.display = 'block';
        });
        
        // Initial check
        if (!navigator.onLine) {
            offlineWarning.style.display = 'block';
        }
    }
}

// Initialize PWA features
PWAHelper.checkInstallPrompt();
PWAHelper.registerServiceWorker();
PWAHelper.checkOfflineStatus();