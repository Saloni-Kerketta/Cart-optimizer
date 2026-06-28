const { GoogleGenAI } = require('@google/genai');
// The SDK automatically looks for the GEMINI_API_KEY environment variable.
const ai = new GoogleGenAI({});
/**
 * Generates a one-sentence sales pitch linking a target product and a recommended product.
 * @param {string} targetProduct
 * @param {string} recommendedProduct
 * @returns {Promise<string>} The generated pitch.
 */
async function generateSalesPitch(targetProduct, recommendedProduct) {
    try {
        const prompt = `You are an expert e-commerce copywriter. Write a compelling, high-converting, ONE-SENTENCE sales pitch recommending a "${recommendedProduct}" to someone who is currently looking at or buying a "${targetProduct}". Do not include any introductory remarks, just return the sentence.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text.trim().replace(/^"|"$/g, '');
    } catch (error) {
        console.error('Error generating pitch from Gemini API:', error);
        throw new Error('Failed to generate sales pitch.');
    }
}
module.exports = { generateSalesPitch };