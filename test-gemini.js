// Test script untuk Gemini API
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGeminiAPI() {
  console.log('🚀 Starting Gemini API Test...\n');
  
  // Load environment variables manually from .env.local
  const fs = require('fs');
  const path = require('path');
  
  let apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  // If not in env, try reading from .env.local
  if (!apiKey) {
    try {
      const envPath = path.join(__dirname, '.env.local');
      const envContent = fs.readFileSync(envPath, 'utf8');
      const match = envContent.match(/NEXT_PUBLIC_GEMINI_API_KEY=(.+)/);
      if (match) {
        apiKey = match[1].trim();
      }
    } catch (error) {
      console.error('Could not read .env.local file');
    }
  }
  
  // Test 1: Check API Key
  console.log('📋 Test 1: Checking API Key...');
  if (!apiKey) {
    console.error('❌ FAILED: API Key not found in .env.local');
    console.log('   Make sure NEXT_PUBLIC_GEMINI_API_KEY is set\n');
    return;
  }
  console.log(`✅ PASSED: API Key found (${apiKey.substring(0, 15)}...)\n`);
  
  // Test 2: Initialize SDK
  console.log('📋 Test 2: Initializing Google Generative AI SDK...');
  let genAI;
  try {
    genAI = new GoogleGenerativeAI(apiKey);
    console.log('✅ PASSED: SDK initialized successfully\n');
  } catch (error) {
    console.error('❌ FAILED: SDK initialization error');
    console.error('   Error:', error.message, '\n');
    return;
  }
  
  // Test 3: Get Model
  console.log('📋 Test 3: Getting Gemini Model...');
  let model;
  try {
    model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    console.log('✅ PASSED: Model instance created (gemini-1.5-flash)\n');
  } catch (error) {
    console.error('❌ FAILED: Model creation error');
    console.error('   Error:', error.message, '\n');
    return;
  }
  
  // Test 4: Simple API Call
  console.log('📋 Test 4: Testing Simple API Call...');
  console.log('   Sending prompt: "Say Hello in Indonesian"\n');
  try {
    const result = await model.generateContent('Say Hello in Indonesian');
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ PASSED: API call successful!');
    console.log('   Response:', text, '\n');
  } catch (error) {
    console.error('❌ FAILED: API call error');
    console.error('   Error:', error.message);
    if (error.message.includes('404')) {
      console.error('   💡 Suggestion: Your API key might not have access to Gemini models');
      console.error('   Try creating a new key at: https://aistudio.google.com/app/apikey\n');
    }
    return;
  }
  
  // Test 5: Generate Project Description
  console.log('📋 Test 5: Testing Project Description Generation...');
  const testProject = {
    title: 'Portfolio Website',
    category: 'development',
    type: 'Web Application',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    year: '2024'
  };
  
  const prompt = `
Generate a professional and engaging project description for a portfolio. Here are the project details:

**Project Title**: ${testProject.title}
**Category**: ${testProject.category}
**Type**: ${testProject.type}
**Technologies/Tools**: ${testProject.technologies.join(', ')}
**Year**: ${testProject.year}

Requirements:
1. Write 1-2 sentences (40-80 words)
2. Professional tone, suitable for portfolio
3. Highlight key features or benefits
4. Mention relevant technologies naturally
5. Focus on what the project does/achieves
6. Make it engaging and specific
7. Write in English

Generate a description for the project "${testProject.title}":`;

  console.log('   Generating description for:', testProject.title, '\n');
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const description = response.text();
    
    console.log('✅ PASSED: Description generated successfully!');
    console.log('   Description:', description.trim(), '\n');
  } catch (error) {
    console.error('❌ FAILED: Description generation error');
    console.error('   Error:', error.message, '\n');
    return;
  }
  
  // Summary
  console.log('═══════════════════════════════════════════════════════');
  console.log('🎉 ALL TESTS PASSED! Gemini API is working correctly!');
  console.log('═══════════════════════════════════════════════════════\n');
}

// Run the test
testGeminiAPI().catch(error => {
  console.error('\n💥 Unexpected error:', error);
  process.exit(1);
});
