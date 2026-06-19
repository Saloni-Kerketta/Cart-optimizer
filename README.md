# Cart-optimizer
The Smart Cart Optimization Engine is a recommendation platform inspired by Amazon, Flipkart, Myntra, and other e-commerce companies.
The objective of this project is to increase cart value by recommending useful add-on products
and improving the customer's shopping experience.

# To work with gemini integration
npm install @google/genai

create Gemini API key to communicate with Google's servers.(stored in .env file)

Test Your Endpoint on Thunder
        Request Type: POST
        URL: http://localhost:5000/api/recommendations/generate
        Headers: Content-Type: application/json

        JSON
        {
            "productId": 1131
        }

Here is the visual mapping of how data flows through backend architecture, everything is combined into a single, unified workflow.

       [ React Frontend / Postman ]
                     │
                     ▼ (POST with just {"productId": 1050})
               `server.js`
                     │ (Routes everything matching /api/recommendations)
                     ▼
         `recommendationRoutes.js`
                     │ (Catches /generate, calls getRecommendations)
                     ▼
       `recommendationController.js` 
                     │
                     ├─► 1. Queries MongoDB (Product & Relationships schemas)
                     ├─► 2. Runs Math Engine (`ranking.js`) -> Finds Top Product
                     │
                     ▼
       (Pulls Top Product Name + Target Product Name)
                     │
                     ▼
               `aiService.js`
                     │ (Sends structured prompt using @google/genai)
                     ▼
             [ Gemini API ] 
                     │
                     ▼ (Returns: "Upgrade your new Dell Monitor...")
       `recommendationController.js`
                     │ (Appends string to 'aiPitch' object)
                     ▼
       [ Final JSON Response Sent back to Frontend ]

Files created or updated by Saloni to integrate gemini API:
     1. recommendationController.js -> update
     2. recommendationRoutes.js -> update
     3. aiService.js -> create new file