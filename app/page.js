"use client";

import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import ResponseBox from "./components/ResponseBox";
import InputBox from "./components/InputBox";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputHeight, setInputHeight] = useState(0);
  const inputRef = useRef(null);

  // Calculate the height of the fixed input area
  useEffect(() => {
    if (inputRef.current) {
      const height = inputRef.current.offsetHeight;
      setInputHeight(height);
    }
  }, []);

  const handleSubmit = async (input) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: input },
    ]);

    setLoading(true);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();

      if (!data.response) {
        throw new Error("Invalid response from API");
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "ai", content: data.response },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "ai",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main
        className="container mt-10 mx-auto p-4 flex-1 pt-20" // Add padding-top to avoid overlap with the fixed header
        style={{ paddingBottom: `${inputHeight}px` }}
      >
        <ResponseBox messages={messages} loading={loading} />
      </main>

      {/* Fixed input area at the bottom */}
      <div
        ref={inputRef}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200"
      >
        <div className="container mx-auto p-4 pt-10">
          <InputBox onSubmit={handleSubmit} disabled={loading} />
        </div>
      </div>
    </div>
  );
}
