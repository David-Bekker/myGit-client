"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star, GitFork, Circle, Loader2 } from "lucide-react";

const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  CSS: "#563d7c",
  HTML: "#e34c26",
};

export function Home() {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [starredIds, setStarredIds] = useState(new Set());
  const [hasMounted, setHasMounted] = useState(false);

  // 1. Critical Fix: Ensure we are mounted to prevent Hydration errors
  useEffect(() => {
    setHasMounted(true);
    
    const fetchRepos = async () => {
      try {
        setIsLoading(true);
        // Simulate a network delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockData = [
          { id: 1, username: "facebook", name: "react", description: "The library for web and native user interfaces", language: "JavaScript", stars: 228000, forks: 46700 },
          { id: 2, username: "microsoft", name: "vscode", description: "Visual Studio Code", language: "TypeScript", stars: 163000, forks: 28900 },
          { id: 3, username: "vercel", name: "next.js", description: "The React Framework", language: "JavaScript", stars: 125000, forks: 26800 },
          { id: 4, username: "tailwindlabs", name: "tailwindcss", description: "Utility-first CSS framework", language: "CSS", stars: 82000, forks: 4150 },
        ];

        setRepos(mockData);
      } catch (error) {
        console.error("Failed to fetch repos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const toggleStar = (repoId) => {
    setStarredIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(repoId)) {
        newSet.delete(repoId);
      } else {
        newSet.add(repoId);
      }
      return newSet;
    });
  };

  // Prevent rendering until the client is ready
  if (!hasMounted) return null;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-[#7d8590] bg-[#0d1117]">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 text-[#e6edf3]">
      <div className="grid grid-cols-12 gap-8">
        
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3">
          <div className="sticky top-8">
            <h2 className="text-sm font-semibold mb-4 flex items-center justify-between">
              Recent Repositories
              <span className="bg-[#21262d] text-xs px-2 py-0.5 rounded-full">{repos.length}</span>
            </h2>
            <div className="space-y-3">
              {repos.map((repo) => (
                <Link
                  key={`side-${repo.id}`}
                  href={`/${repo.username}/${repo.name}`}
                  className="flex items-center gap-2 text-sm text-[#539bf5] hover:underline"
                >
                  <div className="w-3 h-3 rounded-full bg-[#30363d]" />
                  <span className="truncate">{repo.username}/{repo.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="col-span-12 md:col-span-9">
          <h1 className="text-xl font-semibold mb-6">Trending Repositories</h1>

          <div className="space-y-4">
            {repos.map((repo) => {
              const isStarred = starredIds.has(repo.id);
              
              return (
                <div
                  key={repo.id}
                  className="border border-[#30363d] rounded-md p-5 bg-[#0d1117] hover:bg-[#161b22] transition-all"
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex-1">
                      <Link
                        href={`/${repo.username}/${repo.name}`}
                        className="text-[#539bf5] hover:underline inline-flex items-center gap-2"
                      >
                        <span className="font-semibold text-lg">{repo.username}/{repo.name}</span>
                        <span className="text-xs border border-[#30363d] rounded-full px-2 py-0.5 text-[#7d8590]">
                          Public
                        </span>
                      </Link>
                      
                      <p className="text-sm text-[#7d8590] mt-2 leading-relaxed">
                        {repo.description}
                      </p>

                      <div className="flex items-center gap-6 mt-4 text-xs text-[#7d8590]">
                        <div className="flex items-center gap-1.5">
                          <Circle
                            className="w-3 h-3"
                            fill={languageColors[repo.language] || "#7d8590"}
                            stroke="none"
                          />
                          <span>{repo.language}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          <span>{(repo.stars + (isStarred ? 1 : 0)).toLocaleString()}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <GitFork className="w-4 h-4" />
                          <span>{repo.forks.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleStar(repo.id)}
                      className={`whitespace-nowrap px-4 py-1.5 text-sm border rounded-md flex items-center gap-2 transition-colors ${
                        isStarred 
                        ? "bg-[#21262d] border-[#7d8590]" 
                        : "bg-[#21262d] border-[#30363d] hover:bg-[#30363d]"
                      }`}
                    >
                      <Star className={`w-4 h-4 ${isStarred ? "fill-[#e3b341] text-[#e3b341]" : ""}`} />
                      {isStarred ? "Starred" : "Star"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}