"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { GitPullRequest, MessageSquare, ChevronRight, Check, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PullRequests() {
  const params = useParams();
  const router = useRouter();
  const owner = params?.username || params?.owner;
  const repo = params?.repo;

  const [pulls, setPulls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleNewPullRequest = () => {
    router.push(`/${owner}/${repo}/pulls/new`);
  };

  useEffect(() => {
    const fetchPulls = async () => {
      const token = localStorage.getItem("token");
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:8080/api/repos/${owner}/${repo}/pulls`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Failed to load pull requests.");
        
        const data = await res.json();
        setPulls(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (owner && repo) fetchPulls();
  }, [owner, repo]);

  if (isLoading) return <div className="flex h-screen items-center justify-center bg-[#0d1117]"><Loader2 className="animate-spin w-10 h-10 text-[#7d8590]" /></div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 text-[#e6edf3]">
      <div className="mb-4 flex items-center gap-2 text-sm text-[#7d8590]">
        <Link href={`/${owner}/${repo}`} className="text-[#539bf5] hover:underline font-medium">{owner} / {repo}</Link>
        <ChevronRight className="w-4 h-4" />
        <span>Pull requests</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Pull requests</h1>
        <button onClick={handleNewPullRequest} className="px-4 py-2 text-sm font-semibold bg-[#238636] hover:bg-[#2ea043] text-white rounded-md">New pull request</button>
      </div>

      <div className="border border-[#30363d] rounded-md bg-[#0d1117] overflow-hidden">
        <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] flex items-center gap-4 text-sm font-semibold">
          <GitPullRequest className="w-4 h-4 text-[#3fb950]" /> {pulls.length} Open
        </div>

        <div className="divide-y divide-[#30363d]">
          {pulls.length === 0 ? (
            <div className="p-16 text-center text-[#7d8590]">
              <GitPullRequest className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>No open pull requests found.</p>
            </div>
          ) : (
            pulls.map((pr) => (
              <div key={pr.id} className="px-4 py-3 hover:bg-[#161b22] transition-colors">
                <div className="flex gap-3">
                  <GitPullRequest className="w-4 h-4 text-[#3fb950] mt-1" />
                  <div className="flex-1">
                    <Link href={`/${owner}/${repo}/pull/${pr.id}`} className="text-[#e6edf3] hover:text-[#539bf5] font-semibold">{pr.title}</Link>
                    <div className="text-xs text-[#7d8590] mt-1">
                      #{pr.id} opened {pr.createdAt || "recently"} by {pr.author}
                    </div>
                  </div>
                  {pr.comments > 0 && (
                    <div className="flex items-center gap-1 text-xs text-[#7d8590]">
                      <MessageSquare className="w-3.5 h-3.5" /> {pr.comments}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}