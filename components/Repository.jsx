"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { 
  Code, AlertCircle, Folder, FileText, GitPullRequest, 
  Settings, ChevronDown, Download, Copy, Check, Terminal, X, Monitor, Loader2
} from "lucide-react";

export default function Repository() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const username = params?.username || "loading";
  const repo = params?.repo || "repository";

  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentBranch, setCurrentBranch] = useState("main");
  const [isLoading, setIsLoading] = useState(true);
  
  const [data, setData] = useState({
    description: "",
    openIssues: 0,
    pullRequests: 0,
    files: [], // This will be populated from your API
    branches: ["main"]
  });

  useEffect(() => {
    const fetchRepoData = async () => {
      if (username && repo) {
        try {
          setIsLoading(true);
          const response = await fetch(`http://localhost:8080/api/repos/${username}/${repo}`);
          if (response.ok) {
            const result = await response.json();
            setData(result);
          }
        } catch (error) {
          console.error("Error fetching repository:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchRepoData();
  }, [username, repo]);

  const repoUrl = `http://localhost:3000/${username}/${repo}.git`;

  const handleCopy = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
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
      {/* Header & Navigation */}
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-xl">
          <Link href={`/${username}`} className="text-[#539bf5] hover:underline">{username}</Link>
          <span className="text-[#7d8590]">/</span>
          <Link href={`/${username}/${repo}`} className="text-[#539bf5] font-semibold hover:underline">{repo}</Link>
          <span className="text-xs border border-[#30363d] rounded-full px-2 py-0.5 text-[#7d8590]">Public</span>
        </h1>
        <p className="text-sm text-[#7d8590] mt-2">{data.description || "No description provided."}</p>
        
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
              {tab.count > 0 && <span className="bg-[#21262d] px-1.5 rounded-full text-xs">{tab.count}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Action Bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <button onClick={() => setIsBranchOpen(!isBranchOpen)} className="flex items-center gap-2 px-3 py-1.5 bg-[#21262d] border border-[#30363d] rounded-md text-sm hover:bg-[#30363d]">
            <GitPullRequest className="w-4 h-4 text-[#7d8590]" /> {currentBranch} <ChevronDown className="w-3 h-3" />
          </button>
          {isBranchOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsBranchOpen(false)} />
              <div className="absolute left-0 mt-2 w-72 bg-[#161b22] border border-[#30363d] rounded-lg shadow-xl z-20">
                <div className="p-3 border-b border-[#30363d] text-xs font-semibold">Switch branches/tags</div>
                <div className="max-h-60 overflow-y-auto">
                  {data.branches.map((b) => (
                    <button key={b} onClick={() => { setCurrentBranch(b); setIsBranchOpen(false); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-[#1f6feb] text-left">
                      <Check className={`w-4 h-4 ${currentBranch === b ? "opacity-100" : "opacity-0"}`} /> {b}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <button onClick={() => setIsCodeOpen(!isCodeOpen)} className="flex items-center gap-2 px-3 py-1.5 bg-[#238636] hover:bg-[#2ea043] rounded-md text-sm font-semibold text-white">
            <Download className="w-4 h-4" /> Code <ChevronDown className="w-3 h-3" />
          </button>
          {isCodeOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsCodeOpen(false)} />
              <div className="absolute right-0 mt-2 w-80 bg-[#161b22] border border-[#30363d] rounded-lg shadow-2xl z-20 p-4">
                <div className="text-xs text-[#7d8590] mb-2">HTTPS</div>
                <div className="flex items-center mb-4">
                  <input readOnly value={repoUrl} className="flex-1 bg-[#0d1117] border border-[#30363d] border-r-0 rounded-l-md px-3 py-1.5 text-xs text-[#e6edf3] outline-none" />
                  <button onClick={handleCopy} className="bg-[#21262d] border border-[#30363d] rounded-r-md px-3 py-1.5 hover:bg-[#30363d]">
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-[#7d8590]" />}
                  </button>
                </div>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-[#1f6feb] rounded-md mb-1"><Monitor className="w-4 h-4" /> Open with MyGit Desktop</button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-[#1f6feb] rounded-md"><Download className="w-4 h-4" /> Download ZIP</button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* REPLACED PLACEHOLDER: Dynamic File List */}
      <div className="border border-[#30363d] rounded-md bg-[#0d1117] overflow-hidden">
        {isLoading ? (
          <div className="p-20 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#7d8590]" />
            <p className="mt-4 text-sm text-[#7d8590]">Fetching repository contents...</p>
          </div>
        ) : data.files.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="bg-[#161b22] border-b border-[#30363d]">
              <tr>
                <th className="px-4 py-3 text-left font-normal text-[#7d8590] w-1/3">Name</th>
                <th className="px-4 py-3 text-left font-normal text-[#7d8590] hidden md:table-cell">Last commit</th>
                <th className="px-4 py-3 text-right font-normal text-[#7d8590]">Latest commit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#30363d]">
              {data.files.map((file, idx) => (
                <tr key={idx} className="hover:bg-[#161b22] transition-colors group">
                  <td className="px-4 py-2 flex items-center gap-3">
                    {file.type === "dir" ? (
                      <Folder className="w-4 h-4 text-[#539bf5] fill-[#539bf5]/20" />
                    ) : (
                      <FileText className="w-4 h-4 text-[#7d8590]" />
                    )}
                    <Link 
                      href={`/${username}/${repo}/blob/${currentBranch}/${file.name}`}
                      className="text-[#e6edf3] hover:text-[#539bf5] hover:underline"
                    >
                      {file.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-[#7d8590] hidden md:table-cell truncate max-w-xs">
                    {file.lastCommit || "Initial commit"}
                  </td>
                  <td className="px-4 py-2 text-[#7d8590] text-right">
                    {file.timeAgo || "just now"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-20 text-center">
            <Folder className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-[#e6edf3] font-semibold">This repository is empty</p>
            <p className="text-sm text-[#7d8590] mt-1">Get started by creating a new file or uploading an existing one.</p>
          </div>
        )}
      </div>
    </div>
  );
}