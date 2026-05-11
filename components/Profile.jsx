"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MapPin, Link2, X, Building, Users, Star, GitFork, Circle } from "lucide-react";

// 1. Keep data constants OUTSIDE the function to keep it clean
const userRepos = [
  {
    name: "awesome-project",
    description: "A really awesome project built with React and TypeScript",
    language: "TypeScript",
    stars: 1234,
    forks: 234,
    isPrivate: false,
    updatedAt: "Updated 2 days ago",
  },
  {
    name: "portfolio-website",
    description: "My personal portfolio website",
    language: "JavaScript",
    stars: 89,
    forks: 12,
    isPrivate: false,
    updatedAt: "Updated 1 week ago",
  },
  {
    name: "ml-experiments",
    description: "Machine learning experiments and notebooks",
    language: "Python",
    stars: 456,
    forks: 78,
    isPrivate: false,
    updatedAt: "Updated 3 weeks ago",
  },
  {
    name: "secret-project",
    description: "Private repository for secret stuff",
    language: "Go",
    stars: 0,
    forks: 0,
    isPrivate: true,
    updatedAt: "Updated yesterday",
  },
];

const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Go: "#00ADD8",
};

// 2. ONLY ONE export function Profile()
export function Profile() {
  const params = useParams();
  const username = params.username || params.owner;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const userData = {
    name: "John Doe",
    bio: "Full-stack developer passionate about building great user experiences",
    company: "Tech Company",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    twitter: "johndoe",
    followers: 1234,
    following: 567,
    repositories: userRepos.length,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 text-[#e6edf3]">
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-3">
          <div className="sticky top-6">
            <div className="mb-4">
              <div className="w-full aspect-square rounded-full bg-[#1f6feb] flex items-center justify-center text-6xl uppercase">
                {username?.[0]}
              </div>
            </div>

            <div className="mb-4">
              <h1 className="text-2xl font-semibold">{userData.name}</h1>
              <div className="text-xl text-[#7d8590]">{username}</div>
              <p className="text-sm mt-3">{userData.bio}</p>
            </div>

            <button className="w-full px-3 py-1.5 text-sm border border-[#30363d] rounded-md hover:border-[#3d444d] mb-4">
              Edit profile
            </button>

            <div className="flex items-center gap-1 text-sm mb-4">
              <Users className="w-4 h-4" />
              <Link href={`/${username}/followers`} className="hover:text-[#539bf5]">
                <span className="font-semibold">{userData.followers}</span> followers
              </Link>
              <span className="text-[#7d8590]">·</span>
              <Link href={`/${username}/following`} className="hover:text-[#539bf5]">
                <span className="font-semibold">{userData.following}</span> following
              </Link>
            </div>

            <div className="space-y-2 text-sm">
              {userData.company && (
                <div className="flex items-center gap-2 text-[#7d8590]">
                  <Building className="w-4 h-4" />
                  <span>{userData.company}</span>
                </div>
              )}
              {userData.location && (
                <div className="flex items-center gap-2 text-[#7d8590]">
                  <MapPin className="w-4 h-4" />
                  <span>{userData.location}</span>
                </div>
              )}
              {userData.website && (
                <div className="flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-[#7d8590]" />
                  <a href={userData.website} target="_blank" rel="noopener noreferrer" className="text-[#539bf5] hover:underline">
                    {userData.website.replace("https://", "")}
                  </a>
                </div>
              )}
              {userData.twitter && (
                <div className="flex items-center gap-2">
                  <X className="w-4 h-4 text-[#7d8590]" />
                  <a href={`https://x.com/${userData.twitter}`} target="_blank" rel="noopener noreferrer" className="text-[#539bf5] hover:underline">
                    @{userData.twitter}
                  </a>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="col-span-9">
          <div className="border-b border-[#30363d] mb-6">
            <nav className="flex gap-4 text-sm">
              <button className="px-4 py-3 border-b-2 border-[#fd8c73]">Overview</button>
              <button className="px-4 py-3 text-[#7d8590] hover:text-[#e6edf3]">
                Repositories <span className="ml-1 px-1.5 py-0.5 bg-[#21262d] rounded-full text-xs">{userData.repositories}</span>
              </button>
            </nav>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Popular repositories</h2>
            <div className="grid grid-cols-2 gap-4">
              {userRepos.map((repo) => (
                <div key={repo.name} className="border border-[#30363d] rounded-md p-4 hover:border-[#3d444d] transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <Link href={`/${username}/${repo.name}`} className="text-[#539bf5] hover:underline font-semibold">
                      {repo.name}
                    </Link>
                  </div>
                  <p className="text-xs text-[#7d8590] mb-3">{repo.description}</p>
                  <div className="flex items-center gap-4 text-xs text-[#7d8590]">
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <Circle className="w-3 h-3" fill={languageColors[repo.language]} color={languageColors[repo.language]} />
                        <span>{repo.language}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1"><Star className="w-3 h-3" /> {repo.stars}</div>
                    <div className="flex items-center gap-1"><GitFork className="w-3 h-3" /> {repo.forks}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 3. Hydration-safe Contribution Graph */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Contribution activity</h2>
            <div className="border border-[#30363d] rounded-md p-4">
              <div className="mb-4">
                <div className="text-sm text-[#7d8590] mb-2">Contribution activity in the last year</div>
                <div className="grid grid-cols-53 gap-1" style={{ gridTemplateColumns: 'repeat(53, minmax(0, 1fr))' }}>
                  {mounted ? (
                    Array.from({ length: 365 }, (_, i) => {
                      const intensity = Math.floor(Math.random() * 5);
                      const colors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
                      return (
                        <div key={i} className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: colors[intensity] }} />
                      );
                    })
                  ) : (
                    Array.from({ length: 365 }, (_, i) => (
                      <div key={i} className="w-2.5 h-2.5 rounded-sm bg-[#161b22]" />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}