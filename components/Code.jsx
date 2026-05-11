"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight, Copy, Check, FileText } from "lucide-react";

export default function CodeViewer() {
  const params = useParams();
  const [copied, setCopied] = useState(false);

  // 1. Dynamic Route Extraction
// 1. Dynamic Route Extraction
  const username = params.username;
  const repo = params.repo;
  const branch = params.branch || "main";
  // pathParts will be ["src", "components", "Button.tsx"] from a catch-all route like [...path]
  const pathParts = Array.isArray(params.path) ? params.path : [];
  const fileName = pathParts[pathParts.length - 1] || "README.md";

  // 2. Simulated Dynamic Content 
  // In a real app, you'd fetch this from an API using username, repo, and pathParts
  const [fileContent, setFileContent] = useState(`// Loading ${fileName}...`);

  useEffect(() => {
    // Simulate fetching file content
    const mockContent = `import React from 'react';\n\n// Displaying content for: ${pathParts.join("/")}\nexport const App = () => {\n  return <div>Hello from ${repo}</div>;\n};`;
    setFileContent(mockContent);
  }, [params.path, repo]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 text-[#e6edf3]">
      {/* Breadcrumb Navigation */}
      <div className="mb-4 flex items-center gap-2 text-sm">
        <Link href={`/${username}`} className="text-[#539bf5] hover:underline font-medium">
          {username}
        </Link>
        <span className="text-[#7d8590]">/</span>
        <Link href={`/${username}/${repo}`} className="text-[#539bf5] hover:underline font-bold">
          {repo}
        </Link>

        {pathParts.map((part, index) => (
          <React.Fragment key={index}>
            <ChevronRight className="w-4 h-4 text-[#7d8590]" />
            <Link
              href={`/${username}/${repo}/tree/${branch}/${pathParts.slice(0, index + 1).join("/")}`}
              className={`hover:underline ${
                index === pathParts.length - 1 ? "text-[#e6edf3] font-semibold" : "text-[#539bf5]"
              }`}
            >
              {part}
            </Link>
          </React.Fragment>
        ))}
      </div>

      {/* File Viewer Card */}
      <div className="border border-[#30363d] rounded-md overflow-hidden bg-[#0d1117]">
        {/* Header */}
        <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#7d8590]" />
            <span className="text-sm font-semibold text-[#e6edf3]">
              {fileName}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex border border-[#30363d] rounded-md overflow-hidden">
              <button className="px-3 py-1 text-xs font-medium bg-[#21262d] text-[#e6edf3] border-r border-[#30363d] hover:bg-[#30363d] transition-colors">
                Preview
              </button>
              <button className="px-3 py-1 text-xs font-medium text-[#7d8590] hover:bg-[#30363d] transition-colors">
                Code
              </button>
            </div>

            <button 
              onClick={handleCopy}
              className="p-1.5 border border-[#30363d] rounded-md hover:bg-[#30363d] transition-colors text-[#7d8590] hover:text-[#e6edf3]"
              title="Copy file contents"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="overflow-x-auto py-2">
          <table className="w-full text-xs font-mono border-collapse">
            <tbody>
              {fileContent.split("\n").map((line, index) => (
                <tr key={index} className="hover:bg-[#161b22]/50 group">
                  <td className="px-4 py-0.5 text-right text-[#7d8590] select-none w-12 opacity-50 group-hover:opacity-100 transition-opacity">
                    {index + 1}
                  </td>
                  <td className="px-4 py-0.5 whitespace-pre text-[#e6edf3]">
                    {line || " "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}