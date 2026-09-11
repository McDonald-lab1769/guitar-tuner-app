import { Audio } from 'expo-av';

class AudioService {
  constructor() {
    this.recording = null;
    this.sound = null;
    this.isListening = false;
  }

  async startListening(onFrequencyDetected) {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      this.recording = new Audio.Recording();
      await this.recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await this.recording.startAsync();
      this.isListening = true;

      // Simulate frequency detection (integrate with actual audio processing)
      this.detectFrequency(onFrequencyDetected);
    } catch (error) {
      console.error('Error starting audio listening:', error);
    }
  }

  async stopListening() {
    if (this.recording) {
      await this.recording.stopAndUnloadAsync();
      this.isListening = false;
    }
  }

  detectFrequency(callback) {
    // This is a placeholder - in production, use FFT or pitch detection library
    const interval = setInterval(() => {
      if (!this.isListening) {
        clearInterval(interval);
        return;
      }
      const frequency = Math.random() * 400 + 40; // Random frequency between 40-440 Hz
      callback(frequency);
    }, 100);
  }

  getNote(frequency) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const A4 = 440;
    const C0 = A4 * Math.pow(2, -4.75);
    const h = 12 * Math.log2(frequency / C0);
    const octave = Math.floor(h / 12);
    const note = Math.round(h) % 12;
    return { note: notes[note], octave, frequency };
  }
}

export default new AudioService();
