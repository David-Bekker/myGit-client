"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { 
  Search as SearchIcon, 
  Star, 
  GitFork, 
  Circle, 
  Users, 
  Loader2, 
  ArrowUpDown,
  Filter
} from "lucide-react";

// --- Constants & Helper Data ---
const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  React: "#61dafb",
  Nextjs: "#ffffff"
};

const tabs = [
  { id: "repositories", label: "Repositories" },
  { id: "users", label: "Users" },
  { id: "code", label: "Code" },
  { id: "issues", label: "Issues" },
];

export function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // URL States
  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") || "repositories";
  const sort = searchParams.get("sort") || "best-match";
  
  // Local UI States
  const [searchInput, setSearchInput] = useState(query);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState({ repositories: [], users: [] });

  // 1. Sync local input with URL (e.g., if user hits back/forward browser buttons)
  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  // 2. Simulated Dynamic Data Fetching
  // In a real app, this would be an API call to /api/search?q=...
  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setIsLoading(true);
      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Generate "Dynamic" Repos based on query
      const dynamicRepos = [
        { owner: query.toLowerCase(), name: "awesome-project", description: `A high-performance implementation of ${query}`, language: "TypeScript", stars: 12400, forks: 890, updatedAt: "Updated 2h ago" },
        { owner: "community", name: `${query}-toolkit`, description: `The official community toolkit for ${query} development`, language: "JavaScript", stars: 8900, forks: 450, updatedAt: "Updated yesterday" },
        { owner: "dev-team", name: `legacy-${query}`, description: `Archive of legacy ${query} patterns`, language: "Python", stars: 120, forks: 12, updatedAt: "Updated 1 month ago" },
      ].filter(item => item.name.includes(query.toLowerCase()) || item.owner.includes(query.toLowerCase()) || query.length < 3);

      // Generate "Dynamic" Users
      const dynamicUsers = [
        { username: `${query}-guru`, name: `${query.charAt(0).toUpperCase() + query.slice(1)} Master`, bio: `I build things with ${query}`, followers: 4500, repositories: 12 },
        { username: "coder-123", name: "Alex Rivera", bio: `Exploring the world of ${query}`, followers: 89, repositories: 34 },
      ];

      setResults({
        repositories: dynamicRepos,
        users: dynamicUsers
      });
      setIsLoading(false);
    };

    fetchResults();
  }, [query, sort]); // Re-fetch when query or sort changes

  // 3. Navigation Helpers
  const updateURL = useCallback((updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.push(`${pathname}?${params.toString()}`);
  }, [router, pathname, searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateURL({ q: searchInput, type: "repositories" }); // Reset to repos on new search
  };

  const handleTabChange = (newType) => {
    updateURL({ type: newType });
  };

  const handleSortChange = (e) => {
    updateURL({ sort: e.target.value });
  };

  // 4. Mapped Display Logic
  const currentResults = useMemo(() => {
    return results[type] || [];
  }, [results, type]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 text-[#e6edf3] bg-[#0d1117] min-h-screen">
      
      {/* Dynamic Header / Search Input */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl">
          <div className="relative group">
            <SearchIcon className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isLoading ? 'text-[#1f6feb]' : 'text-[#7d8590]'}`} />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search GitHub..."
              className="w-full bg-[#010409] border border-[#30363d] rounded-md pl-12 pr-4 py-2 text-md focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb] transition-all"
            />
            {isLoading && (
              <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-[#1f6feb]" />
            )}
          </div>
        </form>

        {query && (
          <div className="flex items-center gap-2 text-sm">
            <ArrowUpDown className="w-4 h-4 text-[#7d8590]" />
            <select 
              value={sort}
              onChange={handleSortChange}
              className="bg-[#21262d] border border-[#30363d] rounded-md px-2 py-1 outline-none focus:border-[#1f6feb]"
            >
              <option value="best-match">Best Match</option>
              <option value="most-stars">Most Stars</option>
              <option value="recently-updated">Recently Updated</option>
            </select>
          </div>
        )}
      </div>

      {query ? (
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar Tabs (Desktop) */}
          <aside className="col-span-12 md:col-span-3">
            <div className="flex flex-col border border-[#30363d] rounded-md overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center justify-between px-4 py-3 text-sm text-left transition-colors border-l-2 ${
                    type === tab.id
                      ? "bg-[#161b22] border-[#fd8c73] text-[#e6edf3]"
                      : "text-[#7d8590] hover:bg-[#161b22] border-transparent"
                  }`}
                >
                  <span className="capitalize">{tab.label}</span>
                  {results[tab.id]?.length > 0 && (
                    <span className="px-2 py-0.5 bg-[#30363d] rounded-full text-xs">
                      {results[tab.id].length}
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-6 p-4 border border-[#30363d] rounded-md bg-[#0d1117]">
               <h3 className="text-xs font-semibold text-[#7d8590] uppercase mb-3 flex items-center gap-2">
                 <Filter className="w-3 h-3" /> Languages
               </h3>
               <div className="space-y-2">
                 {Object.keys(languageColors).map(lang => (
                   <label key={lang} className="flex items-center gap-2 text-sm text-[#7d8590] cursor-pointer hover:text-[#e6edf3]">
                     <input type="checkbox" className="rounded border-[#30363d] bg-[#0d1117]" />
                     {lang}
                   </label>
                 ))}
               </div>
            </div>
          </aside>

          {/* Main Results Column */}
          <div className="col-span-12 md:col-span-9">
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-semibold">
                 {results[type]?.length || 0} {type} results
               </h2>
            </div>

            <div className="space-y-4">
              {isLoading ? (
                // Skeleton Loader Simulation
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="border border-[#30363d] rounded-md p-4 animate-pulse">
                    <div className="h-5 bg-[#30363d] rounded w-1/3 mb-4" />
                    <div className="h-3 bg-[#30363d] rounded w-full mb-2" />
                    <div className="h-3 bg-[#30363d] rounded w-2/3" />
                  </div>
                ))
              ) : currentResults.length > 0 ? (
                currentResults.map((item, idx) => (
                  <div key={idx} className="border border-[#30363d] rounded-md p-4 hover:bg-[#161b22] transition-all group">
                    {type === "repositories" ? (
                      <>
                        <Link href={`/${item.owner}/${item.name}`} className="text-[#539bf5] hover:underline text-lg font-semibold">
                          {item.owner}/<span className="group-hover:underline">{item.name}</span>
                        </Link>
                        <p className="text-sm text-[#7d8590] mt-2 mb-4 line-clamp-2">{item.description}</p>
                        <div className="flex items-center gap-4 text-xs text-[#7d8590]">
                          <div className="flex items-center gap-1.5">
                            <Circle className="w-3 h-3" fill={languageColors[item.language] || "#7d8590"} stroke="none" />
                            <span>{item.language}</span>
                          </div>
                          <div className="flex items-center gap-1"><Star className="w-4 h-4" /> {item.stars.toLocaleString()}</div>
                          <div className="flex items-center gap-1"><GitFork className="w-4 h-4" /> {item.forks.toLocaleString()}</div>
                          <span>{item.updatedAt}</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-md bg-gradient-to-br from-[#1f6feb] to-[#238636] flex items-center justify-center text-xl font-bold">
                          {item.username[0].toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <Link href={`/${item.username}`} className="text-[#539bf5] hover:underline font-semibold">{item.name}</Link>
                          <span className="ml-2 text-sm text-[#7d8590]">{item.username}</span>
                          <p className="text-sm text-[#7d8590] mt-1">{item.bio}</p>
                        </div>
                        <button className="hidden sm:block px-3 py-1 text-xs font-semibold bg-[#21262d] border border-[#30363d] rounded-md hover:bg-[#30363d]">Follow</button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-20 border border-dashed border-[#30363d] rounded-md">
                  <p className="text-[#7d8590]">We couldn’t find any {type} matching '{query}'</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Initial Empty State
        <div className="text-center py-32 animate-in fade-in zoom-in duration-700">
          <div className="bg-[#161b22] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <SearchIcon className="w-10 h-10 text-[#30363d]" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Search more than 420M repositories</h2>
          <p className="text-[#7d8590] max-w-md mx-auto">Explore the world's largest development community and find the code you need.</p>
        </div>
      )}
    </div>
  );
}