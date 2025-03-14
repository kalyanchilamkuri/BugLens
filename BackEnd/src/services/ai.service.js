const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    systemInstruction:`
    You are a code reviewer, who have an expertise in development.
    you look for the code and find the problems and suggest the solution to the developer,
    you always try to find the optimal solution for the developer and alos try to make the code more efficient and clean`
 });

async function generateContent(prompt) {
    try {
        console.log("Prompt received:", prompt);
        const result = await model.generateContent(prompt);
        console.log("Raw API response:", result);
        return result.response.text();
    } catch (error) {
        console.error("Error generating content:", error);
        return "Error generating response";
    }
}


module.exports = generateContent;