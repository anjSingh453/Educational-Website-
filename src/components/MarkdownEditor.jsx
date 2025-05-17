import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { TextFields, Visibility, HelpOutline } from "@mui/icons-material";
import Navbar from "./Navbar";

const cheatsheetContent = `
# Markdown Cheatsheet

## Headers
\`# H1\`  
\`## H2\`  
\`### H3\`  

## Emphasis
\`*italic*\` or \`_italic_\`  
\`**bold**\` or \`__bold__\`  
\`~~strikethrough~~\`  

## Lists
- Unordered list item: \`- item\` or \`* item\`  
1. Ordered list item: \`1. item\`  

## Links and Images
\`[link text](url)\`  
\`![alt text](image-url)\`  

## Code
Inline: \`inline code\`  
Block:
\`\`\`  
code block  
\`\`\`  

## Blockquote
\`> quote\`

## Horizontal Rule
\`---\` or \`***\`

## Task List
- [ ] Task not done  
- [x] Task done  
`;

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Editor!

Type markdown on the left and see the preview here.`);
  const [showCheatsheet, setShowCheatsheet] = useState(false);

  return (
    <>
      <Navbar />
       <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-purple-100 to-pink-100 py-10"> 
      <div className="max-w-6xl mt-10 mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-purple-700 animate-pulse">Markdown Note Editor</h2>
          <button
            onClick={() => setShowCheatsheet(!showCheatsheet)}
            className="flex items-center gap-1 text-purple-600 hover:text-purple-800 focus:outline-none"
            aria-expanded={showCheatsheet}
            aria-label="Toggle Markdown Cheatsheet"
          >
            <HelpOutline />
            <span className="hidden sm:inline">Markdown Cheatsheet</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Editor */}
          <div>
            <div className="flex items-center gap-2 text-purple-600 font-semibold mb-1">
              <TextFields />
              <span>Editor</span>
            </div>
            <textarea
              className="w-full h-80 p-4 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Write your markdown here..."
            />
          </div>

          {/* Preview */}
          <div>
            <div className="flex items-center gap-2 text-purple-600 font-semibold mb-1">
              <Visibility />
              <span>Preview</span>
            </div>
            <div className="h-80 overflow-y-auto p-4 border border-purple-300 rounded-md prose prose-sm md:prose lg:prose-lg max-w-none bg-gray-50">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Cheatsheet */}
        {showCheatsheet && (
          <div className="mt-6 p-4 bg-purple-50 border border-purple-300 rounded-md max-w-6xl prose prose-sm md:prose lg:prose-lg overflow-auto max-h-96">
            <ReactMarkdown>{cheatsheetContent}</ReactMarkdown>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
