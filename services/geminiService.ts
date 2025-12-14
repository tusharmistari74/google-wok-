
import { GoogleGenAI, Type } from '@google/genai';
import { GptResponse } from '../types';

// IMPORTANT: This service assumes the API_KEY is set in the environment.
// Do not add any UI or code to handle the key itself.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        summaryPoints: {
            type: Type.ARRAY,
            description: "Provide 3-5 key summary points from the document.",
            items: { type: Type.STRING }
        },
        potentialIssues: {
            type: Type.ARRAY,
            description: "Identify 2-3 potential risks, ambiguities, or unfavorable clauses.",
            items: { type: Type.STRING }
        },
        recommendations: {
            type: Type.ARRAY,
            description: "Suggest 2-3 concrete actions or points to discuss with a lawyer.",
            items: { type: Type.STRING }
        }
    },
    required: ["summaryPoints", "potentialIssues", "recommendations"]
};


export const getDocumentSummary = async (documentName: string): Promise<GptResponse> => {
  if (!API_KEY) {
    throw new Error("API key not configured.");
  }

  try {
    const prompt = `
      Analyze the following legal document titled "${documentName}". 
      This is a standard property registration agreement. 
      Based on the title and common clauses found in such documents, provide a concise analysis.
      Do not invent specific details from the document, but rather provide a general analysis based on this type of document.
    `;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: responseSchema,
            temperature: 0.5,
        }
    });
    
    const text = response.text.trim();
    const parsedJson = JSON.parse(text);

    return parsedJson as GptResponse;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get document summary from AI.");
  }
};
