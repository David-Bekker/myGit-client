"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star, GitFork, Circle } from "lucide-react";

const repositories = [
  {
    username: "facebook",
    name: "react",
    description: "The library for web and native user interfaces",
    language: "JavaScript",
    stars: 228000,
    forks: 46700,
    isPublic: true,
  },
  {
    username: "microsoft",
    name: "vscode",
    description: "Visual Studio Code",
    language: "TypeScript",
    stars: 163000,
    forks: 28900,
    isPublic: true,
  },
  {
    username: "vercel",
    name: "next.js",
    description: "The React Framework",
    language: "JavaScript",
    stars: 125000,
    forks: 26800,
    isPublic: true,
  },
  {
    username: "tailwindlabs",
    name: "tailwindcss",
    description: "A utility-first CSS framework for rapid UI development",
    language: "CSS",
    stars: 82000,
    forks: 4150,
    isPublic: true,
  },
];

const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  CSS: "#563d7c",
  HTML: "#e34c26",
};

export function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-3">
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold mb-2">Recent Repositories</h2>
              <div className="space-y-2">
                {repositories.slice(0, 3).map((repo) => (
                  <Link
                    key={`${repo.username}/${repo.name}`}
                    href={`/${repo.username}/${repo.name}`}
                    className="block text-sm text-[#539bf5] hover:underline"
                  >
                    {repo.username}/{repo.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="col-span-9">
          <h1 className="text-2xl font-semibold mb-6">Trending Repositories</h1>

          <div className="space-y-4">
            {repositories.map((repo) => (
              <div
                key={`${repo.username}/${repo.name}`}
                className="border border-[#30363d] rounded-md p-4 hover:border-[#3d444d] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Link
                      href={`/${repo.username}/${repo.name}`}
                      className="text-[#539bf5] hover:underline inline-flex items-center gap-2"
                    >
                      <span className="font-semibold">{repo.username}/{repo.name}</span>
                      <span className="text-xs border border-[#30363d] rounded-full px-2 py-0.5 text-[#7d8590]">
                        Public
                      </span>
                    </Link>
                    <p className="text-sm text-[#7d8590] mt-2">{repo.description}</p>

                    <div className="flex items-center gap-4 mt-3 text-xs text-[#7d8590]">
                      {repo.language && (
                        <div className="flex items-center gap-1.5">
                          <Circle
                            className="w-3 h-3"
                            fill={languageColors[repo.language] || "#7d8590"}
                            color={languageColors[repo.language] || "#7d8590"}
                          />
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
                    </div>
                  </div>

                  <button className="px-3 py-1 text-sm border border-[#30363d] rounded-md hover:border-[#3d444d] flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Star
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
