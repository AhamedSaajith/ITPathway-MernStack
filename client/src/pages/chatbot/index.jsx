import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send } from "lucide-react";
import logo from "../../assets/images/logo.png";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(Math.random().toString(36).substring(7));
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);

    try {
      const response = await axios.post("http://localhost:5001/chat", {
        message: userMessage,
        sessionId,
      });

      setMessages((prev) => [
        ...prev,
        {
          text: response.data.reply,
          isUser: false,
          intent: response.data.intent,
          confidence: response.data.confidence,
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "❌ Oops! Session ID is required.",
          isUser: false,
          error: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen pt-28 pb-16 px-6"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, #050e2c, #021d47, #e8eaef)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex flex-col h-[80vh] w-full max-w-2xl mx-auto bg-white bg-opacity-20 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-blue-200">

        {/* Chat Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-900 to-blue-600 text-white">
          <div className="flex items-center gap-3">
            <img src={logo} alt="ITPathway" className="h-10 w-24 object-contain" />
            <h2 className="text-xl font-bold tracking-wider">ITPathway AI Assistant</h2>
          </div>
          <span className="text-sm bg-white text-blue-800 px-3 py-1 rounded-full font-medium shadow-sm">
            Powered by Saajith
          </span>
        </div>

        {/* Chat Area */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-5 space-y-4 bg-white bg-opacity-10 backdrop-blur-sm"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-lg text-sm shadow-md ${
                  message.isUser
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                <p>{message.text}</p>
                {!message.isUser && message.intent && (
                  <p className="text-xs text-gray-500 mt-1">
                    🎯 Intent: {message.intent} ({Math.round(message.confidence * 100)}%)
                  </p>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 px-4 py-2 rounded-xl animate-pulse shadow">
                <span className="text-gray-600 text-sm">Typing...</span>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <form
          onSubmit={handleSubmit}
          className="p-4 flex items-center bg-white bg-opacity-30 backdrop-blur-md border-t border-blue-200"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-white text-gray-900 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="ml-3 bg-blue-600 hover:bg-blue-700 transition text-white p-2 rounded-full disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
