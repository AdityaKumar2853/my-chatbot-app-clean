// // // // // // // // // // // pages/Chat.jsx
// // // // // // // // // // import './chat.scss';

// // // // // // // // // // export default function Chat() {
// // // // // // // // // //   return (
// // // // // // // // // //     <div className="chat-container">
// // // // // // // // // //       <header>Chatbot Header</header>
// // // // // // // // // //       <div className="main">
// // // // // // // // // //         <aside className="sidebar">
// // // // // // // // // //           <h3>History</h3>
// // // // // // // // // //           <ul>
// // // // // // // // // //             <li>Chat 1</li>
// // // // // // // // // //             <li>Chat 2</li>
// // // // // // // // // //           </ul>
// // // // // // // // // //         </aside>
// // // // // // // // // //         <section className="chat-window">
// // // // // // // // // //           <div className="messages">Chat messages will appear here</div>
// // // // // // // // // //           <div className="chat-input">
// // // // // // // // // //             <input type="text" placeholder="Type your message..." />
// // // // // // // // // //             <button>Send</button>
// // // // // // // // // //           </div>
// // // // // // // // // //         </section>
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }



// // // // // // // // // import React, { useState } from "react";
// // // // // // // // // import "./chat.scss";

// // // // // // // // // export default function Chat() {
// // // // // // // // //   const [messages, setMessages] = useState([
// // // // // // // // //     { id: 1, text: "Welcome to the chatbot!" },
// // // // // // // // //   ]);
// // // // // // // // //   const [input, setInput] = useState("");

// // // // // // // // //   const sendMessage = () => {
// // // // // // // // //     if (!input.trim()) return;
// // // // // // // // //     setMessages((prev) => [...prev, { id: Date.now(), text: input }]);
// // // // // // // // //     setInput("");
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div className="chat-container">
// // // // // // // // //       <header className="chat-header">
// // // // // // // // //         <h1>My Chatbot</h1>
// // // // // // // // //       </header>

// // // // // // // // //       <div className="chat-body">
// // // // // // // // //         <aside className="chat-sidebar">
// // // // // // // // //           <h2>Chat History</h2>
// // // // // // // // //           <ul>
// // // // // // // // //             {messages.map((msg) => (
// // // // // // // // //               <li key={msg.id}>{msg.text}</li>
// // // // // // // // //             ))}
// // // // // // // // //           </ul>
// // // // // // // // //         </aside>

// // // // // // // // //         <main className="chat-main">
// // // // // // // // //           <div className="chat-messages">
// // // // // // // // //             {messages.map((msg) => (
// // // // // // // // //               <div key={msg.id} className="message">
// // // // // // // // //                 {msg.text}
// // // // // // // // //               </div>
// // // // // // // // //             ))}
// // // // // // // // //           </div>

// // // // // // // // //           <div className="chat-input-container">
// // // // // // // // //             <input
// // // // // // // // //               type="text"
// // // // // // // // //               placeholder="Type a message"
// // // // // // // // //               value={input}
// // // // // // // // //               onChange={(e) => setInput(e.target.value)}
// // // // // // // // //               onKeyDown={(e) => {
// // // // // // // // //                 if (e.key === "Enter") sendMessage();
// // // // // // // // //               }}
// // // // // // // // //             />
// // // // // // // // //             <button onClick={sendMessage}>Send</button>
// // // // // // // // //           </div>
// // // // // // // // //         </main>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }



// // // // // // // // import React, { useState } from "react";
// // // // // // // // import axios from "axios";
// // // // // // // // import "./chat.scss";

// // // // // // // // export default function Chat() {
// // // // // // // //   const [messages, setMessages] = useState([
// // // // // // // //     { id: 1, text: "Welcome to the chatbot!", sender: "bot" },
// // // // // // // //   ]);
// // // // // // // //   const [input, setInput] = useState("");

// // // // // // // //   const sendMessage = async () => {
// // // // // // // //     if (!input.trim()) return;

// // // // // // // //     // Add user message immediately
// // // // // // // //     const userMsg = { id: Date.now(), text: input, sender: "user" };
// // // // // // // //     setMessages((prev) => [...prev, userMsg]);

// // // // // // // //     const messageToSend = input;
// // // // // // // //     setInput("");

// // // // // // // //     try {
// // // // // // // //       const res = await axios.post("http://localhost:5000/chat", {
// // // // // // // //         message: messageToSend,
// // // // // // // //       });
// // // // // // // //       const botReply = res.data.reply;

// // // // // // // //       const botMsg = { id: Date.now() + 1, text: botReply, sender: "bot" };
// // // // // // // //       setMessages((prev) => [...prev, botMsg]);
// // // // // // // //     } catch (error) {
// // // // // // // //       const errMsg = {
// // // // // // // //         id: Date.now() + 1,
// // // // // // // //         text: "Sorry, bot is not available right now.",
// // // // // // // //         sender: "bot",
// // // // // // // //       };
// // // // // // // //       setMessages((prev) => [...prev, errMsg]);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="chat-container">
// // // // // // // //       <header className="chat-header">
// // // // // // // //         <h1>My Chatbot</h1>
// // // // // // // //       </header>

// // // // // // // //       <div className="chat-body">
// // // // // // // //         <aside className="chat-sidebar">
// // // // // // // //           <h2>Chat History</h2>
// // // // // // // //           <ul>
// // // // // // // //             {messages.map((msg) => (
// // // // // // // //               <li key={msg.id}>{msg.text}</li>
// // // // // // // //             ))}
// // // // // // // //           </ul>
// // // // // // // //         </aside>

// // // // // // // //         <main className="chat-main">
// // // // // // // //           <div className="chat-messages">
// // // // // // // //             {messages.map((msg) => (
// // // // // // // //               <div
// // // // // // // //                 key={msg.id}
// // // // // // // //                 className={`message ${
// // // // // // // //                   msg.sender === "user" ? "user-message" : "bot-message"
// // // // // // // //                 }`}
// // // // // // // //               >
// // // // // // // //                 {msg.text}
// // // // // // // //               </div>
// // // // // // // //             ))}
// // // // // // // //           </div>

// // // // // // // //           <div className="chat-input-container">
// // // // // // // //             <input
// // // // // // // //               type="text"
// // // // // // // //               placeholder="Type a message"
// // // // // // // //               value={input}
// // // // // // // //               onChange={(e) => setInput(e.target.value)}
// // // // // // // //               onKeyDown={(e) => {
// // // // // // // //                 if (e.key === "Enter") sendMessage();
// // // // // // // //               }}
// // // // // // // //             />
// // // // // // // //             <button onClick={sendMessage}>Send</button>
// // // // // // // //           </div>
// // // // // // // //         </main>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }


// // // // // // // import React, { useState, useRef, useEffect } from "react";
// // // // // // // import axios from "axios";
// // // // // // // import "./chat.scss";

// // // // // // // export default function Chat() {
// // // // // // //   const [messages, setMessages] = useState([
// // // // // // //     { id: 1, text: "Welcome to the chatbot!", sender: "bot" },
// // // // // // //   ]);
// // // // // // //   const [input, setInput] = useState("");
// // // // // // //   const messagesEndRef = useRef(null);

// // // // // // //   // Helper to truncate message text to first few words
// // // // // // //   function truncateText(text, wordLimit = 5) {
// // // // // // //     const words = text.split(" ");
// // // // // // //     if (words.length <= wordLimit) return text;
// // // // // // //     return words.slice(0, wordLimit).join(" ") + " ..";
// // // // // // //   }

// // // // // // //   const sendMessage = async () => {
// // // // // // //     if (!input.trim()) return;

// // // // // // //     // Add user message immediately
// // // // // // //     const userMsg = { id: Date.now(), text: input, sender: "user" };
// // // // // // //     setMessages((prev) => [...prev, userMsg]);

// // // // // // //     const messageToSend = input;
// // // // // // //     setInput("");

// // // // // // //     try {
// // // // // // //       const res = await axios.post("http://localhost:5000/chat", {
// // // // // // //         message: messageToSend,
// // // // // // //       });
// // // // // // //       const botReply = res.data.reply;

// // // // // // //       const botMsg = { id: Date.now() + 1, text: botReply, sender: "bot" };
// // // // // // //       setMessages((prev) => [...prev, botMsg]);
// // // // // // //     } catch (error) {
// // // // // // //       const errMsg = {
// // // // // // //         id: Date.now() + 1,
// // // // // // //         text: "Sorry, bot is not available right now.",
// // // // // // //         sender: "bot",
// // // // // // //       };
// // // // // // //       setMessages((prev) => [...prev, errMsg]);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Scroll to bottom whenever messages update
// // // // // // //   useEffect(() => {
// // // // // // //     if (messagesEndRef.current) {
// // // // // // //       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
// // // // // // //     }
// // // // // // //   }, [messages]);

// // // // // // //   return (
// // // // // // //     <div className="chat-container">
// // // // // // //       <header className="chat-header">
// // // // // // //         <h1>My Chatbot</h1>
// // // // // // //       </header>

// // // // // // //       <div className="chat-body">
// // // // // // //         <aside className="chat-sidebar">
// // // // // // //           <h2>Chat History</h2>
// // // // // // //           <ul>
// // // // // // //             {messages.map((msg) => (
// // // // // // //               <li key={msg.id}>{truncateText(msg.text)}</li>
// // // // // // //             ))}
// // // // // // //           </ul>
// // // // // // //         </aside>

// // // // // // //         <main className="chat-main">
// // // // // // //           <div className="chat-messages">
// // // // // // //             {messages.map((msg) => (
// // // // // // //               <div
// // // // // // //                 key={msg.id}
// // // // // // //                 className={`message ${
// // // // // // //                   msg.sender === "user" ? "user-message" : "bot-message"
// // // // // // //                 }`}
// // // // // // //               >
// // // // // // //                 {msg.text}
// // // // // // //               </div>
// // // // // // //             ))}
// // // // // // //             <div ref={messagesEndRef} />
// // // // // // //           </div>

// // // // // // //           <div className="chat-input-container">
// // // // // // //             <input
// // // // // // //               type="text"
// // // // // // //               placeholder="Type a message"
// // // // // // //               value={input}
// // // // // // //               onChange={(e) => setInput(e.target.value)}
// // // // // // //               onKeyDown={(e) => {
// // // // // // //                 if (e.key === "Enter") sendMessage();
// // // // // // //               }}
// // // // // // //             />
// // // // // // //             <button onClick={sendMessage}>Send</button>
// // // // // // //           </div>
// // // // // // //         </main>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }


// // // // // // import React, { useState, useRef, useEffect } from "react";
// // // // // // import axios from "axios";
// // // // // // import "./chat.scss";

