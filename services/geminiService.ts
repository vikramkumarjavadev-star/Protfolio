
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

// Always create a new GoogleGenAI instance right before the API call to ensure the latest API key is used.
// We pass the conversation history to maintain context between separate function calls.
export const sendMessageToGemini = async (message: string, history: ChatMessage[] = []): Promise<string> => {
  // Use process.env.API_KEY directly for initialization as required by guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    // Create a new chat session for each message, passing existing history to maintain state.
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are 'LUMI', the Learning Advisor for Lumina Academy.
        The academy is a high-end digital mastery platform specializing in AI, Development, Quantum Computing, and Design.
        
        Tone: Intelligent, encouraging, futuristic, helpful. Use emojis like 🧠, 💻, 🚀, 🔭, 💎.
        
        Key Info:
        - Curriculum: Neural Architectures, Generative Design, Quantum computing, Cyber Security.
        - Mentors: Industry pioneers from OpenAI, Vercel, and Anthropic.
        - Admission: Core Path ($299), Full Access ($899), Executive ($2499).
        
        Your goal is to help students find their path. Ask them about their interests if they seem unsure.
        Keep responses under 60 words.`,
      },
      // Pass the conversation history to maintain context between calls.
      history: history.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      })),
    });

    // sendMessage accepts an object with a message property.
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    
    // Extracting text output directly from the text property as recommended.
    return response.text || "Transmission interrupted.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The knowledge base is temporarily unreachable.";
  }
};
