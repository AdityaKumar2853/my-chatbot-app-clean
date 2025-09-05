// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const sqlite3 = require("sqlite3").verbose();
// const axios = require("axios");
// const csv = require("csv-parser");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Get OpenAI API Key from environment variables
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Create uploads directory if it doesn't exist
// const uploadsDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// // Configure multer for file uploads with file type filtering
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadsDir);
//   },
//   filename: (req, file, cb) => {
//     // Create a unique filename with original extension
//     const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const ext = path.extname(file.originalname);
//     cb(null, uniquePrefix + ext);
//   }
// });

// // File filter function
// const fileFilter = (req, file, cb) => {
//   // Define allowed file types
//   const allowedTypes = [
//     // Images
//     'image/jpeg', 'image/png', 'image/gif', 'image/webp',
//     // Documents
//     'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//     'text/plain', 'text/csv',
//     // Presentations
//     'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
//     // Spreadsheets
//     'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//   ];
  
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true); // Accept file
//   } else {
//     cb(new Error('Unsupported file type'), false); // Reject file
//   }
// };

// // Configure multer
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10 MB limit
//   }
// });

// // Initialize SQLite database
// const db = new sqlite3.Database("./chatbot.db");

// // Create conversations table to store chat history
// db.serialize(() => {
//   db.run(`CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     username TEXT UNIQUE,
//     password TEXT
//   )`);
  
//   db.run(`CREATE TABLE IF NOT EXISTS conversations (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     user_id INTEGER,
//     message TEXT,
//     response TEXT,
//     file_path TEXT NULL,
//     file_original_name TEXT NULL,
//     chart_data TEXT NULL,
//     timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (user_id) REFERENCES users(id)
//   )`);
// });

// // Function to parse CSV data and generate chart configuration
// const parseCSVForChart = (filePath, originalName) => {
//   return new Promise((resolve, reject) => {
//     const results = [];
//     const headers = [];
//     let isFirstRow = true;
    
//     fs.createReadStream(filePath)
//       .pipe(csv())
//       .on('data', (data) => {
//         if (isFirstRow) {
//           Object.keys(data).forEach(key => headers.push(key));
//           isFirstRow = false;
//         }
//         results.push(data);
//       })
//       .on('end', () => {
//         if (results.length === 0) {
//           resolve(null);
//           return;
//         }
        
//         // Auto-detect chart type and prepare data
//         const chartConfig = generateChartConfig(results, headers, originalName);
//         resolve(chartConfig);
//       })
//       .on('error', (error) => {
//         console.error('CSV parsing error:', error);
//         resolve(null);
//       });
//   });
// };

// // Generate Highcharts configuration based on CSV data
// const generateChartConfig = (data, headers, filename) => {
//   if (!data || data.length === 0) return null;
  
//   // Find numeric columns
//   const numericColumns = headers.filter(header => {
//     return data.some(row => !isNaN(parseFloat(row[header])) && isFinite(row[header]));
//   });
  
//   // Find potential category column (non-numeric)
//   const categoryColumns = headers.filter(header => !numericColumns.includes(header));
  
//   if (numericColumns.length === 0) return null;
  
//   const categoryColumn = categoryColumns[0] || headers[0];
//   const categories = data.map(row => row[categoryColumn]).slice(0, 20); // Limit to 20 items
  
//   // Create series data for up to 3 numeric columns
//   const series = numericColumns.slice(0, 3).map(column => ({
//     name: column,
//     data: data.slice(0, 20).map(row => parseFloat(row[column]) || 0)
//   }));
  
//   // Determine chart type based on data characteristics
//   let chartType = 'column';
//   if (data.length > 10 && numericColumns.length === 1) {
//     chartType = 'line';
//   } else if (numericColumns.length > 2) {
//     chartType = 'line';
//   }
  
//   return {
//     chart: {
//       type: chartType,
//       height: 400
//     },
//     title: {
//       text: `Data Visualization: ${filename}`,
//       style: {
//         fontSize: '16px'
//       }
//     },
//     subtitle: {
//       text: `Generated from ${data.length} data points`
//     },
//     xAxis: {
//       categories: categories,
//       title: {
//         text: categoryColumn
//       }
//     },
//     yAxis: {
//       title: {
//         text: 'Value'
//       }
//     },
//     tooltip: {
//       shared: true,
//       crosshairs: true
//     },
//     plotOptions: {
//       series: {
//         marker: {
//           enabled: true,
//           radius: 3
//         }
//       }
//     },
//     series: series,
//     legend: {
//       enabled: series.length > 1
//     },
//     credits: {
//       enabled: false
//     }
//   };
// };