// // // // // // export default function Chat() {
// // // // // //   const [messages, setMessages] = useState([
// // // // // //     { id: 1, text: "Welcome to the chatbot!", sender: "bot" },
// // // // // //   ]);
// // // // // //   const [input, setInput] = useState("");
// // // // // //   const [selectedMessageId, setSelectedMessageId] = useState(null);
// // // // // //   const messagesEndRef = useRef(null);

// // // // // //   // Helper to truncate message text to first few words
// // // // // //   function truncateText(text, wordLimit = 5) {
// // // // // //     const words = text.split(" ");
// // // // // //     if (words.length <= wordLimit) return text;
// // // // // //     return words.slice(0, wordLimit).join(" ") + " ..";
// // // // // //   }

// // // // // //   const sendMessage = async () => {
// // // // // //     if (!input.trim()) return;

// // // // // //     const userMsg = { id: Date.now(), text: input, sender: "user" };
// // // // // //     setMessages((prev) => [...prev, userMsg]);
// // // // // //     setInput("");
// // // // // //     setSelectedMessageId(null); // Reset selection to show all when new message sent

// // // // // //     try {
// // // // // //       const res = await axios.post("http://localhost:5000/chat", {
// // // // // //         message: userMsg.text,
// // // // // //       });
// // // // // //       const botReply = res.data.reply;

// // // // // //       const botMsg = { id: Date.now() + 1, text: botReply, sender: "bot" };
// // // // // //       setMessages((prev) => [...prev, botMsg]);
// // // // // //     } catch (error) {
// // // // // //       const errMsg = {
// // // // // //         id: Date.now() + 1,
// // // // // //         text: "Sorry, bot is not available right now.",
// // // // // //         sender: "bot",
// // // // // //       };
// // // // // //       setMessages((prev) => [...prev, errMsg]);
// // // // // //     }
// // // // // //   };

// // // // // //   // Scroll to bottom only if no message is selected (showing full chat)
// // // // // //   useEffect(() => {
// // // // // //     if (!selectedMessageId && messagesEndRef.current) {
// // // // // //       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
// // // // // //     }
// // // // // //   }, [messages, selectedMessageId]);

// // // // // //   // The messages to show in main chat window:
// // // // // //   // if selectedMessageId is set, show only that message
// // // // // //   // else show all
// // // // // //   const displayedMessages = selectedMessageId
// // // // // //     ? messages.filter((msg) => msg.id === selectedMessageId)
// // // // // //     : messages;

// // // // // //   return (
// // // // // //     <div className="chat-container">
// // // // // //       <header className="chat-header">
// // // // // //         <h1>My Chatbot</h1>
// // // // // //       </header>

// // // // // //       <div className="chat-body">
// // // // // //         <aside className="chat-sidebar">
// // // // // //           <h2>Chat History</h2>
// // // // // //           <ul>
// // // // // //             {messages.map((msg) => (
// // // // // //               <li
// // // // // //                 key={msg.id}
// // // // // //                 onClick={() => setSelectedMessageId(msg.id)}
// // // // // //                 style={{
// // // // // //                   cursor: "pointer",
// // // // // //                   fontWeight: msg.id === selectedMessageId ? "bold" : "normal",
// // // // // //                   backgroundColor: msg.id === selectedMessageId ? "#d3d3d3" : "transparent",
// // // // // //                   padding: "0.25rem 0.5rem",
// // // // // //                   borderRadius: "4px",
// // // // // //                 }}
// // // // // //                 title={msg.text} // show full text on hover
// // // // // //               >
// // // // // //                 {truncateText(msg.text)}
// // // // // //               </li>
// // // // // //             ))}
// // // // // //             {selectedMessageId && (
// // // // // //               <li
// // // // // //                 onClick={() => setSelectedMessageId(null)}
// // // // // //                 style={{
// // // // // //                   cursor: "pointer",
// // // // // //                   color: "#3f51b5",
// // // // // //                   marginTop: "1rem",
// // // // // //                   fontWeight: "bold",
// // // // // //                 }}
// // // // // //               >
// // // // // //                 Show All Messages
// // // // // //               </li>
// // // // // //             )}
// // // // // //           </ul>
// // // // // //         </aside>

// // // // // //         <main className="chat-main">
// // // // // //           <div className="chat-messages">
// // // // // //             {displayedMessages.map((msg) => (
// // // // // //               <div
// // // // // //                 key={msg.id}
// // // // // //                 className={`message ${
// // // // // //                   msg.sender === "user" ? "user-message" : "bot-message"
// // // // // //                 }`}
// // // // // //               >
// // // // // //                 {msg.text}
// // // // // //               </div>
// // // // // //             ))}
// // // // // //             {!selectedMessageId && <div ref={messagesEndRef} />}
// // // // // //           </div>

// // // // // //           <div className="chat-input-container">
// // // // // //             <input
// // // // // //               type="text"
// // // // // //               placeholder="Type a message"
// // // // // //               value={input}
// // // // // //               onChange={(e) => setInput(e.target.value)}
// // // // // //               onKeyDown={(e) => {
// // // // // //                 if (e.key === "Enter") sendMessage();
// // // // // //               }}
// // // // // //             />
// // // // // //             <button onClick={sendMessage}>Send</button>
// // // // // //           </div>
// // // // // //         </main>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }


// // // // // import React, { useState, useRef, useEffect } from "react";
// // // // // import axios from "axios";
// // // // // import "./chat.scss";

// // // // // export default function Chat() {
// // // // //   const [messages, setMessages] = useState([
// // // // //     { id: 1, text: "Welcome to the chatbot!", sender: "bot" },
// // // // //   ]);
// // // // //   const [input, setInput] = useState("");
// // // // //   const [selectedUserMsgId, setSelectedUserMsgId] = useState(null);

// // // // //   // We'll store refs to each message div so we can scroll to them on demand
// // // // //   const messageRefs = useRef({});

// // // // //   // Truncate helper for sidebar preview text
// // // // //   function truncateText(text, wordLimit = 5) {
// // // // //     const words = text.split(" ");
// // // // //     if (words.length <= wordLimit) return text;
// // // // //     return words.slice(0, wordLimit).join(" ") + " ..";
// // // // //   }

// // // // //   const sendMessage = async () => {
// // // // //     if (!input.trim()) return;

// // // // //     const userMsg = { id: Date.now(), text: input, sender: "user" };
// // // // //     setMessages((prev) => [...prev, userMsg]);
// // // // //     setInput("");
// // // // //     setSelectedUserMsgId(null); // reset selection on new message

// // // // //     try {
// // // // //       const res = await axios.post("http://localhost:5000/chat", {
// // // // //         message: userMsg.text,
// // // // //       });
// // // // //       const botReply = res.data.reply;

// // // // //       const botMsg = { id: Date.now() + 1, text: botReply, sender: "bot" };
// // // // //       setMessages((prev) => [...prev, botMsg]);
// // // // //     } catch (error) {
// // // // //       const errMsg = {
// // // // //         id: Date.now() + 1,
// // // // //         text: "Sorry, bot is not available right now.",
// // // // //         sender: "bot",
// // // // //       };
// // // // //       setMessages((prev) => [...prev, errMsg]);
// // // // //     }
// // // // //   };

// // // // //   // Scroll to bottom when new messages arrive (if no selection)
// // // // //   useEffect(() => {
// // // // //     if (selectedUserMsgId === null) {
// // // // //       const lastMessageId = messages[messages.length - 1]?.id;
// // // // //       if (lastMessageId && messageRefs.current[lastMessageId]) {
// // // // //         messageRefs.current[lastMessageId].scrollIntoView({ behavior: "smooth" });
// // // // //       }
// // // // //     }
// // // // //   }, [messages, selectedUserMsgId]);

// // // // //   // Scroll to clicked user message
// // // // //   const handleHistoryClick = (msgId) => {
// // // // //     setSelectedUserMsgId(msgId);
// // // // //     if (messageRefs.current[msgId]) {
// // // // //       messageRefs.current[msgId].scrollIntoView({ behavior: "smooth", block: "center" });
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="chat-container">
// // // // //       <header className="chat-header">
// // // // //         <h1>My Chatbot</h1>
// // // // //       </header>

// // // // //       <div className="chat-body">
// // // // //         <aside className="chat-sidebar">
// // // // //           <h2>Chat History (User Questions)</h2>
// // // // //           <ul>
// // // // //             {messages
// // // // //               .filter((msg) => msg.sender === "user")
// // // // //               .map((msg) => (
// // // // //                 <li
// // // // //                   key={msg.id}
// // // // //                   onClick={() => handleHistoryClick(msg.id)}
// // // // //                   style={{
// // // // //                     cursor: "pointer",
// // // // //                     fontWeight: msg.id === selectedUserMsgId ? "bold" : "normal",
// // // // //                     backgroundColor: msg.id === selectedUserMsgId ? "#d3d3d3" : "transparent",
// // // // //                     padding: "0.25rem 0.5rem",
// // // // //                     borderRadius: "4px",
// // // // //                   }}
// // // // //                   title={msg.text}
// // // // //                 >
// // // // //                   {truncateText(msg.text)}
// // // // //                 </li>
// // // // //               ))}
// // // // //           </ul>
// // // // //         </aside>

// // // // //         <main className="chat-main">
// // // // //           <div className="chat-messages">
// // // // //             {messages.map((msg) => (
// // // // //               <div
// // // // //                 key={msg.id}
// // // // //                 ref={(el) => (messageRefs.current[msg.id] = el)}
// // // // //                 className={`message ${
// // // // //                   msg.sender === "user" ? "user-message" : "bot-message"
// // // // //                 }`}
// // // // //                 style={{
// // // // //                   border:
// // // // //                     msg.id === selectedUserMsgId
// // // // //                       ? "2px solid #3f51b5"
// // // // //                       : "none",
// // // // //                 }}
// // // // //               >
// // // // //                 {msg.text}
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>

// // // // //           <div className="chat-input-container">
// // // // //             <input
// // // // //               type="text"
// // // // //               placeholder="Type a message"
// // // // //               value={input}
// // // // //               onChange={(e) => setInput(e.target.value)}
// // // // //               onKeyDown={(e) => {
// // // // //                 if (e.key === "Enter") sendMessage();
// // // // //               }}
// // // // //             />
// // // // //             <button onClick={sendMessage}>Send</button>
// // // // //           </div>
// // // // //         </main>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // import React, { useState, useRef, useEffect } from "react";
// // // // import axios from "axios";
// // // // import "./chat.scss";

// // // // export default function Chat() {
// // // //   const [messages, setMessages] = useState([
// // // //     { id: 1, text: "Welcome to the chatbot!", sender: "bot" },
// // // //   ]);
// // // //   const [input, setInput] = useState("");
// // // //   const [selectedUserMsgId, setSelectedUserMsgId] = useState(null);

// // // //   // Refs to each message element for scrolling
// // // //   const messageRefs = useRef({});

