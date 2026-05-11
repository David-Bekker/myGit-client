"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { GitPullRequest, MessageSquare, ChevronRight, Check } from "lucide-react";
const pullRequests = [
  {
    id: 456,
    title: "Add new authentication flow",
    author: "alice-dev",
    comments: 7,
    createdAt: "1 day ago",
    status: "open",
    checks: { passed: 5, total: 5 },
    reviewers: ["bob-reviewer"],
  },
  {
    id: 455,
    title: "Update dependencies to latest versions",
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

export function PullRequests() {
  const { owner, repo } = useParams();

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-sm text-[#7d8590]">
        <Link href={`/${owner}/${repo}`} className="text-[#539bf5] hover:underline">
          {owner}/{repo}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span>Pull requests</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Pull requests</h1>
        <button className="px-4 py-2 text-sm bg-[#238636] hover:bg-[#2ea043] rounded-md">
          New pull request
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex items-center gap-2">
        <button className="px-3 py-1.5 text-sm border border-[#30363d] rounded-md hover:border-[#3d444d]">
          Filters
        </button>
        <button className="px-3 py-1.5 text-sm border border-[#30363d] rounded-md hover:border-[#3d444d]">
          Reviews
        </button>
        <button className="px-3 py-1.5 text-sm border border-[#30363d] rounded-md hover:border-[#3d444d]">
          Assignee
        </button>
      </div>

      {/* Pull Requests List */}
      <div className="border border-[#30363d] rounded-md overflow-hidden">
        <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] flex items-center gap-4 text-sm">
          <button className="text-[#e6edf3] hover:text-[#539bf5]">
            <GitPullRequest className="w-4 h-4 inline mr-1" />
            {pullRequests.length} Open
          </button>
          <button className="text-[#7d8590] hover:text-[#e6edf3]">
            0 Closed
          </button>
        </div>

        <div className="divide-y divide-[#30363d]">
          {pullRequests.map((pr) => (
            <div key={pr.id} className="px-4 py-3 hover:bg-[#161b22] group">
              <div className="flex gap-3">
                <GitPullRequest className="w-4 h-4 text-[#3fb950] mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/${owner}/${repo}/pull/${pr.id}`}
                    className="text-[#e6edf3] hover:text-[#539bf5] font-semibold"
                  >
                    {pr.title}
                  </Link>
                  <div className="flex items-center gap-3 mt-2">
                    {pr.checks.passed === pr.checks.total ? (
                      <div className="flex items-center gap-1 text-xs text-[#3fb950]">
                        <Check className="w-3 h-3" />
                        <span>All checks passed</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-xs text-[#d29922]">
                        <span>
                          {pr.checks.passed}/{pr.checks.total} checks passed
                        </span>
                      </div>
                    )}
                    {pr.reviewers.length > 0 && (
                      <div className="flex items-center gap-1">
                        {pr.reviewers.map((reviewer, idx) => (
                          <div
                            key={reviewer}
                            className="w-5 h-5 rounded-full bg-[#1f6feb] flex items-center justify-center text-xs"
                            title={reviewer}
                          >
                            {reviewer[0].toUpperCase()}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-[#7d8590] mt-2">
                    #{pr.id} opened {pr.createdAt} by {pr.author}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-[#7d8590]">
                  <MessageSquare className="w-4 h-4" />
                  <span>{pr.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
