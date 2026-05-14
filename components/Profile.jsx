"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  MapPin, Link2, Building, Users, Star, 
  GitFork, Circle, Loader2, BookOpen, Layout 
} from "lucide-react";
import { useRouter } from "next/navigation";

const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Java: "#b07219",
  Python: "#3572A5",
};

export default function Profile() {
  const params = useParams();
  const router = useRouter();
  const username = params?.username;
  
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("repos");
  const [isFollowing, setIsFollowing] = useState(false);
  const [starredRepos, setStarredRepos] = useState(new Set());

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

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
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        setIsLoading(true);
        
        // 1. Get User Bio/Stats
        const userRes = await fetch(`http://localhost:8080/api/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!userRes.ok) throw new Error("User not found");
        setUserData(await userRes.json());

        // 2. Get User Repos
        const repoRes = await fetch(`http://localhost:8080/api/repos/owner/${username}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRepos(await repoRes.json());

      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (username) fetchProfile();
  }, [username]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0d1117]">
        <Loader2 className="animate-spin w-10 h-10 text-[#7d8590]" />
      </div>
    );
  }

  if (!userData) return <div className="text-center py-20 text-[#7d8590]">User not found</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 text-[#e6edf3]">
      <div className="grid grid-cols-12 gap-8">
        
        {/* Left Profile Sidebar */}
        <aside className="col-span-12 md:col-span-3">
          <div className="flex flex-col items-center md:items-start">
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-7xl font-bold border-4 border-[#30363d] mb-4">
              {username[0].toUpperCase()}
            </div>
            
            <h1 className="text-2xl font-semibold">{userData.name || username}</h1>
            <h2 className="text-xl text-[#7d8590] font-light mb-4">{username}</h2>
            
            <p className="text-base mb-4 text-center md:text-left">{userData.bio || "No bio available."}</p>
            
            <button onClick={handleFollow} className={`w-full border py-1.5 rounded-md text-sm font-semibold transition-all mb-4 ${
              isFollowing
                ? "bg-[#238636] border-[#238636] text-white"
                : "bg-[#21262d] border-[#30363d] text-[#e6edf3] hover:bg-[#30363d]"
            }`}>
              {isFollowing ? "Following" : "Follow"}
            </button>

            <div className="flex items-center gap-2 text-sm mb-6">
              <Users className="w-4 h-4 text-[#7d8590]" />
              <span className="font-bold">{userData.followers || 0}</span><span className="text-[#7d8590]">followers</span>
              <span>·</span>
              <span className="font-bold">{userData.following || 0}</span><span className="text-[#7d8590]">following</span>
            </div>

            <div className="space-y-2 text-sm w-full border-t border-[#30363d] pt-4">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-[#7d8590]" /> <span>{userData.company || "Open Source"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#7d8590]" /> <span>{userData.location || "Earth"}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="col-span-12 md:col-span-9">
          <div className="border-b border-[#30363d] mb-6">
            <nav className="flex gap-6">
              <button 
                onClick={() => setActiveTab("repos")}
                className={`pb-3 text-sm flex items-center gap-2 border-b-2 transition-all ${activeTab === 'repos' ? 'border-[#fd8c73] text-[#e6edf3]' : 'border-transparent text-[#7d8590]'}`}
              >
                <BookOpen className="w-4 h-4" /> Repositories 
                <span className="bg-[#2d333b] px-2 py-0.5 rounded-full text-xs">{repos.length}</span>
              </button>
            </nav>
          </div>

          <div className="space-y-0">
            {repos.length > 0 ? (
              repos.map((repo) => (
                <div key={repo.id} className="py-6 border-b border-[#30363d] flex justify-between items-start">
                  <div>
                    <Link href={`/${username}/${repo.name}`} className="text-xl font-semibold text-[#539bf5] hover:underline">
                      {repo.name}
                    </Link>
                    <p className="text-[#7d8590] text-sm mt-2 mb-4">{repo.description}</p>
                    <div className="flex items-center gap-4 text-xs text-[#7d8590]">
                      <div className="flex items-center gap-1.5">
                        <Circle className="w-3 h-3" fill={languageColors[repo.language] || "#8b949e"} stroke="none" />
                        <span>{repo.language}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" /> {repo.stars}
                      </div>
                      <span>Updated recently</span>
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
              ))
            ) : (
              <div className="text-center py-20 text-[#7d8590]">
                This user doesn't have any public repositories yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}