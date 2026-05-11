"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  GitPullRequest, 
  MessageSquare, 
  ChevronRight, 
  Check, 
  Loader2, 
  AlertCircle,
  Filter,
  CheckCircle2
} from "lucide-react";

export default function PullRequests() {
  const params = useParams();
  const owner = params?.username || params?.owner;
  const repo = params?.repo;

  // UI State
  const [activeTab, setActiveTab] = useState("open");
  const [isLoading, setIsLoading] = useState(true);
  
  // Data State
  const [pulls, setPulls] = useState([]);

  useEffect(() => {
    const fetchPulls = async () => {
      try {
        setIsLoading(true);
        // Simulate API fetch delay
        await new Promise((resolve) => setTimeout(resolve, 700));

        // Mock Dynamic Data
        const mockPulls = [
          {
            id: 456,
            title: `Integrate ${repo} with OAuth2`,
            author: "alice-dev",
            comments: 7,
            createdAt: "1 day ago",
            status: "open",
            checks: { passed: 5, total: 5 },
            reviewers: ["bob-reviewer"],
          },
          {
            id: 455,
            title: "Refactor core engine for performance",
            author: "bob-reviewer",
            comments: 3,
            createdAt: "2 days ago",
            status: "open",
            checks: { passed: 4, total: 5 },
            reviewers: ["alice-dev", "charlie-lead"],
          },
          {
            id: 454,
            title: "Fix responsive layout on mobile devices",
            author: "charlie-lead",
            comments: 15,
            createdAt: "4 days ago",
            status: "open",
            checks: { passed: 5, total: 5 },
            reviewers: ["alice-dev"],
          },
        ];

        setPulls(mockPulls);
      } catch (error) {
        console.error("Error fetching PRs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (owner && repo) fetchPulls();
  }, [owner, repo]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-[#7d8590]">
        <Loader2 className="animate-spin w-8 h-8 mr-2" />
        <span>Fetching pull requests...</span>
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
        <span>Pull requests</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Pull requests</h1>
        <button className="px-4 py-2 text-sm font-semibold bg-[#238636] hover:bg-[#2ea043] text-white rounded-md transition-colors">
          New pull request
        </button>
      </div>

      {/* Filters Bar */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex-1 min-w-[250px] flex items-center bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-sm">
          <Filter className="w-4 h-4 text-[#7d8590] mr-2" />
          <input 
            type="text" 
            placeholder="is:pr is:open"
            className="bg-transparent w-full outline-none text-[#e6edf3]"
          />
        </div>
        <div className="flex gap-2">
          {["Labels", "Milestones", "Reviews", "Assignee"].map((f) => (
            <button key={f} className="px-3 py-1.5 text-xs font-semibold border border-[#30363d] bg-[#21262d] rounded-md hover:bg-[#30363d] text-[#7d8590] hover:text-[#e6edf3]">
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* PR List Container */}
      <div className="border border-[#30363d] rounded-md bg-[#0d1117] overflow-hidden">
        {/* List Header/Tabs */}
        <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] flex items-center gap-4 text-sm">
          <button 
            onClick={() => setActiveTab("open")}
            className={`flex items-center gap-1.5 ${activeTab === 'open' ? 'text-[#e6edf3] font-semibold' : 'text-[#7d8590] hover:text-[#e6edf3]'}`}
          >
            <GitPullRequest className={`w-4 h-4 ${activeTab === 'open' ? 'text-[#3fb950]' : ''}`} />
            {pulls.length} Open
          </button>
          <button 
            onClick={() => setActiveTab("closed")}
            className={`flex items-center gap-1.5 ${activeTab === 'closed' ? 'text-[#e6edf3] font-semibold' : 'text-[#7d8590] hover:text-[#e6edf3]'}`}
          >
            <CheckCircle2 className={`w-4 h-4 ${activeTab === 'closed' ? 'text-[#a371f7]' : ''}`} />
            0 Closed
          </button>
        </div>

        {/* PR Rows */}
        <div className="divide-y divide-[#30363d]">
          {activeTab === "closed" ? (
            <div className="p-16 text-center text-[#7d8590]">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <h3 className="text-xl font-semibold text-[#e6edf3]">No closed pull requests</h3>
              <p>There aren’t any closed pull requests in this repository yet.</p>
            </div>
          ) : (
            pulls.map((pr) => (
              <div key={pr.id} className="px-4 py-3 hover:bg-[#161b22] group transition-colors">
                <div className="flex gap-3">
                  <GitPullRequest className="w-4 h-4 text-[#3fb950] mt-1 flex-shrink-0" />
                  
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/${owner}/${repo}/pull/${pr.id}`}
                      className="text-[#e6edf3] hover:text-[#539bf5] font-semibold text-base leading-snug"
                    >
                      {pr.title}
                    </Link>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                      {/* Check Status */}
                      {pr.checks.passed === pr.checks.total ? (
                        <div className="flex items-center gap-1 text-[11px] text-[#3fb950] font-medium">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>All checks passed</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-[11px] text-[#d29922] font-medium">
                          <span>{pr.checks.passed}/{pr.checks.total} checks passed</span>
                        </div>
                      )}

                      {/* Reviewers Avatars */}
                      {pr.reviewers.length > 0 && (
                        <div className="flex -space-x-2">
                          {pr.reviewers.map((reviewer) => (
                            <div
                              key={reviewer}
                              className="w-5 h-5 rounded-full border border-[#0d1117] bg-gradient-to-tr from-[#1f6feb] to-[#539bf5] flex items-center justify-center text-[10px] font-bold text-white cursor-help"
                              title={`Reviewer: ${reviewer}`}
                            >
                              {reviewer[0].toUpperCase()}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-[#7d8590] mt-2 font-normal">
                      #{pr.id} opened {pr.createdAt} by{" "}
                      <span className="hover:text-[#539bf5] cursor-pointer text-[#8b949e]">{pr.author}</span>
                    </div>
                  </div>

                  {/* Comments Count */}
                  {pr.comments > 0 && (
                    <div className="flex items-center gap-1 text-xs text-[#7d8590] self-start mt-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{pr.comments}</span>
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