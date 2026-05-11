"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
  // 1. Get dynamic params from the URL
  const params = useParams();
  const owner = params?.username || params?.owner; // Adapting to your routing naming
  const repo = params?.repo;

  // 2. Setup state for dynamic data
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, you'd fetch from your API:
        // const res = await fetch(`/api/repos/${owner}/${repo}/issues`);
        // const data = await res.json();
        
        // Simulating an API call with a timeout
        await new Promise((resolve) => setTimeout(resolve, 600));

        const mockDynamicData = [
          {
            id: 1234,
            title: `Fix memory leak in ${repo} core`,
            author: "john-doe",
            comments: 12,
            createdAt: "2 days ago",
            labels: ["bug", "priority: high"],
          },
          {
            id: 1233,
            title: "Add support for dark mode",
            author: owner, // dynamic author
            comments: 8,
            createdAt: "3 days ago",
            labels: ["enhancement", "good first issue"],
          },
        ];

        setIssues(mockDynamicData);
      } catch (err) {
        setError("Failed to load issues.");
      } finally {
        setIsLoading(false);
      }
    };

    if (owner && repo) {
      fetchIssues();
    }
  }, [owner, repo]);

  // 3. Loading State
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-[#7d8590]">
        <Loader2 className="animate-spin w-8 h-8 mr-2" />
        <span>Loading issues...</span>
      </div>
    );
  }

  // 4. Error State
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
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-sm text-[#7d8590]">
        <Link href={`/${owner}/${repo}`} className="text-[#539bf5] hover:underline font-medium">
          {owner} / {repo}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#e6edf3]">Issues</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Issues</h1>
        <button className="px-4 py-2 text-sm font-semibold bg-[#238636] hover:bg-[#2ea043] text-white rounded-md transition-colors">
          New issue
        </button>
      </div>

      {/* Filters Bar */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex-1 min-w-[200px]">
          <input 
            type="text" 
            placeholder="is:issue is:open "
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-sm focus:border-[#388bfd] outline-none"
          />
        </div>
        <div className="flex gap-2">
          {["Labels", "Milestones"].map((filter) => (
            <button key={filter} className="px-3 py-1.5 text-sm font-medium border border-[#30363d] bg-[#21262d] rounded-md hover:bg-[#30363d]">
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Issues List Container */}
      <div className="border border-[#30363d] rounded-md bg-[#0d1117] overflow-hidden">
        {/* Header of the list */}
        <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] flex items-center gap-4 text-sm">
          <button className="font-semibold text-[#e6edf3] flex items-center gap-1">
            <AlertCircle className="w-4 h-4 text-[#3fb950]" />
            {issues.length} Open
          </button>
          <button className="text-[#7d8590] hover:text-[#e6edf3] transition-colors">
            0 Closed
          </button>
        </div>

        {/* Dynamic Mapping */}
        <div className="divide-y divide-[#30363d]">
          {issues.length === 0 ? (
            <div className="p-12 text-center text-[#7d8590]">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <h3 className="text-xl font-semibold text-[#e6edf3]">No issues found</h3>
              <p>Try adjusting your filters or create a new issue.</p>
            </div>
          ) : (
            issues.map((issue) => (
              <div key={issue.id} className="px-4 py-3 hover:bg-[#161b22] group transition-colors">
                <div className="flex gap-3">
                  <AlertCircle className="w-4 h-4 text-[#3fb950] mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/${owner}/${repo}/issues/${issue.id}`}
                        className="text-[#e6edf3] hover:text-[#539bf5] font-semibold text-base leading-snug"
                      >
                        {issue.title}
                      </Link>
                      <div className="flex flex-wrap gap-1">
                        {issue.labels.map((label) => (
                          <span
                            key={label}
                            className="px-2 py-0.5 text-[10px] font-bold rounded-full border"
                            style={{
                              backgroundColor: (labelColors[label] || "#7d8590") + "20",
                              color: labelColors[label] || "#7d8590",
                              borderColor: (labelColors[label] || "#7d8590") + "40",
                            }}
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-[#7d8590] mt-1.5 font-normal">
                      #{issue.id} opened {issue.createdAt} by{" "}
                      <span className="hover:text-[#539bf5] cursor-pointer">{issue.author}</span>
                    </div>
                  </div>
                  {issue.comments > 0 && (
                    <div className="flex items-center gap-1 text-xs text-[#7d8590] self-start mt-1">
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