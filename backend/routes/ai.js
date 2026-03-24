const express = require('express');
const router = express.Router();
const axios = require('axios');
const Conversation = require('../models/Conversation');

// POST /api/ask-ai - Send prompt to OpenRouter, get AI response
router.post('/ask-ai', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === '') {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  // Use OPENROUTER_API_KEY from .env
  const apiKey = (process.env.OPENROUTER_API_KEY || '').trim();

  if (!apiKey || apiKey.includes('your_openrouter_api_key_here')) {
    return res.status(500).json({ error: 'OpenRouter API key not configured. Please check your .env file and RESTART the server.' });
  }

  try {
    console.log(`🤖 Sending prompt to OpenRouter (Key: ${apiKey.substring(0, 10)}...)`);
    
    // Try these free models in order (using confirmed stable free ones)
    const freeModels = [
      'google/gemini-2.0-flash-lite-preview-02-05:free',
      'google/gemini-2.0-flash-lite-preview-02-05',
      'meta-llama/llama-3.1-8b-instruct:free',
      'meta-llama/llama-3-8b-instruct:free',
      'mistralai/mistral-7b-instruct:free',
      'openrouter/auto'
    ];

    let openRouterRes;
    let success = false;

    for (const modelId of freeModels) {
      try {
        console.log(`📡 Trying model: ${modelId}`);
        openRouterRes = await axios.post(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            model: modelId,
            messages: [{ role: 'user', content: prompt }],
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': 'http://127.0.0.1:5173',
              'X-Title': 'AI Flow Visualizer',
            },
            timeout: 8000 // 8s timeout per model
          }
        );
        success = true;
        console.log(`✅ Success with ${modelId}`);
        break; 
      } catch (err) {
        const errorData = err.response?.data || {};
        const errMsg = errorData.error?.message || err.message;
        console.warn(`⚠️ Model ${modelId} failed: ${errMsg}`);
        if (errorData.error) {
          console.warn(`   Detail: ${JSON.stringify(errorData.error)}`);
        }
      }
    }

    if (!success) {
      console.warn('❌ All OpenRouter models failed. Falling back to MOCK MODE.');
      return res.json({ 
        response: '🤖 [MOCK MODE] OpenRouter models failed or API key restricted. This is a local sample response for testing node connectivity and saving.' 
      });
    }

    // Double check response structure safely
    const aiResponse = openRouterRes?.data?.choices?.[0]?.message?.content || 'No response received from API.';
    return res.json({ response: aiResponse });

  } catch (err) {
    console.error('Final AI Route Catch Error:', err.message);
    return res.status(200).json({ 
      response: '⚠️ [SYSTEM ERROR] Something went wrong in the AI route. falling back to safe message to prevent crash.' 
    });
  }
});

// POST /api/save - Save prompt + response to MongoDB
router.post('/save', async (req, res) => {
  const { prompt, response } = req.body;
  if (!prompt || !response) return res.status(400).json({ error: 'Prompt and response are required.' });

  try {
    const conversation = new Conversation({ prompt, response });
    const saved = await conversation.save();
    return res.json({ message: 'Saved successfully!', data: saved });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to save conversation.' });
  }
});

// GET /api/history - Fetch last 10 saved
router.get('/history', async (req, res) => {
  try {
    const history = await Conversation.find().sort({ createdAt: -1 }).limit(10);
    return res.json({ data: history });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch history.' });
  }
});

module.exports = router;
