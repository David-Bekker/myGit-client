"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star, GitFork, Circle, Loader2, Plus, BookOpen } from "lucide-react";

const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Java: "#b07219",
  Python: "#3572A5",
  CSS: "#563d7c",
};

export function Home() {
  const [trendingRepos, setTrendingRepos] = useState([]);
  const [myRepos, setMyRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [starredRepos, setStarredRepos] = useState(new Set());

  const handleStarRepo = (repoId) => {
    setStarredRepos((prev) => {
      const updated = new Set(prev);
      if (updated.has(repoId)) {
        updated.delete(repoId);
      } else {
        updated.add(repoId);
      }
      return updated;
    });
  };

  useEffect(() => {
    setHasMounted(true);
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      const currentUsername = localStorage.getItem("username");

      try {
        setIsLoading(true);
        
        // 1. Fetch My Repos for Sidebar
        const myRes = await fetch(`http://localhost:8080/api/repos/owner/${currentUsername}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (myRes.ok) setMyRepos(await myRes.json());

        // 2. Fetch All Public Repos for Feed
        const allRes = await fetch(`http://localhost:8080/api/repos`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (allRes.ok) setTrendingRepos(await allRes.json());

      } catch (error) {
        console.error("Dashboard data fetch failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (!hasMounted) return null;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0d1117]">
        <Loader2 className="animate-spin w-8 h-8 text-[#7d8590]" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 text-[#e6edf3] min-h-screen">
      <div className="grid grid-cols-12 gap-8">
        
        {/* Left Sidebar: My Repositories */}
        <aside className="col-span-12 md:col-span-3">
          <div className="sticky top-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">Top Repositories</h2>
              <Link href="/new" className="bg-[#238636] hover:bg-[#2ea043] text-white p-1 rounded-md transition-colors">
                <Plus className="w-4 h-4" />
              </Link>
            </div>
            
            <input 
              type="text" 
              placeholder="Find a repository..." 
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2 py-1 text-xs mb-4 focus:ring-1 focus:ring-[#1f6feb] outline-none"
            />

            <div className="space-y-3">
              {myRepos.length > 0 ? (
                myRepos.map((repo) => (
                  <Link
                    key={repo.id}
                    href={`/${repo.owner}/${repo.name}`}
                    className="flex items-center gap-2 text-sm hover:underline"
                  >
                    <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-500 to-green-500" />
                    <span className="truncate font-medium">{repo.owner}/{repo.name}</span>
                  </Link>
                ))
              ) : (
                <p className="text-xs text-[#7d8590]">No repositories yet.</p>
              )}
            </div>
          </div>
        </aside>

        {/* Main Feed: Trending/All Repos */}
        <main className="col-span-12 md:col-span-9">
          <h1 className="text-lg font-semibold mb-6 border-b border-[#30363d] pb-4">All Activity</h1>

          <div className="space-y-4">
            {trendingRepos.map((repo) => (
              <div key={repo.id} className="border border-[#30363d] rounded-md p-5 bg-[#161b22] hover:border-[#8b949e] transition-all">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="w-4 h-4 text-[#7d8590]" />
                      <Link href={`/${repo.owner}/${repo.name}`} className="text-[#539bf5] font-semibold text-lg hover:underline">
                        {repo.owner}/{repo.name}
                      </Link>
                    </div>
                    <p className="text-sm text-[#7d8590] mt-2 mb-4">{repo.description || "No description provided."}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-[#7d8590]">
                      <div className="flex items-center gap-1.5">
                        <Circle className="w-3 h-3" fill={languageColors[repo.language] || "#8b949e"} stroke="none" />
                        <span>{repo.language || "Unknown"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" /> {repo.stars || 0}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => handleStarRepo(repo.id)} className={`border px-3 py-1 rounded-md text-xs font-medium flex items-center gap-2 transition-colors ${
                    starredRepos.has(repo.id)
                      ? "bg-[#238636] border-[#238636] text-white"
                      : "bg-[#21262d] border-[#30363d] text-[#e6edf3] hover:bg-[#30363d]"
                  }`}>
                    <Star className="w-3.5 h-3.5" /> {starredRepos.has(repo.id) ? "Starred" : "Star"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}