"use client";

import { useEffect, useRef, useState } from "react";
import { FaCopy } from "react-icons/fa";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

export default function CodeBlock({ code }) {
  const codeRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  // Highlight the code block
  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightBlock(codeRef.current);
    }
  }, [code]);

  // Handle copying the code to the clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset the "Copied!" message after 2 seconds
    });
  };

  return (
    <div className="relative bg-gray-900 rounded-lg p-4 mt-4">
      <pre>
        <code ref={codeRef} className="language-javascript">
          {code}
        </code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
        title="Copy code"
      >
        {isCopied ? (
          <span className="text-green-400">Copied!</span>
        ) : (
          <FaCopy className="text-white" />
        )}
      </button>
    </div>
  );
}
