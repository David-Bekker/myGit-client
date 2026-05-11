"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AlertCircle, MessageSquare, ChevronRight } from "lucide-react";

const issues = [
  {
    id: 1234,
    title: "Fix memory leak in useEffect hook",
    author: "john-doe",
    comments: 12,
    createdAt: "2 days ago",
    labels: ["bug", "priority: high"],
  },
  {
    id: 1233,
    title: "Add support for dark mode",
    author: "jane-smith",
    comments: 8,
    createdAt: "3 days ago",
    labels: ["enhancement", "good first issue"],
  },
  {
    id: 1232,
    title: "Documentation needs updating for v3.0",
    author: "dev-user",
    comments: 5,
    createdAt: "5 days ago",
    labels: ["documentation"],
  },
  {
    id: 1231,
    title: "Performance optimization for large datasets",
    author: "performance-guru",
    comments: 23,
    createdAt: "1 week ago",
    labels: ["performance", "priority: high"],
  },
];

// FIXED: Removed the stray colon
const labelColors = {
  bug: "#d73a4a",
  enhancement: "#a2eeef",
  documentation: "#0075ca",
  "good first issue": "#7057ff",
  performance: "#fbca04",
  "priority: high": "#d73a4a",
};

export function Issues() {
  const { owner, repo } = useParams();

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-sm text-[#7d8590]">
        {/* FIXED: Changed 'to' to 'href' */}
        <Link href={`/${owner}/${repo}`} className="text-[#539bf5] hover:underline">
          {owner}/{repo}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span>Issues</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Issues</h1>
        <button className="px-4 py-2 text-sm bg-[#238636] hover:bg-[#2ea043] rounded-md">
          New issue
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex items-center gap-2">
        <button className="px-3 py-1.5 text-sm border border-[#30363d] rounded-md hover:border-[#3d444d]">
          Filters
        </button>
        <button className="px-3 py-1.5 text-sm border border-[#30363d] rounded-md hover:border-[#3d444d]">
          Labels
        </button>
        <button className="px-3 py-1.5 text-sm border border-[#30363d] rounded-md hover:border-[#3d444d]">
          Milestones
        </button>
      </div>

      {/* Issues List */}
      <div className="border border-[#30363d] rounded-md overflow-hidden">
        <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] flex items-center gap-4 text-sm">
          <button className="text-[#e6edf3] hover:text-[#539bf5]">
            <AlertCircle className="w-4 h-4 inline mr-1" />
            {issues.length} Open
          </button>
          <button className="text-[#7d8590] hover:text-[#e6edf3]">
            0 Closed
          </button>
        </div>

        <div className="divide-y divide-[#30363d]">
          {issues.map((issue) => (
            <div key={issue.id} className="px-4 py-3 hover:bg-[#161b22] group">
              <div className="flex gap-3">
                <AlertCircle className="w-4 h-4 text-[#3fb950] mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  {/* FIXED: Changed 'to' to 'href' */}
                  <Link
                    href={`/${owner}/${repo}/issues/${issue.id}`}
                    className="text-[#e6edf3] hover:text-[#539bf5] font-semibold"
                  >
                    {issue.title}
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    {issue.labels.map((label) => (
                      <span
                        key={label}
                        className="px-2 py-0.5 text-xs rounded-full"
                        style={{
                          backgroundColor: labelColors[label] + "20",
                          color: labelColors[label],
                          border: `1px solid ${labelColors[label]}40`,
                        }}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-[#7d8590] mt-2">
                    #{issue.id} opened {issue.createdAt} by {issue.author}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-[#7d8590]">
                  <MessageSquare className="w-4 h-4" />
                  <span>{issue.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}