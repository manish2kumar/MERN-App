const axios = require('axios');

async function runTests() {
  try {
    console.log("🧪 Testing POST /api/ask-ai...");
    const aiRes = await axios.post('http://127.0.0.1:5001/api/ask-ai', { prompt: "Say 'Hello WorldQuant' in exactly 3 words" });
    console.log("✅ AI Response:", aiRes.data.response);

    console.log("\n🧪 Testing POST /api/save...");
    const saveRes = await axios.post('http://127.0.0.1:5001/api/save', { 
        prompt: "Say 'Hello WorldQuant' in exactly 3 words", 
        response: aiRes.data.response 
    });
    console.log("✅ Save Success:", saveRes.data.message);

    console.log("\n🧪 Testing GET /api/history...");
    const histRes = await axios.get('http://127.0.0.1:5001/api/history');
    console.log(`✅ History Array Length: ${histRes.data.data.length}. Most recent saved prompt: "${histRes.data.data[0].prompt}"`);
  } catch (error) {
    console.error("❌ TEST FAILED:", error.message);
    if(error.response) console.error(error.response.data);
  }
}

runTests();