// // // //   // Truncate to first N words for sidebar preview
// // // //   function truncateText(text, wordLimit = 5) {
// // // //     const words = text.split(" ");
// // // //     if (words.length <= wordLimit) return text;
// // // //     return words.slice(0, wordLimit).join(" ") + " ..";
// // // //   }

// // // //   // Send user message and get bot reply
// // // //   const sendMessage = async () => {
// // // //     if (!input.trim()) return;

// // // //     const userMsg = { id: Date.now(), text: input, sender: "user" };
// // // //     setMessages((prev) => [...prev, userMsg]);
// // // //     setInput("");
// // // //     setSelectedUserMsgId(null); // Reset selection on new message

// // // //     try {
// // // //       const res = await axios.post("http://localhost:5000/chat", {
// // // //         message: userMsg.text,
// // // //       });
// // // //       const botReply = res.data.reply;

// // // //       const botMsg = { id: Date.now() + 1, text: botReply, sender: "bot" };
// // // //       setMessages((prev) => [...prev, botMsg]);
// // // //     } catch (error) {
// // // //       const errMsg = {
// // // //         id: Date.now() + 1,
// // // //         text: "Sorry, bot is not available right now.",
// // // //         sender: "bot",
// // // //       };
// // // //       setMessages((prev) => [...prev, errMsg]);
// // // //     }
// // // //   };

// // // //   // Scroll to bottom automatically if no user message is selected
// // // //   useEffect(() => {
// // // //     if (selectedUserMsgId === null) {
// // // //       const lastMessageId = messages[messages.length - 1]?.id;
// // // //       if (lastMessageId && messageRefs.current[lastMessageId]) {
// // // //         messageRefs.current[lastMessageId].scrollIntoView({ behavior: "smooth" });
// // // //       }
// // // //     }
// // // //   }, [messages, selectedUserMsgId]);

// // // //   // Scroll and highlight message when sidebar item clicked
// // // //   const handleHistoryClick = (msgId) => {
// // // //     setSelectedUserMsgId(msgId);
// // // //     if (messageRefs.current[msgId]) {
// // // //       messageRefs.current[msgId].scrollIntoView({ behavior: "smooth", block: "center" });
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="chat-container">
// // // //       <header className="chat-header">
// // // //         <h1>My Chatbot</h1>
// // // //       </header>

// // // //       <div className="chat-body">
// // // //         {/* Sidebar showing only user messages truncated */}
// // // //         <aside className="chat-sidebar">
// // // //           <h2>Chat History</h2>
// // // //           <ul>
// // // //             {messages
// // // //               .filter((msg) => msg.sender === "user")
// // // //               .map((msg) => (
// // // //                 <li
// // // //                   key={msg.id}
// // // //                   onClick={() => handleHistoryClick(msg.id)}
// // // //                   style={{
// // // //                     cursor: "pointer",
// // // //                     fontWeight: msg.id === selectedUserMsgId ? "bold" : "normal",
// // // //                     backgroundColor: msg.id === selectedUserMsgId ? "#d3d3d3" : "transparent",
// // // //                     padding: "0.25rem 0.5rem",
// // // //                     borderRadius: "4px",
// // // //                   }}
// // // //                   title={msg.text} // full text on hover
// // // //                 >
// // // //                   {truncateText(msg.text)}
// // // //                 </li>
// // // //               ))}
// // // //           </ul>
// // // //         </aside>

// // // //         {/* Main chat window showing all messages */}
// // // //         <main className="chat-main">
// // // //           <div className="chat-messages">
// // // //             {messages.map((msg) => (
// // // //               <div
// // // //                 key={msg.id}
// // // //                 ref={(el) => (messageRefs.current[msg.id] = el)}
// // // //                 className={`message ${
// // // //                   msg.sender === "user" ? "user-message" : "bot-message"
// // // //                 }`}
// // // //                 style={{
// // // //                   border: msg.id === selectedUserMsgId ? "5px solid rgb(67, 186, 51)" : "none",
// // // //                   padding: "8px",
// // // //                   marginBottom: "6px",
// // // //                   borderRadius: "5px",
// // // //                 }}
// // // //               >
// // // //                 {msg.text}
// // // //               </div>
// // // //             ))}
// // // //           </div>

// // // //           <div className="chat-input-container">
// // // //             <input
// // // //               type="text"
// // // //               placeholder="Type a message"
// // // //               value={input}
// // // //               onChange={(e) => setInput(e.target.value)}
// // // //               onKeyDown={(e) => {
// // // //                 if (e.key === "Enter") sendMessage();
// // // //               }}
// // // //             />
// // // //             <button onClick={sendMessage}>Send</button>
// // // //           </div>
// // // //         </main>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }



// // // import React, { useState, useRef, useEffect } from 'react';
// // // import axios from 'axios';
// // // import './chat.scss'; // We'll create this later

// // // const Chat = () => {
// // //   const [messages, setMessages] = useState([]);
// // //   const [inputMessage, setInputMessage] = useState('');
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [selectedFile, setSelectedFile] = useState(null);
// // //   const [filePreview, setFilePreview] = useState(null);
// // //   const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
// // //   const [username, setUsername] = useState(localStorage.getItem('username') || '');
// // //   const [conversations, setConversations] = useState([]);
// // //   const [selectedConversation, setSelectedConversation] = useState(null);
// // //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// // //   const messageEndRef = useRef(null);
// // //   const fileInputRef = useRef(null);

// // //   // Auto-scroll to bottom of messages
// // //   useEffect(() => {
// // //     if (messageEndRef.current) {
// // //       messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
// // //     }
// // //   }, [messages]);

// // //   // Fetch conversation history when userId changes
// // //   useEffect(() => {
// // //     if (userId) {
// // //       fetchConversations();
// // //     }
// // //   }, [userId]);

// // //   // Fetch conversation history
// // //   const fetchConversations = async () => {
// // //     try {
// // //       const response = await axios.get(`http://localhost:5000/conversations/${userId}`);
// // //       if (response.data.success) {
// // //         // Group conversations by date
// // //         const groupedConversations = groupConversationsByDate(response.data.conversations);
// // //         setConversations(groupedConversations);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching conversations:', error);
// // //     }
// // //   };

// // //   // Group conversations by date
// // //   const groupConversationsByDate = (convs) => {
// // //     const grouped = {};
    
// // //     convs.forEach(conv => {
// // //       const date = new Date(conv.timestamp).toLocaleDateString();
      
// // //       if (!grouped[date]) {
// // //         grouped[date] = [];
// // //       }
      
// // //       grouped[date].push(conv);
// // //     });
    
// // //     return grouped;
// // //   };

// // //   // Load conversation
// // //   const loadConversation = (conversationId) => {
// // //     // Find the conversation in our grouped data
// // //     let targetConversation = null;
    
// // //     Object.values(conversations).forEach(dateGroup => {
// // //       dateGroup.forEach(conv => {
// // //         if (conv.id === conversationId) {
// // //           targetConversation = conv;
// // //         }
// // //       });
// // //     });
    
// // //     if (targetConversation) {
// // //       setSelectedConversation(conversationId);
      
// // //       // Create messages from the conversation
// // //       const userMessage = {
// // //         sender: 'user',
// // //         text: targetConversation.message,
// // //         timestamp: new Date(targetConversation.timestamp).toLocaleTimeString(),
// // //         file: targetConversation.file_path ? {
// // //           name: targetConversation.file_original_name,
// // //           url: `http://localhost:5000/uploads/${targetConversation.file_path.split('/').pop()}`
// // //         } : null
// // //       };
      
// // //       const botMessage = {
// // //         sender: 'bot',
// // //         text: targetConversation.response,
// // //         timestamp: new Date(targetConversation.timestamp).toLocaleTimeString()
// // //       };
      
// // //       setMessages([userMessage, botMessage]);
// // //     }
// // //   };

// // //   // Delete conversation
// // //   const deleteConversation = async (conversationId, e) => {
// // //     e.stopPropagation(); // Prevent triggering loadConversation
    
// // //     try {
// // //       const response = await axios.delete(`http://localhost:5000/conversations/${conversationId}`);
      
// // //       if (response.data.success) {
// // //         // Refresh conversations list
// // //         fetchConversations();
        
// // //         // If the deleted conversation was selected, clear messages
// // //         if (selectedConversation === conversationId) {
// // //           setSelectedConversation(null);
// // //           setMessages([]);
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Error deleting conversation:', error);
// // //     }
// // //   };

// // //   // Start new conversation
// // //   const startNewConversation = () => {
// // //     setSelectedConversation(null);
// // //     setMessages([]);
// // //     setInputMessage('');
// // //   };

// // //   // Toggle sidebar
// // //   const toggleSidebar = () => {
// // //     setIsSidebarOpen(!isSidebarOpen);
// // //   };

// // //   // Handle file selection
// // //   const handleFileChange = (e) => {
// // //     const file = e.target.files[0];
// // //     if (!file) return;
    
// // //     setSelectedFile(file);
    
// // //     // Create preview URL for images
// // //     if (file.type.startsWith('image/')) {
// // //       const reader = new FileReader();
// // //       reader.onload = () => {
// // //         setFilePreview(reader.result);
// // //       };
// // //       reader.readAsDataURL(file);
// // //     } else {
// // //       // For non-image files, just show the filename
// // //       setFilePreview(null);
// // //     }
// // //   };

// // //   // Clear file selection
// // //   const clearFileSelection = () => {
// // //     setSelectedFile(null);
// // //     setFilePreview(null);
// // //     if (fileInputRef.current) {
// // //       fileInputRef.current.value = '';
// // //     }
// // //   };

// // //   // Handle sending a message
// // //   const sendMessage = async (e) => {
// // //     e.preventDefault();
    
// // //     if (!inputMessage.trim() && !selectedFile) return;
    
// // //     // Add user message to chat
// // //     const userMessage = {
// // //       sender: 'user',
// // //       text: inputMessage,
// // //       file: selectedFile ? {
// // //         name: selectedFile.name,
// // //         preview: filePreview
// // //       } : null,
// // //       timestamp: new Date().toLocaleTimeString()
// // //     };
    
// // //     setMessages(prevMessages => [...prevMessages, userMessage]);
// // //     setIsLoading(true);
// // //     setInputMessage('');
    
// // //     // Prepare form data with message and file
// // //     const formData = new FormData();
// // //     formData.append('message', inputMessage);
// // //     if (userId) formData.append('userId', userId);
// // //     if (selectedFile) {
// // //       formData.append('file', selectedFile);
// // //     }
    
// // //     try {
// // //       // Send request to backend
// // //       const response = await axios.post('http://localhost:5000/chat', formData, {
// // //         headers: {
// // //           'Content-Type': 'multipart/form-data'
// // //         }
// // //       });
      
