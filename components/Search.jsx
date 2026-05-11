"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search as SearchIcon, Star, GitFork, Circle, Users } from "lucide-react";

const searchResults = {
  repositories: [
    {
      owner: "facebook",
      name: "react",
      description: "The library for web and native user interfaces",
      language: "JavaScript",
      stars: 228000,
      forks: 46700,
      updatedAt: "Updated today",
    },
    {
      owner: "vercel",
      name: "next.js",
      description: "The React Framework",
      language: "JavaScript",
      stars: 125000,
      forks: 26800,
      updatedAt: "Updated yesterday",
    },
    {
      owner: "microsoft",
      name: "typescript",
      description: "TypeScript is a superset of JavaScript that compiles to clean JavaScript output",
      language: "TypeScript",
      stars: 100000,
      forks: 13000,
      updatedAt: "Updated 2 days ago",
    },
  ],
  users: [
    {
      username: "john-doe",
      name: "John Doe",
      bio: "Full-stack developer",
      followers: 1234,
      repositories: 45,
    },
    {
      username: "jane-smith",
      name: "Jane Smith",
      bio: "Open source enthusiast",
      followers: 5678,
      repositories: 89,
    },
  ],
};

const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
};

export function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") || "repositories";
  
  const [searchInput, setSearchInput] = useState(query);

  // Helper function to update URL params in Next.js
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`${pathname}?${createQueryString("q", searchInput)}`);
  };

  const handleTabChange = (newType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", newType);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 text-[#e6edf3] bg-[#0d1117] min-h-screen">
      {/* Search Bar */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="max-w-3xl">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7d8590]" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search GitHub..."
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-12 pr-4 py-2 text-md focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb]"
            />
          </div>
        </form>
      </div>

      {query && (
        <>
          <div className="mb-6">
            <h1 className="text-xl font-semibold mb-4">
              Search results for "{query}"
            </h1>

            {/* Tabs */}
            <div className="border-b border-[#30363d]">
              <nav className="flex gap-4 text-sm">
                {["repositories", "users", "code", "issues"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`px-4 py-3 border-b-2 capitalize transition-colors ${
                      type === tab
                        ? "border-[#fd8c73] text-[#e6edf3]"
                        : "text-[#7d8590] hover:text-[#e6edf3] border-transparent hover:border-[#30363d]"
                    }`}
                  >
                    {tab}
                    {searchResults[tab] && (
                      <span className="ml-2 px-1.5 py-0.5 bg-[#21262d] rounded-full text-xs">
                        {searchResults[tab].length}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Results List */}
          <div className="space-y-4">
            {type === "repositories" &&
              searchResults.repositories.map((repo) => (
                <div key={`${repo.owner}/${repo.name}`} className="border border-[#30363d] rounded-md p-4 hover:bg-[#161b22] transition-colors">
                  <Link href={`/${repo.owner}/${repo.name}`} className="text-[#539bf5] hover:underline text-lg font-semibold">
                    {repo.owner}/{repo.name}
                  </Link>
                  <p className="text-sm text-[#7d8590] mt-2 mb-3">{repo.description}</p>
                  <div className="flex items-center gap-4 text-sm text-[#7d8590]">
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <Circle className="w-3 h-3" fill={languageColors[repo.language] || "#7d8590"} color="transparent" />
                        <span>{repo.language}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>{repo.stars.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      <span>{repo.forks.toLocaleString()}</span>
                    </div>
                    <span>{repo.updatedAt}</span>
                  </div>
                </div>
              ))}

            {type === "users" &&
              searchResults.users.map((user) => (
                <div key={user.username} className="border border-[#30363d] rounded-md p-4 hover:bg-[#161b22]">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1f6feb] flex items-center justify-center text-xl flex-shrink-0">
                      {user.username[0].toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Link href={`/${user.username}`} className="text-[#539bf5] hover:underline font-semibold">
                          {user.name}
                        </Link>
                        <span className="text-[#7d8590] text-sm">{user.username}</span>
                      </div>
                      <p className="text-sm text-[#7d8590] mb-2">{user.bio}</p>
                      <div className="flex items-center gap-3 text-xs text-[#7d8590]">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{user.followers.toLocaleString()} followers</span>
                        </div>
                        <span>{user.repositories} repositories</span>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-sm font-medium bg-[#21262d] border border-[#30363d] rounded-md hover:bg-[#30363d]">
                      Follow
                    </button>
                  </div>
                </div>
              ))}

            {(type === "code" || type === "issues") && (
              <div className="text-center py-12 text-[#7d8590] border border-dashed border-[#30363d] rounded-md">
                <p>No results found for {type} with query "{query}"</p>
              </div>
            )}
          </div>
        </>
      )}

      {!query && (
        <div className="text-center py-20 text-[#7d8590]">
          <SearchIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p className="text-lg">Search for repositories, users, and code</p>
        </div>
      )}
    </div>
  );
}