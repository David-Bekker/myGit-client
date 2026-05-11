"use client";
import React from "react";
import Link from "next/link"; 
import { useParams } from "next/navigation";
import { Star, GitFork, Circle, Eye, Code, AlertCircle, Folder, FileText, ChevronRight } from "lucide-react";

const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  CSS: "#563d7c",
};

export default function Repository() {
  const params = useParams();
  const username = params.username;
  const repo = params.repo;

  const repoData = {
    description: "The library for web and native user interfaces",
    language: "JavaScript",
    stars: 228000,
    forks: 46700,
    watchers: 6800,
    openIssues: 1234,
    pullRequests: 234,
  };

  const files = [
    { name: "src", type: "folder" },
    { name: "public", type: "folder" },
    { name: "package.json", type: "file" },
    { name: "README.md", type: "file" },
  ];

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
          <nav className="flex gap-4 text-sm">
            <Link href={`/${username}/${repo}`} className="px-4 py-3 border-b-2 border-[#fd8c73] flex items-center gap-2">
              <Code className="w-4 h-4" /> Code
            </Link>
            <Link href={`/${username}/${repo}/issues`} className="px-4 py-3 text-[#7d8590] hover:text-[#e6edf3] flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Issues
              <span className="px-1.5 py-0.5 bg-[#21262d] rounded-full text-xs">{repoData.openIssues}</span>
            </Link>
            <Link href={`/${username}/${repo}/pulls`} className="px-4 py-3 text-[#7d8590] hover:text-[#e6edf3] flex items-center gap-2">
              Pull requests <span className="px-4 py-3 text-[#7d8590] hover:text-[#e6edf3] flex items-center gap-2">{repoData.pullRequests}</span>
            </Link>
            
            <Link href={`/${username}/${repo}/settings`} className="px-4 py-3 text-[#7d8590] hover:text-[#e6edf3] flex items-center gap-2">
              Settings
            </Link>
          </nav>
        </div>
      </div>

      {/* File Browser */}
      <div className="border border-[#30363d] rounded-md overflow-hidden bg-[#0d1117]">
        <div className="bg-[#161b22] px-4 py-2 border-b border-[#30363d] flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold">main</span>
          </div>
          <span className="text-[#7d8590]">1,234 commits</span>
        </div>

        <div className="divide-y divide-[#30363d]">
          {files.map((file) => (
            <Link
              key={file.name}
              // FOLDERS go to /blob/, FILES go to /blob/
              href={`/${username}/${repo}/${file.type === "folder" ? "blob" : "blob"}/main/${file.name}`}
              className="flex items-center gap-3 px-4 py-2 hover:bg-[#161b22] group"
            >
              {file.type === "folder" ? (
                <Folder className="w-4 h-4 text-[#7d8590]" />
              ) : (
                <FileText className="w-4 h-4 text-[#7d8590]" />
              )}
              <span className="text-sm text-[#539bf5] group-hover:underline">{file.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}