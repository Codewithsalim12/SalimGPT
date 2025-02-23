"use client";

import { useEffect, useRef } from "react";

export default function ResponseBox({ messages, loading }) {
  const messagesEndRef = useRef(null);

  // Automatically scroll to the bottom when messages are updated
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-24">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 ${
            message.role === "user" ? "text-right" : "text-left"
          }`}
        >
          <div
            className={`inline-block p-3 rounded-lg max-w-[80%] ${
              message.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            <pre className="whitespace-pre-wrap break-words font-sans text-sm">
              {message.content}
            </pre>
          </div>
        </div>
      ))}

      {/* Show loading indicator */}
      {loading && (
        <div className="text-left mb-4">
          <div className="inline-block p-3 rounded-lg max-w-[80%] bg-gray-200 text-gray-800">
            <div className="flex items-center">
              <div className="animate-pulse">
                <div className="h-2 w-2 bg-gray-400 rounded-full mr-2"></div>
              </div>
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        </div>
      )}

      {/* Empty div to act as a scroll target */}
      <div ref={messagesEndRef} />
    </div>
  );
}
