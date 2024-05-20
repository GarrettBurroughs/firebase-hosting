import { getVertexAI, getGenerativeModel } from "firebase/vertexai-preview";
import { vertex } from "./clientApp";
export const genModel = getGenerativeModel(vertex, { model: "gemini-1.5-pro-preview-0409" });

export async function run() {
    // Provide a prompt that contains text
    const prompt = "Write a story about a magic backpack."
  
    // To generate text output, call generateContent with the text input
    const result = await genModel.generateContent(prompt);
  
    const response = result.response;
    const text = response.text();
    console.log(text);
  }
  


export async function generateProject() {
  let prompt = "I am looking to build a side project that leverages firebase tooling, and I want you to help me come up with ideas and a plan";
}