// // //       // Add bot response to chat
// // //       const botMessage = {
// // //         sender: 'bot',
// // //         text: response.data.reply,
// // //         file: response.data.file ? {
// // //           name: response.data.file.originalName,
// // //           url: `http://localhost:5000${response.data.file.url}`
// // //         } : null,
// // //         timestamp: new Date().toLocaleTimeString()
// // //       };
      
// // //       setMessages(prevMessages => [...prevMessages, botMessage]);
      
// // //       // Refresh conversations list if user is logged in
// // //       if (userId) {
// // //         // Wait a moment to ensure the database is updated
// // //         setTimeout(fetchConversations, 500);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error sending message:', error);
      
// // //       // Add error message
// // //       const errorMessage = {
// // //         sender: 'bot',
// // //         text: 'Sorry, something went wrong. Please try again.',
// // //         error: true,
// // //         timestamp: new Date().toLocaleTimeString()
// // //       };
      
// // //       setMessages(prevMessages => [...prevMessages, errorMessage]);
// // //     } finally {
// // //       setIsLoading(false);
// // //       clearFileSelection();
// // //     }
// // //   };

// // //   // Trigger file input click
// // //   const triggerFileInput = () => {
// // //     fileInputRef.current.click();
// // //   };

// // //   // Render file attachment preview
// // //   const renderFilePreview = () => {
// // //     if (!selectedFile) return null;
    
// // //     return (
// // //       <div className="file-preview">
// // //         {filePreview ? (
// // //           <img src={filePreview} alt="Preview" className="image-preview" />
// // //         ) : (
// // //           <div className="document-preview">
// // //             <i className="document-icon">📄</i>
// // //             <span>{selectedFile.name}</span>
// // //           </div>
// // //         )}
// // //         <button className="remove-file-btn" onClick={clearFileSelection}>×</button>
// // //       </div>
// // //     );
// // //   };

// // //   // Render message with potential file attachment
// // //   const renderMessage = (message, index) => {
// // //     return (
// // //       <div 
// // //         key={index} 
// // //         className={`message ${message.sender} ${message.error ? 'error' : ''}`}
// // //       >
// // //         <div className="message-content">
// // //           {message.text && <p>{message.text}</p>}
          
// // //           {message.file && message.file.preview && (
// // //             <div className="file-attachment image">
// // //               <img src={message.file.preview} alt="Attachment" />
// // //               <span>{message.file.name}</span>
// // //             </div>
// // //           )}
          
// // //           {message.file && !message.file.preview && message.file.url && (
// // //             <div className="file-attachment">
// // //               <a href={message.file.url} target="_blank" rel="noopener noreferrer">
// // //                 <i className="file-icon">📎</i>
// // //                 {message.file.name}
// // //               </a>
// // //             </div>
// // //           )}
          
