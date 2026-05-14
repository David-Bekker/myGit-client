"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AlertCircle, MessageSquare, ChevronRight, Loader2 } from "lucide-react";

const labelColors = {
  bug: "#d73a4a",
  enhancement: "#a2eeef",
  documentation: "#0075ca",
  "good first issue": "#7057ff",
  performance: "#fbca04",
  "priority: high": "#d73a4a",
};

export function Issues() {
  const params = useParams();
  const router = useRouter();
  const owner = params?.username || params?.owner; 
  const repo = params?.repo;

  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleNewIssue = () => {
    router.push(`/${owner}/${repo}/issues/new`);
  };

  useEffect(() => {
    const fetchIssues = async () => {
      const token = localStorage.getItem("token");
      try {
        setIsLoading(true);
        // FETCH FROM BACKEND
        const res = await fetch(`http://localhost:8080/api/repos/${owner}/${repo}/issues`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Could not fetch issues for this repository.");
        
        const data = await res.json();
        setIssues(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (owner && repo) fetchIssues();
  }, [owner, repo]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0d1117]">
        <Loader2 className="animate-spin w-10 h-10 text-[#7d8590]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 text-center text-red-400">
        <AlertCircle className="w-12 h-12 mx-auto mb-4" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 text-[#e6edf3]">
      <div className="mb-4 flex items-center gap-2 text-sm text-[#7d8590]">
        <Link href={`/${owner}/${repo}`} className="text-[#539bf5] hover:underline font-medium">
          {owner} / {repo}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#e6edf3]">Issues</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Issues</h1>
        <button onClick={handleNewIssue} className="px-4 py-2 text-sm font-semibold bg-[#238636] hover:bg-[#2ea043] text-white rounded-md transition-colors">
          New issue
        </button>
      </div>

      <div className="border border-[#30363d] rounded-md bg-[#0d1117] overflow-hidden">
        <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] flex items-center gap-4 text-sm">
          <div className="font-semibold text-[#e6edf3] flex items-center gap-1">
            <AlertCircle className="w-4 h-4 text-[#3fb950]" />
            {issues.length} Open
          </div>
        </div>

        <div className="divide-y divide-[#30363d]">
          {issues.length === 0 ? (
            <div className="p-12 text-center text-[#7d8590]">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <h3 className="text-xl font-semibold text-[#e6edf3]">No issues found</h3>
              <p>There aren’t any open issues here.</p>
            </div>
          ) : (
            issues.map((issue) => (
              <div key={issue.id} className="px-4 py-3 hover:bg-[#161b22] transition-colors">
                <div className="flex gap-3">
                  <AlertCircle className="w-4 h-4 text-[#3fb950] mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link href={`/${owner}/${repo}/issues/${issue.id}`} className="text-[#e6edf3] hover:text-[#539bf5] font-semibold text-base">
                        {issue.title}
                      </Link>
                      {issue.labels?.map((label) => (
                        <span key={label} className="px-2 py-0.5 text-[10px] font-bold rounded-full border"
                          style={{ backgroundColor: (labelColors[label] || "#7d8590") + "20", color: labelColors[label] || "#7d8590", borderColor: (labelColors[label] || "#7d8590") + "40" }}>
                          {label}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-[#7d8590] mt-1">
                      #{issue.id} opened {issue.createdAt || "recently"} by {issue.author}
                    </div>
                  </div>
                  {issue.comments > 0 && (
                    <div className="flex items-center gap-1 text-xs text-[#7d8590]">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{issue.comments}</span>
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