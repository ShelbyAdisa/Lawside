import React, { useState } from "react";
import { BookOpen, ShieldCheck, FileText, Send, MessageCircle, X } from "lucide-react";
import { motion } from "framer-motion";

const resources = [
  {
    title: "Know Your Rights",
    description: "Understand your constitutional rights in Kenya including arrest procedures, labor rights, and civil protections.",
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    link: "/resources/know-your-rights",
  },
  {
    title: "Legal Document Templates",
    description: "Download free templates for affidavits, contracts, NDAs, power of attorney, and more.",
    icon: <FileText className="w-6 h-6 text-blue-600" />,
    link: "/resources/documents",
  },
  {
    title: "Legal FAQs",
    description: "Quick answers to common legal questions about family law, employment, tenancy, and traffic offenses.",
    icon: <BookOpen className="w-6 h-6 text-blue-600" />,
    link: "/resources/faqs",
  },
];

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm Lawside AI, your legal assistant for Kenya. How can I help you today?", sender: "ai" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { id: Date.now(), text: inputMessage, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer a4b39aa15bd54c11a6bb9404758d089f'
        },
        body: JSON.stringify({
          model: 'google/gemma-3n-e4b-it',
          messages: [
            {
              role: 'system',
              content: 'You are Lawside AI, a legal assistant specialized in Kenyan law. Provide helpful, accurate legal information while reminding users that this is general information and not legal advice. Always recommend consulting with a qualified lawyer for specific legal matters.'
            },
            {
              role: 'user',
              content: inputMessage
            }
          ],
          temperature: 0.7,
          top_p: 0.7,
          frequency_penalty: 1,
          max_output_tokens: 512,
          top_k: 50
        })
      });

      const data = await response.json();
      
      if (data.choices && data.choices[0]) {
        const aiMessage = {
          id: Date.now() + 1,
          text: data.choices[0].message.content,
          sender: "ai"
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I apologize, but I'm having trouble connecting right now. Please try again later or contact our support team.",
        sender: "ai"
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <h3 className="font-semibold">Lawside AI</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about Kenyan law..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default function LegalResources() {
  return (
    <div className="bg-gray-50 min-h-screen px-6 py-16 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Legal Resources</h1>
        <p className="text-lg text-gray-600 mb-12">
          Explore verified legal content to help you navigate Kenya's legal landscape with confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {resources.map((resource, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">{resource.icon}</div>
              <h2 className="text-xl font-semibold text-gray-800">{resource.title}</h2>
            </div>
            <p className="text-gray-600 mb-4">{resource.description}</p>
            <a
              href={resource.link}
              className="text-blue-600 font-medium hover:underline"
            >
              Learn more →
            </a>
          </motion.div>
        ))}
      </div>

      {/* AI Chat Integration */}
      <div className="mt-24 text-center">
        <h3 className="text-2xl font-semibold text-gray-800">Need personalized legal help?</h3>
        <p className="text-gray-600 mt-2">Chat with Lawside AI for instant legal guidance, or find a qualified lawyer.</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="text-sm text-gray-500 bg-blue-50 px-4 py-2 rounded-lg">
            💬 Click the chat button in the bottom right to start talking with Lawside AI
          </div>
          <a
            href="/lawyers"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Find a Lawyer
          </a>
        </div>
      </div>

      {/* Chat Component */}
      <ChatBox />

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-400 text-sm">
        © 2025 LawConnect. All rights reserved.
      </footer>
    </div>
  );
}