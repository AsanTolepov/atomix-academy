import { GoogleGenAI, Type } from "@google/genai";
import { TaskConfig, AIResult } from "./types";

// Initialize Gemini Client
// NOTE: We assume process.env.API_KEY is available as per instructions.
// In a real environment without the env var, this would throw.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'fake_key_for_demo_structure' });

export const getAIHint = async (
  taskConfig: TaskConfig,
  currentParams: Record<string, number>,
  level: 'nudge' | 'guide' | 'explain'
): Promise<string> => {
  if (!process.env.API_KEY) {
    return "AI Hints are unavailable without a valid API Key. (Demo Mode)";
  }

  const prompt = `
    You are a friendly science tutor.
    Task Instructions: ${taskConfig.instructions}
    Current Student Simulation State: ${JSON.stringify(currentParams)}
    Target Goal: ${taskConfig.targetValue}
    
    Provide a hint. Level: ${level}.
    Level 'nudge': A subtle clue.
    Level 'guide': Tell them which parameter to adjust.
    Level 'explain': Clear explanation of the concept relating to the current state.
    Keep it under 30 words.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Try adjusting the values slowly.";
  } catch (error) {
    console.error("Gemini Hint Error", error);
    return "Could not generate hint at this time.";
  }
};

export const gradeTaskWithAI = async (
  taskConfig: TaskConfig,
  finalParams: Record<string, number>,
  timeTaken: number
): Promise<AIResult> => {
  if (!process.env.API_KEY) {
    // Mock response if no key
    const mockScore = Math.floor(Math.random() * 20) + 80;
    return {
      score: mockScore,
      explanation: "Excellent work! (Demo Mode - API Key missing)",
      confidence: 1.0
    };
  }

  const prompt = `
    Evaluate this student's interactive lab performance.
    Subject: ${taskConfig.type}
    Goal: ${taskConfig.instructions}
    Target Value: ${taskConfig.targetValue}
    Student Final State: ${JSON.stringify(finalParams)}
    Time Taken: ${timeTaken} seconds.

    Did they achieve the goal within tolerance (${taskConfig.tolerance})?
    Provide a score (0-100) and a 1-sentence explanation.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            explanation: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
          },
          required: ["score", "explanation", "confidence"],
        },
      },
    });

    const result = JSON.parse(response.text || '{}');
    return {
      score: result.score || 0,
      explanation: result.explanation || "Evaluation failed.",
      confidence: result.confidence || 0,
    };
  } catch (error) {
    console.error("Gemini Grading Error", error);
    return {
      score: 0,
      explanation: "AI Service unavailable. Please try again.",
      confidence: 0
    };
  }
};
