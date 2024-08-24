const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize the OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // API key from environment variables
});

// Initialize AWS Polly
const polly = new AWS.Polly({
  region: process.env.AWS_REGION,
});

const PORT = process.env.PORT || 5000;

// Endpoint to handle chat requests
app.post('/chat', async (req, res) => {
  const { message, figure } = req.body;

  try {
    // Define the chat completion parameters
    const params = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: `You are now emulating ${figure}.` },
        { role: 'user', content: message },
      ],
    };

    // Call the OpenAI API
    const chatCompletion = await client.chat.completions.create(params);

    // Extract the text response from OpenAI
    const gptMessage = chatCompletion.choices[0].message.content.trim();

    // Generate audio using AWS Polly
    const pollyParams = {
      Text: gptMessage,
      OutputFormat: 'mp3',
      VoiceId: 'Joanna', // You can choose any Polly voice here
    };

    polly.synthesizeSpeech(pollyParams, (err, data) => {
      if (err) {
        console.error('Error with Polly:', err);
        return res.status(500).json({ error: 'Error generating voice' });
      } else {
        // Convert the audio stream to a base64 string to send it back as part of the response
        const audioBase64 = data.AudioStream.toString('base64');

        // Send both text and audio as a response
        res.json({
          response: gptMessage,
          audio: audioBase64,
        });
      }
    });
  } catch (error) {
    console.error('Error with OpenAI:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error communicating with OpenAI' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
