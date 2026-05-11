"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  MapPin, Link2, X, Building, Users, Star, 
  GitFork, Circle, Loader2, BookOpen, Package, 
  Layout, Star as StarIcon 
} from "lucide-react";

const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Go: "#00ADD8",
  CSS: "#563d7c",
};

export default function Profile() {
  const params = useParams();
  const username = params?.username || params?.owner;
  
  // UI States
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  
  // Data States
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    setMounted(true);
    
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock Dynamic User Data
        setUserData({
          name: username?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || "GitHub User",
          bio: "Full-stack developer and open-source contributor. Building the future one commit at a time.",
          company: "Acme Corp",
          location: "Remote",
          website: `https://${username}.dev`,
          twitter: username,
          followers: 842,
          following: 128,
        });

        // Mock Dynamic Repositories
        setRepos([
          { name: `${username}-ui`, description: "A highly accessible UI library", language: "TypeScript", stars: 420, forks: 68 },
          { name: "dotfiles", description: "My personalized development environment settings", language: "Go", stars: 12, forks: 2 },
          { name: "react-dashboard", description: "Internal tooling dashboard", language: "JavaScript", stars: 89, forks: 15 },
          { name: "python-scripts", description: "Automation scripts for daily tasks", language: "Python", stars: 5, forks: 0 },
        ]);

      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (username) fetchProfileData();
  }, [username]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-[#7d8590] bg-[#0d1117]">
        <Loader2 className="animate-spin w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 text-[#e6edf3]">
      <div className="grid grid-cols-12 gap-8">
        
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3">
          <div className="md:sticky md:top-6">
            <div className="mb-4 relative group">
              <div className="w-full aspect-square rounded-full bg-gradient-to-br from-[#1f6feb] to-[#238636] flex items-center justify-center text-7xl font-bold uppercase shadow-xl">
                {username?.[0]}
              </div>
            </div>

            <div className="mb-4">
              <h1 className="text-2xl font-semibold leading-tight">{userData.name}</h1>
              <div className="text-xl text-[#7d8590] font-light">{username}</div>
              <p className="text-base mt-3 text-[#e6edf3]">{userData.bio}</p>
            </div>

            <button className="w-full px-3 py-1.5 text-sm font-semibold bg-[#21262d] border border-[#30363d] rounded-md hover:bg-[#30363d] transition-all mb-4">
              Follow
            </button>

            <div className="flex items-center gap-1 text-sm mb-6 text-[#7d8590]">
              <Users className="w-4 h-4" />
              <Link href="#" className="hover:text-[#539bf5] text-[#e6edf3]">
                <span className="font-semibold">{userData.followers.toLocaleString()}</span> followers
              </Link>
              <span>·</span>
              <Link href="#" className="hover:text-[#539bf5] text-[#e6edf3]">
                <span className="font-semibold">{userData.following.toLocaleString()}</span> following
              </Link>
            </div>

            <div className="space-y-2 text-sm border-t border-[#30363d] pt-4">
              {userData.company && (
                <div className="flex items-center gap-2 text-[#e6edf3]">
                  <Building className="w-4 h-4 text-[#7d8590]" />
                  <span>{userData.company}</span>
                </div>
              )}
              {userData.location && (
                <div className="flex items-center gap-2 text-[#e6edf3]">
                  <MapPin className="w-4 h-4 text-[#7d8590]" />
                  <span>{userData.location}</span>
                </div>
              )}
              {userData.website && (
                <div className="flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-[#7d8590]" />
                  <a href={userData.website} className="text-[#539bf5] hover:underline truncate">
                    {userData.website.replace("https://", "")}
                  </a>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="col-span-12 md:col-span-9">
          {/* Navigation Tabs */}
          <div className="border-b border-[#30363d] mb-6 overflow-x-auto">
            <nav className="flex gap-2 text-sm min-w-max">
              {[
                { id: "overview", label: "Overview", icon: BookOpen },
                { id: "repos", label: "Repositories", icon: Layout, count: repos.length },
                { id: "projects", label: "Projects", icon: Package },
                { id: "stars", label: "Stars", icon: StarIcon },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                    activeTab === tab.id 
                    ? "border-[#fd8c73] text-[#e6edf3]" 
                    : "border-transparent text-[#7d8590] hover:text-[#e6edf3] hover:border-[#8b949e]"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className="bg-[#2d333b] px-2 rounded-full text-xs">{tab.count}</span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {activeTab === "overview" && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-lg font-semibold mb-4">Popular repositories</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {repos.map((repo) => (
                  <div key={repo.name} className="border border-[#30363d] rounded-md p-4 hover:bg-[#161b22] transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Link href={`/${username}/${repo.name}`} className="text-[#539bf5] hover:underline font-bold text-sm">
                        {repo.name}
                      </Link>
                      <span className="text-[10px] border border-[#30363d] rounded-full px-2 py-0.5 text-[#7d8590]">Public</span>
                    </div>
                    <p className="text-xs text-[#7d8590] mb-4 line-clamp-2 min-h-[32px]">
                      {repo.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#7d8590]">
                      <div className="flex items-center gap-1.5">
                        <Circle className="w-3 h-3" fill={languageColors[repo.language] || "#8b949e"} stroke="none" />
                        <span>{repo.language}</span>
                      </div>
                      <div className="flex items-center gap-1 hover:text-[#539bf5] cursor-pointer">
                        <Star className="w-3.5 h-3.5" /> {repo.stars}
                      </div>
                      <div className="flex items-center gap-1 hover:text-[#539bf5] cursor-pointer">
                        <GitFork className="w-3.5 h-3.5" /> {repo.forks}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-lg font-semibold mb-4">Contribution activity</h2>
              <div className="border border-[#30363d] rounded-md p-6 bg-[#0d1117]">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm text-[#7d8590]">428 contributions in the last year</span>
                </div>
                {/* Responsive Contribution Map */}
                <div className="overflow-x-auto pb-2">
                  <div className="grid grid-flow-col gap-1" style={{ gridTemplateColumns: 'repeat(53, minmax(10px, 1fr))', gridTemplateRows: 'repeat(7, 10px)' }}>
                    {mounted && Array.from({ length: 371 }, (_, i) => {
                      const intensities = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
                      const color = intensities[Math.floor(Math.random() * intensities.length)];
                      return (
                        <div key={i} className="w-[10px] h-[10px] rounded-[2px]" style={{ backgroundColor: color }} />
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 mt-4 text-xs text-[#7d8590]">
                  <span>Less</span>
                  <div className="flex gap-1">
                    {["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"].map(c => (
                      <div key={c} className="w-[10px] h-[10px] rounded-[2px]" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "repos" && (
            <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
              {repos.map(repo => (
                <div key={repo.name} className="py-6 border-b border-[#30363d] flex justify-between items-start">
                  <div>
                    <Link href={`/${username}/${repo.name}`} className="text-xl font-semibold text-[#539bf5] hover:underline">
                      {repo.name}
                    </Link>
                    <p className="text-[#7d8590] text-sm mt-1 mb-4">{repo.description}</p>
                    <div className="flex items-center gap-4 text-xs text-[#7d8590]">
                       <div className="flex items-center gap-1.5">
                        <Circle className="w-3 h-3" fill={languageColors[repo.language]} stroke="none" />
                        <span>{repo.language}</span>
                      </div>
                      <span>Updated yesterday</span>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-1 text-xs font-semibold bg-[#21262d] border border-[#30363d] rounded-md hover:bg-[#30363d]">
                    <Star className="w-3 h-3" /> Star
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}