import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
if (!apiKey) {
  console.error('Gemini API key is missing');
  throw new Error('Gemini API key is missing');
}

const genAI = new GoogleGenerativeAI(apiKey);

// Single configuration object for the model
const generationConfig = {
  temperature: 0.9,  // Increased for more creative responses
  topP: 1.0,        // Increased for more diverse outputs
  topK: 40,
  maxOutputTokens: 8192,
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig,
});

const systemPrompt = `You are a travel planning assistant. You MUST always respond with valid JSON data following this EXACT schema:

{
  "location": "string",
  "duration": "string",
  "num_people": "string",
  "budget": "string",
  "hotels": [
    {
      "hotelName": "string",
      "hotelAddress": "string",
      "price": "string",
      "rating": "string",
      "description": "string"
    }
  ],
  "itinerary": {
    "day1": {
      "bestTime": "string",
      "plan": [
        {
          "placeName": "string",
          "placeDetails": "string",
          "placeAddress": "string",
          "ticketPricing": "string",
          "timeTravel": "string",
          "rating": "string"
        }
      ]
    }
  }
}

IMPORTANT:
1. Always include at least 3 hotels
2. For each day in the itinerary, include at least 3 places to visit
3. Every field must be filled with realistic, detailed information
4. Do not include any text outside the JSON structure
5. Ensure the JSON is properly formatted and valid`;

export const chatSession = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: systemPrompt }],
    },
    {
      role: "model",
      parts: [{ text: "Understood. I will generate properly structured JSON responses with complete travel plans including hotels and detailed daily itineraries." }],
    },
  ],
}); 