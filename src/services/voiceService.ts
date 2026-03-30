/**
 * Voice Service
 * Handles audio recording and interfacing with aiService for Voice-to-KOB extraction.
 */
import { processVoiceLog } from './aiService';

class VoiceService {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;

  async startRecording(): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.start();
    } catch (error) {
      console.error("Camera/Mic access denied or failed:", error);
      throw error;
    }
  }

  async stopRecording(): Promise<string> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder) return resolve("");

      this.mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(audioBlob);
      };

      this.mediaRecorder.stop();
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
        this.stream = null;
      }
    });
  }

  async analyzeVoice(audioB64: string) {
    return await processVoiceLog(audioB64);
  }

  /**
   * Simulates analysis for text inputs (when mic is unavailable)
   */
  async simulateVoiceAnalysis(text: string, context?: string) {
    // We reuse the same logic but send it as text
    // Integration with aiService.callGemini (text-only)
    return await processVoiceLog("", text, context); 
  }
}

export const voiceService = new VoiceService();
