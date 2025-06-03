export class SpeechRecognitionService {
  constructor(onResult, onError, onStateChange, language = 'en-US') {
    this.recognition = null;
    this.isListening = false;
    this.onResult = onResult;
    this.onError = onError;
    this.onStateChange = onStateChange;
    this.language = language;

    this.initRecognition();
  }

  initRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      this.onError('Speech recognition is not supported in this browser.');
      return;
    }

    const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognitionConstructor();

    if (this.recognition) {
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = this.language;

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.onResult(transcript, this.language);
      };

      this.recognition.onerror = (event) => {
        this.onError(`Error occurred in recognition: ${event.error}`);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.onStateChange(false);
      };
    }
  }

  setLanguage(language) {
    this.language = language;
    if (this.recognition) {
      this.recognition.lang = language;
    }
  }

  start() {
    if (!this.recognition) {
      this.initRecognition();
      if (!this.recognition) return;
    }

    try {
      this.recognition.start();
      this.isListening = true;
      this.onStateChange(true);
    } catch (error) {
      this.onError(`Could not start speech recognition: ${error}`);
    }
  }

  stop() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      this.onStateChange(false);
    }
  }
}
