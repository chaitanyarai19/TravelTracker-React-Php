const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");
const OpenAI = require("openai");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const { OPENAI_API_KEY, PORT = 3000 } = process.env;

// OpenAI Configuration
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Extract Travel Info using OpenAI
async function extractTravelDetails(emailContent) {
  const prompt = `
    Extract the following details from the email:
    - Leaving From
    - Destination City
    - Travel Date
    - Return Date
    - Reason for Travel
    
    Email Content: "${emailContent}"
    Output in JSON format.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
    });

    console.log("OpenAI Response:", response.choices[0].message.content); // Debugging

    const content = response.choices[0].message.content.trim();
    return JSON.parse(content);  
  } catch (error) {
    console.error("Error extracting travel details:", error.response?.data || error.message);
    throw new Error("Failed to extract travel details");
  }
}

// API Endpoint to Extract Travel Data
app.post("/api/extract-travel", async (req, res) => {
  const { emailContent } = req.body;

  if (!emailContent) {
    return res.status(400).json({ error: "emailContent is required" });
  }

  try {
    const travelData = await extractTravelDetails(emailContent);
    res.json({ data: travelData });
  } catch (error) {
    console.error("Error processing request:", error.message);
    res.status(500).json({ error: "Failed to process travel details" });
  }
});

// Start the Server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