// // Error handling middleware for multer
// app.use((err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     return res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
//   } else if (err) {
//     return res.status(400).json({ success: false, message: err.message });
//   }
//   next();
// });

// // Signup endpoint
// app.post("/signup", (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password)
//     return res.status(400).json({ success: false, message: "Missing fields" });

//   db.run(
//     `INSERT INTO users (username, password) VALUES (?, ?)`,
//     [username, password],
//     function (err) {
//       if (err) {
//         // Likely username taken
//         return res.json({ success: false, message: "Username taken" });
//       }
//       res.json({ success: true, userId: this.lastID });
//     }
//   );
// });

// // Login endpoint
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password)
//     return res.status(400).json({ success: false, message: "Missing fields" });

//   db.get(
//     `SELECT * FROM users WHERE username = ? AND password = ?`,
//     [username, password],
//     (err, row) => {
//       if (err || !row) return res.json({ success: false });
//       res.json({ success: true, userId: row.id, username: row.username });
//     }
//   );
// });

// // Chat endpoint with file upload and chart generation
// app.post("/chat", upload.single("file"), async (req, res) => {
//   const { message, userId } = req.body;
//   const file = req.file;

//   // Debug output
//   console.log("Received chat request with userId:", userId);
//   console.log("Message:", message);
//   console.log("File:", file ? file.originalname : "none");

//   if (!message && !file) {
//     return res.status(400).json({ success: false, message: "No message or file provided" });
//   }

//   if (!OPENAI_API_KEY) {
//     return res.status(500).json({ 
//       success: false, 
//       message: "OpenAI API key is not configured. Please set OPENAI_API_KEY in your .env file." 
//     });
//   }

//   try {
//     // Construct message content, including file information if present
//     let messageContent = message || "";
//     let chartConfig = null;
    
//     if (file) {
//       messageContent += `\n[Attached file: ${file.originalname}]`;
      
//       // If it's a CSV file, try to generate a chart
//       if (file.mimetype === 'text/csv') {
//         console.log("Processing CSV file for chart generation...");
//         chartConfig = await parseCSVForChart(file.path, file.originalname);
        
//         if (chartConfig) {
//           messageContent += "\n[Chart visualization has been generated from the CSV data]";
//         }
//       }
//     }

//     // Call OpenAI API
//     const openaiResponse = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-4o-mini",
//         messages: [{ role: "user", content: messageContent }],
//         max_tokens: 500,
//         temperature: 0.7,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${OPENAI_API_KEY}`,
//         },
//       }
//     );

//     const botReply = openaiResponse.data.choices[0].message.content;

//     // Convert userId to integer to ensure it's properly handled in the database
//     const userIdNum = userId ? parseInt(userId, 10) : null;
    
//     // Double-check userId is valid
//     if (!userIdNum) {
//       console.warn("Warning: No valid userId provided for saving conversation");
//     }

//     // Store conversation in database if userId is valid
//     if (userIdNum) {
//       const chartDataString = chartConfig ? JSON.stringify(chartConfig) : null;
      
//       if (file) {
//         // With file attachment
//         db.run(
//           `INSERT INTO conversations (user_id, message, response, file_path, file_original_name, chart_data) 
//            VALUES (?, ?, ?, ?, ?, ?)`,
//           [userIdNum, message || '', botReply, file.path, file.originalname, chartDataString],
//           function(err) {
//             if (err) {
//               console.error("Error saving conversation with file:", err);
//             } else {
//               console.log(`Conversation saved with ID: ${this.lastID}`);
//             }
//           }
//         );
//       } else {
//         // Text-only conversation
//         db.run(
//           `INSERT INTO conversations (user_id, message, response) VALUES (?, ?, ?)`,
//           [userIdNum, message, botReply],
//           function(err) {
//             if (err) {
//               console.error("Error saving text conversation:", err);
//             } else {
//               console.log(`Text conversation saved with ID: ${this.lastID}`);
//             }
//           }
//         );
//       }
//     }

//     // Prepare file info for response
//     let fileInfo = null;
//     if (file) {
//       fileInfo = {
//         originalName: file.originalname,
//         url: `/uploads/${file.filename}` // relative path
//       };
//     }

//     // Send response
//     res.json({
//       success: true,
//       reply: botReply,
//       file: fileInfo,
//       chartConfig: chartConfig
//     });
//   } catch (error) {
//     console.error("API error:", error.response?.data || error.message);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to get response from AI service" 
//     });
//   }
// });

// // Get conversation history
// app.get("/conversations/:userId", (req, res) => {
//   const userId = req.params.userId;
  
//   // Debug output
//   console.log("Fetching conversations for userId:", userId);
  
//   // Convert userId to integer
//   const userIdNum = parseInt(userId, 10);
  
