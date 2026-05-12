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

  const username = params?.username || "loading";
  const repo = params?.repo || "repository";

  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentBranch, setCurrentBranch] = useState("main");
  
  const [data, setData] = useState({
    description: "",
    openIssues: 0,
    pullRequests: 0,
    files: [],
    branches: ["main"]
  });

  // UPDATED: Now fetches data from Spring Boot
  useEffect(() => {
    const fetchRepoData = async () => {
      if (username && repo) {
        try {
          const response = await fetch(`http://localhost:8080/api/repos/${username}/${repo}`);
          if (response.ok) {
            const result = await response.json();
            setData(result);
          }
        } catch (error) {
          console.error("Error fetching repository:", error);
        }
      }
    };

    fetchRepoData();
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

      <div className="flex justify-between items-center mb-4">
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

        <div className="relative">
          <button 
            onClick={() => setIsCodeOpen(!isCodeOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#238636] hover:bg-[#2ea043] rounded-md text-sm font-semibold text-white transition-colors"
          >
            <Download className="w-4 h-4" />
            Code
            <ChevronDown className={`w-3 h-3 transition-transform ${isCodeOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
}