// // //           {message.file && !message.file.preview && !message.file.url && (
// // //             <div className="file-attachment">
// // //               <i className="file-icon">📎</i>
// // //               {message.file.name}
// // //             </div>
// // //           )}
// // //         </div>
// // //         <span className="timestamp">{message.timestamp}</span>
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <div className={`chat-app ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
// // //       {/* Sidebar */}
// // //       <div className="sidebar">
// // //         <div className="sidebar-header">
// // //           <h3>Chat History</h3>
// // //           <button className="new-chat-btn" onClick={startNewConversation}>
// // //             + New Chat
// // //           </button>
// // //         </div>
        
// // //         <div className="conversations-list">
// // //           {Object.keys(conversations).length === 0 ? (
// // //             <div className="no-conversations">
// // //               <p>No chat history found</p>
// // //             </div>
// // //           ) : (
// // //             Object.entries(conversations).map(([date, convsForDate]) => (
// // //               <div key={date} className="conversation-date-group">
// // //                 <div className="date-header">{date}</div>
// // //                 {convsForDate.map(conv => (
// // //                   <div 
// // //                     key={conv.id} 
// // //                     className={`conversation-item ${selectedConversation === conv.id ? 'selected' : ''}`}
// // //                     onClick={() => loadConversation(conv.id)}
// // //                   >
// // //                     <div className="conversation-preview">
// // //                       <div className="conversation-message">
// // //                         {conv.message.length > 30 ? conv.message.substring(0, 30) + '...' : conv.message || 'File upload'}
// // //                       </div>
// // //                       <div className="conversation-time">
// // //                         {new Date(conv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// // //                       </div>
// // //                     </div>
// // //                     <button 
// // //                       className="delete-conversation-btn"
// // //                       onClick={(e) => deleteConversation(conv.id, e)}
// // //                     >
// // //                       🗑️
// // //                     </button>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             ))
// // //           )}
// // //         </div>
        
// // //         {userId ? (
// // //           <div className="sidebar-footer">
// // //             <div className="logged-in-user">
// // //               Logged in as: <strong>{username}</strong>
// // //             </div>
// // //           </div>
// // //         ) : (
// // //           <div className="sidebar-footer">
// // //             <div className="login-prompt">
// // //               Log in to save chat history
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
      
// // //       {/* Toggle sidebar button */}
// // //       <button 
// // //         className="toggle-sidebar-btn"
// // //         onClick={toggleSidebar}
// // //       >
// // //         {isSidebarOpen ? '◀' : '▶'}
// // //       </button>
      
// // //       {/* Chat container */}
// // //       <div className="chat-container">
// // //         <div className="chat-header">
// // //           <h2>Chatbot</h2>
// // //         </div>
        
// // //         <div className="messages-container">
// // //           {messages.length === 0 ? (
// // //             <div className="empty-chat">
// // //               <p>Send a message to start chatting!</p>
// // //             </div>
// // //           ) : (
// // //             messages.map((message, index) => renderMessage(message, index))
// // //           )}
          
// // //           {isLoading && (
// // //             <div className="message bot loading">
// // //               <div className="typing-indicator">
// // //                 <span></span>
// // //                 <span></span>
// // //                 <span></span>
// // //               </div>
// // //             </div>
// // //           )}
          
// // //           <div ref={messageEndRef} />
// // //         </div>
        
// // //         <form className="input-container" onSubmit={sendMessage}>
// // //           {renderFilePreview()}
          
// // //           <div className="message-input-container">
// // //             <input
// // //               type="text"
// // //               value={inputMessage}
// // //               onChange={(e) => setInputMessage(e.target.value)}
// // //               placeholder="Type your message..."
// // //               disabled={isLoading}
// // //               className="message-input"
// // //             />
            
// // //             <div className="input-actions">
// // //               <button 
// // //                 type="button" 
// // //                 className="attachment-btn" 
// // //                 onClick={triggerFileInput}
// // //                 disabled={isLoading}
// // //               >
// // //                 📎
// // //               </button>
              
// // //               <input
// // //                 type="file"
// // //                 ref={fileInputRef}
// // //                 onChange={handleFileChange}
// // //                 style={{ display: 'none' }}
// // //               />
              
// // //               <button 
// // //                 type="submit" 
// // //                 className="send-btn" 
// // //                 disabled={isLoading || (!inputMessage.trim() && !selectedFile)}
// // //               >
// // //                 Send
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Chat;


// // import React, { useState, useRef, useEffect } from 'react';
// // import axios from 'axios';
// // import './chat.scss'; // We'll create this later

// // const Chat = () => {
// //   const [messages, setMessages] = useState([]);
// //   const [inputMessage, setInputMessage] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [filePreview, setFilePreview] = useState(null);
// //   const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
// //   const [username, setUsername] = useState(localStorage.getItem('username') || '');
// //   const [conversations, setConversations] = useState([]);
// //   const [selectedConversation, setSelectedConversation] = useState(null);
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// //   const messageEndRef = useRef(null);
// //   const fileInputRef = useRef(null);
// //   const inputRef = useRef(null); // New ref for the input field

// //   // Auto-scroll to bottom of messages
// //   useEffect(() => {
// //     if (messageEndRef.current) {
// //       messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
// //     }
// //   }, [messages]);

// //   // Fetch conversation history when userId changes
// //   useEffect(() => {
// //     if (userId) {
// //       fetchConversations();
// //     }
// //   }, [userId]);

// //   // Auto-focus the input field when loading is done
// //   useEffect(() => {
// //     if (!isLoading && inputRef.current) {
// //       inputRef.current.focus();
// //     }
// //   }, [isLoading]);

// //   // Auto-focus on initial load
// //   useEffect(() => {
// //     if (inputRef.current) {
// //       inputRef.current.focus();
// //     }
// //   }, []);

// //   // Fetch conversation history
// //   const fetchConversations = async () => {
// //     try {
// //       const response = await axios.get(`http://localhost:5000/conversations/${userId}`);
// //       if (response.data.success) {
// //         // Group conversations by date
// //         const groupedConversations = groupConversationsByDate(response.data.conversations);
// //         setConversations(groupedConversations);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching conversations:', error);
// //     }
// //   };

// //   // Group conversations by date
// //   const groupConversationsByDate = (convs) => {
// //     const grouped = {};
    
// //     convs.forEach(conv => {
// //       const date = new Date(conv.timestamp).toLocaleDateString();
      
// //       if (!grouped[date]) {
// //         grouped[date] = [];
// //       }
      
// //       grouped[date].push(conv);
// //     });
    
// //     return grouped;
// //   };

// //   // Load conversation
// //   const loadConversation = (conversationId) => {
// //     // Find the conversation in our grouped data
// //     let targetConversation = null;
    
// //     Object.values(conversations).forEach(dateGroup => {
// //       dateGroup.forEach(conv => {
// //         if (conv.id === conversationId) {
// //           targetConversation = conv;
// //         }
// //       });
// //     });
    
// //     if (targetConversation) {
// //       setSelectedConversation(conversationId);
      
// //       // Create messages from the conversation
// //       const userMessage = {
// //         sender: 'user',
// //         text: targetConversation.message,
// //         timestamp: new Date(targetConversation.timestamp).toLocaleTimeString(),
// //         file: targetConversation.file_path ? {
// //           name: targetConversation.file_original_name,
// //           url: `http://localhost:5000/uploads/${targetConversation.file_path.split('/').pop()}`
// //         } : null
// //       };
      
// //       const botMessage = {
// //         sender: 'bot',
// //         text: targetConversation.response,
// //         timestamp: new Date(targetConversation.timestamp).toLocaleTimeString()
// //       };
      
// //       setMessages([userMessage, botMessage]);
      
// //       // Focus on input after loading conversation
// //       setTimeout(() => {
// //         if (inputRef.current) {
// //           inputRef.current.focus();
// //         }
// //       }, 100);
// //     }
// //   };

// //   // Delete conversation
// //   const deleteConversation = async (conversationId, e) => {
// //     e.stopPropagation(); // Prevent triggering loadConversation
    
// //     try {
// //       const response = await axios.delete(`http://localhost:5000/conversations/${conversationId}`);
      
// //       if (response.data.success) {
// //         // Refresh conversations list
// //         fetchConversations();
        
// //         // If the deleted conversation was selected, clear messages
// //         if (selectedConversation === conversationId) {
// //           setSelectedConversation(null);
// //           setMessages([]);
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Error deleting conversation:', error);
// //     }
// //   };

// //   // Start new conversation
// //   const startNewConversation = () => {
// //     setSelectedConversation(null);
// //     setMessages([]);
// //     setInputMessage('');
    
// //     // Focus on input when starting new conversation
// //     setTimeout(() => {
// //       if (inputRef.current) {
// //         inputRef.current.focus();
// //       }
// //     }, 100);
// //   };

// //   // Toggle sidebar
// //   const toggleSidebar = () => {
// //     setIsSidebarOpen(!isSidebarOpen);
// //   };

// //   // Handle file selection
// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;
    
// //     setSelectedFile(file);
    
// //     // Create preview URL for images
// //     if (file.type.startsWith('image/')) {
// //       const reader = new FileReader();
// //       reader.onload = () => {
// //         setFilePreview(reader.result);
// //       };
// //       reader.readAsDataURL(file);
// //     } else {
// //       // For non-image files, just show the filename
// //       setFilePreview(null);
// //     }
    
// //     // Re-focus the input field after file selection
// //     setTimeout(() => {
// //       if (inputRef.current) {
// //         inputRef.current.focus();
// //       }
// //     }, 100);
// //   };

// //   // Clear file selection
// //   const clearFileSelection = () => {
// //     setSelectedFile(null);
// //     setFilePreview(null);
// //     if (fileInputRef.current) {
// //       fileInputRef.current.value = '';
// //     }
    
// //     // Re-focus the input field after clearing file
// //     setTimeout(() => {
// //       if (inputRef.current) {
// //         inputRef.current.focus();
// //       }
// //     }, 100);
// //   };

// //   // Handle sending a message
// //   const sendMessage = async (e) => {
// //     e.preventDefault();
    
// //     if (!inputMessage.trim() && !selectedFile) return;
    
// //     // Add user message to chat
// //     const userMessage = {
// //       sender: 'user',
// //       text: inputMessage,
// //       file: selectedFile ? {
// //         name: selectedFile.name,
// //         preview: filePreview
// //       } : null,
// //       timestamp: new Date().toLocaleTimeString()
// //     };
    
// //     setMessages(prevMessages => [...prevMessages, userMessage]);
// //     setIsLoading(true);
// //     setInputMessage('');
    
// //     // Prepare form data with message and file
// //     const formData = new FormData();
// //     formData.append('message', inputMessage);
// //     if (userId) formData.append('userId', userId);
// //     if (selectedFile) {
// //       formData.append('file', selectedFile);
// //     }
    
// //     try {
// //       // Send request to backend
// //       const response = await axios.post('http://localhost:5000/chat', formData, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data'
// //         }
// //       });
      
// //       // Add bot response to chat
// //       const botMessage = {
// //         sender: 'bot',
// //         text: response.data.reply,
// //         file: response.data.file ? {
// //           name: response.data.file.originalName,
// //           url: `http://localhost:5000${response.data.file.url}`
// //         } : null,
// //         timestamp: new Date().toLocaleTimeString()
// //       };
      
// //       setMessages(prevMessages => [...prevMessages, botMessage]);
      
// //       // Refresh conversations list if user is logged in
// //       if (userId) {
// //         // Wait a moment to ensure the database is updated
// //         setTimeout(fetchConversations, 500);
// //       }
// //     } catch (error) {
// //       console.error('Error sending message:', error);
      
// //       // Add error message
// //       const errorMessage = {
// //         sender: 'bot',
// //         text: 'Sorry, something went wrong. Please try again.',
// //         error: true,
// //         timestamp: new Date().toLocaleTimeString()
// //       };
      
// //       setMessages(prevMessages => [...prevMessages, errorMessage]);
// //     } finally {
// //       setIsLoading(false);
// //       clearFileSelection();
      
// //       // Focus will be automatically restored via the useEffect that watches isLoading
// //     }
// //   };

// //   // Trigger file input click
// //   const triggerFileInput = () => {
// //     fileInputRef.current.click();
// //   };

// //   // Render file attachment preview
// //   const renderFilePreview = () => {
// //     if (!selectedFile) return null;
    
// //     return (
// //       <div className="file-preview">
// //         {filePreview ? (
// //           <img src={filePreview} alt="Preview" className="image-preview" />
// //         ) : (
// //           <div className="document-preview">
// //             <i className="document-icon">📄</i>
// //             <span>{selectedFile.name}</span>
// //           </div>
// //         )}
// //         <button className="remove-file-btn" onClick={clearFileSelection}>×</button>
// //       </div>
// //     );
// //   };

// //   // Render message with potential file attachment
// //   const renderMessage = (message, index) => {
// //     return (
// //       <div 
// //         key={index} 
// //         className={`message ${message.sender} ${message.error ? 'error' : ''}`}
// //       >
// //         <div className="message-content">
// //           {message.text && <p>{message.text}</p>}
          
// //           {message.file && message.file.preview && (
// //             <div className="file-attachment image">
// //               <img src={message.file.preview} alt="Attachment" />
// //               <span>{message.file.name}</span>
// //             </div>
// //           )}
          
// //           {message.file && !message.file.preview && message.file.url && (
// //             <div className="file-attachment">
// //               <a href={message.file.url} target="_blank" rel="noopener noreferrer">
// //                 <i className="file-icon">📎</i>
// //                 {message.file.name}
// //               </a>
// //             </div>
// //           )}
          
// //           {message.file && !message.file.preview && !message.file.url && (
// //             <div className="file-attachment">
// //               <i className="file-icon">📎</i>
// //               {message.file.name}
// //             </div>
// //           )}
// //         </div>
// //         <span className="timestamp">{message.timestamp}</span>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className={`chat-app ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
// //       {/* Sidebar */}
// //       <div className="sidebar">
// //         <div className="sidebar-header">
// //           <h3>Chat History</h3>
// //           <button className="new-chat-btn" onClick={startNewConversation}>
// //             + New Chat
// //           </button>
// //         </div>
        
// //         <div className="conversations-list">
// //           {Object.keys(conversations).length === 0 ? (
// //             <div className="no-conversations">
// //               <p>No chat history found</p>
// //             </div>
// //           ) : (
// //             Object.entries(conversations).map(([date, convsForDate]) => (
// //               <div key={date} className="conversation-date-group">
// //                 <div className="date-header">{date}</div>
// //                 {convsForDate.map(conv => (
// //                   <div 
// //                     key={conv.id} 
// //                     className={`conversation-item ${selectedConversation === conv.id ? 'selected' : ''}`}
// //                     onClick={() => loadConversation(conv.id)}
// //                   >
// //                     <div className="conversation-preview">
// //                       <div className="conversation-message">
// //                         {conv.message.length > 30 ? conv.message.substring(0, 30) + '...' : conv.message || 'File upload'}
// //                       </div>
// //                       <div className="conversation-time">
// //                         {new Date(conv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// //                       </div>
// //                     </div>
// //                     <button 
// //                       className="delete-conversation-btn"
// //                       onClick={(e) => deleteConversation(conv.id, e)}
// //                     >
// //                       🗑️
// //                     </button>
// //                   </div>
// //                 ))}
// //               </div>
// //             ))
// //           )}
// //         </div>
        
// //         {userId ? (
// //           <div className="sidebar-footer">
// //             <div className="logged-in-user">
// //               Logged in as: <strong>{username}</strong>
// //             </div>
// //           </div>
// //         ) : (
// //           <div className="sidebar-footer">
// //             <div className="login-prompt">
// //               Log in to save chat history
// //             </div>
// //           </div>
// //         )}
// //       </div>
      
// //       {/* Toggle sidebar button */}
// //       <button 
// //         className="toggle-sidebar-btn"
// //         onClick={toggleSidebar}
// //       >
// //         {isSidebarOpen ? '◀' : '▶'}
// //       </button>
      
// //       {/* Chat container */}
// //       <div className="chat-container">
// //         <div className="chat-header">
// //           <h2>Chatbot</h2>
// //         </div>
        
// //         <div className="messages-container">
// //           {messages.length === 0 ? (
// //             <div className="empty-chat">
// //               <p>Send a message to start chatting!</p>
// //             </div>
// //           ) : (
// //             messages.map((message, index) => renderMessage(message, index))
// //           )}
          
// //           {isLoading && (
// //             <div className="message bot loading">
// //               <div className="typing-indicator">
// //                 <span></span>
// //                 <span></span>
// //                 <span></span>
// //               </div>
// //             </div>
// //           )}
          
// //           <div ref={messageEndRef} />
// //         </div>
        
// //         <form className="input-container" onSubmit={sendMessage}>
// //           {renderFilePreview()}
          
// //           <div className="message-input-container">
// //             <input
// //               type="text"
// //               value={inputMessage}
// //               onChange={(e) => setInputMessage(e.target.value)}
// //               placeholder="Type your message..."
// //               disabled={isLoading}
// //               className="message-input"
// //               ref={inputRef} // Add the ref to the input field
// //               autoFocus // Add autoFocus attribute
// //             />
            
// //             <div className="input-actions">
// //               <button 
// //                 type="button" 
// //                 className="attachment-btn" 
// //                 onClick={triggerFileInput}
// //                 disabled={isLoading}
// //               >
// //                 📎
// //               </button>
              
// //               <input
// //                 type="file"
// //                 ref={fileInputRef}
// //                 onChange={handleFileChange}
// //                 style={{ display: 'none' }}
// //               />
              
// //               <button 
// //                 type="submit" 
// //                 className="send-btn" 
// //                 disabled={isLoading || (!inputMessage.trim() && !selectedFile)}
// //               >
// //                 Send
// //               </button>
// //             </div>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Chat;



// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
// import './chat.scss'; // We'll create this later

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [filePreview, setFilePreview] = useState(null);
//   const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
//   const [username, setUsername] = useState(localStorage.getItem('username') || '');
//   const [conversations, setConversations] = useState([]);
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const messageEndRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const inputRef = useRef(null);
//   const navigate = useNavigate(); // Initialize navigate for redirection

//   // Auto-scroll to bottom of messages
//   useEffect(() => {
//     if (messageEndRef.current) {
//       messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   // Fetch conversation history when userId changes
//   useEffect(() => {
//     if (userId) {
//       fetchConversations();
//     }
//   }, [userId]);

//   // Auto-focus the input field when loading is done
//   useEffect(() => {
//     if (!isLoading && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [isLoading]);

//   // Auto-focus on initial load
//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, []);

//   // Check if user is logged in, redirect to login if not
//   useEffect(() => {
//     if (!userId) {
//       navigate('/');
//     }
//   }, [userId, navigate]);

//   // Fetch conversation history
//   const fetchConversations = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/conversations/${userId}`);
//       if (response.data.success) {
//         // Group conversations by date
//         const groupedConversations = groupConversationsByDate(response.data.conversations);
//         setConversations(groupedConversations);
//       }
//     } catch (error) {
//       console.error('Error fetching conversations:', error);
//     }
//   };

//   // Group conversations by date
//   const groupConversationsByDate = (convs) => {
//     const grouped = {};
    
//     convs.forEach(conv => {
//       const date = new Date(conv.timestamp).toLocaleDateString();
      
//       if (!grouped[date]) {
//         grouped[date] = [];
//       }
      
//       grouped[date].push(conv);
//     });
    
//     return grouped;
//   };

//   // Handle logout
//   const handleLogout = () => {
//     // Clear local storage
//     localStorage.removeItem('userId');
//     localStorage.removeItem('username');
    
//     // Update state
//     setUserId(null);
//     setUsername('');
    
//     // Redirect to login page
//     navigate('/');
//   };

//   // Load conversation
//   const loadConversation = (conversationId) => {
//     // Find the conversation in our grouped data
//     let targetConversation = null;
    
//     Object.values(conversations).forEach(dateGroup => {
//       dateGroup.forEach(conv => {
//         if (conv.id === conversationId) {
//           targetConversation = conv;
//         }
//       });
//     });
    
//     if (targetConversation) {
//       setSelectedConversation(conversationId);
      
//       // Create messages from the conversation
//       const userMessage = {
//         sender: 'user',
//         text: targetConversation.message,
//         timestamp: new Date(targetConversation.timestamp).toLocaleTimeString(),
//         file: targetConversation.file_path ? {
//           name: targetConversation.file_original_name,
//           url: `http://localhost:5000/uploads/${targetConversation.file_path.split('/').pop()}`
//         } : null
//       };
      
//       const botMessage = {
//         sender: 'bot',
//         text: targetConversation.response,
//         timestamp: new Date(targetConversation.timestamp).toLocaleTimeString()
//       };
      
//       setMessages([userMessage, botMessage]);
      
//       // Focus on input after loading conversation
//       setTimeout(() => {
//         if (inputRef.current) {
//           inputRef.current.focus();
//         }
//       }, 100);
//     }
//   };

//   // Delete conversation
//   const deleteConversation = async (conversationId, e) => {
//     e.stopPropagation(); // Prevent triggering loadConversation
    
//     try {
//       const response = await axios.delete(`http://localhost:5000/conversations/${conversationId}`);
      
//       if (response.data.success) {
//         // Refresh conversations list
//         fetchConversations();
        
//         // If the deleted conversation was selected, clear messages
//         if (selectedConversation === conversationId) {
//           setSelectedConversation(null);
//           setMessages([]);
//         }
//       }
//     } catch (error) {
//       console.error('Error deleting conversation:', error);
//     }
//   };

//   // Start new conversation
//   const startNewConversation = () => {
//     setSelectedConversation(null);
//     setMessages([]);
//     setInputMessage('');
    
//     // Focus on input when starting new conversation
//     setTimeout(() => {
//       if (inputRef.current) {
//         inputRef.current.focus();
//       }
//     }, 100);
//   };

//   // Toggle sidebar
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   // Handle file selection
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     setSelectedFile(file);
    
//     // Create preview URL for images
//     if (file.type.startsWith('image/')) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setFilePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       // For non-image files, just show the filename
//       setFilePreview(null);
//     }
    
//     // Re-focus the input field after file selection
//     setTimeout(() => {
//       if (inputRef.current) {
//         inputRef.current.focus();
//       }
//     }, 100);
//   };

//   // Clear file selection
//   const clearFileSelection = () => {
//     setSelectedFile(null);
//     setFilePreview(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
    
//     // Re-focus the input field after clearing file
//     setTimeout(() => {
//       if (inputRef.current) {
//         inputRef.current.focus();
//       }
//     }, 100);
//   };

//   // Handle sending a message
//   const sendMessage = async (e) => {
//     e.preventDefault();
    
//     if (!inputMessage.trim() && !selectedFile) return;
    
//     // Add user message to chat
//     const userMessage = {
//       sender: 'user',
//       text: inputMessage,
//       file: selectedFile ? {
//         name: selectedFile.name,
//         preview: filePreview
//       } : null,
//       timestamp: new Date().toLocaleTimeString()
//     };
    
//     setMessages(prevMessages => [...prevMessages, userMessage]);
//     setIsLoading(true);
//     setInputMessage('');
    
//     // Prepare form data with message and file
//     const formData = new FormData();
//     formData.append('message', inputMessage);
//     if (userId) formData.append('userId', userId);
//     if (selectedFile) {
//       formData.append('file', selectedFile);
//     }
    
//     try {
//       // Send request to backend
//       const response = await axios.post('http://localhost:5000/chat', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
      
//       // Add bot response to chat
//       const botMessage = {
//         sender: 'bot',
//         text: response.data.reply,
//         file: response.data.file ? {
//           name: response.data.file.originalName,
//           url: `http://localhost:5000${response.data.file.url}`
//         } : null,
//         timestamp: new Date().toLocaleTimeString()
//       };
      
//       setMessages(prevMessages => [...prevMessages, botMessage]);
      
//       // Refresh conversations list if user is logged in
//       if (userId) {
//         // Wait a moment to ensure the database is updated
//         setTimeout(fetchConversations, 500);
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
      
//       // Add error message
//       const errorMessage = {
//         sender: 'bot',
//         text: 'Sorry, something went wrong. Please try again.',
//         error: true,
//         timestamp: new Date().toLocaleTimeString()
//       };
      
//       setMessages(prevMessages => [...prevMessages, errorMessage]);
//     } finally {
//       setIsLoading(false);
//       clearFileSelection();
      
//       // Focus will be automatically restored via the useEffect that watches isLoading
//     }
//   };

//   // Trigger file input click
//   const triggerFileInput = () => {
//     fileInputRef.current.click();
//   };

//   // Render file attachment preview
//   const renderFilePreview = () => {
//     if (!selectedFile) return null;
    
//     return (
//       <div className="file-preview">
//         {filePreview ? (
//           <img src={filePreview} alt="Preview" className="image-preview" />
//         ) : (
//           <div className="document-preview">
//             <i className="document-icon">📄</i>
//             <span>{selectedFile.name}</span>
//           </div>
//         )}
//         <button className="remove-file-btn" onClick={clearFileSelection}>×</button>
//       </div>
//     );
//   };

//   // Render message with potential file attachment
//   const renderMessage = (message, index) => {
//     return (
//       <div 
//         key={index} 
//         className={`message ${message.sender} ${message.error ? 'error' : ''}`}
//       >
//         <div className="message-content">
//           {message.text && <p>{message.text}</p>}
          
//           {message.file && message.file.preview && (
//             <div className="file-attachment image">
//               <img src={message.file.preview} alt="Attachment" />
//               <span>{message.file.name}</span>
//             </div>
//           )}
          
//           {message.file && !message.file.preview && message.file.url && (
//             <div className="file-attachment">
//               <a href={message.file.url} target="_blank" rel="noopener noreferrer">
//                 <i className="file-icon">📎</i>
//                 {message.file.name}
//               </a>
//             </div>
//           )}
          
//           {message.file && !message.file.preview && !message.file.url && (
//             <div className="file-attachment">
//               <i className="file-icon">📎</i>
//               {message.file.name}
//             </div>
//           )}
//         </div>
//         <span className="timestamp">{message.timestamp}</span>
//       </div>
//     );
//   };

//   return (
//     <div className={`chat-app ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="sidebar-header">
//           <h3>Chat History</h3>
//           <button className="new-chat-btn" onClick={startNewConversation}>
//             + New Chat
//           </button>
//         </div>
        
//         <div className="conversations-list">
//           {Object.keys(conversations).length === 0 ? (
//             <div className="no-conversations">
//               <p>No chat history found</p>
//             </div>
//           ) : (
//             Object.entries(conversations).map(([date, convsForDate]) => (
//               <div key={date} className="conversation-date-group">
//                 <div className="date-header">{date}</div>
//                 {convsForDate.map(conv => (
//                   <div 
//                     key={conv.id} 
//                     className={`conversation-item ${selectedConversation === conv.id ? 'selected' : ''}`}
//                     onClick={() => loadConversation(conv.id)}
//                   >
//                     <div className="conversation-preview">
//                       <div className="conversation-message">
//                         {conv.message.length > 30 ? conv.message.substring(0, 30) + '...' : conv.message || 'File upload'}
//                       </div>
//                       <div className="conversation-time">
//                         {new Date(conv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                       </div>
//                     </div>
//                     <button 
//                       className="delete-conversation-btn"
//                       onClick={(e) => deleteConversation(conv.id, e)}
//                     >
//                       🗑️
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ))
//           )}
//         </div>
        
