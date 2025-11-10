// Test direct API call ke Gemini
const https = require('https');
const fs = require('fs');
const path = require('path');

async function testDirectAPI() {
  console.log('🔍 Testing Direct Gemini API Call...\n');
  
  // Load API key
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
  
  console.log(`✅ API Key: ${apiKey.substring(0, 15)}...\n`);
  
  // Test 1: List models endpoint
  console.log('📋 Test 1: Listing available models via API...\n');
  
  const listModelsUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  try {
    const response = await fetch(listModelsUrl);
    const data = await response.json();
    
    if (response.ok && data.models) {
      console.log('✅ Available models:');
      data.models.forEach(model => {
        console.log(`   - ${model.name} (${model.displayName})`);
        if (model.supportedGenerationMethods) {
          console.log(`     Methods: ${model.supportedGenerationMethods.join(', ')}`);
        }
      });
      console.log('');
      
      // Try to use the first model that supports generateContent
      const generateModels = data.models.filter(m => 
        m.supportedGenerationMethods && 
        m.supportedGenerationMethods.includes('generateContent')
      );
      
      if (generateModels.length > 0) {
        const firstModel = generateModels[0].name;
        console.log(`📋 Test 2: Testing generation with ${firstModel}...\n`);
        
        const generateUrl = `https://generativelanguage.googleapis.com/v1beta/${firstModel}:generateContent?key=${apiKey}`;
        
        const generateResponse = await fetch(generateUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: 'Say "Hello" in Indonesian'
              }]
            }]
          })
        });
        
        const generateData = await generateResponse.json();
        
        if (generateResponse.ok && generateData.candidates) {
          const text = generateData.candidates[0].content.parts[0].text;
          console.log('✅ Generation successful!');
          console.log(`   Response: ${text}\n`);
          
          // Test project description
          console.log('📋 Test 3: Testing project description generation...\n');
          
          const descResponse = await fetch(generateUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: 'Generate a professional 1-2 sentence description for a modern portfolio website built with Next.js, React, TypeScript, and Tailwind CSS. Make it engaging and highlight the key features.'
                }]
              }]
            })
          });
          
          const descData = await descResponse.json();
          
          if (descResponse.ok && descData.candidates) {
            const description = descData.candidates[0].content.parts[0].text;
            console.log('✅ Description generated:');
            console.log(`   ${description}\n`);
            
            console.log('═══════════════════════════════════════════════════════');
            console.log('🎉 ALL TESTS PASSED! Gemini API is working!');
            console.log(`   Working model: ${firstModel}`);
            console.log('═══════════════════════════════════════════════════════\n');
          } else {
            console.error('❌ Description generation failed:', descData);
          }
        } else {
          console.error('❌ Generation failed:', generateData);
        }
      }
    } else {
      console.error('❌ Failed to list models:', data);
      
      if (data.error) {
        console.error('\nError details:');
        console.error(`   Code: ${data.error.code}`);
        console.error(`   Message: ${data.error.message}`);
        console.error(`   Status: ${data.error.status}\n`);
        
        if (data.error.message.includes('API key not valid')) {
          console.log('💡 Your API key appears to be invalid or expired');
          console.log('   Create a new key at: https://aistudio.google.com/app/apikey\n');
        }
      }
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

testDirectAPI();
