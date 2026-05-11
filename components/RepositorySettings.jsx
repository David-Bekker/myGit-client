"use client";
import { useState } from "react";
import Link from "next/link"; // Use next/link
import { useParams } from "next/navigation";
import { ChevronRight, AlertTriangle, Trash2 } from "lucide-react";

export default function RepositorySettings() {
  const { owner, repo } = useParams();

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-sm text-[#7d8590]">
        <Link href={`/${owner}/${repo}`} className="text-[#539bf5] hover:underline">
          {owner}/{repo}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span>Settings</span>
      </div>

      {/* Header */}
      <h1 className="text-2xl font-semibold mb-6">Repository Settings</h1>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar Navigation */}
        <nav className="col-span-3">
          <div className="border border-[#30363d] rounded-md overflow-hidden">
            <button className="w-full px-4 py-2 text-left text-sm bg-[#161b22] border-l-2 border-[#fd8c73]">
              General
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-[#7d8590] hover:bg-[#161b22] border-l-2 border-transparent">
              Access
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-[#7d8590] hover:bg-[#161b22] border-l-2 border-transparent">
              Branches
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-[#7d8590] hover:bg-[#161b22] border-l-2 border-transparent">
              Webhooks
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-[#7d8590] hover:bg-[#161b22] border-l-2 border-transparent">
              Secrets
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="col-span-9 space-y-6">
          {/* Repository Name */}
          <div className="border border-[#30363d] rounded-md p-4">
            <h2 className="font-semibold mb-2">Repository name</h2>
            <p className="text-sm text-[#7d8590] mb-4">
              Renaming this repository may have unintended side effects.
            </p>
            <input
              type="text"
              defaultValue={repo}
              className="w-full max-w-md bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1f6feb]"
            />
            <button className="mt-3 px-4 py-2 text-sm bg-[#21262d] hover:bg-[#30363d] rounded-md">
              Rename
            </button>
          </div>

          {/* Visibility */}
          <div className="border border-[#30363d] rounded-md p-4">
            <h2 className="font-semibold mb-2">Change repository visibility</h2>
            <p className="text-sm text-[#7d8590] mb-4">
              This repository is currently <strong>public</strong>. Anyone can see this repository.
            </p>
            <button className="px-4 py-2 text-sm border border-[#30363d] rounded-md hover:border-[#3d444d]">
              Change visibility
            </button>
          </div>

          {/* Features */}
          <div className="border border-[#30363d] rounded-md p-4">
            <h2 className="font-semibold mb-4">Features</h2>
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mt-1 w-4 h-4 rounded border-[#30363d] bg-[#0d1117] checked:bg-[#1f6feb]"
                />
                <div>
                  <div className="font-medium">Issues</div>
                  <div className="text-sm text-[#7d8590]">
                    Track work with project boards and issue tracking
                  </div>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mt-1 w-4 h-4 rounded border-[#30363d] bg-[#0d1117] checked:bg-[#1f6feb]"
                />
                <div>
                  <div className="font-medium">Wikis</div>
                  <div className="text-sm text-[#7d8590]">
                    Share documentation for your project
                  </div>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 rounded border-[#30363d] bg-[#0d1117] checked:bg-[#1f6feb]"
                />
                <div>
                  <div className="font-medium">Sponsorships</div>
                  <div className="text-sm text-[#7d8590]">
                    Accept financial contributions from the community
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Pull Requests */}
          <div className="border border-[#30363d] rounded-md p-4">
            <h2 className="font-semibold mb-4">Pull Requests</h2>
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mt-1 w-4 h-4 rounded border-[#30363d] bg-[#0d1117] checked:bg-[#1f6feb]"
                />
                <div>
                  <div className="font-medium">Allow merge commits</div>
                  <div className="text-sm text-[#7d8590]">
                    Add all commits from the head branch to the base branch
                  </div>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mt-1 w-4 h-4 rounded border-[#30363d] bg-[#0d1117] checked:bg-[#1f6feb]"
                />
                <div>
                  <div className="font-medium">Allow squash merging</div>
                  <div className="text-sm text-[#7d8590]">
                    Combine all commits into a single commit
                  </div>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 rounded border-[#30363d] bg-[#0d1117] checked:bg-[#1f6feb]"
                />
                <div>
                  <div className="font-medium">Allow rebase merging</div>
                  <div className="text-sm text-[#7d8590]">
                    Rebase and merge all commits individually
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="border border-[#d73a49] rounded-md p-4">
            <h2 className="font-semibold mb-4 flex items-center gap-2 text-[#d73a49]">
              <AlertTriangle className="w-5 h-5" />
              Danger Zone
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#30363d]">
                <div>
                  <div className="font-medium">Archive this repository</div>
                  <div className="text-sm text-[#7d8590]">
                    Mark this repository as archived and read-only
                  </div>
                </div>
                <button className="px-4 py-2 text-sm border border-[#d73a49] text-[#d73a49] rounded-md hover:bg-[#d73a49] hover:text-white">
                  Archive
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Delete this repository</div>
                  <div className="text-sm text-[#7d8590]">
                    Once deleted, it will be gone forever. Please be certain.
                  </div>
                </div>
                <button className="px-4 py-2 text-sm border border-[#d73a49] text-[#d73a49] rounded-md hover:bg-[#d73a49] hover:text-white flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
