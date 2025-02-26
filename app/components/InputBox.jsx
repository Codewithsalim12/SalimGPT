"use client";

import { useState } from "react";

export default function InputBox({ onSubmit, disabled }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans text-sm"
        disabled={disabled}
      />
      <button
        type="submit"
        className="mt-2 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 font-sans text-sm disabled:opacity-50"
        disabled={disabled}
      >
        Send
      </button>
    </form>
  );
}
