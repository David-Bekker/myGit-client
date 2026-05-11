"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  Code, AlertCircle, Folder, FileText, GitPullRequest, Settings, ChevronDown, Download, Copy, Check, Terminal} from "lucide-react";

export default function Repository() {
  const params = useParams();
  const username = params.username;
  const repo = params.repo;
  
  // State for dropdown and copy feedback
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const repoData = {
    description: "The library for web and native user interfaces",
    openIssues: 1234,
    pullRequests: 234,
  };

  const files = [
    { name: "src", type: "folder" },
    { name: "public", type: "folder" },
    { name: "package.json", type: "file" },
    { name: "README.md", type: "file" },
  ];

  const repoUrl = `https://github.com/${username}/${repo}.git`;

  const handleCopy = () => {
    navigator.clipboard.writeText(repoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 text-[#e6edf3]">
      {/* Repository Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="flex items-center gap-2 text-xl">
              <Link href={`/${username}`} className="text-[#539bf5] hover:underline">
                {username}
              </Link>
              <span className="text-[#7d8590]">/</span>
              <span className="text-[#539bf5] font-semibold">{repo}</span>
              <span className="text-xs border border-[#30363d] rounded-full px-2 py-0.5 text-[#7d8590]">
                Public
              </span>
            </h1>
            <p className="text-sm text-[#7d8590] mt-2">{repoData.description}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-[#30363d]">
          <nav className="flex gap-1 text-sm">
            <Link href={`/${username}/${repo}`} className="px-4 py-3 border-b-2 border-[#fd8c73] flex items-center gap-2">
              <Code className="w-4 h-4" /> Code
            </Link>
            <Link href={`/${username}/${repo}/issues`} className="px-4 py-3 text-[#7d8590] hover:bg-[#b1bac41f] rounded-md flex items-center gap-2 transition-colors">
              <AlertCircle className="w-4 h-4" /> Issues
              <span className="px-1.5 py-0.5 bg-[#21262d] rounded-full text-xs font-medium text-[#e6edf3]">{repoData.openIssues}</span>
            </Link>
            <Link href={`/${username}/${repo}/pulls`} className="px-4 py-3 text-[#7d8590] hover:bg-[#b1bac41f] rounded-md flex items-center gap-2 transition-colors">
              <GitPullRequest className="w-4 h-4" /> Pull requests
              <span className="px-1.5 py-0.5 bg-[#21262d] rounded-full text-xs font-medium text-[#e6edf3]">{repoData.pullRequests}</span>
            </Link>
            <Link href={`/${username}/${repo}/settings`} className="px-4 py-3 text-[#7d8590] hover:bg-[#b1bac41f] rounded-md flex items-center gap-2 transition-colors">
              <Settings className="w-4 h-4" /> Settings
            </Link>
          </nav>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between mb-4">
        <button className="flex items-center gap-2 px-3 py-1.5 bg-[#21262d] border border-[#30363d] rounded-md text-sm font-medium hover:bg-[#30363d] transition-colors">
          <GitPullRequest className="w-4 h-4 text-[#7d8590]" />
          main
          <ChevronDown className="w-3 h-3 text-[#7d8590]" />
        </button>
        
        {/* Clone Dropdown Container */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#238636] hover:bg-[#2ea043] text-white rounded-md text-sm font-semibold transition-colors"
          >
            <Download className="w-4 h-4" />
            Code
            <ChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <>
              {/* Overlay to close dropdown when clicking outside */}
              <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
              
              <div className="absolute right-0 mt-2 w-80 bg-[#161b22] border border-[#30363d] rounded-lg shadow-xl z-20 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="w-4 h-4 text-[#7d8590]" />
                  <span className="text-sm font-semibold">Clone</span>
                </div>
                
                <div className="text-xs text-[#7d8590] mb-2">HTTPS</div>
                
                <div className="flex items-center gap-2 bg-[#0d1117] border border-[#30363d] rounded-md p-1 pl-2">
                  <input 
                    readOnly 
                    value={repoUrl}
                    className="bg-transparent border-none outline-none text-xs flex-1 truncate py-1"
                  />
                  <button 
                    onClick={handleCopy}
                    className="p-1.5 hover:bg-[#21262d] rounded-md text-[#7d8590] hover:text-[#e6edf3] transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#3fb950]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                
                <div className="mt-4 pt-3 border-t border-[#30363d]">
                  <button className="flex items-center gap-2 w-full text-left px-2 py-1.5 text-sm text-[#7d8590] hover:text-[#e6edf3] hover:bg-[#21262d] rounded-md">
                    <Download className="w-4 h-4" />
                    Download ZIP
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* File Browser Container (Rest of your UI) */}
      <div className="border border-[#30363d] rounded-md overflow-hidden bg-[#0d1117]">
        <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-500 flex-shrink-0" />
            <span className="font-semibold">{username}</span>
            <span className="text-[#7d8590]">update project structure</span>
          </div>
          <span className="text-[#7d8590]">Yesterday</span>
        </div>
        <div className="divide-y divide-[#30363d]">
          {files.map((file) => (
            <Link
              key={file.name}
              href={`/${username}/${repo}/blob/main/${file.name}`}
              className="flex items-center gap-3 px-4 py-2 hover:bg-[#161b22] group"
            >
              {file.type === "folder" ? (
                <Folder className="w-4 h-4 text-[#7d8590] fill-[#7d8590]" />
              ) : (
                <FileText className="w-4 h-4 text-[#7d8590]" />
              )}
              <span className="text-sm text-[#e6edf3] group-hover:text-[#539bf5] group-hover:underline">{file.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}