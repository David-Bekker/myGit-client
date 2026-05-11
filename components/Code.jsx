"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight } from "lucide-react";

const fileContent = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;

export default function Code() {
  const params = useParams();

  /**
   * FALLBACK LOGIC:
   * Next.js throws a 500 error if any part of a Link's href is undefined.
   * We extract username and repo, and default the branch to 'main' if it's missing from the URL.
   */
  const username = params.username || "";
  const repo = params.repo || "";
  const branch = params.branch || "main";

  /**
   * CATCH-ALL ROUTE LOGIC:
   * If your folder is named [...path], params.path will be an array of strings.
   * Example URL: /david/my-repo/src/components/Button.js
   * params.path -> ["src", "components", "Button.js"]
   */
  const pathParts = Array.isArray(params.path) ? params.path : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 text-[#e6edf3]">
      {/* Breadcrumb Navigation */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-[#7d8590]">
          <Link 
            href={`/${username}`} 
            className="text-[#539bf5] hover:underline"
          >
            {username}
          </Link>
          
          <ChevronRight className="w-4 h-4" />
          
          <Link 
            href={`/${username}/${repo}`} 
            className="text-[#539bf5] hover:underline"
          >
            {repo}
          </Link>

          {pathParts.map((part, index) => (
            <React.Fragment key={index}>
              <ChevronRight className="w-4 h-4" />
              <Link
                href={`/${username}/${repo}/tree/${branch}/${pathParts.slice(0, index + 1).join("/")}`}
                className="text-[#539bf5] hover:underline"
              >
                {part}
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* File Viewer Card */}
      <div className="border border-[#30363d] rounded-md overflow-hidden bg-[#0d1117]">
        {/* Header */}
        <div className="bg-[#161b22] px-4 py-2 border-b border-[#30363d] flex items-center justify-between">
          <div className="flex items-center gap-2">
             <span className="text-sm font-mono text-[#e6edf3]">
               {pathParts[pathParts.length - 1] || "index.tsx"}
             </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-xs font-medium border border-[#30363d] rounded-md hover:bg-[#30363d] transition-colors">
              Raw
            </button>
            <button className="px-3 py-1 text-xs font-medium border border-[#30363d] rounded-md hover:bg-[#30363d] transition-colors">
              Copy
            </button>
          </div>
        </div>

        {/* Code Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono border-collapse">
            <tbody>
              {fileContent.split("\n").map((line, index) => (
                <tr key={index} className="hover:bg-[#161b22] group">
                  <td className="px-4 py-0.5 text-right text-[#7d8590] select-none w-12 border-r border-[#30363d]/50">
                    {index + 1}
                  </td>
                  <td className="px-4 py-0.5 whitespace-pre">
                    <code className="text-[#e6edf3]">{line || " "}</code>
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