//   if (isNaN(userIdNum)) {
//     console.error("Invalid userId format");
//     return res.status(400).json({ success: false, message: "Invalid userId format" });
//   }
  
//   db.all(
//     `SELECT * FROM conversations WHERE user_id = ? ORDER BY timestamp DESC`,
//     [userIdNum],
//     (err, rows) => {
//       if (err) {
//         console.error("Database error:", err);
//         return res.status(500).json({ success: false, message: "Database error" });
//       }
      
//       console.log(`Found ${rows.length} conversations for user ${userIdNum}`);
      
//       // Parse chart_data for each conversation
//       const conversations = rows.map(row => ({
//         ...row,
//         chart_data: row.chart_data ? JSON.parse(row.chart_data) : null
//       }));
      
//       res.json({ success: true, conversations: conversations });
//     }
//   );
// });

// // Delete conversation
// app.delete("/conversations/:id", (req, res) => {
//   const conversationId = req.params.id;
  
//   db.run(
//     `DELETE FROM conversations WHERE id = ?`,
//     [conversationId],
//     function(err) {
//       if (err) {
//         return res.status(500).json({ success: false, message: "Database error" });
//       }
//       res.json({ success: true, message: "Conversation deleted" });
//     }
//   );
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const axios = require("axios");
const csv = require("csv-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Get OpenAI API Key from environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads with file type filtering
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Create a unique filename with original extension
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniquePrefix + ext);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Define allowed file types
  const allowedTypes = [
    // Images
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    // Documents
    'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain', 'text/csv',
    // Presentations
    'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    // Spreadsheets
    'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Unsupported file type'), false); // Reject file
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit
  }
});

// Initialize SQLite database
const db = new sqlite3.Database("./chatbot.db");

// Create conversations table to store chat history
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS conversations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    message TEXT,
    response TEXT,
    file_path TEXT NULL,
    file_original_name TEXT NULL,
    chart_data TEXT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);
});

// Function to parse CSV data and generate chart configuration
const parseCSVForChart = (filePath, originalName) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const headers = [];
    let isFirstRow = true;
    
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        if (isFirstRow) {
          Object.keys(data).forEach(key => headers.push(key));
          isFirstRow = false;
        }
        results.push(data);
      })
      .on('end', () => {
        if (results.length === 0) {
          resolve(null);
          return;
        }
        
        // Auto-detect chart type and prepare data
        const chartConfig = generateChartConfig(results, headers, originalName);
        resolve(chartConfig);
      })
      .on('error', (error) => {
        console.error('CSV parsing error:', error);
        resolve(null);
      });
  });
};

// Generate Highcharts configuration based on CSV data
const generateChartConfig = (data, headers, filename) => {
  if (!data || data.length === 0) return null;
  
  // Find numeric columns
  const numericColumns = headers.filter(header => {
    return data.some(row => !isNaN(parseFloat(row[header])) && isFinite(row[header]));
  });
  
  // Find potential category column (non-numeric)
  const categoryColumns = headers.filter(header => !numericColumns.includes(header));
  
  if (numericColumns.length === 0) return null;
  
  const categoryColumn = categoryColumns[0] || headers[0];
  const categories = data.map(row => row[categoryColumn]).slice(0, 20); // Limit to 20 items
  
  // Create series data for up to 3 numeric columns
  const series = numericColumns.slice(0, 3).map(column => ({
    name: column,
    data: data.slice(0, 20).map(row => parseFloat(row[column]) || 0)
  }));
  
  // Determine chart type based on data characteristics
  let chartType = 'column';
  if (data.length > 10 && numericColumns.length === 1) {
    chartType = 'line';
  } else if (numericColumns.length > 2) {
    chartType = 'line';
  }
  
  return {
    chart: {
      type: chartType,
      height: 400
    },
    title: {
      text: `Data Visualization: ${filename}`,
      style: {
        fontSize: '16px'
      }
    },
    subtitle: {
      text: `Generated from ${data.length} data points`
    },
    xAxis: {
      categories: categories,
      title: {
        text: categoryColumn
      }
    },
    yAxis: {
      title: {
        text: 'Value'
      }
    },
    tooltip: {
      shared: true,
      crosshairs: true
    },
    plotOptions: {
      series: {
        marker: {
          enabled: true,
          radius: 3
        }
      }
    },
    series: series,
    legend: {
      enabled: series.length > 1
    },
    credits: {
      enabled: false
    }
  };
};

// Error handling middleware for multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
  } else if (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  next();
});

