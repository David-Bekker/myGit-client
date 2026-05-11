"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { 
  Code, AlertCircle, Folder, FileText, GitPullRequest, 
  Settings, ChevronDown, Download, Copy, Check, Terminal, X 
} from "lucide-react";

export default function Repository() {
  const params = useParams();
  const pathname = usePathname();
  
  // Extract parameters safely from dynamic routes /[username]/[repo]
  const username = params?.username || "loading";
  const repo = params?.repo || "repository";
  
  // UI State
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentBranch, setCurrentBranch] = useState("main");
  
  // Data State
  const [data, setData] = useState({
    description: "",
    openIssues: 0,
    pullRequests: 0,
    files: [],
    branches: ["main", "dev", "feature-ui", "fix-header"]
  });

  useEffect(() => {
    // Simulate API fetch based on URL params
    if (username && repo) {
      setData(prev => ({
        ...prev,
        description: `Official repository for ${repo}. Built with modern web standards.`,
        openIssues: 12,
        pullRequests: 5,
        files: [
          { name: "src", type: "folder" },
          { name: "public", type: "folder" },
          { name: "package.json", type: "file" },
          { name: "README.md", type: "file" },
          { name: "tailwind.config.js", type: "file" },
        ]
      }));
    }
  }, [username, repo]);

  const repoUrl = `https://github.com/${username}/${repo}.git`;

  const handleCopy = () => {
    navigator.clipboard.writeText(repoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isActive = (path) => {
    if (!path) return pathname === `/${username}/${repo}`;
    return pathname.includes(path);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 text-[#e6edf3]">
      {/* Breadcrumbs Header */}
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-xl">
          <Link href={`/${username}`} className="text-[#539bf5] hover:underline">
            {username}
          </Link>
          <span className="text-[#7d8590]">/</span>
          <Link href={`/${username}/${repo}`} className="text-[#539bf5] font-semibold hover:underline">
            {repo}
          </Link>
          <span className="text-xs border border-[#30363d] rounded-full px-2 py-0.5 text-[#7d8590]">
            Public
          </span>
        </h1>
        <p className="text-sm text-[#7d8590] mt-2">{data.description}</p>
        
        {/* Navigation Tabs */}
        <nav className="flex gap-1 text-sm border-b border-[#30363d] mt-4">
          {[
            { label: "Code", icon: Code, path: "" },
            { label: "Issues", icon: AlertCircle, path: "issues", count: data.openIssues },
            { label: "Pull requests", icon: GitPullRequest, path: "pulls", count: data.pullRequests },
            { label: "Settings", icon: Settings, path: "settings" },
          ].map((tab) => (
            <Link
              key={tab.label}
              href={`/${username}/${repo}/${tab.path}`}
              className={`px-4 py-3 flex items-center gap-2 transition-colors ${
                isActive(tab.path) 
                ? "border-b-2 border-[#fd8c73] text-[#e6edf3]" 
                : "text-[#7d8590] hover:bg-[#b1bac41f] rounded-t-md"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count > 0 && (
                <span className="bg-[#21262d] px-1.5 rounded-full text-xs font-medium text-[#e6edf3]">
                  {tab.count}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Action Bar */}
      <div className="flex justify-between items-center mb-4">
        {/* Branch Selector */}
        <div className="relative">
          <button 
            onClick={() => setIsBranchOpen(!isBranchOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#21262d] border border-[#30363d] rounded-md text-sm font-medium hover:bg-[#30363d] transition-colors"
          >
            <GitPullRequest className="w-4 h-4 text-[#7d8590]" /> 
            {currentBranch} 
            <ChevronDown className={`w-3 h-3 transition-transform ${isBranchOpen ? 'rotate-180' : ''}`} />
          </button>

          {isBranchOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsBranchOpen(false)} />
              <div className="absolute left-0 mt-2 w-72 bg-[#161b22] border border-[#30363d] rounded-lg shadow-xl z-20 overflow-hidden">
                <div className="p-3 border-b border-[#30363d] flex justify-between items-center bg-[#161b22]">
                  <span className="text-xs font-semibold">Switch branches/tags</span>
                  <button onClick={() => setIsBranchOpen(false)} className="text-[#7d8590] hover:text-[#e6edf3]">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="max-h-60 overflow-y-auto bg-[#0d1117]">
                  {data.branches.map((branch) => (
                    <button
                      key={branch}
                      onClick={() => {
                        setCurrentBranch(branch);
                        setIsBranchOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-[#1f6feb] transition-colors text-left border-b border-[#30363d] last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <Check className={`w-4 h-4 text-[#e6edf3] ${currentBranch === branch ? "opacity-100" : "opacity-0"}`} />
                        <span>{branch}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Code Download Selector */}
        <div className="relative">
          <button 
            onClick={() => setIsCodeOpen(!isCodeOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#238636] hover:bg-[#2ea043] rounded-md text-sm font-semibold text-white transition-colors"
          >
            <Download className="w-4 h-4" /> 
            Code 
            <ChevronDown className={`w-3 h-3 transition-transform ${isCodeOpen ? 'rotate-180' : ''}`} />
          </button>

          {isCodeOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsCodeOpen(false)} />
              <div className="absolute right-0 mt-2 w-80 bg-[#161b22] border border-[#30363d] rounded-lg shadow-xl z-20 p-4">
                <div className="flex items-center gap-2 mb-3 text-sm font-bold">
                  <Terminal className="w-4 h-4 text-[#7d8590]"/> Clone
                </div>
                <div className="flex items-center gap-2 bg-[#0d1117] border border-[#30363d] rounded-md p-1.5">
                  <input 
                    readOnly 
                    value={repoUrl} 
                    className="bg-transparent text-xs flex-1 outline-none px-2 text-[#7d8590]" 
                  />
                  <button 
                    onClick={handleCopy} 
                    className="p-1.5 hover:bg-[#30363d] rounded-md transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#3fb950]" /> : <Copy className="w-4 h-4 text-[#7d8590]" />}
                  </button>
                </div>
                <div className="mt-4 pt-3 border-t border-[#30363d]">
                  <button className="flex items-center gap-2 w-full text-left px-2 py-2 text-sm text-[#e6edf3] hover:bg-[#1f6feb] rounded-md transition-colors">
                    <Download className="w-4 h-4" /> Download ZIP
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* File Browser List */}
      <div className="border border-[#30363d] rounded-md bg-[#0d1117] overflow-hidden">
        <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] text-sm flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
            <span className="font-semibold hover:text-[#539bf5] cursor-pointer transition-colors">{username}</span>
            <span className="text-[#7d8590]">Update structure for {currentBranch}</span>
          </div>
          <span className="text-[#7d8590]">2 hours ago</span>
        </div>
        
        <div className="flex flex-col">
          {data.files.map((file) => (
            <Link
              key={file.name}
              href={`/${username}/${repo}/blob/${currentBranch}/${file.name}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[#161b22] border-b border-[#30363d] last:border-0 group"
            >
              {file.type === "folder" ? (
                <Folder className="w-4 h-4 text-[#7d8590] fill-[#7d8590]" />
              ) : (
                <FileText className="w-4 h-4 text-[#7d8590]" />
              )}
              <span className="text-sm text-[#e6edf3] group-hover:text-[#539bf5] group-hover:underline transition-colors">
                {file.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}