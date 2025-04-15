/**
 * Test script for HTML2PDF API
 * 
 * This file is for testing purposes only to validate the API key and connection
 * Run this in the browser console to check if the API works properly
 */

const API_KEY = 'sZ7seHtPAfbm9KioGdIFYnoYwJd1mvZ4CD8e6JkIi70jw78k5t9MzX0YjnH4OizD';
const API_ENDPOINT = 'https://api.html2pdf.app/v1/generate';

// Simple HTML to convert
const TEST_HTML = `
<!DOCTYPE html>
<html>
<head>
  <title>Test Document</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    h1 { color: #2563eb; }
  </style>
</head>
<body>
  <h1>Test HTML2PDF API</h1>
  <p>This is a test document to verify the API is working.</p>
  <p>Generated on: ${new Date().toLocaleString()}</p>
</body>
</html>
`;

// Test function using URL approach
async function testApiWithUrl() {
  try {
    console.log('Testing HTML2PDF API with URL...');
    
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: 'https://example.com',
        apiKey: API_KEY
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('URL test failed:', response.status, errorText);
      return false;
    }
    
    const blob = await response.blob();
    console.log('URL test succeeded!', blob);
    return true;
  } catch (error) {
    console.error('URL test error:', error);
    return false;
  }
}

// Test function using HTML approach
async function testApiWithHtml() {
  try {
    console.log('Testing HTML2PDF API with HTML content...');
    
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        html: TEST_HTML,
        apiKey: API_KEY
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('HTML test failed:', response.status, errorText);
      return false;
    }
    
    const blob = await response.blob();
    console.log('HTML test succeeded!', blob);
    return true;
  } catch (error) {
    console.error('HTML test error:', error);
    return false;
  }
}

// Run the tests
async function runTests() {
  console.log('Starting API tests...');
  
  const urlResult = await testApiWithUrl();
  console.log('URL test result:', urlResult ? 'PASSED' : 'FAILED');
  
  const htmlResult = await testApiWithHtml();
  console.log('HTML test result:', htmlResult ? 'PASSED' : 'FAILED');
  
  console.log('Tests completed!');
}

// Export for use in browser console
window.testHtml2PdfApi = runTests; 