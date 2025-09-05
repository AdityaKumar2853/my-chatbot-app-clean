// diagnostic.js - Add this file to your project and run with Node.js
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();

// Open the database
const db = new sqlite3.Database('./chatbot.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the chatbot database.');
  }
});

// Function to test OpenAI API key
async function testOpenAIAPI() {
  console.log('\n===== TESTING OPENAI API KEY =====');
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ ERROR: OPENAI_API_KEY is not set in environment variables');
    return false;
  }
  
  console.log('✅ OPENAI_API_KEY is set in environment variables');
  
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'Hello, this is a test message' }],
        max_tokens: 50,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );
    
    console.log('✅ API call successful');
    console.log('Response:', response.data.choices[0].message.content);
    return true;
  } catch (error) {
    console.error('❌ API call failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      
      // Check for specific error types
      if (error.response.status === 401) {
        console.error('This is likely an authentication error - your API key may be invalid');
      } else if (error.response.data.error && error.response.data.error.type === 'insufficient_quota') {
        console.error('You have insufficient quota or your account has reached its usage limits');
      }
    } else {
      console.error('Error:', error.message);
    }
    return false;
  }
}

// Function to check database tables
function checkDatabase() {
  console.log('\n===== CHECKING DATABASE TABLES =====');
  
  // Check users table
  db.all('SELECT COUNT(*) as count FROM users', [], (err, rows) => {
    if (err) {
      console.error('❌ Error querying users table:', err.message);
    } else {
      console.log(`✅ Users table exists with ${rows[0].count} records`);
    }
  });
  
  // Check conversations table
  db.all('SELECT COUNT(*) as count FROM conversations', [], (err, rows) => {
    if (err) {
      console.error('❌ Error querying conversations table:', err.message);
    } else {
      console.log(`✅ Conversations table exists with ${rows[0].count} records`);
    }
  });
  
  // Check if uploads directory exists
  const fs = require('fs');
  const path = require('path');
  const uploadsDir = path.join(__dirname, 'uploads');
  
  if (fs.existsSync(uploadsDir)) {
    console.log('✅ Uploads directory exists');
  } else {
    console.error('❌ Uploads directory does not exist');
  }
}

// Function to test database operations
function testDatabaseOperations() {
  console.log('\n===== TESTING DATABASE OPERATIONS =====');
  
  // Test user insertion
  const testUsername = `test_user_${Date.now()}`;
  const testPassword = 'test_password';
  
  db.run(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [testUsername, testPassword],
    function(err) {
      if (err) {
        console.error('❌ Error inserting test user:', err.message);
      } else {
        const userId = this.lastID;
        console.log(`✅ Test user inserted with ID: ${userId}`);
        
        // Test conversation insertion
        const testMessage = 'This is a test message';
        const testResponse = 'This is a test response';
        
        db.run(
          'INSERT INTO conversations (user_id, message, response) VALUES (?, ?, ?)',
          [userId, testMessage, testResponse],
          function(err) {
            if (err) {
              console.error('❌ Error inserting test conversation:', err.message);
            } else {
              console.log(`✅ Test conversation inserted with ID: ${this.lastID}`);
              
              // Test conversation retrieval
              db.all(
                'SELECT * FROM conversations WHERE user_id = ?',
                [userId],
                (err, rows) => {
                  if (err) {
                    console.error('❌ Error retrieving test conversation:', err.message);
                  } else {
                    console.log(`✅ Retrieved ${rows.length} conversations for test user`);
                    
                    // Cleanup - delete test conversation and user
                    db.run('DELETE FROM conversations WHERE user_id = ?', [userId], function(err) {
                      if (err) {
                        console.error('❌ Error deleting test conversation:', err.message);
                      } else {
                        console.log('✅ Test conversation deleted');
                        
                        db.run('DELETE FROM users WHERE id = ?', [userId], function(err) {
                          if (err) {
                            console.error('❌ Error deleting test user:', err.message);
                          } else {
                            console.log('✅ Test user deleted');
                          }
                        });
                      }
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
}

// Main function
async function runDiagnostics() {
  console.log('===== STARTING DIAGNOSTICS =====');
  console.log('Time:', new Date().toISOString());
  
  // Test OpenAI API
  const apiWorking = await testOpenAIAPI();
  
  // Check database
  checkDatabase();
  
  // Test database operations
  testDatabaseOperations();
  
  // Final recommendations
  setTimeout(() => {
    console.log('\n===== DIAGNOSTIC SUMMARY AND RECOMMENDATIONS =====');
    if (!apiWorking) {
      console.log('⚠️  The main issue appears to be with your OpenAI API key:');
      console.log('  - Check that the OPENAI_API_KEY is correctly set in your .env file');
      console.log('  - Verify that your OpenAI account has sufficient credits/quota');
      console.log('  - Try generating a new API key from the OpenAI dashboard');
    } else {
      console.log('🔍 Check the server logs for errors when making chat requests');
      console.log('🔍 Verify that the userId is being properly passed to the server');
      console.log('🔍 Ensure there are no errors in your network requests (check browser console)');
    }
    
    console.log('\nFor more detailed debugging:');
    console.log('1. Add more console.log statements in your server.js file');
    console.log('2. Check for any errors in the browser console');
    console.log('3. Use a tool like Postman to test your API endpoints directly');
    
    // Close database connection
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Database connection closed.');
      }
    });
  }, 2000); // Give time for database operations to complete
}

// Run the diagnostics
runDiagnostics();