// Signup endpoint
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ success: false, message: "Missing fields" });

  db.run(
    `INSERT INTO users (username, password) VALUES (?, ?)`,
    [username, password],
    function (err) {
      if (err) {
        // Likely username taken
        return res.json({ success: false, message: "Username taken" });
      }
      res.json({ success: true, userId: this.lastID });
    }
  );
});

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ success: false, message: "Missing fields" });

  db.get(
    `SELECT * FROM users WHERE username = ? AND password = ?`,
    [username, password],
    (err, row) => {
      if (err || !row) return res.json({ success: false });
      res.json({ success: true, userId: row.id, username: row.username });
    }
  );
});

// Chat endpoint with file upload and chart generation
app.post("/chat", upload.single("file"), async (req, res) => {
  const { message, userId } = req.body;
  const file = req.file;

  // Debug output
  console.log("Received chat request with userId:", userId);
  console.log("Message:", message);
  console.log("File:", file ? file.originalname : "none");

  if (!message && !file) {
    return res.status(400).json({ success: false, message: "No message or file provided" });
  }

  if (!OPENAI_API_KEY) {
    return res.status(500).json({ 
      success: false, 
      message: "OpenAI API key is not configured. Please set OPENAI_API_KEY in your .env file." 
    });
  }

  try {
    // Construct message content, including file information if present
    let messageContent = message || "";
    let chartConfig = null;
    
    if (file) {
      messageContent += `\n[Attached file: ${file.originalname}]`;
      
      // If it's a CSV file, try to generate a chart
      if (file.mimetype === 'text/csv') {
        console.log("Processing CSV file for chart generation...");
        chartConfig = await parseCSVForChart(file.path, file.originalname);
        
        if (chartConfig) {
          messageContent += "\n[Chart visualization has been generated from the CSV data]";
        }
      }
    }

    // Call OpenAI API
    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: messageContent }],
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const botReply = openaiResponse.data.choices[0].message.content;

    // Convert userId to integer to ensure it's properly handled in the database
    const userIdNum = userId ? parseInt(userId, 10) : null;
    
    // Double-check userId is valid
    if (!userIdNum) {
      console.warn("Warning: No valid userId provided for saving conversation");
    }

    // Store conversation in database if userId is valid
    if (userIdNum) {
      const chartDataString = chartConfig ? JSON.stringify(chartConfig) : null;
      
      if (file) {
        // With file attachment
        db.run(
          `INSERT INTO conversations (user_id, message, response, file_path, file_original_name, chart_data) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [userIdNum, message || '', botReply, file.path, file.originalname, chartDataString],
          function(err) {
            if (err) {
              console.error("Error saving conversation with file:", err);
            } else {
              console.log(`Conversation saved with ID: ${this.lastID}`);
            }
          }
        );
      } else {
        // Text-only conversation
        db.run(
          `INSERT INTO conversations (user_id, message, response) VALUES (?, ?, ?)`,
          [userIdNum, message, botReply],
          function(err) {
            if (err) {
              console.error("Error saving text conversation:", err);
            } else {
              console.log(`Text conversation saved with ID: ${this.lastID}`);
            }
          }
        );
      }
    }

    // Prepare file info for response
    let fileInfo = null;
    if (file) {
      fileInfo = {
        originalName: file.originalname,
        url: `/uploads/${file.filename}` // relative path
      };
    }

    // Send response
    res.json({
      success: true,
      reply: botReply,
      file: fileInfo,
      chartConfig: chartConfig
    });
  } catch (error) {
    console.error("API error:", error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: "Failed to get response from AI service" 
    });
  }
});

// Get conversation history
app.get("/conversations/:userId", (req, res) => {
  const userId = req.params.userId;
  
  // Debug output
  console.log("Fetching conversations for userId:", userId);
  
  // Convert userId to integer
  const userIdNum = parseInt(userId, 10);
  
  if (isNaN(userIdNum)) {
    console.error("Invalid userId format");
    return res.status(400).json({ success: false, message: "Invalid userId format" });
  }
  
  db.all(
    `SELECT * FROM conversations WHERE user_id = ? ORDER BY timestamp DESC`,
    [userIdNum],
    (err, rows) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ success: false, message: "Database error" });
      }
      
      console.log(`Found ${rows.length} conversations for user ${userIdNum}`);
      
      // Parse chart_data for each conversation
      const conversations = rows.map(row => ({
        ...row,
        chart_data: row.chart_data ? JSON.parse(row.chart_data) : null
      }));
      
      res.json({ success: true, conversations: conversations });
    }
  );
});

// Delete conversation
app.delete("/conversations/:id", (req, res) => {
  const conversationId = req.params.id;
  
  db.run(
    `DELETE FROM conversations WHERE id = ?`,
    [conversationId],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: "Database error" });
      }
      res.json({ success: true, message: "Conversation deleted" });
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});