// Voice Recognition
class VoiceService {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.initVoiceRecognition();
    }
    
    initVoiceRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';
            
            this.recognition.onstart = () => {
                this.isListening = true;
                this.updateVoiceButton();
            };
            
            this.recognition.onend = () => {
                this.isListening = false;
                this.updateVoiceButton();
            };
            
            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('userInput').value = transcript;
            };
            
            this.recognition.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                showNotification('Voice input error: ' + event.error, 'error');
            };
        }
    }
    
    toggleListening() {
        if (!this.recognition) {
            showNotification('Voice recognition not supported in your browser', 'error');
            return;
        }
        
        if (this.isListening) {
            this.recognition.stop();
        } else {
            try {
                this.recognition.start();
            } catch (error) {
                console.error('Error starting recognition:', error);
                showNotification('Error starting voice input', 'error');
            }
        }
    }
    
    updateVoiceButton() {
        const voiceButton = document.getElementById('voiceButton');
        if (this.isListening) {
            voiceButton.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            voiceButton.style.color = 'var(--error-color)';
        } else {
            voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
            voiceButton.style.color = '';
        }
    }
}

// Initialize voice service
const voiceService = new VoiceService();

// Handle voice button click
document.getElementById('voiceButton').addEventListener('click', () => {
    voiceService.toggleListening();
});