//         {userId ? (
//           <div className="sidebar-footer">
//             <div className="logged-in-user">
//               Logged in as: <strong>{username}</strong>
//             </div>
//             <button className="logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         ) : (
//           <div className="sidebar-footer">
//             <div className="login-prompt">
//               Log in to save chat history
//             </div>
//           </div>
//         )}
//       </div>
      
//       {/* Toggle sidebar button */}
//       <button 
//         className="toggle-sidebar-btn"
//         onClick={toggleSidebar}
//       >
//         {isSidebarOpen ? '◀' : '▶'}
//       </button>
      
//       {/* Chat container */}
//       <div className="chat-container">
//         <div className="chat-header">
//           <h2>Chatbot</h2>
//         </div>
        
//         <div className="messages-container">
//           {messages.length === 0 ? (
//             <div className="empty-chat">
//               <p>Send a message to start chatting!</p>
//             </div>
//           ) : (
//             messages.map((message, index) => renderMessage(message, index))
//           )}
          
//           {isLoading && (
//             <div className="message bot loading">
//               <div className="typing-indicator">
//                 <span></span>
//                 <span></span>
//                 <span></span>
//               </div>
//             </div>
//           )}
          
//           <div ref={messageEndRef} />
//         </div>
        
//         <form className="input-container" onSubmit={sendMessage}>
//           {renderFilePreview()}
          
//           <div className="message-input-container">
//             <input
//               type="text"
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               placeholder="Type your message..."
//               disabled={isLoading}
//               className="message-input"
//               ref={inputRef}
//               autoFocus
//             />
            
//             <div className="input-actions">
//               <button 
//                 type="button" 
//                 className="attachment-btn" 
//                 onClick={triggerFileInput}
//                 disabled={isLoading}
//               >
//                 📎
//               </button>
              
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 style={{ display: 'none' }}
//               />
              
//               <button 
//                 type="submit" 
//                 className="send-btn" 
//                 disabled={isLoading || (!inputMessage.trim() && !selectedFile)}
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Chat;



// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
// import './chat.scss'; // We'll create this later

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [filePreview, setFilePreview] = useState(null);
//   const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
//   const [username, setUsername] = useState(localStorage.getItem('username') || '');
//   const [conversations, setConversations] = useState([]);
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const messageEndRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const inputRef = useRef(null);
//   const navigate = useNavigate(); // Initialize navigate for redirection

//   // Auto-scroll to bottom of messages
//   useEffect(() => {
//     if (messageEndRef.current) {
//       messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   // Fetch conversation history when userId changes
//   useEffect(() => {
//     if (userId) {
//       fetchConversations();
//     }
//   }, [userId]);

//   // Auto-focus the input field when loading is done
//   useEffect(() => {
//     if (!isLoading && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [isLoading]);

//   // Auto-focus on initial load
//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, []);

//   // Check if user is logged in, redirect to login if not
//   useEffect(() => {
//     if (!userId) {
//       navigate('/');
//     }
//   }, [userId, navigate]);

//   // Fetch conversation history
//   const fetchConversations = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/conversations/${userId}`);
//       if (response.data.success) {
//         // Group conversations by date
//         const groupedConversations = groupConversationsByDate(response.data.conversations);
//         setConversations(groupedConversations);
//         console.log("Fetched conversations:", response.data.conversations);
//         console.log("Grouped conversations:", groupedConversations);
//       }
//     } catch (error) {
//       console.error('Error fetching conversations:', error);
//     }
//   };

//   // Group conversations by date
//   const groupConversationsByDate = (convs) => {
//     const grouped = {};
    
//     convs.forEach(conv => {
//       const date = new Date(conv.timestamp).toLocaleDateString();
      
//       if (!grouped[date]) {
//         grouped[date] = [];
//       }
      
//       grouped[date].push(conv);
//     });
    
//     // Log the grouped data for debugging
//     console.log("Grouped conversations by date:", grouped);
//     return grouped;
//   };

//   // Handle logout
//   const handleLogout = () => {
//     // Clear local storage
//     localStorage.removeItem('userId');
//     localStorage.removeItem('username');
    
//     // Update state
//     setUserId(null);
//     setUsername('');
    
//     // Redirect to login page
//     navigate('/');
//   };

//   // Load conversation
//   const loadConversation = (conversationId) => {
//     // Find the conversation in our grouped data
//     let targetConversation = null;
    
//     Object.values(conversations).forEach(dateGroup => {
//       dateGroup.forEach(conv => {
//         if (conv.id === conversationId) {
//           targetConversation = conv;
//         }
//       });
//     });
    
//     if (targetConversation) {
//       setSelectedConversation(conversationId);
      
//       // Create messages from the conversation
//       const userMessage = {
//         sender: 'user',
//         text: targetConversation.message,
//         timestamp: new Date(targetConversation.timestamp).toLocaleTimeString(),
//         file: targetConversation.file_path ? {
//           name: targetConversation.file_original_name,
//           url: `http://localhost:5000/uploads/${targetConversation.file_path.split('/').pop()}`
//         } : null
//       };
      
//       const botMessage = {
//         sender: 'bot',
//         text: targetConversation.response,
//         timestamp: new Date(targetConversation.timestamp).toLocaleTimeString()
//       };
      
//       setMessages([userMessage, botMessage]);
      
//       // Focus on input after loading conversation
//       setTimeout(() => {
//         if (inputRef.current) {
//           inputRef.current.focus();
//         }
//       }, 100);
//     }
//   };

//   // Delete conversation
//   const deleteConversation = async (conversationId, e) => {
//     e.stopPropagation(); // Prevent triggering loadConversation
    
//     try {
//       const response = await axios.delete(`http://localhost:5000/conversations/${conversationId}`);
      
//       if (response.data.success) {
//         // Refresh conversations list
//         fetchConversations();
        
//         // If the deleted conversation was selected, clear messages
//         if (selectedConversation === conversationId) {
//           setSelectedConversation(null);
//           setMessages([]);
//         }
//       }
//     } catch (error) {
//       console.error('Error deleting conversation:', error);
//     }
//   };

//   // Start new conversation
//   const startNewConversation = () => {
//     setSelectedConversation(null);
//     setMessages([]);
//     setInputMessage('');
    
//     // Focus on input when starting new conversation
//     setTimeout(() => {
//       if (inputRef.current) {
//         inputRef.current.focus();
//       }
//     }, 100);
//   };

//   // Toggle sidebar
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   // Handle file selection
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     setSelectedFile(file);
    
//     // Create preview URL for images
//     if (file.type.startsWith('image/')) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setFilePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       // For non-image files, just show the filename
//       setFilePreview(null);
//     }
    
//     // Re-focus the input field after file selection
//     setTimeout(() => {
//       if (inputRef.current) {
//         inputRef.current.focus();
//       }
//     }, 100);
//   };

//   // Clear file selection
//   const clearFileSelection = () => {
//     setSelectedFile(null);
//     setFilePreview(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
    
//     // Re-focus the input field after clearing file
//     setTimeout(() => {
//       if (inputRef.current) {
//         inputRef.current.focus();
//       }
//     }, 100);
//   };

//   // Handle sending a message
//   const sendMessage = async (e) => {
//     e.preventDefault();
    
//     if (!inputMessage.trim() && !selectedFile) return;
    
//     // Add user message to chat
//     const userMessage = {
//       sender: 'user',
//       text: inputMessage,
//       file: selectedFile ? {
//         name: selectedFile.name,
//         preview: filePreview
//       } : null,
//       timestamp: new Date().toLocaleTimeString()
//     };
    
//     setMessages(prevMessages => [...prevMessages, userMessage]);
//     setIsLoading(true);
//     setInputMessage('');
    
//     // Prepare form data with message and file
//     const formData = new FormData();
//     formData.append('message', inputMessage);
//     if (userId) {
//       formData.append('userId', userId);
//       console.log("Sending userId:", userId); // Debug info
//     }
//     if (selectedFile) {
//       formData.append('file', selectedFile);
//     }
    
//     try {
//       // Send request to backend
//       const response = await axios.post('http://localhost:5000/chat', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
      
//       // Add bot response to chat
//       const botMessage = {
//         sender: 'bot',
//         text: response.data.reply,
//         file: response.data.file ? {
//           name: response.data.file.originalName,
//           url: `http://localhost:5000${response.data.file.url}`
//         } : null,
//         timestamp: new Date().toLocaleTimeString()
//       };
      
//       setMessages(prevMessages => [...prevMessages, botMessage]);
      
//       // Refresh conversations list if user is logged in
//       if (userId) {
//         // Wait a moment to ensure the database is updated
//         setTimeout(fetchConversations, 1000); // Increased from 500ms
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
      
//       // Add error message
//       const errorMessage = {
//         sender: 'bot',
//         text: 'Sorry, something went wrong. Please try again.',
//         error: true,
//         timestamp: new Date().toLocaleTimeString()
//       };
      
//       setMessages(prevMessages => [...prevMessages, errorMessage]);
//     } finally {
//       setIsLoading(false);
//       clearFileSelection();
      
//       // Focus will be automatically restored via the useEffect that watches isLoading
//     }
//   };

//   // Trigger file input click
//   const triggerFileInput = () => {
//     fileInputRef.current.click();
//   };

//   // Render file attachment preview
//   const renderFilePreview = () => {
//     if (!selectedFile) return null;
    
//     return (
//       <div className="file-preview">
//         {filePreview ? (
//           <img src={filePreview} alt="Preview" className="image-preview" />
//         ) : (
//           <div className="document-preview">
//             <i className="document-icon">📄</i>
//             <span>{selectedFile.name}</span>
//           </div>
//         )}
//         <button className="remove-file-btn" onClick={clearFileSelection}>×</button>
//       </div>
//     );
//   };

//   // Render message with potential file attachment
//   const renderMessage = (message, index) => {
//     return (
//       <div 
//         key={index} 
//         className={`message ${message.sender} ${message.error ? 'error' : ''}`}
//       >
//         <div className="message-content">
//           {message.text && <p>{message.text}</p>}
          
//           {message.file && message.file.preview && (
//             <div className="file-attachment image">
//               <img src={message.file.preview} alt="Attachment" />
//               <span>{message.file.name}</span>
//             </div>
//           )}
          
//           {message.file && !message.file.preview && message.file.url && (
//             <div className="file-attachment">
//               <a href={message.file.url} target="_blank" rel="noopener noreferrer">
//                 <i className="file-icon">📎</i>
//                 {message.file.name}
//               </a>
//             </div>
//           )}
          
//           {message.file && !message.file.preview && !message.file.url && (
//             <div className="file-attachment">
//               <i className="file-icon">📎</i>
//               {message.file.name}
//             </div>
//           )}
//         </div>
//         <span className="timestamp">{message.timestamp}</span>
//       </div>
//     );
//   };

//   return (
//     <div className={`chat-app ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="sidebar-header">
//           <h3>Chat History</h3>
//           <button className="new-chat-btn" onClick={startNewConversation}>
//             + New Chat
//           </button>
//         </div>
        
//         <div className="conversations-list">
//           {Object.keys(conversations).length === 0 ? (
//             <div className="no-conversations">
//               <p>No chat history found</p>
//             </div>
//           ) : (
//             Object.entries(conversations).map(([date, convsForDate]) => (
//               <div key={date} className="conversation-date-group">
//                 <div className="date-header">{date}</div>
//                 {convsForDate.map(conv => (
//                   <div 
//                     key={conv.id} 
//                     className={`conversation-item ${selectedConversation === conv.id ? 'selected' : ''}`}
//                     onClick={() => loadConversation(conv.id)}
//                   >
//                     <div className="conversation-preview">
//                       <div className="conversation-message">
//                         {conv.message.length > 30 ? conv.message.substring(0, 30) + '...' : conv.message || 'File upload'}
//                       </div>
//                       <div className="conversation-time">
//                         {new Date(conv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                       </div>
//                     </div>
//                     <button 
//                       className="delete-conversation-btn"
//                       onClick={(e) => deleteConversation(conv.id, e)}
//                     >
//                       🗑️
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ))
//           )}
//         </div>
        
//         {userId ? (
//           <div className="sidebar-footer">
//             <div className="logged-in-user">
//               Logged in as: <strong>{username}</strong>
//             </div>
//             <button className="logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         ) : (
//           <div className="sidebar-footer">
//             <div className="login-prompt">
//               Log in to save chat history
//             </div>
//           </div>
//         )}
//       </div>
      
//       {/* Toggle sidebar button */}
//       <button 
//         className="toggle-sidebar-btn"
//         onClick={toggleSidebar}
//       >
//         {isSidebarOpen ? '◀' : '▶'}
//       </button>
      
