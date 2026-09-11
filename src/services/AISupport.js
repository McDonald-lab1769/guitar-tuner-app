import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AISupport {
  constructor() {
    this.conversationHistory = [];
    this.apiEndpoint = 'https://api.openai.com/v1/chat/completions'; // or your backend endpoint
    this.isLoading = false;
  }

  async initializeConversation() {
    try {
      const saved = await AsyncStorage.getItem('chatHistory');
      if (saved) {
        this.conversationHistory = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading conversation history:', error);
    }
  }

  async saveConversation() {
    try {
      await AsyncStorage.setItem('chatHistory', JSON.stringify(this.conversationHistory));
    } catch (error) {
      console.error('Error saving conversation history:', error);
    }
  }

  getSystemPrompt() {
    return `You are a helpful Guitar Tuning Assistant AI. You help users with:
- Tuning their guitars (standard, open, drop D, and alternative tunings)
- Understanding different tuning systems
- Troubleshooting tuning issues
- Providing guitar maintenance tips
- Suggesting tunings for different music styles
- Explaining music theory related to tuning

Be friendly, concise, and practical in your responses. Use emojis occasionally to keep it engaging.
If the user asks something unrelated to guitars or tuning, gently redirect them.`;
  }

  async sendMessage(userMessage) {
    if (this.isLoading) return null;

    this.isLoading = true;
    try {
      // Add user message to history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage,
      });

      // Format messages for API
      const messages = [
        { role: 'system', content: this.getSystemPrompt() },
        ...this.conversationHistory,
      ];

      // Call AI API (using OpenAI as example, can be replaced with your backend)
      const response = await axios.post(
        this.apiEndpoint,
        {
          model: 'gpt-3.5-turbo',
          messages: messages,
          temperature: 0.7,
          max_tokens: 500,
        },
        {\n          headers: {\n            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,\n            'Content-Type': 'application/json',\n          },\n        }\n      );

      const assistantMessage = response.data.choices[0].message.content;

      // Add assistant response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: assistantMessage,
      });

      // Save updated conversation
      await this.saveConversation();

      return assistantMessage;
    } catch (error) {
      console.error('Error calling AI API:', error);
      return this.getLocalResponse(userMessage);
    } finally {
      this.isLoading = false;
    }
  }

  // Fallback local responses when API is unavailable
  getLocalResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    const responses = {
      tuning: [
        '🎸 To tune your guitar, follow these steps:\\n1. Hold the tuner near the sound hole\\n2. Pluck each string one at a time\\n3. Adjust until the tuner shows green/perfect pitch\\n4. Start from the low E string\\n\\nWould you like help with a specific tuning?',
      ],
      standard: [
        '📌 Standard tuning is E-A-D-G-B-E (low to high). This is the most common tuning and great for beginners!',
      ],
      dropd: [
        '⬇️ Drop D tuning lowers the low E string to D. It gives a heavy sound and is popular in rock and metal.',
      ],
      open: [
        '🔓 Open tunings (like Open G, Open D) create a major chord when you strum all open strings. Great for slide guitar and folk music!',
      ],
      loose: [
        '⚠️ If your strings feel loose:\\n- Turn the tuning pegs clockwise to tighten\\n- Adjust gradually to avoid breaking strings\\n- Use the tuner to check pitch',
      ],
      tight: [
        '⚠️ If your strings feel too tight:\\n- Turn the tuning pegs counterclockwise to loosen\\n- Be careful not to go too flat\\n- Use the tuner to reach the correct pitch',
      ],
      broken: [
        '🔧 If a string broke:\\n1. Replace it with a new string of the same gauge\\n2. Thread it through the bridge\\n3. Wind it around the tuning peg\\n4. Tune gradually while checking with the tuner\\n5. It may take time to stabilize',
      ],
      maintenance: [
        '🛠️ Guitar maintenance tips:\\n- Change strings every 3-4 months or when they sound dull\\n- Clean the fretboard regularly\\n- Store in a case away from extreme temperatures\\n- Check tuning stability often\\n- Oil the fretboard occasionally',
      ],
      stuck: [
        '⚙️ If a tuning peg is stuck:\\n- Apply a tiny bit of lubricant (3-in-1 oil)\\n- Turn very gently\\n- Never force it or you might break it\\n- Consider visiting a guitar repair shop if it\'s serious',
      ],
      help: [
        '👋 Hello! I\'m your Guitar Tuning Assistant. I can help you with:\\n- Standard and alternative tunings\\n- Tuning techniques\\n- Guitar maintenance\\n- Troubleshooting issues\\n\\nWhat would you like to know?',
      ],
    };

    // Check keywords in message
    for (const [keyword, responseList] of Object.entries(responses)) {
      if (lowerMessage.includes(keyword)) {
        return responseList[Math.floor(Math.random() * responseList.length)];
      }
    }

    // Default response
    return "🎸 I'm here to help with guitar tuning! You can ask me about:\\n- How to tune your guitar\\n- Different tuning styles\\n- Guitar maintenance\\n- Troubleshooting issues\\n\\nWhat would you like help with?";
  }

  getConversationHistory() {
    return this.conversationHistory;
  }

  clearConversation() {
    this.conversationHistory = [];
    AsyncStorage.removeItem('chatHistory');
  }

  getLastMessage() {
    if (this.conversationHistory.length === 0) return null;
    return this.conversationHistory[this.conversationHistory.length - 1];
  }

  getMessageCount() {
    return this.conversationHistory.length;
  }
}

export default new AISupport();
