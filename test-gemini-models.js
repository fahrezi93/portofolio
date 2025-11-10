// Test untuk melihat model Gemini yang tersedia
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listAvailableModels() {
  console.log('🔍 Checking Available Gemini Models...\n');
  
  // Load API key from .env.local
  const fs = require('fs');
  const path = require('path');
  
  let apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    try {
      const envPath = path.join(__dirname, '.env.local');
      const envContent = fs.readFileSync(envPath, 'utf8');
      const match = envContent.match(/NEXT_PUBLIC_GEMINI_API_KEY=(.+)/);
      if (match) {
        apiKey = match[1].trim();
      }
    } catch (error) {
      console.error('❌ Could not read .env.local file');
      return;
    }
  }
  
  if (!apiKey) {
    console.error('❌ API Key not found');
    return;
  }
  
  console.log(`✅ API Key found: ${apiKey.substring(0, 15)}...\n`);
  
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Try different model names
  const modelsToTry = [
    'gemini-pro',
    'gemini-1.5-pro',
    'gemini-1.5-flash',
    'gemini-1.0-pro',
    'models/gemini-pro',
    'models/gemini-1.5-pro',
    'models/gemini-1.5-flash',
    'models/gemini-1.0-pro',
  ];
  
  console.log('Testing different model names...\n');
  
  for (const modelName of modelsToTry) {
    try {
      console.log(`🔄 Trying: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Say "test"');
      const response = await result.response;
      const text = response.text();
      
      console.log(`✅ SUCCESS! Model "${modelName}" works!`);
      console.log(`   Response: ${text}\n`);
      
      // If we found a working model, test with project description
      console.log('📝 Testing project description generation...\n');
      const descPrompt = `Generate a professional 1-2 sentence description for a portfolio website built with Next.js, React, and TypeScript.`;
      
      const descResult = await model.generateContent(descPrompt);
      const descResponse = await descResult.response;
      const description = descResponse.text();
      
      console.log('✅ Description generated:');
      console.log(`   ${description}\n`);
      
      console.log('═══════════════════════════════════════════════════════');
      console.log(`🎉 SUCCESS! Use model: "${modelName}"`);
      console.log('═══════════════════════════════════════════════════════\n');
      
      return; // Stop after first success
      
    } catch (error) {
      console.log(`❌ Failed: ${error.message.substring(0, 100)}...\n`);
    }
  }
  
  console.log('═══════════════════════════════════════════════════════');
  console.log('❌ No working models found');
  console.log('💡 Your API key may not have access to Gemini models');
  console.log('   Try creating a new key at: https://aistudio.google.com/app/apikey');
  console.log('═══════════════════════════════════════════════════════\n');
}

listAvailableModels().catch(error => {
  console.error('\n💥 Unexpected error:', error);
  process.exit(1);
});