//       {/* Chat container */}
//       <div className="chat-container">
//         <div className="chat-header">
//           <h2>Chatbot</h2>
//         </div>
        
//         <div className="messages-container">
//           {messages.length === 0 ? (
//             <div className="empty-chat">
//               <p>Send a message to start chatting!</p>
//             </div>
//           ) : (
//             messages.map((message, index) => renderMessage(message, index))
//           )}
          
//           {isLoading && (
//             <div className="message bot loading">
//               <div className="typing-indicator">
//                 <span></span>
//                 <span></span>
//                 <span></span>
//               </div>
//             </div>
//           )}
          
//           <div ref={messageEndRef} />
//         </div>
        
//         <form className="input-container" onSubmit={sendMessage}>
//           {renderFilePreview()}
          
//           <div className="message-input-container">
//             <input
//               type="text"
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               placeholder="Type your message..."
//               disabled={isLoading}
//               className="message-input"
//               ref={inputRef}
//               autoFocus
//             />
            
//             <div className="input-actions">
//               <button 
//                 type="button" 
//                 className="attachment-btn" 
//                 onClick={triggerFileInput}
//                 disabled={isLoading}
//               >
//                 📎
//               </button>
              
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 style={{ display: 'none' }}
//               />
              
//               <button 
//                 type="submit" 
//                 className="send-btn" 
//                 disabled={isLoading || (!inputMessage.trim() && !selectedFile)}
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Chat;


import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './chat.scss';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messageEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Fetch conversation history when userId changes
  useEffect(() => {
    if (userId) {
      fetchConversations();
    }
  }, [userId]);

  // Auto-focus the input field when loading is done
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  // Auto-focus on initial load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Check if user is logged in, redirect to login if not
  useEffect(() => {
    if (!userId) {
      navigate('/');
    }
  }, [userId, navigate]);

  // Fetch conversation history
  const fetchConversations = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/conversations/${userId}`);
      if (response.data.success) {
        // Group conversations by date
        const groupedConversations = groupConversationsByDate(response.data.conversations);
        setConversations(groupedConversations);
        console.log("Fetched conversations:", response.data.conversations);
        console.log("Grouped conversations:", groupedConversations);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  // Group conversations by date
  const groupConversationsByDate = (convs) => {
    const grouped = {};
    
    convs.forEach(conv => {
      const date = new Date(conv.timestamp).toLocaleDateString();
      
      if (!grouped[date]) {
        grouped[date] = [];
      }
      
      grouped[date].push(conv);
    });
    
    // Log the grouped data for debugging
    console.log("Grouped conversations by date:", grouped);
    return grouped;
  };

  // Handle logout
  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    
    // Update state
    setUserId(null);
    setUsername('');
    
    // Redirect to login page
    navigate('/');
  };

  // Load conversation
  const loadConversation = (conversationId) => {
    // Find the conversation in our grouped data
    let targetConversation = null;
    
    Object.values(conversations).forEach(dateGroup => {
      dateGroup.forEach(conv => {
        if (conv.id === conversationId) {
          targetConversation = conv;
        }
      });
    });
    
    if (targetConversation) {
      setSelectedConversation(conversationId);
      
      // Create messages from the conversation
      const userMessage = {
        sender: 'user',
        text: targetConversation.message,
        timestamp: new Date(targetConversation.timestamp).toLocaleTimeString(),
        file: targetConversation.file_path ? {
          name: targetConversation.file_original_name,
          url: `http://localhost:5000/uploads/${targetConversation.file_path.split('/').pop()}`
        } : null
      };
      
      const botMessage = {
        sender: 'bot',
        text: targetConversation.response,
        timestamp: new Date(targetConversation.timestamp).toLocaleTimeString(),
        chartConfig: targetConversation.chart_data || null
      };
      
      setMessages([userMessage, botMessage]);
      
      // Focus on input after loading conversation
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  };

  // Delete conversation
  const deleteConversation = async (conversationId, e) => {
    e.stopPropagation(); // Prevent triggering loadConversation
    
    try {
      const response = await axios.delete(`http://localhost:5000/conversations/${conversationId}`);
      
      if (response.data.success) {
        // Refresh conversations list
        fetchConversations();
        
        // If the deleted conversation was selected, clear messages
        if (selectedConversation === conversationId) {
          setSelectedConversation(null);
          setMessages([]);
        }
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  // Start new conversation
  const startNewConversation = () => {
    setSelectedConversation(null);
    setMessages([]);
    setInputMessage('');
    
    // Focus on input when starting new conversation
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setSelectedFile(file);
    
    // Create preview URL for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // For non-image files, just show the filename
      setFilePreview(null);
    }
    
    // Re-focus the input field after file selection
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  // Clear file selection
  const clearFileSelection = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Re-focus the input field after clearing file
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  // Check if file is CSV
  const isCSVFile = (file) => {
    return file && (file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv'));
  };

  // Handle sending a message
  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() && !selectedFile) return;
    
    // Add user message to chat
    const userMessage = {
      sender: 'user',
      text: inputMessage,
      file: selectedFile ? {
        name: selectedFile.name,
        preview: filePreview,
        isCSV: isCSVFile(selectedFile)
      } : null,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);
    setInputMessage('');
    
    // Prepare form data with message and file
    const formData = new FormData();
    formData.append('message', inputMessage);
    if (userId) {
      formData.append('userId', userId);
      console.log("Sending userId:", userId); // Debug info
    }
    if (selectedFile) {
      formData.append('file', selectedFile);
    }
    
    try {
      // Send request to backend
      const response = await axios.post('http://localhost:5000/chat', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Add bot response to chat
      const botMessage = {
        sender: 'bot',
        text: response.data.reply,
        file: response.data.file ? {
          name: response.data.file.originalName,
          url: `http://localhost:5000${response.data.file.url}`
        } : null,
        chartConfig: response.data.chartConfig || null,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
      
      // Refresh conversations list if user is logged in
      if (userId) {
        // Wait a moment to ensure the database is updated
        setTimeout(fetchConversations, 1000); // Increased from 500ms
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage = {
        sender: 'bot',
        text: 'Sorry, something went wrong. Please try again.',
        error: true,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
      clearFileSelection();
      
      // Focus will be automatically restored via the useEffect that watches isLoading
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Render file attachment preview
  const renderFilePreview = () => {
    if (!selectedFile) return null;
    
    return (
      <div className="file-preview">
        {filePreview ? (
          <img src={filePreview} alt="Preview" className="image-preview" />
        ) : (
          <div className="document-preview">
            <i className="document-icon">
              {isCSVFile(selectedFile) ? '📊' : '📄'}
            </i>
            <span>{selectedFile.name}</span>
            {isCSVFile(selectedFile) && (
              <small className="csv-indicator">Chart will be generated</small>
            )}
          </div>
        )}
        <button className="remove-file-btn" onClick={clearFileSelection}>×</button>
      </div>
    );
  };

  // Render chart component
  const renderChart = (chartConfig) => {
    if (!chartConfig) return null;
    
    return (
      <div className="chart-container">
        <HighchartsReact
          highcharts={Highcharts}
          options={chartConfig}
        />
      </div>
    );
  };

  // Render message with potential file attachment and chart
  const renderMessage = (message, index) => {
    return (
      <div 
        key={index} 
        className={`message ${message.sender} ${message.error ? 'error' : ''}`}
      >
        <div className="message-content">
          {message.text && <p>{message.text}</p>}
          
          {message.file && message.file.preview && (
            <div className="file-attachment image">
              <img src={message.file.preview} alt="Attachment" />
              <span>{message.file.name}</span>
            </div>
          )}
          
          {message.file && !message.file.preview && message.file.url && (
            <div className="file-attachment">
              <a href={message.file.url} target="_blank" rel="noopener noreferrer">
                <i className="file-icon">📎</i>
                {message.file.name}
              </a>
            </div>
          )}
          
          {message.file && !message.file.preview && !message.file.url && (
            <div className="file-attachment">
              <i className="file-icon">
                {message.file.isCSV ? '📊' : '📎'}
              </i>
              {message.file.name}
              {message.file.isCSV && (
                <small className="csv-indicator">Processing for chart...</small>
              )}
            </div>
          )}
          
          {/* Render chart if available */}
          {message.chartConfig && renderChart(message.chartConfig)}
        </div>
        <span className="timestamp">{message.timestamp}</span>
      </div>
    );
  };

  return (
    <div className={`chat-app ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Chat History</h3>
          <button className="new-chat-btn" onClick={startNewConversation}>
            + New Chat
          </button>
        </div>
        
        <div className="conversations-list">
          {Object.keys(conversations).length === 0 ? (
            <div className="no-conversations">
              <p>No chat history found</p>
            </div>
          ) : (
            Object.entries(conversations).map(([date, convsForDate]) => (
              <div key={date} className="conversation-date-group">
                <div className="date-header">{date}</div>
                {convsForDate.map(conv => (
                  <div 
                    key={conv.id} 
                    className={`conversation-item ${selectedConversation === conv.id ? 'selected' : ''}`}
                    onClick={() => loadConversation(conv.id)}
                  >
                    <div className="conversation-preview">
                      <div className="conversation-message">
                        {conv.chart_data && <span className="chart-indicator">📊 </span>}
                        {conv.message.length > 30 ? conv.message.substring(0, 30) + '...' : conv.message || 'File upload'}
                      </div>
                      <div className="conversation-time">
                        {new Date(conv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <button 
                      className="delete-conversation-btn"
                      onClick={(e) => deleteConversation(conv.id, e)}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
        
        {userId ? (
          <div className="sidebar-footer">
            <div className="logged-in-user">
              Logged in as: <strong>{username}</strong>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="sidebar-footer">
            <div className="login-prompt">
              Log in to save chat history
            </div>
          </div>
        )}
      </div>
      
      {/* Toggle sidebar button */}
      <button 
        className="toggle-sidebar-btn"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? '◀' : '▶'}
      </button>
      
      {/* Chat container */}
      <div className="chat-container">
        <div className="chat-header">
          <h2>Chatbot</h2>
        </div>
        
        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="empty-chat">
              <p>Send a message to start chatting!</p>
            </div>
          ) : (
            messages.map((message, index) => renderMessage(message, index))
          )}
          
          {isLoading && (
            <div className="message bot loading">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={messageEndRef} />
        </div>
        
        <form className="input-container" onSubmit={sendMessage}>
          {renderFilePreview()}
          
          <div className="message-input-container">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="message-input"
              ref={inputRef}
              autoFocus
            />
            
            <div className="input-actions">
              <button 
                type="button" 
                className="attachment-btn" 
                onClick={triggerFileInput}
                disabled={isLoading}
              >
                📎
              </button>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              
              <button 
                type="submit" 
                className="send-btn" 
                disabled={isLoading || (!inputMessage.trim() && !selectedFile)}
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;